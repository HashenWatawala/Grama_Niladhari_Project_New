const express = require("express");
const router = express.Router();
const Institute = require("../models/Institute");
const InstituteRequest = require("../models/InstituteRequest");
const Admin = require("../models/Admin");

router.get("/requests/:adminId", async (req, res) => {
  try {
    const { adminId } = req.params;
    console.log("AdminId from URL:", adminId);

    const admin = await Admin.findById(adminId);
    console.log("Admin from DB:", admin);

    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const requests = await InstituteRequest.find({ gDivision: admin.gDivision });
    console.log("Institute Requests fetched:", requests);

    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/request", async (req, res) => {
  try {
    const { regNumber, secretCode, nicNumber, gDivision, reason } = req.body;
    if (!regNumber || !secretCode || !nicNumber || !gDivision || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newRequest = new InstituteRequest({
      regNumber,
      secretCode,
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

// POST request - add new institute
router.post("/", async (req, res) => {
  try {
    const { name, email, regNumber, passcode } = req.body;
    const newInstitute = new Institute({ name, email, regNumber, passcode });
    await newInstitute.save();
    res.status(201).json({ message: "Institute registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
