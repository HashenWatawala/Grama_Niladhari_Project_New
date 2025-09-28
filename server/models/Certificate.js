// server/models/Certificate.js
const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  divisionOffice: String,
  gDivision: String,
  known: String,
  knownSince: String,
  gender: String,
  age: Number,
  fullName: String,
  address: String,
  civilStatus: String,
  religion: String,
  isSriLankan: String,
  occupation: String,
  residentPeriod: String,
  divisionPeriod: String,
  nic: String,
  nicIssueDate: Date,
  fatherName: String,
  fatherAddress: String,
  evidence: String,
  convicted: String,
  communityWorks: String,
  character: String,
  otherInfo: String,
  email: String,
  electoralRegister: String,
  signatureUrl: String, // path or URL to uploaded png
}, { timestamps: true });

module.exports = mongoose.model('Certificate', CertificateSchema);
