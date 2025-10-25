const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const Admin = require("../models/Admin");
const fs = require("fs");
const path = require("path");

router.post("/send", async (req, res) => {
  const { to, subject, certificateData, adminId } = req.body;

  try {
    // Fetch admin signature
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }
    let signatureDataUrl = null;
    if (admin.signature) {
      // admin.signature is stored as the full path from multer (e.g., 'uploads/filename.png')
      const signaturePath = path.join(__dirname, '..', admin.signature);
      console.log('Looking for signature at:', signaturePath);
      if (fs.existsSync(signaturePath)) {
        const imageBuffer = fs.readFileSync(signaturePath);
        const base64Image = imageBuffer.toString('base64');
        const mimeType = path.extname(admin.signature).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
        signatureDataUrl = `data:${mimeType};base64,${base64Image}`;
        console.log('Signature found and converted to base64');
      } else {
        console.log('Signature file not found at:', signaturePath);
      }
    } else {
      console.log('Admin has no signature field');
    }

    // ================= PUPPETEER PDF GENERATION =================
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Create HTML for the PDF layout
    const htmlContent = `
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: "Times New Roman", serif;
        font-size: 12px;
        margin: 30px 50px;
        color: #000;
      }

      .certificate {
        border: 1px dashed #000;
        padding: 20px;
      }

      .header {
        text-align: center;
        line-height: 1.4;
      }

      .header h1 {
        font-size: 16px;
        font-weight: bold;
        margin: 10px 0 5px;
      }

      .sub-text {
        font-size: 12px;
      }

      .section {
        margin-top: 15px;
      }

      .row {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #000;
        padding: 4px 0;
      }

      .label {
        width: 48%;
        line-height: 1.3;
      }

      .value {
        width: 50%;
        border-left: 1px solid #000;
        padding-left: 10px;
      }

      .small {
        font-size: 10px;
        color: #333;
      }

      .multi-lang {
        font-size: 11px;
        line-height: 1.2;
      }

      .footer {
        margin-top: 40px;
        font-size: 11px;
        text-align: center;
      }

      .ref {
        float: right;
        font-size: 11px;
        margin-bottom: 5px;
      }
    </style>
  </head>

  <body>
    <div class="certificate">
      <div class="ref">A4 225910</div>

      <div class="header">
        <div class="multi-lang">
          ග්‍රාම නිලධාරී විසින් නිකුත් කරන පදිංචි හා චරිතය පිළිබඳ සහතිකය <br />
          கிராம நிலதாரி வழங்கிய குடியிருப்பு மற்றும் குணச்சான்றிதழ் <br />
          <h1>Certificate on Residence and Character issued by the Grama Niladhari</h1>
        </div>
      </div>

      <div class="sub-text">
        <p>
          This certificate issued by the Grama Niladhari of the Division in which
          the applicant resides is valid only for 06 months from the date issued.
        </p>
      </div>

      <!-- Section 1 -->
      <div class="section">
        <div class="row">
          <div class="label">
            (1) දිස්ත්‍රික්කය හා ප්‍රාදේශීය ලේකම් කොට්ඨාසය<br />
            (a) District and Divisional Secretary’s Division
          </div>
          <div class="value">${certificateData.divisionOffice || ""}</div>
        </div>

        <div class="row">
          <div class="label">(b) Grama Niladhari Division and Number</div>
          <div class="value">${certificateData.gDivision || ""}</div>
        </div>

        <div class="row">
          <div class="label">(c) Whether applicant is personally known to the Grama Niladhari</div>
          <div class="value">${certificateData.known || ""}</div>
        </div>

        <div class="row">
          <div class="label">(d) If so, since when?</div>
          <div class="value">${certificateData.knownSince || ""}</div>
        </div>
      </div>

      <!-- Applicant Info -->
      <div class="section">
        <h3>Information about Applicant</h3>
        <div class="row">
          <div class="label">(a) Name and Address</div>
          <div class="value">${certificateData.fullName || ""}, ${certificateData.address || ""}</div>
        </div>
        <div class="row">
          <div class="label">(b) Civil Status</div>
          <div class="value">${certificateData.civilStatus || ""}</div>
        </div>
        <div class="row">
          <div class="label">(c) Age</div>
          <div class="value">${certificateData.age || ""}</div>
        </div>
        <div class="row">
          <div class="label">(d) Whether Sri Lankan</div>
          <div class="value">${certificateData.isSriLankan || ""}</div>
        </div>
        <div class="row">
          <div class="label">(e) Religion</div>
          <div class="value">${certificateData.religion || ""}</div>
        </div>
        <div class="row">
          <div class="label">(f) Present Occupation</div>
          <div class="value">${certificateData.occupation || ""}</div>
        </div>
        <div class="row">
          <div class="label">(g) Period of residence in the village</div>
          <div class="value">${certificateData.residentPeriod || ""}</div>
        </div>
        <div class="row">
          <div class="label">(h) National Identity Card No.</div>
          <div class="value">${certificateData.nic || ""}</div>
        </div>
        <div class="row">
          <div class="label">(i) Name and Address of the Father</div>
          <div class="value">${certificateData.fatherName || ""}, ${certificateData.fatherAddress || ""}</div>
        </div>
        <div class="row">
          <div class="label">(j) Purpose for which the certificate is required</div>
          <div class="value">${certificateData.purpose || ""}</div>
        </div>
      </div>

      <div class="footer">
        ${signatureDataUrl ? `<img src="${signatureDataUrl}" alt="Admin Signature" style="width: 150px; height: auto; margin-bottom: 10px;" />` : ''}
        <p>This is a computer-generated document, valid without a physical signature.</p>
      </div>
    </div>
  </body>
</html>
`;


    // Helper function for rendering fields
    function renderField(label, value) {
      return `
        <div class="field">
          <span class="label">${label}:</span>
          <span class="value">${value || "-"}</span>
        </div>
      `;
    }

    // Set content and generate PDF buffer
    await page.setContent(htmlContent, { waitUntil: "load" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    // ================= EMAIL SENDING =================
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
          content: pdfBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email with PDF sent successfully!" });

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
