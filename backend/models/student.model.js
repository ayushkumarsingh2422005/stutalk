import mongoose from "mongoose";



const SemesterSchema = new mongoose.Schema({
    semester: String,  // e.g., "I", "II", "III"
    subjects: [Object]
});

const ResultSchema = new mongoose.Schema({
    type: Map,
    of: new mongoose.Schema({
        SGPA: String,
        CGPA: String
    }, { _id: false })
});

const StudentSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Branch: { type: String, required: true },
    "Father's Name": { type: String, required: true },
    "Roll No": { type: String, unique: true, required: true },
    marksData: [SemesterSchema], 
    resultData: [ResultSchema]
});

export default mongoose.model("Studentdata", StudentSchema);
