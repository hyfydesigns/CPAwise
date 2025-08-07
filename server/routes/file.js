// routes/file.js
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  // Use pdf-parse or xlsx to extract data here
  res.json({ message: 'File received', filename: req.file.filename });
});

const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/fileController');
const { authenticate } = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', authenticate, upload.single('file'), uploadFile);

module.exports = router;