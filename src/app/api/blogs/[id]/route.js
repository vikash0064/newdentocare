import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;
        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Blog deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
