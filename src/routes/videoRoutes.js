const express = require('express');
const router = express.Router({ mergeParams: true });
const videoController = require('../controllers/videoController');
const { auth } = require('../middleware/auth');

router.get('/', videoController.index);
router.get('/:id', videoController.show);
router.post('/', auth, videoController.create);
router.put('/:id', auth, videoController.update);
router.delete('/:id', auth, videoController.destroy);

module.exports = router;
