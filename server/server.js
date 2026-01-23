require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Testimonial = require('./models/Testimonial');
const User = require('./models/User');
const GalleryImage = require('./models/GalleryImage');
const VideoItem = require('./models/VideoItem');
const cloudinary = require('./services/cloudinaryConfig');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// Optimize Static Files with Caching (1 day for uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    maxAge: '1d',
    etag: true
}));

// Self-ping to keep Render awake (runs every 14 minutes)
const pingSelf = () => {
    const URL = process.env.BASE_URL || `http://localhost:${PORT}`;
    if (URL.includes('render.com') || process.env.NODE_ENV === 'production') {
        setInterval(async () => {
            try {
                await fetch(`${URL}/api/health`);
                console.log('💓 Heartbeat: Kept server awake');
            } catch (err) {
                // silently fail ping
            }
        }, 14 * 60 * 1000); // 14 minutes
    }
};

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Ensure Uploads Directory Exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dentocare';
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Error:', err.message));

// ========================================
// ROUTES
// ========================================

// --- TESTIMONIALS ---
app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ date: -1 }).lean();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/testimonials', upload.single('media'), async (req, res) => {
    try {
        const { patientName, location, treatment, reviewText } = req.body;
        let mediaUrl = '';
        let mediaType = 'image';

        if (req.file) {
            // Upload to Cloudinary
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'dentocare_gallery',
                        resource_type: 'auto'
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer);
            });

            mediaUrl = result.secure_url;
            mediaType = result.resource_type === 'video' ? 'video' : 'image';
        }

        const newTestimonial = new Testimonial({
            patientName,
            location,
            treatment,
            reviewText,
            mediaUrl,
            mediaType,
            date: new Date()
        });

        await newTestimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        console.error('Upload Error:', err);
        res.status(500).json({ error: 'Failed to upload to Cloudinary' });
    }
});

app.delete('/api/testimonials/:id', async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: 'Testimonial deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- GALLERY ---
app.get('/api/gallery', async (req, res) => {
    try {
        const images = await GalleryImage.find().sort({ createdAt: -1 }).lean();
        res.json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/gallery', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No image provided' });

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'dentocare_gallery' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(req.file.buffer);
        });

        const newImage = await GalleryImage.create({
            url: result.secure_url,
            public_id: result.public_id,
            category: req.body.category || 'General'
        });

        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/gallery/:id', async (req, res) => {
    try {
        const image = await GalleryImage.findById(req.params.id);
        if (image && image.public_id) {
            await cloudinary.uploader.destroy(image.public_id);
        }
        await GalleryImage.findByIdAndDelete(req.params.id);
        res.json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- VIDEOS ---
app.get('/api/videos', async (req, res) => {
    try {
        const videos = await VideoItem.find().sort({ createdAt: -1 }).lean();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/videos', async (req, res) => {
    try {
        const { title, youtubeId, thumbnail } = req.body;
        const newVideo = await VideoItem.create({ title, youtubeId, thumbnail });
        res.status(201).json(newVideo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/videos/:id', async (req, res) => {
    try {
        await VideoItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Video deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ========================================
// AUTHENTICATION LOGIC
// ========================================

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// --- AUTH ROUTES ---

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Admin Panel: http://localhost:5173/admin/testimonials`);

    // Start self-pinging to prevent sleep
    pingSelf();
});
