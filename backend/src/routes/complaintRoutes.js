const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  getComplaintById
} = require("../controllers/complaintController");

// Student
router.post("/", protect, createComplaint);
router.get("/my", protect, getMyComplaints);

// Admin
router.get("/", protect, adminOnly, getAllComplaints);
router.get("/:id", protect, adminOnly, getComplaintById);
router.put("/:id", protect, adminOnly, updateComplaintStatus);

module.exports = router;