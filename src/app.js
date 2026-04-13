const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topicRoutes');
const materialRoutes = require('./routes/materialRoutes');
const videoRoutes = require('./routes/videoRoutes');
const quizRoutes = require('./routes/quizRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/topics/:topicId/materials', materialRoutes);
app.use('/api/topics/:topicId/materials/:materialId/videos', videoRoutes);
app.use('/api/topics/:topicId/materials/:materialId/quizzes', quizRoutes);

// Quiz results - accessible directly
const quizController = require('./controllers/quizController');
const { auth } = require('./middleware/auth');
app.get('/api/my-results', auth, quizController.getMyResults);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Mathify API is running', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

// Error handler
app.use(errorHandler);

module.exports = app;
