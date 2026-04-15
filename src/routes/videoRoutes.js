const express = require('express');
const router = express.Router({ mergeParams: true });
const videoController = require('../controllers/videoController');
const { adminOnly } = require('../middleware/auth');

// Public - siapa saja bisa lihat
router.get('/', videoController.index);
router.get('/:id', videoController.show);

// Admin only - hanya admin yang bisa CRUD
router.post('/', adminOnly, videoController.create);
router.put('/:id', adminOnly, videoController.update);
router.delete('/:id', adminOnly, videoController.destroy);

module.exports = router;
