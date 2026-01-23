const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    youtubeId: { type: String, required: true },
    thumbnail: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VideoItem', videoSchema);
