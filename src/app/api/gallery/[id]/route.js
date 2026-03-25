import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';
import cloudinary from '../../../../lib/cloudinary';

export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const formData = await request.formData();
        
        const title = formData.get('title');
        const author = formData.get('author');
        const category = formData.get('category');
        const file = formData.get('image');
        
        let updateData = { title, author, category };

        if (file && typeof file === 'object' && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const seoPublicId = `plusdentocare-gallery-update-${Date.now()}`;
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'dentocare_gallery', public_id: seoPublicId },
                    (error, result) => { if (error) reject(error); else resolve(result); }
                );
                uploadStream.end(buffer);
            });
            updateData.url = result.secure_url;
            updateData.public_id = result.public_id;
        }

        const updatedImage = await GalleryImage.findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json(updatedImage);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
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
