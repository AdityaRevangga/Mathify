const db = require('../config/database');

const QuizDiscussion = {
  async findByQuestionId(questionId) {
    const result = await db.query(
      `SELECT id, question_id, explanation, image_url, created_at
       FROM quiz_discussions WHERE question_id = $1`,
      [questionId]
    );
    return result.rows[0];
  },

  async findByQuizId(quizId) {
    const result = await db.query(
      `SELECT d.id, d.question_id, d.explanation, d.image_url, d.created_at,
       q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer
       FROM quiz_discussions d
       JOIN quiz_questions q ON d.question_id = q.id
       WHERE q.quiz_id = $1 ORDER BY q.sort_order ASC`,
      [quizId]
    );
    return result.rows;
  },

  async create({ question_id, explanation, image_url }) {
    const result = await db.query(
      `INSERT INTO quiz_discussions (question_id, explanation, image_url)
       VALUES ($1, $2, $3) RETURNING *`,
      [question_id, explanation, image_url]
    );
    return result.rows[0];
  },

  async update(id, { explanation, image_url }) {
    const result = await db.query(
      `UPDATE quiz_discussions SET explanation = COALESCE($1, explanation),
       image_url = COALESCE($2, image_url), updated_at = CURRENT_TIMESTAMP
       WHERE id = $3 RETURNING *`,
      [explanation, image_url, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query('DELETE FROM quiz_discussions WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = QuizDiscussion;
