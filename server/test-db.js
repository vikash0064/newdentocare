require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dentocare';

console.log('Connecting to:', MONGO_URI.replace(/:[^:]*@/, ':****@'));

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successful');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Failed:', err.message);
        process.exit(1);
    });
