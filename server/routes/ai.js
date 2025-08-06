const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { generateReport } = require('../controllers/aiController');
const router = express.Router();

router.post('/generate-report', authenticate, generateReport);

module.exports = router;