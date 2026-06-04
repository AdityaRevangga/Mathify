const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { allRoles } = require('../middleware/auth');

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
