import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    url: { type: String, required: true },
    public_id: { type: String },
    category: { type: String, default: 'General' },
    createdAt: { type: Date, default: Date.now }
});

const GalleryImage = mongoose.models.GalleryImage || mongoose.model('GalleryImage', gallerySchema);
export default GalleryImage;
