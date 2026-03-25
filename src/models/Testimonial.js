import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    location: { type: String, default: 'Surat' },
    treatment: { type: String, default: 'Dental Care' },
    reviewText: { type: String, required: true },
    rating: { type: Number, default: 5 },
    mediaUrl: { type: String, default: '' },
    mediaType: { type: String, enum: ['image', 'video', 'none'], default: 'none' },
    date: { type: Date, default: Date.now }
});

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
