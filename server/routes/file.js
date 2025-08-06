const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/fileController');
const { authenticate } = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', authenticate, upload.single('file'), uploadFile);

module.exports = router;