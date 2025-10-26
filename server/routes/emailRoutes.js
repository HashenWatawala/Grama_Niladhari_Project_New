const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const Admin = require("../models/Admin");
const CitizenRequest = require("../models/CitizenRequest");
const InstituteRequest = require("../models/InstituteRequest");
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

    // Fetch user signature
    let userSignatureDataUrl = null;
    if (certificateData.signatureUrl) {
      // certificateData.signatureUrl is stored as the full path from multer (e.g., 'uploads/filename.png')
      const userSignaturePath = path.join(__dirname, '..', certificateData.signatureUrl);
      console.log('Looking for user signature at:', userSignaturePath);
      if (fs.existsSync(userSignaturePath)) {
        const imageBuffer = fs.readFileSync(userSignaturePath);
        const base64Image = imageBuffer.toString('base64');
        const mimeType = path.extname(certificateData.signatureUrl).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
        userSignatureDataUrl = `data:${mimeType};base64,${base64Image}`;
        console.log('User signature found and converted to base64');
      } else {
        console.log('User signature file not found at:', userSignaturePath);
      }
    } else {
      console.log('Certificate has no user signature field');
    }

    // Fetch purpose from requests table
    let purpose = certificateData.purpose || "";
    if (certificateData.nic && certificateData.gDivision) {
      const citizenRequest = await CitizenRequest.findOne({ nicNumber: certificateData.nic, gDivision: certificateData.gDivision });
      if (citizenRequest) {
        purpose = citizenRequest.reason;
      } else {
        const instituteRequest = await InstituteRequest.findOne({ nicNumber: certificateData.nic, gDivision: certificateData.gDivision });
        if (instituteRequest) {
          purpose = instituteRequest.reason;
        }
      }
    }

    // ================= PUPPETEER PDF GENERATION =================
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Create HTML for the PDF layout
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate on Residence and Character</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            font-size: 14px;
            margin: 0;
            padding: 0;
            color: #333;
            line-height: 1.5;
            background-color: #f9f9f9;
        }

        .certificate {
            border: 2px solid #007bff;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 210mm; /* A4 width */
            height: 297mm; /* A4 height */
            margin: 0 auto;
            overflow: hidden; /* Ensure it fits on one page */
            box-sizing: border-box;
        }

        .header {
            text-align: center;
            margin-bottom: 15px;
        }

        .header h1 {
            font-size: 18px;
            font-weight: bold;
            color: #007bff;
            margin: 10px 0;
        }

        .multi-lang {
            font-size: 12px;
            color: #555;
        }

        .sub-text {
            font-size: 12px;
            text-align: center;
            margin-bottom: 15px;
            color: #666;
        }

        .section {
            margin-bottom: 15px;
        }

        .section h3 {
            font-size: 16px;
            font-weight: bold;
            color: #007bff;
            margin-bottom: 8px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 3px;
        }

        .row {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding: 6px 0;
            align-items: center;
        }

        .label {
            width: 50%;
            font-weight: bold;
            color: #333;
            font-size: 12px;
        }

        .value {
            width: 48%;
            padding-left: 10px;
            color: #555;
            font-size: 12px;
        }

        .small {
            font-size: 11px;
            color: #777;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }

        .ref {
            float: right;
            font-size: 12px;
            color: #999;
            margin-bottom: 5px;
        }

        .signature {
            margin-top: 15px;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        .signature-item {
            text-align: center;
            flex: 1;
        }

        .signature-item img {
            width: 150px;
            height: 60px;
            object-fit: contain;
            border: 1px solid #ddd;
        }

        .signature-label {
            font-size: 12px;
            font-weight: bold;
            color: #333;
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
                This certificate issued by the Grama Niladhari of the Division in which the applicant resides is valid only for 06 months from the date issued.
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
                <div class="label">
                    (b) ග්‍රාම නිලධාරී කොට්ඨාසය සහ අංකය<br />
                    Grama Niladhari Division and Number
                </div>
                <div class="value">${certificateData.gDivision || ""}</div>
            </div>

            <div class="row">
                <div class="label">
                    (c) ග්‍රාම නිලධාරීට අපේක්ෂකයා පුද්ගලිකව පුළුල්ද?<br />
                    Whether applicant is personally known to the Grama Niladhari
                </div>
                <div class="value">${certificateData.known || ""}</div>
            </div>

            <div class="row">
                <div class="label">
                    (d) එසේ නම්, කවදා සිටද?<br />
                    If so, since when?
                </div>
                <div class="value">${certificateData.knownSince || ""}</div>
            </div>
        </div>

        <!-- Applicant Info -->
        <div class="section">
            <h3>අපේක්ෂකයා පිළිබඳ තොරතුරු<br />Information about Applicant</h3>
            <div class="row">
                <div class="label">
                    (a) නම සහ ලිපිනය<br />
                    Name and Address
                </div>
                <div class="value">${certificateData.fullName || ""}, ${certificateData.address || ""}</div>
            </div>
            <div class="row">
                <div class="label">
                    (b) සිවිල් තත්ත්වය<br />
                    Civil Status
                </div>
                <div class="value">${certificateData.civilStatus || ""}</div>
            </div>
            <div class="row">
                <div class="label">
                    (c) වයස<br />
                    Age
                </div>
                <div class="value">${certificateData.age || ""}</div>
            </div>
            <div class="row">
                <div class="label">
                    (d) ශ්‍රී ලාංකිකයෙක්ද?<br />
                    Whether Sri Lankan
                </div>
                <div class="value">${certificateData.isSriLankan || ""}</div>
            </div>
            <div class="row">
                <div class="label">
                    (e) ආගම<br />
                    Religion
                </div>
                <div class="value">${certificateData.religion || ""}</div>
            </div>
            <div class="row">
                <div class="label">
                    (f) වර්තමාන රැකියාව<br />
                    Present Occupation
                </div>
                <div class="value">${certificateData.occupation || ""}</div>
            </div>
            <div class="row">
                <div class="label">
                    (g) ගැමි වල පදිංචි කාලය<br />
                    Period of residence in the village
                </div>
                <div class="value">${certificateData.residentPeriod || ""}</div>
            </div>
            <div class="row">
                <div class="label">
                    (h) ජාතික හැඳුනුම්පත් අංකය<br />
                    National Identity Card No.
                </div>
                <div class="value">${certificateData.nic || ""}</div>
            </div>
            <div class="row">
                <div class="label">
                    (i) පියාගේ නම සහ ලිපිනය<br />
                    Name and Address of the Father
                </div>
                <div class="value">${certificateData.fatherName || ""}, ${certificateData.fatherAddress || ""}</div>
            </div>
            <div class="row">
                <div class="label">
                    (j) සහතිකය අවශ්‍ය වන අරමුණ<br />
                    Purpose for which the certificate is required
                </div>
                <div class="value">${purpose}</div>
            </div>
        </div>

        <div class="footer">
            <div class="signature">
                <div class="signature-item">
                    <div class="signature-label">
                        අපේක්ෂකයාගේ අත්සන<br />
                        Applicant Signature
                    </div>
                    ${userSignatureDataUrl ? `<img src="${userSignatureDataUrl}" alt="User Signature" />` : ''}
                </div>
                <div class="signature-item">
                    <div class="signature-label">
                        ග්‍රාම නිලධාරීගේ අත්සන<br />
                        Grama Niladhari Signature
                    </div>
                    ${signatureDataUrl ? `<img src="${signatureDataUrl}" alt="Admin Signature" />` : ''}
                </div>
            </div>
            <p>This is a computer-generated document, valid without a physical signature.</p>
        </div>
    </div>
</body>
</html>`;




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
