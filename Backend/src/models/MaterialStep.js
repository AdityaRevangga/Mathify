const db = require('../config/database');

const MaterialStep = {
  async findByMaterialId(materialId) {
    const result = await db.query(
      `SELECT id, material_id, step_number, title, content, image_url, sort_order, created_at
       FROM material_steps WHERE material_id = $1 ORDER BY step_number ASC, sort_order ASC`,
      [materialId]
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM material_steps WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create({ material_id, step_number, title, content, image_url, sort_order }) {
    const result = await db.query(
      `INSERT INTO material_steps (material_id, step_number, title, content, image_url, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [material_id, step_number, title, content, image_url, sort_order || 0]
    );
    return result.rows[0];
  },

  async update(id, { step_number, title, content, image_url, sort_order }) {
    const result = await db.query(
      `UPDATE material_steps SET step_number = COALESCE($1, step_number),
       title = COALESCE($2, title), content = COALESCE($3, content),
       image_url = COALESCE($4, image_url), sort_order = COALESCE($5, sort_order),
       updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *`,
      [step_number, title, content, image_url, sort_order, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query('DELETE FROM material_steps WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = MaterialStep;
