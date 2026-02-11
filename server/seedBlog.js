const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dentocare';

const seedBlog = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const blogData = {
            title: "Have a Perfect Smile with Advanced Cosmetic Dentistry",
            content: `A bright and well-aligned smile enhances both confidence and overall appearance. Dent O Care Advance Multi-speciality Implant Center offers customized cosmetic solutions for individuals seeking Dental Veeners in Pal Surat, helping transform chipped, stained, or uneven teeth into a flawless smile. The focus is on precision, aesthetics, and long-lasting results.

The procedure begins with a detailed consultation to understand the patient’s smile goals and dental condition. High-quality veneer materials are carefully selected to match the natural shade and shape of teeth, ensuring a seamless and natural look. Modern techniques are used to provide a comfortable experience while preserving maximum tooth structure.

Strict hygiene protocols, advanced equipment, and experienced dental professionals ensure safe and reliable treatment. Every step is explained clearly so patients feel confident throughout the process. With attention to detail and commitment to excellence, the clinic helps individuals achieve a radiant, balanced smile that looks natural and enhances facial harmony for years to come.`,
            author: "Dr. Vikash",
            image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "Cosmetic Dentistry",
            slug: "have-a-perfect-smile-with-advanced-cosmetic-dentistry",
            date: new Date()
        };

        // Check if blog already exists to avoid duplicates
        const existingBlog = await Blog.findOne({ slug: blogData.slug });
        if (existingBlog) {
            console.log('⚠️ Blog already exists, skipping insertion.');
        } else {
            await Blog.create(blogData);
            console.log('✅ Blog post inserted successfully!');
        }

        process.exit(0);
    } catch (err) {
        console.error('❌ Error seeding data:', err);
        process.exit(1);
    }
};

seedBlog();
