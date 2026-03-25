import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    category: { type: String, default: 'Dental Health' },
    author: { type: String, default: 'Dr. Nimisha Modi' },
    date: { type: Date, default: Date.now },
    slug: { type: String, unique: true }
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export default Blog;
