require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const aiRoutes = require('./routes/ai');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // serve uploaded files

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
