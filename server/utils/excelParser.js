const xlsx = require('xlsx');
module.exports = async filePath => {
  const wb = xlsx.readFile(filePath);
  const sheets = {};
  wb.SheetNames.forEach(name => {
    sheets[name] = xlsx.utils.sheet_to_json(wb.Sheets[name], { defval: null });
  });
  return sheets;
};