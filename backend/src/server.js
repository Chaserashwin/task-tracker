const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware - CORS configuration for local dev and production
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.FRONTEND_URL || "",
  ].filter(Boolean),
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in the .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Routes
const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.get("/", (req, res) => {
  res.json({ message: "Task Tracker API is live 🚀" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
