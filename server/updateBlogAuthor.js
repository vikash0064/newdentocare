const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dentocare';

const updateAuthor = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const result = await Blog.updateMany(
            {},
            { $set: { author: 'Dr. Nimisha Modi' } }
        );

        console.log(`✅ Updated ${result.modifiedCount} blog posts to author: Dr. Nimisha Modi`);

        process.exit(0);
    } catch (err) {
        console.error('❌ Error updating data:', err);
        process.exit(1);
    }
};

updateAuthor();
