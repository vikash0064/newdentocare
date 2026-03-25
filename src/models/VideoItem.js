import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    youtubeId: { type: String, required: true },
    thumbnail: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const VideoItem = mongoose.models.VideoItem || mongoose.model('VideoItem', videoSchema);
export default VideoItem;
