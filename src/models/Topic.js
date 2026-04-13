const db = require('../config/database');

const Topic = {
  async findAll() {
    const result = await db.query(
      `SELECT id, name, slug, description, icon_url, sort_order, is_active, created_at
       FROM topics WHERE is_active = true ORDER BY sort_order ASC`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT id, name, slug, description, icon_url, sort_order, is_active, created_at
       FROM topics WHERE id = $1 AND is_active = true`,
      [id]
    );
    return result.rows[0];
  },

  async findBySlug(slug) {
    const result = await db.query(
      `SELECT id, name, slug, description, icon_url, sort_order, is_active, created_at
       FROM topics WHERE slug = $1 AND is_active = true`,
      [slug]
    );
    return result.rows[0];
  },

  async create({ name, slug, description, icon_url, sort_order }) {
    const result = await db.query(
      `INSERT INTO topics (name, slug, description, icon_url, sort_order)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, slug, description, icon_url, sort_order || 0]
    );
    return result.rows[0];
  },

  async update(id, { name, slug, description, icon_url, sort_order, is_active }) {
    const result = await db.query(
      `UPDATE topics SET name = COALESCE($1, name), slug = COALESCE($2, slug),
       description = COALESCE($3, description), icon_url = COALESCE($4, icon_url),
       sort_order = COALESCE($5, sort_order), is_active = COALESCE($6, is_active),
       updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 RETURNING *`,
      [name, slug, description, icon_url, sort_order, is_active, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query('DELETE FROM topics WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = Topic;
