const db = require('../config/database');

const Material = {
  async findByTopicId(topicId) {
    const result = await db.query(
      `SELECT id, topic_id, title, slug, description, type, sort_order, is_active, created_at
       FROM materials WHERE topic_id = $1 AND is_active = true ORDER BY sort_order ASC`,
      [topicId]
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT m.*, t.name as topic_name, t.slug as topic_slug
       FROM materials m JOIN topics t ON m.topic_id = t.id
       WHERE m.id = $1 AND m.is_active = true`,
      [id]
    );
    return result.rows[0];
  },

  async findBySlug(slug) {
    const result = await db.query(
      `SELECT m.*, t.name as topic_name, t.slug as topic_slug
       FROM materials m JOIN topics t ON m.topic_id = t.id
       WHERE m.slug = $1 AND m.is_active = true`,
      [slug]
    );
    return result.rows[0];
  },

  async create({ topic_id, title, slug, description, type, sort_order }) {
    const result = await db.query(
      `INSERT INTO materials (topic_id, title, slug, description, type, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [topic_id, title, slug, description, type || 'theory', sort_order || 0]
    );
    return result.rows[0];
  },

  async update(id, { title, slug, description, type, sort_order, is_active }) {
    const result = await db.query(
      `UPDATE materials SET title = COALESCE($1, title), slug = COALESCE($2, slug),
       description = COALESCE($3, description), type = COALESCE($4, type),
       sort_order = COALESCE($5, sort_order), is_active = COALESCE($6, is_active),
       updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *`,
      [title, slug, description, type, sort_order, is_active, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query('DELETE FROM materials WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = Material;
