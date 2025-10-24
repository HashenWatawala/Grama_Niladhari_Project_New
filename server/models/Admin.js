const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  Registration_Number: { type: String, required: true },
  Password: { type: String, required: true },
  gDivision: { type: String },
  signature: { type: String }
});

// If you want collection name exactly "Admin"
module.exports = mongoose.model("Admin", AdminSchema, "Admin");
