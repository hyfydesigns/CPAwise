const fs = require('fs');
const pdf = require('pdf-parse');
module.exports = async filePath => {
  const dataBuffer = fs.readFileSync(filePath);
  const parsed = await pdf(dataBuffer);
  return { text: parsed.text };
};