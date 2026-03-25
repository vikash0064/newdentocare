import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import cloudinary from '../../../lib/cloudinary';

export async function GET() {
    try {
        await connectToDatabase();
        const blogs = await Blog.find().sort({ date: -1 }).lean();
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectToDatabase();
        const formData = await request.formData();
        const title = formData.get('title');
        const content = formData.get('content');
        const author = formData.get('author');
        const slug = formData.get('slug');
        const category = formData.get('category');
        const file = formData.get('image');

        let imageUrl = '';

        if (file && typeof file === 'object') {
            const buffer = Buffer.from(await file.arrayBuffer());
            const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const seoPublicId = `plusdentocare-blog-dentocare-surat-dr-nimisha-modi-${cleanTitle}`;

            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'dentocare_blogs',
                        public_id: seoPublicId
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });
            imageUrl = result.secure_url;
        }

        const newBlog = new Blog({
            title,
            content,
            image: imageUrl,
            category: category || 'Dental Health',
            author: author || 'Dr. Nimisha Modi',
            slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            date: new Date()
        });

        await newBlog.save();
        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
