import mongoose from "mongoose";

const MarksSchema = new mongoose.Schema({
    subjectCode: String,
    subjectName: String,
    internalMarks: String,
    externalMarks: String,
    totalMarks: String,
    grade: String
});

const SemesterSchema = new mongoose.Schema({
    semester: String,  // e.g., "I", "II", "III"
    subjects: [MarksSchema]
});

const ResultSchema = new mongoose.Schema({
    semester: String,  // e.g., "I", "II", "III"
    SGPA: String,
    CGPA: String
});

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    branch: { type: String, required: true },
    fatherName: { type: String, required: true },
    regNo: { type: String, unique: true, required: true },
    marksData: [SemesterSchema], 
    resultData: [ResultSchema]
});

export default mongoose.model("Studentdata", StudentSchema);
