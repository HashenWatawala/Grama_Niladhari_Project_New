const mongoose = require("mongoose");

const CitizenRequestSchema = new mongoose.Schema({
  nicNumber: { type: String, required: true },
  gDivision: { type: String, required: true },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CitizenRequest", CitizenRequestSchema);
