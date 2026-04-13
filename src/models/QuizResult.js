const db = require('../config/database');

const QuizResult = {
  async create({ quiz_id, user_id, score, total_questions, correct_answers, time_taken, passed, answers }) {
    const result = await db.query(
      `INSERT INTO quiz_results (quiz_id, user_id, score, total_questions, correct_answers, time_taken, passed, answers)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [quiz_id, user_id, score, total_questions, correct_answers, time_taken || 0, passed, JSON.stringify(answers)]
    );
    return result.rows[0];
  },

  async findByUserAndQuiz(user_id, quiz_id) {
    const result = await db.query(
      `SELECT * FROM quiz_results WHERE user_id = $1 AND quiz_id = $2 ORDER BY created_at DESC`,
      [user_id, quiz_id]
    );
    return result.rows;
  },

  async findByUserId(user_id) {
    const result = await db.query(
      `SELECT qr.*, q.title as quiz_title, q.passing_score, m.title as material_title
       FROM quiz_results qr
       JOIN quizzes q ON qr.quiz_id = q.id
       JOIN materials m ON q.material_id = m.id
       WHERE qr.user_id = $1 ORDER BY qr.created_at DESC`,
      [user_id]
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT qr.*, q.title as quiz_title, q.passing_score
       FROM quiz_results qr
       JOIN quizzes q ON qr.quiz_id = q.id
       WHERE qr.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async getBestScore(user_id, quiz_id) {
    const result = await db.query(
      `SELECT MAX(score) as best_score FROM quiz_results WHERE user_id = $1 AND quiz_id = $2`,
      [user_id, quiz_id]
    );
    return result.rows[0];
  },
};

module.exports = QuizResult;
