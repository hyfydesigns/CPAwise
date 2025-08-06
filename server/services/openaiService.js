const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.chatCompletion = async messages => {
  const resp = await openai.chat.completions.create({
    model: 'gpt-4',
    messages
  });
  return resp.choices[0].message.content;
};