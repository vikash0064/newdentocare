import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';
import cloudinary from '../../../lib/cloudinary';

export async function GET() {
    try {
        await connectToDatabase();
        const images = await GalleryImage.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json(images);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectToDatabase();
        const formData = await request.formData();
        const category = formData.get('category') || 'General';
        const file = formData.get('image');

        if (!file || typeof file !== 'object') {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const seoPublicId = `plusdentocare-dentocare-surat-dr-nimisha-modi-${Date.now()}`;

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'dentocare_gallery',
                    public_id: seoPublicId
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        const newImage = await GalleryImage.create({
            url: result.secure_url,
            public_id: result.public_id,
            category: category
        });

        return NextResponse.json(newImage, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
