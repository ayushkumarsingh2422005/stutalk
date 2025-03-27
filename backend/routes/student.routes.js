import express from 'express'
const router = express.Router();
import Student from "../models/student.model.js"; // Adjust the path based on your project structure

// GET student data by rollNo
router.get("/:rollNo", async (req, res) => {
    try {
        const { rollNo } = req.params;
        const student = await Student.findOne({ "Roll No": rollNo });

        console.log(student)

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;