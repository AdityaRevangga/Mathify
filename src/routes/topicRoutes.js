const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const { adminOnly } = require('../middleware/auth');

// Public - siapa saja bisa lihat
router.get('/', topicController.index);
router.get('/:id', topicController.show);

// Admin only - hanya admin yang bisa CRUD
router.post('/', adminOnly, topicController.create);
router.put('/:id', adminOnly, topicController.update);
router.delete('/:id', adminOnly, topicController.destroy);

module.exports = router;
