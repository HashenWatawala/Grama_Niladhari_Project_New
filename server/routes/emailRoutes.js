const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const { Buffer } = require("buffer");
const PdfPrinter = require('pdfmake');
const fs = require('fs');

router.post("/send", async (req, res) => {
  const { to, subject, certificateData } = req.body;

  try {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: "Please find your issued certificate attached.",
        attachments: [
          {
            filename: "Citizen_Certificate.pdf",
            content: pdfData,
          },
        ],
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Email with PDF sent successfully!" });
    });

    // ================= PDF DESIGN =================
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Border
    doc.rect(20, 20, pageWidth - 40, pageHeight - 40).stroke("#2E86C1");

    // Header
    doc.fontSize(22).fillColor("#2E86C1").text("Citizen Character Certificate", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor("black").text("Issued by Grama Niladhari Division", { align: "center" });
    doc.moveDown(1);

    // Issued Date
    doc.fontSize(10).text(`Issued Date: ${new Date().toLocaleDateString()}`, { align: "right" });
    doc.moveDown(1);

    // Function to render form-style fields
    const renderField = (label, value, width = 250, height = 30) => {
      const startX = doc.x;
      const startY = doc.y;

      // Label
      doc.fontSize(9).fillColor("#2E86C1").text(label, startX, startY);
      doc.moveDown(0.2);

      // Box
      doc.rect(startX, doc.y, width, height).stroke("#2E86C1");

      // Value inside box
      doc.fontSize(11).fillColor("black").text(value || "-", startX + 5, doc.y + 8, {
        width: width - 10,
        ellipsis: true,
      });

      doc.moveDown(1.5);
    };

    // Personal Information
    renderField("Full Name", certificateData.fullName);
    renderField("NIC Number", certificateData.nic);
    renderField("NIC Issue Date", new Date(certificateData.nicIssueDate).toLocaleDateString());
    renderField("Age", certificateData.age);
    renderField("Gender", certificateData.gender);
    renderField("Civil Status", certificateData.civilStatus);
    renderField("Religion", certificateData.religion);
    renderField("Nationality", certificateData.isSriLankan);

    // Residence & Family
    renderField("Address", certificateData.address, 400);
    renderField("Father Name", certificateData.fatherName);
    renderField("Father Address", certificateData.fatherAddress, 400);

    // Division & Occupation
    renderField("Occupation", certificateData.occupation);
    renderField("Division Office", certificateData.divisionOffice);
    renderField("Grama Division", certificateData.gDivision);
    renderField("Resident Period", certificateData.residentPeriod);
    renderField("Division Period", certificateData.divisionPeriod);

    // Character & Evidence
    renderField("Known by Grama Niladhari", certificateData.known);
    renderField("Known Since", certificateData.knownSince);
    renderField("Evidence Provided", certificateData.evidence);
    renderField("Convicted of Crimes", certificateData.convicted);
    renderField("Community Works", certificateData.communityWorks);
    renderField("Character Assessment", certificateData.character);
    renderField("Other Information", certificateData.otherInfo, 400);

    // Footer
    doc.moveDown(2);
    doc.fontSize(9).fillColor("gray").text(
      "This certificate is system-generated and valid without a physical signature.\n" +
      "Issued under the authority of the Grama Niladhari Division.",
      { align: "center", italic: true }
    );

    doc.end();

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
