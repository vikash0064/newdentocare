import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import cloudinary from '../../../lib/cloudinary';

export async function GET() {
    try {
        await connectToDatabase();
        const testimonials = await Testimonial.find().sort({ date: -1 }).lean();
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectToDatabase();
        const contentType = request.headers.get('content-type');
        let testimonialData = {};

        if (contentType && contentType.includes('application/json')) {
            testimonialData = await request.json();
            // Assign defaults for required fields if missing
            testimonialData.mediaUrl = testimonialData.mediaUrl || '';
            testimonialData.mediaType = testimonialData.mediaType || 'none';
        } else {
            // Handle FormData
            const formData = await request.formData();
            testimonialData = {
                patientName: formData.get('patientName'),
                location: formData.get('location') || 'Surat',
                treatment: formData.get('treatment') || 'Dental Care',
                reviewText: formData.get('reviewText'),
                rating: Number(formData.get('rating')) || 5,
                mediaUrl: '',
                mediaType: 'none',
                date: formData.get('date') ? new Date(formData.get('date')) : new Date()
            };

            const file = formData.get('media');
            if (file && typeof file === 'object' && file.size > 0) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const result = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'dentocare_testimonials',
                            resource_type: 'auto'
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    uploadStream.end(buffer);
                });
                testimonialData.mediaUrl = result.secure_url;
                testimonialData.mediaType = result.resource_type === 'video' ? 'video' : 'image';
            }
        }

        const newTestimonial = new Testimonial(testimonialData);
        await newTestimonial.save();
        return NextResponse.json(newTestimonial, { status: 201 });
    } catch (error) {
        console.error('Testimonial Post Error:', error);
        return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
    }
}

export async function DELETE(request) {
    // Standard DELETE logic is already handled by individual /[id]/ route.js usually, 
    // but some apps implement it here. Let's stick with the pattern.
    return NextResponse.json({ message: 'Use /[id] route for deletion' }, { status: 405 });
}
