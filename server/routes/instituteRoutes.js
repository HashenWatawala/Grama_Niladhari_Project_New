const express = require("express");
const router = express.Router();
const Institute = require("../models/Institute");

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
