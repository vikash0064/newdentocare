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
const Appointment = require('./models/Appointment');
const User = require('./models/User');
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
// GOOGLE SHEETS INTEGRATION
// ========================================
const sendToGoogleSheet = async (data) => {
    try {
        const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
        if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_WEB_APP_URL') {
            console.log('⚠️ Google Apps Script URL not configured');
            return;
        }

        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('✅ Sent to Google Sheet:', result.status);
    } catch (err) {
        console.error('❌ Google Sheet error:', err.message);
    }
};

// ========================================
// AUTO-CLEANUP: Delete appointments older than 24 hours
// ========================================
const cleanupOldAppointments = async () => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const result = await Appointment.deleteMany({
            createdAt: { $lt: twentyFourHoursAgo }
        });
        if (result.deletedCount > 0) {
            console.log(`🧹 Cleaned up ${result.deletedCount} old appointments`);
        }
    } catch (err) {
        console.error('Cleanup error:', err);
    }
};

setInterval(cleanupOldAppointments, 60 * 60 * 1000);
cleanupOldAppointments();

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

// --- APPOINTMENTS ---
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 }).lean();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/appointments/stats', async (req, res) => {
    try {
        const total = await Appointment.countDocuments();
        const pending = await Appointment.countDocuments({ status: 'pending' });
        const confirmed = await Appointment.countDocuments({ status: 'confirmed' });
        const emergency = await Appointment.countDocuments({ urgency: 'Emergency' });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayBookings = await Appointment.countDocuments({ createdAt: { $gte: today } });

        const palanpurCount = await Appointment.countDocuments({ branch: 'Palanpur Patia Branch' });
        const adajanCount = await Appointment.countDocuments({ branch: 'Adajan Branch' });

        res.json({ total, pending, confirmed, emergency, todayBookings, palanpurCount, adajanCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Book Appointment (Save + Email to Admin + Google Sheets)
app.post('/api/appointments', async (req, res) => {
    try {
        const appointmentData = req.body;
        const reference = 'APT-' + Date.now().toString(36).toUpperCase();
        appointmentData.reference = reference;

        const newAppointment = new Appointment(appointmentData);
        await newAppointment.save();
        console.log('✅ Appointment saved:', reference);



        sendToGoogleSheet(appointmentData);

        res.status(201).json({
            message: 'Appointment booked successfully',
            reference: reference
        });
    } catch (err) {
        console.error('❌ Appointment error:', err);
        res.status(500).json({ error: 'Failed to book appointment' });
    }
});

// Update Status & Send Confirmation Email
app.patch('/api/appointments/:id', async (req, res) => {
    try {
        const { status, sendEmail } = req.body;
        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Direct Action from Admin Email (Confirm/Reject Buttons)
app.get('/api/appointments/action/:id', async (req, res) => {
    try {
        const { status } = req.query;
        if (!['confirmed', 'rejected'].includes(status)) {
            return res.status(400).send('Invalid status');
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).send('Appointment not found');
        }

        res.send(`
            <div style="font-family: sans-serif; text-align: center; padding: 50px; background: #f8fafc; min-height: 100vh;">
                <div style="max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                    <h1 style="color: ${status === 'confirmed' ? '#059669' : '#dc2626'}; font-size: 24px;">
                        ${status === 'confirmed' ? '✅ Appointment Confirmed' : '✖ Appointment Rejected'}
                    </h1>
                    <p style="color: #64748b; margin: 20px 0;">Status recorded for patient: <b style="color: #1e293b;">${appointment.name}</b></p>
                    <p style="color: #64748b;">A notification email has been sent to: <br/><b>${appointment.email || 'N/A'}</b></p>
                    <div style="margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/testimonials" style="color: #2563eb; text-decoration: none; font-weight: bold; font-size: 14px;">Go to Admin Panel →</a>
                    </div>
                </div>
            </div>
        `);
    } catch (err) {
        console.error('Action Route Error:', err);
        res.status(500).send('Error updating appointment');
    }
});

// Confirm Appointment & Send Email (Dedicated endpoint for Admin Dashboard shortcut)
app.post('/api/appointments/:id/confirm', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: 'confirmed' },
            { new: true }
        );

        res.json({ message: 'Appointment confirmed', appointment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/appointments/:id', async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Appointment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/appointments/bulk-delete', async (req, res) => {
    try {
        const { ids } = req.body;
        await Appointment.deleteMany({ _id: { $in: ids } });
        res.json({ message: `${ids.length} appointments deleted` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/appointments/bulk-confirm', async (req, res) => {
    try {
        const { ids } = req.body;
        const appointments = await Appointment.find({ _id: { $in: ids } }).lean();

        await Appointment.updateMany(
            { _id: { $in: ids } },
            { status: 'confirmed' }
        );

        res.json({ message: `${ids.length} appointments confirmed successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/appointments', async (req, res) => {
    try {
        const result = await Appointment.deleteMany({});
        res.json({ message: `${result.deletedCount} appointments cleared` });
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

// Register
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const isAdminEmail = email.toLowerCase() === (process.env.ADMIN_EMAIL || "").toLowerCase();
        const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

        const user = await User.create({
            name,
            email,
            password,
            avatar,
            role: isAdminEmail ? 'admin' : 'user'
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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

// Forgot Password
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        res.json({ message: 'Reset token generated (Email functionality removed)', resetToken });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reset Password
app.post('/api/auth/reset-password/:token', async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Google Login (Simple version - verify token from frontend)
app.post('/api/auth/google', async (req, res) => {
    try {
        const { name, email, googleId, avatar } = req.body;

        const isAdminEmail = email.toLowerCase() === (process.env.ADMIN_EMAIL || "").toLowerCase();
        let user = await User.findOne({ email });

        if (!user) {
            // Create user if doesn't exist
            user = await User.create({
                name,
                email,
                googleId,
                avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
                role: isAdminEmail ? 'admin' : 'user'
            });
        } else {
            // Update existing user to admin if email matches
            let updated = false;
            if (!user.googleId) {
                user.googleId = googleId;
                updated = true;
            }
            if (isAdminEmail && user.role !== 'admin') {
                user.role = 'admin';
                updated = true;
            }
            if (!user.avatar && avatar) {
                user.avatar = avatar;
                updated = true;
            }
            if (updated) await user.save();
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const cron = require('node-cron');

// ... (existing code)

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// CRON JOB: Auto-Clear MongoDB Daily at Midnight
// "0 0 * * *" = Run at 00:00 (Midnight) every day
cron.schedule('0 0 * * *', async () => {
    try {
        console.log('🧹 Running Daily Cleanup: Delete all appointments from DB...');
        const result = await Appointment.deleteMany({});
        console.log(`✅ Cleanup Complete: ${result.deletedCount} appointments removed from DB.`);
    } catch (err) {
        console.error('❌ Daily Cleanup Failed:', err);
    }
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {

    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Admin Panel: http://localhost:5173/admin/testimonials`);

    // Start self-pinging to prevent sleep
    pingSelf();
});
