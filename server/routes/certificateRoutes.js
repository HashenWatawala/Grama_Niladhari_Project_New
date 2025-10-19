// server/routes/certificateRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createCertificate, getCertificates, getCertificateByNic } = require('../controllers/certificateController');

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const safeName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, safeName);
  },
});
const fileFilter = (req, file, cb) => {
  // accept png and jpg/jpeg
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error('Only PNG/JPG allowed'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } }); // 2MB

router.post('/', upload.single('signature'), createCertificate);
router.get('/', getCertificates);
router.get('/:nic', getCertificateByNic);

module.exports = router;
