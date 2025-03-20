import express from 'express'
import mongoose from 'mongoose';
import studentRoutes from "./routes/student.routes.js"; // Adjust the path accordingly
import rankRoutes from "./routes/rank.routes.js"; // Adjust the path accordingly
import cors from 'cors';



const app = express();
app.use(cors()); // Configure CORS to allow requests from everywhere
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://digicraftone:nJ9NLFEck3ARsG1K@cluster0.gkzmb.mongodb.net/Data", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Use student routes
app.use("/api/student", studentRoutes);
app.use("/api/rank", rankRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
