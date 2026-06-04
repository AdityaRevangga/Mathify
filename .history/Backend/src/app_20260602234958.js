const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topicRoutes');
const materialRoutes = require('./routes/materialRoutes');
const videoRoutes = require('./routes/videoRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const passport = require('passport');
require('./config/passport');
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/topics/:topicId/materials', materialRoutes);
app.use('/api/topics/:topicId/materials/:materialId/videos', videoRoutes);
app.use('/api/topics/:topicId/materials/:materialId/quizzes', quizRoutes);
app.use('/api/users', userRoutes);

// Quiz results - accessible directly
const quizController = require('./controllers/quizController');
const { auth } = require('./middleware/auth');
app.get('/api/my-results', auth, quizController.getMyResults);

// Leaderboard - returns top students ordered by XP
app.get('/api/leaderboard', auth, async (req, res, next) => {
  try {
    const db = require('./config/database');
    const result = await db.query(
      "SELECT id, username, full_name, role, xp FROM users WHERE role = 'student' ORDER BY xp DESC LIMIT 10"
    );
    res.json({ success: true, data: { leaderboard: result.rows } });
  } catch (error) {
    next(error);
  }
});

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

const { Client } = require('pg')

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

client.connect()
  .then(() => {
    console.log('✅ PostgreSQL Connected')
    console.log('🔗 Buka aplikasi Mathify di browser Anda: http://localhost:5173')
  })
  .catch(err => {
    console.error('❌ Database Error:', err.message)
  })