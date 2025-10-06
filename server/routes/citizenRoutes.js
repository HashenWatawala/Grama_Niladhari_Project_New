const express = require("express");
const router = express.Router();
const CitizenRequest = require("../models/CitizenRequest");
const Admin = require("../models/Admin");

// POST /api/citizen/request - Submit a citizen request
router.post("/request", async (req, res) => {
  try {
    const { nicNumber, gDivision, reason } = req.body;

    if (!nicNumber || !gDivision || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRequest = new CitizenRequest({
      nicNumber,
      gDivision,
      reason,
    });

    await newRequest.save();

    res.status(201).json({ message: "Request submitted successfully" });
  } catch (err) {
    console.error("Error submitting request:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/citizen/requests/:adminId - Get requests for admin's gDivision
router.get("/requests/:adminId", async (req, res) => {
  try {
    const { adminId } = req.params;
    console.log("AdminId from URL:", adminId);

    const admin = await Admin.findById(adminId);
    console.log("Admin from DB:", admin);

    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const requests = await CitizenRequest.find({ gDivision: admin.gDivision });
    console.log("Requests fetched:", requests);

    res.json(requests);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
