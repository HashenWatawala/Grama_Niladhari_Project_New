const express = require("express");
const router = express.Router();
const CitizenRequest = require("../models/CitizenRequest");
const Admin = require("../models/Admin");

// Submit citizen request
router.post("/request", async (req, res) => {
  try {
    const { nicNumber, gDivision, reason } = req.body;

    // Save request
    const newRequest = new CitizenRequest({ nicNumber, gDivision, reason });
    await newRequest.save();

    res.status(201).json({ message: "Request submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit request" });
  }
});

// Get requests for an admin (filter by admin's division)
router.get("/requests/:adminId", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const requests = await CitizenRequest.find({ gDivision: admin.gDivision });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

module.exports = router;
