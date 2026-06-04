const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { allRoles } = require('../middleware/auth');

const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport');

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const user = req.user;
    const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.redirect(`http://localhost:5173/auth/google/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }
);

// Public - tanpa login
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

// Perlu login (student atau admin)
router.get('/me', allRoles, authController.me);
router.put('/profile', allRoles, authController.updateProfile);
router.delete('/profile', allRoles, authController.deleteAccount);
router.post('/logout-all', allRoles, authController.logoutAll);

module.exports = router;
