// server/controllers/certificateController.js
const Certificate = require('../models/Certificate');
const path = require('path');

exports.createCertificate = async (req, res) => {
  try {
    // all text fields will be in req.body
    const data = { ...req.body };

    // if file uploaded, set signatureUrl
    if (req.file) {
      data.signatureUrl = `/uploads/${req.file.filename}`; // served statically
    }

    // convert types if necessary e.g. age to Number, nicIssueDate to Date
    if (data.age) data.age = Number(data.age);
    if (data.nicIssueDate) data.nicIssueDate = new Date(data.nicIssueDate);

    const cert = new Certificate(data);
    await cert.save();

    res.status(201).json({ message: 'Certificate created', cert });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

exports.getCertificates = async (req, res) => {
  try {
    const items = await Certificate.find().sort({ createdAt: -1 }).limit(100);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
