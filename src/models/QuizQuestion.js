const db = require('../config/database');

const QuizQuestion = {
  async findByQuizId(quizId) {
    const result = await db.query(
      `SELECT id, quiz_id, question_text, option_a, option_b, option_c, option_d, sort_order, created_at
       FROM quiz_questions WHERE quiz_id = $1 ORDER BY sort_order ASC`,
      [quizId]
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM quiz_questions WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create({ quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order }) {
    const result = await db.query(
    `INSERT INTO quiz_questions 
    (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      quiz_id,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
      sort_order || 0
    ]
  );
    return result.rows[0];
  },

  async update(id, { question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order }) {
    const result = await db.query(
      `UPDATE quiz_questions SET question_text = COALESCE($1, question_text),
       option_a = COALESCE($2, option_a), option_b = COALESCE($3, option_b),
       option_c = COALESCE($4, option_c), option_d = COALESCE($5, option_d),
       correct_answer = COALESCE($6, correct_answer), sort_order = COALESCE($7, sort_order)
       WHERE id = $8 RETURNING *`,
      [question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query('DELETE FROM quiz_questions WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },

  async countByQuizId(quizId) {
    const result = await db.query('SELECT COUNT(*) as total FROM quiz_questions WHERE quiz_id = $1', [quizId]);
    return parseInt(result.rows[0].total, 10);
  },
};

module.exports = QuizQuestion;
