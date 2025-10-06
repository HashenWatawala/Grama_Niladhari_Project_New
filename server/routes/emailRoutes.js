const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const { Buffer } = require("buffer");

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

    // ========== PDF DESIGN ==========
    // Border
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    doc.rect(20, 20, pageWidth - 40, pageHeight - 40).stroke("#003366");

    // Header
    doc.fontSize(22).fillColor("#003366").text("Citizen Character Certificate", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor("black").text("Issued by Grama Niladhari Division", { align: "center" });
    doc.moveDown(1);

    // Issued Date
    doc.fontSize(10).text(`Issued Date: ${new Date().toLocaleDateString()}`, { align: "right" });
    doc.moveDown(1);

    // Function to render sections
    const renderSection = (title, fields) => {
      doc.moveDown(0.5);
      doc.rect(doc.x, doc.y, pageWidth - 100, fields.length * 18 + 25).stroke("#003366"); // box border
      doc.fontSize(14).fillColor("#003366").text(` ${title}`, doc.x + 5, doc.y + 5);
      doc.moveDown(1.2);

      doc.fontSize(11).fillColor("black");
      fields.forEach(f => {
        doc.text(`${f.label}: `, { continued: true, width: 200 })
           .fillColor("#555555").text(f.value || "-", { align: "left" })
           .fillColor("black");
      });
      doc.moveDown(0.5);
    };

    // Sections
    renderSection("Personal Information", [
      { label: "Full Name", value: certificateData.fullName },
      { label: "NIC Number", value: certificateData.nic },
      { label: "NIC Issue Date", value: new Date(certificateData.nicIssueDate).toLocaleDateString() },
      { label: "Age", value: certificateData.age },
      { label: "Gender", value: certificateData.gender },
      { label: "Civil Status", value: certificateData.civilStatus },
      { label: "Religion", value: certificateData.religion },
      { label: "Nationality", value: certificateData.isSriLankan },
    ]);

    renderSection("Residence & Family", [
      { label: "Address", value: certificateData.address },
      { label: "Father Name", value: certificateData.fatherName },
      { label: "Father Address", value: certificateData.fatherAddress },
    ]);

    renderSection("Division & Occupation", [
      { label: "Occupation", value: certificateData.occupation },
      { label: "Division Office", value: certificateData.divisionOffice },
      { label: "Grama Division", value: certificateData.gDivision },
      { label: "Resident Period", value: certificateData.residentPeriod },
      { label: "Division Period", value: certificateData.divisionPeriod },
    ]);

    renderSection("Character & Evidence", [
      { label: "Known by Grama Niladhari", value: certificateData.known },
      { label: "Known Since", value: certificateData.knownSince },
      { label: "Evidence Provided", value: certificateData.evidence },
      { label: "Convicted of Crimes", value: certificateData.convicted },
      { label: "Community Works", value: certificateData.communityWorks },
      { label: "Character Assessment", value: certificateData.character },
      { label: "Other Information", value: certificateData.otherInfo },
    ]);

    // Footer
    doc.moveDown(2);
    doc.fontSize(10).fillColor("gray").text(
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
