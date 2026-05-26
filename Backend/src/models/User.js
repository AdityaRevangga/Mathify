const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  async create({ username, email, password, full_name, jenjang }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (username, email, password, full_name, jenjang, xp, streak, study_duration, last_active)
       VALUES ($1, $2, $3, $4, $5, 0, 1, 0, NOW()) RETURNING id, username, email, full_name, jenjang, role, xp, streak, study_duration, last_active, created_at`,
      [username, email, hashedPassword, full_name, jenjang || 'smp']
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
      'SELECT id, username, email, full_name, jenjang, avatar_url, role, xp, streak, study_duration, last_active, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },

  async updateActiveStreak(id) {
    // 1. Get current streak and last_active
    const res = await db.query('SELECT streak, last_active FROM users WHERE id = $1', [id]);
    if (res.rows.length === 0) return;

    const { streak, last_active } = res.rows[0];
    const now = new Date();
    const lastActiveDate = new Date(last_active);

    // Reset hours to compare calendar days
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastActiveDay = new Date(lastActiveDate.getFullYear(), lastActiveDate.getMonth(), lastActiveDate.getDate());

    const diffTime = today - lastActiveDay;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let newStreak = streak || 0;
    if (diffDays === 1) {
      // Logged in exactly yesterday, increment streak
      newStreak = (streak || 0) + 1;
    } else if (diffDays > 1 || (streak || 0) === 0) {
      // Missed a day or more, or streak is 0, reset/set streak to 1
      newStreak = 1;
    }

    // Update streak and last_active
    await db.query(
      'UPDATE users SET streak = $1, last_active = NOW() WHERE id = $2',
      [newStreak, id]
    );
  },

  async update(id, { full_name, username, email, jenjang }) {
    const result = await db.query(
      `UPDATE users SET full_name = COALESCE($1, full_name),
       username = COALESCE($2, username), email = COALESCE($3, email),
       jenjang = COALESCE($4, jenjang) WHERE id = $5 RETURNING id, username, email, full_name, jenjang, role, xp, streak, study_duration, last_active, created_at`,
      [full_name, username, email, jenjang, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = User;
