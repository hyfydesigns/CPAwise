// routes/auth.js
router.post('/login', async (req, res) => {
  const user = await findUser(req.body.email); // implement this
  if (!user || !comparePasswords(req.body.password, user.password)) return res.status(401).send();
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
module.exports = router;
