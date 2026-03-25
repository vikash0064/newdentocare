import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';
import cloudinary from '../../../../lib/cloudinary';

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;
        const image = await GalleryImage.findById(id);
        if (image && image.public_id) {
            await cloudinary.uploader.destroy(image.public_id);
        }
        await GalleryImage.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Image deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
