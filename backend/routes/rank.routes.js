import express from "express";
const router = express.Router();
import Student from "../models/student.model.js";

// GET ranked student data based on year and branch
router.get("/", async (req, res) => {
    try {
        const { year, branch } = req.query;
        
        if (!year || !branch) {
            return res.status(400).json({ message: "Year and branch are required" });
        }

        console.log({ year, branch });

        // Define regex pattern for Roll Number based on year
        const rollPattern = new RegExp(`^${year}(UG|PG|PHD)\\d{3}$`, "i");

        // Build query
        const query = {
            rollNo: rollPattern, // Match roll numbers with the pattern
        };

        const students = await Student.find(query)
            .sort({ result: -1 }) // Sort in descending order based on result
            .select("name rollNo result"); // Return only required fields

        if (students.length === 0) {
            return res.status(404).json({ message: "No students found" });
        }

        // Add rank to response
        const rankedStudents = students.map((student, index) => ({
            rank: index + 1, // Assign rank based on sorted order
            ...student._doc,
        }));

        res.status(200).json(rankedStudents);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;
