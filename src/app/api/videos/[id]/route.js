import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import VideoItem from '@/models/VideoItem';

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;
        await VideoItem.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Video deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
