import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import VideoItem from '../../../models/VideoItem';

export async function GET() {
    try {
        await connectToDatabase();
        const videos = await VideoItem.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json(videos);
    } catch (error) {
        console.error('SERVER ERROR (GET /api/videos):', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectToDatabase();
        const { title, youtubeId, thumbnail } = await request.json();
        const newVideo = await VideoItem.create({ title, youtubeId, thumbnail });
        return NextResponse.json(newVideo, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
