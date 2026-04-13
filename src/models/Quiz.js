const db = require('../config/database');

const Quiz = {
  async findByMaterialId(materialId) {
    const result = await db.query(
      `SELECT id, material_id, title, description, time_limit, passing_score, is_active, created_at
       FROM quizzes WHERE material_id = $1 AND is_active = true`,
      [materialId]
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT q.*, m.title as material_title
       FROM quizzes q JOIN materials m ON q.material_id = m.id
       WHERE q.id = $1 AND q.is_active = true`,
      [id]
    );
    return result.rows[0];
  },

  async create({ material_id, title, description, time_limit, passing_score }) {
    const result = await db.query(
      `INSERT INTO quizzes (material_id, title, description, time_limit, passing_score)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [material_id, title, description, time_limit || 30, passing_score || 70]
    );
    return result.rows[0];
  },

  async update(id, { title, description, time_limit, passing_score, is_active }) {
    const result = await db.query(
      `UPDATE quizzes SET title = COALESCE($1, title), description = COALESCE($2, description),
       time_limit = COALESCE($3, time_limit), passing_score = COALESCE($4, passing_score),
       is_active = COALESCE($5, is_active), updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING *`,
      [title, description, time_limit, passing_score, is_active, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query('DELETE FROM quizzes WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = Quiz;
