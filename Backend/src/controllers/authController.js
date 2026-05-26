const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
require('dotenv').config();

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '30m' }
  );
};

const generateRefreshToken = async (user_id) => {
  return await RefreshToken.create(user_id);
};

const authController = {
  async register(req, res, next) {
    try {
      const { username, email, password, full_name, jenjang } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Username, email, dan password wajib diisi' });
      }

      const existingEmail = await User.findByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ success: false, message: 'Email sudah terdaftar' });
      }

      const existingUsername = await User.findByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ success: false, message: 'Username sudah digunakan' });
      }

      const user = await User.create({ username, email, password, full_name, jenjang });
      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user.id);

      res.status(201).json({
        success: true,
        message: 'Registrasi berhasil',
        data: {
          user: { id: user.id, username: user.username, email: user.email, full_name: user.full_name, role: user.role },
          accessToken,
          refreshToken: refreshToken.token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email dan password wajib diisi' });
      }

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Email atau password salah' });
      }

      const isMatch = await User.verifyPassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Email atau password salah' });
      }

      // Update active streak on login
      await User.updateActiveStreak(user.id);

      // Fetch the updated user details to return in response
      const updatedUser = await User.findById(user.id);

      const accessToken = generateAccessToken(updatedUser);
      const refreshToken = await generateRefreshToken(updatedUser.id);

      res.json({
        success: true,
        message: 'Login berhasil',
        data: {
          user: updatedUser,
          accessToken,
          refreshToken: refreshToken.token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async me(req, res, next) {
    try {
      // Update active streak on profile load
      await User.updateActiveStreak(req.user.id);

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
      }
      res.json({ success: true, data: { user } });
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ success: false, message: 'Refresh token wajib diisi' });
      }

      const storedToken = await RefreshToken.findByToken(refreshToken);
      if (!storedToken) {
        return res.status(401).json({ success: false, message: 'Refresh token tidak valid atau sudah kadaluarsa' });
      }

      // Revoke token lama (rotation)
      await RefreshToken.revoke(refreshToken);

      // Buat access token baru
      const user = { id: storedToken.user_id, username: storedToken.username, role: storedToken.role };
      const newAccessToken = generateAccessToken(user);

      // Buat refresh token baru (rotation)
      const newRefreshToken = await generateRefreshToken(storedToken.user_id);

      res.json({
        success: true,
        message: 'Token berhasil diperbarui',
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken.token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (refreshToken) {
        await RefreshToken.revoke(refreshToken);
      }
      res.json({ success: true, message: 'Logout berhasil' });
    } catch (error) {
      next(error);
    }
  },

  async logoutAll(req, res, next) {
    try {
      await RefreshToken.revokeAllByUserId(req.user.id);
      res.json({ success: true, message: 'Berhasil logout dari semua perangkat' });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const { full_name, username, email, jenjang } = req.body;
      const user_id = req.user.id;

      if (username) {
        const existingUsername = await User.findByUsername(username);
        if (existingUsername && existingUsername.id !== user_id) {
          return res.status(400).json({ success: false, message: 'Username sudah digunakan oleh pengguna lain' });
        }
      }

      if (email) {
        const existingEmail = await User.findByEmail(email);
        if (existingEmail && existingEmail.id !== user_id) {
          return res.status(400).json({ success: false, message: 'Email sudah terdaftar untuk pengguna lain' });
        }
      }

      const updatedUser = await User.update(user_id, { full_name, username, email, jenjang });
      res.json({ success: true, message: 'Profil berhasil diperbarui', data: { user: updatedUser } });
    } catch (error) {
      next(error);
    }
  },

  async deleteAccount(req, res, next) {
    try {
      const user_id = req.user.id;
      const deletedUser = await User.delete(user_id);
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
      }
      res.json({ success: true, message: 'Akun berhasil dihapus permanen' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
