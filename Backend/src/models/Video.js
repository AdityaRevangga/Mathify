const db = require('../config/database');

const Video = {
  async findByMaterialId(materialId) {
    const result = await db.query(
      `SELECT id, material_id, title, description, video_url, thumbnail_url, duration, sort_order, is_active, created_at
       FROM videos WHERE material_id = $1 AND is_active = true ORDER BY sort_order ASC`,
      [materialId]
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM videos WHERE id = $1 AND is_active = true', [id]);
    return result.rows[0];
  },

  async create({ material_id, title, description, video_url, thumbnail_url, duration, sort_order }) {
    const result = await db.query(
      `INSERT INTO videos (material_id, title, description, video_url, thumbnail_url, duration, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [material_id, title, description, video_url, thumbnail_url, duration || 0, sort_order || 0]
    );
    return result.rows[0];
  },

  async update(id, { title, description, video_url, thumbnail_url, duration, sort_order, is_active }) {
    const result = await db.query(
      `UPDATE videos SET title = COALESCE($1, title), description = COALESCE($2, description),
       video_url = COALESCE($3, video_url), thumbnail_url = COALESCE($4, thumbnail_url),
       duration = COALESCE($5, duration), sort_order = COALESCE($6, sort_order),
       is_active = COALESCE($7, is_active), updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [title, description, video_url, thumbnail_url, duration, sort_order, is_active, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query('DELETE FROM videos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = Video;
