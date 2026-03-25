import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;
        await Testimonial.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Testimonial deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
