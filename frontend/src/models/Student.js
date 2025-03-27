import mongoose from 'mongoose';

// Define the Student Schema
const SemesterSchema = new mongoose.Schema({
    semester: String,
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

// Create the model only if it doesn't exist
const Student = mongoose.models.Studentdata || mongoose.model("Studentdata", StudentSchema);

export default Student; 