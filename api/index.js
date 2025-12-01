import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "../Backend/config/mongodb.js";

// Routes
import authRouter from "../Backend/routes/authRoutes.js";
import postsRouter from "../Backend/routes/postsRoutes.js";
import usersRouter from "../Backend/routes/userRoutes.js";
import pickupRoutes from "../Backend/routes/pickupRoutes.js";
import deliveryAgentRoutes from "../Backend/routes/deliveryAgentRoutes.js";
import centersRoutes from "../Backend/routes/centersRoutes.js";
import progressRoutes from "../Backend/routes/progressRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "https://bin-wise-recycle.vercel.app", // ✅ Your PRODUCTION URL
  "https://bin-wise-recycle-git-main-nourseens-projects.vercel.app",
  "http://localhost:5173", // For local development
  "http://localhost:3000" // For local development
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// API routes - remove /api prefix since Vercel already routes to /api
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/pickups", pickupRoutes);
app.use("/delivery-agents", deliveryAgentRoutes);
app.use("/centers", centersRoutes);
app.use("/progress", progressRoutes);

// Root route - place AFTER other routes
app.get("/", (req, res) => {
  res.json({ message: "Backend server is running ✅", status: "ok" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Internal server error" });
});

// Export handler for Vercel serverless functions
// Vercel will automatically handle the Express app
export default app;

