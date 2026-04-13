const db = require('../config/database');
const crypto = require('crypto');

const RefreshToken = {
  async create(user_id) {
    const token = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 hari
    const result = await db.query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at)
       VALUES ($1, $2, $3) RETURNING id, token, expires_at, created_at`,
      [user_id, token, expiresAt]
    );
    return result.rows[0];
  },

  async findByToken(token) {
    const result = await db.query(
      `SELECT rt.*, u.username, u.email, u.role
       FROM refresh_tokens rt
       JOIN users u ON rt.user_id = u.id
       WHERE rt.token = $1 AND rt.is_revoked = false AND rt.expires_at > CURRENT_TIMESTAMP`,
      [token]
    );
    return result.rows[0];
  },

  async revoke(token) {
    const result = await db.query(
      `UPDATE refresh_tokens SET is_revoked = true WHERE token = $1 RETURNING *`,
      [token]
    );
    return result.rows[0];
  },

  async revokeAllByUserId(user_id) {
    const result = await db.query(
      `UPDATE refresh_tokens SET is_revoked = true WHERE user_id = $1 AND is_revoked = false RETURNING *`,
      [user_id]
    );
    return result.rows;
  },

  async cleanExpired() {
    const result = await db.query(
      `DELETE FROM refresh_tokens WHERE expires_at < CURRENT_TIMESTAMP OR is_revoked = true`
    );
    return result.rowCount;
  },
};

module.exports = RefreshToken;
