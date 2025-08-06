const { chatCompletion } = require('../services/openaiService');

exports.generateReport = async (req, res) => {
  const { notes, contextData } = req.body;
  const messages = [
    { role: 'system', content: 'You are an AI CPA assistant...' },
    { role: 'user', content: `Generate a report based on:\nNotes: ${notes}\nData: ${JSON.stringify(contextData)}` }
  ];
  try {
    const report = await chatCompletion(messages);
    res.json({ report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};