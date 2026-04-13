const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const { auth } = require('../middleware/auth');

router.get('/', topicController.index);
router.get('/:id', topicController.show);
router.post('/', auth, topicController.create);
router.put('/:id', auth, topicController.update);
router.delete('/:id', auth, topicController.destroy);

module.exports = router;
