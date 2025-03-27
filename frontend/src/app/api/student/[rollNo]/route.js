import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Student from '@/models/Student';


export async function GET(request, { params }) {
    try {
        const { rollNo } = await params;
        await connectDB();
        
        const student = await Student.findOne({ "Roll No": rollNo });

        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        return NextResponse.json(student);
    } catch (error) {
        return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
    }
} 