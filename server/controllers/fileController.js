const fs = require('fs');
const path = require('path');
const pdfParser = require('../utils/pdfParser');
const excelParser = require('../utils/excelParser');

exports.uploadFile = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const ext = path.extname(file.originalname).toLowerCase();
  let data = null;
  try {
    if (ext === '.pdf') data = await pdfParser(file.path);
    else if (['.xlsx', '.xls', '.csv'].includes(ext)) data = await excelParser(file.path);
    else data = { message: 'File uploaded but not parsed' };
  } catch (err) {
    data = { error: err.message };
  }

  res.json({ filename: file.filename, data });
};