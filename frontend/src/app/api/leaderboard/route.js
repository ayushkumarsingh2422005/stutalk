import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Student from '@/models/Student';

// Define the Student Schema

export async function GET(request) {
    try {
        // Debug logs for request object
        // console.log('Request object:', {
        //     url: request.url,
        //     nextUrl: request.nextUrl,
        //     headers: Object.fromEntries(request.headers),
        //     method: request.method
        // });

        // Get search params from the request URL
        const searchParams = request.nextUrl.searchParams;
        
        // Debug logs for search params
        // console.log('Search params:', {
        //     raw: searchParams.toString(),
        //     entries: Object.fromEntries(searchParams.entries())
        // });

        const batch = searchParams.get('batch');
        const semester = searchParams.get('semester');
        const branch = searchParams.get('branch');

        console.log("Extracted params:", { batch, semester, branch });

        if (!batch) {
            return NextResponse.json({ message: "Batch year is required" }, { status: 400 });
        }

        await connectDB();

        // Define regex pattern for Roll Number based on batch
        const rollPattern = branch === 'all' ? `${batch}UG` : `${batch}UG${branch}`;
        console.log("Using roll pattern:", rollPattern);

        // Build query with regex to match roll numbers
        const query = {
            "Roll No": { $regex: `^${rollPattern}`, $options: 'i' }
        };
        console.log("MongoDB query:", query);

        // Get all students matching the criteria
        const students = await Student.find(query);
        console.log("Found students count:", students.length);

        if (students.length === 0) {
            console.log("No students found for the initial query");
            return NextResponse.json({
                message: "No students found for the given batch and branch"
            }, { status: 404 });
        }

        // Filter and sort students based on semester
        const studentsWithResults = students.filter(student => {
            // For 'all' semester, check if student has any result data
            if (semester === 'all') {
                return student.resultData && student.resultData[0] && student.resultData[0]._doc;
            }
            // For specific semester, check if that semester's data exists
            return student.resultData && 
                   student.resultData[0] && 
                   student.resultData[0]._doc && 
                   student.resultData[0]._doc[semester] &&
                   student.resultData[0]._doc[semester].SGPA;
        });
        console.log("Students with results count:", studentsWithResults.length);

        const rankedStudents = studentsWithResults
            .sort((a, b) => {
                if (semester === 'all') {
                    // For all semesters, get the latest semester's CGPA
                    const aLatestSem = Object.keys(a.resultData[0]._doc || {})
                        .filter(sem => sem !== '_id')
                        .sort()
                        .pop();
                    const bLatestSem = Object.keys(b.resultData[0]._doc || {})
                        .filter(sem => sem !== '_id')
                        .sort()
                        .pop();
                    
                    const aCGPA = aLatestSem ? Number(a.resultData[0]._doc[aLatestSem].CGPA) : 0;
                    const bCGPA = bLatestSem ? Number(b.resultData[0]._doc[bLatestSem].CGPA) : 0;
                    return bCGPA - aCGPA;
                } else {
                    // For specific semester, sort by SGPA
                    const sgpaA = Number(a.resultData[0]._doc[semester].SGPA);
                    const sgpaB = Number(b.resultData[0]._doc[semester].SGPA);
                    return sgpaB - sgpaA;
                }
            })
            .map((student, index) => ({
                _id: student._id,
                name: student.Name,
                regNo: student["Roll No"],
                branch: student.Branch,
                cgpa: semester === 'all' 
                    ? Object.keys(student.resultData[0]._doc || {})
                        .filter(sem => sem !== '_id')
                        .sort()
                        .reduce((_, sem) => student.resultData[0]._doc[sem].CGPA, '0')
                    : null,
                sgpa: semester === 'all' 
                    ? null 
                    : student.resultData[0]._doc[semester]?.SGPA || null
            }));

        if (rankedStudents.length === 0) {
            console.log("No students found after filtering for semester results");
            return NextResponse.json({
                message: `No students found with results for ${semester === 'all' ? 'any semester' : `semester ${semester}`}`
            }, { status: 404 });
        }

        console.log("Sending response with ranked students count:", rankedStudents.length);
        return NextResponse.json({
            students: rankedStudents,
            totalStudents: rankedStudents.length
        });

    } catch (error) {
        console.error('Error in leaderboard route:', error);
        return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
    }
} 