const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dentocare';

const checkAuthors = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        const blogs = await Blog.find({}, 'title author');
        console.log('Current Blogs:', blogs);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkAuthors();
