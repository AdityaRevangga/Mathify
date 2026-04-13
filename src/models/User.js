const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  async create({ username, email, password, full_name }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (username, email, password, full_name)
       VALUES ($1, $2, $3, $4) RETURNING id, username, email, full_name, role, created_at`,
      [username, email, hashedPassword, full_name]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  async findByUsername(username) {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  },

  async findById(id) {
    const result = await db.query(
      'SELECT id, username, email, full_name, avatar_url, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },
};

module.exports = User;
