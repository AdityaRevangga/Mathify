const User = require('../models/User');

const userController = {
  async index(req, res, next) {
    try {
      const users = await User.findAll();
      res.json({ success: true, data: { users } });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { full_name, username, email, jenjang, role, xp, streak, study_duration } = req.body;

      // Check if user exists
      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
      }

      // Check if username/email already taken by someone else
      if (username && username !== existingUser.username) {
        const userByUsername = await User.findByUsername(username);
        if (userByUsername) {
          return res.status(400).json({ success: false, message: 'Username sudah digunakan' });
        }
      }

      if (email && email !== existingUser.email) {
        const userByEmail = await User.findByEmail(email);
        if (userByEmail) {
          return res.status(400).json({ success: false, message: 'Email sudah digunakan' });
        }
      }

      const updatedUser = await User.updateAdmin(id, {
        full_name,
        username,
        email,
        jenjang,
        role,
        xp: xp !== undefined ? parseInt(xp) : undefined,
        streak: streak !== undefined ? parseInt(streak) : undefined,
        study_duration: study_duration !== undefined ? parseInt(study_duration) : undefined
      });

      res.json({
        success: true,
        message: 'User berhasil diperbarui',
        data: { user: updatedUser }
      });
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      // Prevent admin from deleting themselves
      if (req.user && req.user.id == id) {
        return res.status(400).json({ success: false, message: 'Anda tidak dapat menghapus akun Anda sendiri' });
      }

      const user = await User.delete(id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
      }

      res.json({ success: true, message: 'User berhasil dihapus' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
