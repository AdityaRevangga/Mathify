const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { adminOnly } = require('../middleware/auth');

// All routes here are admin only
router.get('/', adminOnly, userController.index);
router.put('/:id', adminOnly, userController.update);
router.delete('/:id', adminOnly, userController.destroy);

module.exports = router;
