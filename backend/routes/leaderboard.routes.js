import express from "express";
const router = express.Router();
import Student from "../models/student.model.js";

// GET ranked student data based on batch, semester, and branch
router.get("/", async (req, res) => {
    try {
        const { batch, semester, branch } = req.query;
        console.log("Received request with params:", { batch, semester, branch });

        if (!batch) {
            return res.status(400).json({ message: "Batch year is required" });
        }

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

        // console.log(students[index]["resultData"][0]._doc[semester]);

        if (students.length === 0) {
            console.log("No students found for the initial query");
            return res.status(404).json({
                message: "No students found for the given batch and branch"
            });
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
            return res.status(404).json({
                message: `No students found with results for ${semester === 'all' ? 'any semester' : `semester ${semester}`}`
            });
        }

        console.log("Sending response with ranked students count:", rankedStudents.length);
        res.status(200).json({
            students: rankedStudents,
            totalStudents: rankedStudents.length
        });

    } catch (error) {
        console.error('Error in leaderboard route:', error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;
