require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes"); // ✅ IMPORT ROUTES
const protectedRoutes = require("./routes/protectedRoutes");
const complaintRoutes = require("./routes/complaintRoutes");


const app = express();

// connect DB ONCE
connectDB();

// middleware
app.use(cors());
app.use(express.json());


// ✅ CONNECT AUTH ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes); // 👈 ADD HERE
app.use("/api/complaints", complaintRoutes); // 👈 ADD COMPLAINT ROUTES

// test route
app.get("/", (req, res) => {
  res.send("GrievEase Backend is Running 🚀");
});

// start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
