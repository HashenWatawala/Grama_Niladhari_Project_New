const express = require("express");
const router = express.Router();
const multer = require('multer');
const Admin = require("../models/Admin"); // your Admin schema

const upload = multer({ dest: 'uploads/' });

// POST /register - Register a new admin
router.post("/register", async (req, res) => {
  try {
    const { Registration_Number, Password, gDivision, signature } = req.body;

    if (!Registration_Number || !Password || !gDivision || !signature) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ Registration_Number });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({
      Registration_Number,
      Password,
      gDivision,
      signature
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Error registering admin:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /adminSignIn - Register a new admin (alias for register)
router.post("/adminSignIn", upload.single('signature'), async (req, res) => {
  try {
    const { Registration_Number, Password, gDivision } = req.body;

    if (!Registration_Number || !Password || !gDivision) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ Registration_Number });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({
      Registration_Number,
      Password,
      gDivision,
      signature: req.file ? req.file.path : null,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Error registering admin:", err);
    res.status(500).json({ message: "Server error" });
  }
});

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
