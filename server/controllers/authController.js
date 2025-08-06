const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Dummy user store—replace with real DB
const users = [];

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length+1, email, password: hashed };
  users.push(user);
  res.json({ message: 'User created' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};