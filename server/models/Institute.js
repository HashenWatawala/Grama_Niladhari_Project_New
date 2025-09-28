const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  regNumber: { type: String, required: true },
  passcode: { type: String, required: true },
});

module.exports = mongoose.model("Institute", InstituteSchema);
