import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
    try {
        await connectToDatabase();
        return NextResponse.json({
            status: 'OK',
            mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json({ status: 'Error', error: error.message }, { status: 500 });
    }
}
