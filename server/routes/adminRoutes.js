const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin"); // your Admin schema

// POST login
router.post("/login", async (req, res) => {
  try {
    const { Registration_Number, Password } = req.body;

    // find admin by registration number
    const admin = await Admin.findOne({ Registration_Number });

    if (!admin) {
      return res.status(401).json({ message: "Invalid Registration Number" });
    }

    if (admin.Password !== Password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // success
    res.json({
      message: "Login successful",
      admin: {
        id: admin._id,
        Registration_Number: admin.Registration_Number,
        gDivision: admin.gDivision,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
