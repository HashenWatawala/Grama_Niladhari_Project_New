const mongoose = require("mongoose");

const InstituteRequestSchema = new mongoose.Schema({
    regNumber: { type: String, required: true },
    secretCode: { type: String, required: true },
    nicNumber: { type: String, required: true },
    gDivision: { type: String, required: true },
    reason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("InstituteRequest", InstituteRequestSchema);