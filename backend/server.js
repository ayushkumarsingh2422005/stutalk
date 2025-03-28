import express from 'express'
import mongoose from 'mongoose';
import studentRoutes from "./routes/student.routes.js"; // Adjust the path accordingly
import leaderboardRoutes from "./routes/leaderboard.routes.js"; // Adjust the path accordingly
import cors from 'cors';
import { config } from 'dotenv';
config();



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
app.use("/api/leaderboard", leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
