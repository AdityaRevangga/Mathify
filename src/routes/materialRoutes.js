const express = require('express');
const router = express.Router({ mergeParams: true });
const materialController = require('../controllers/materialController');
const { auth } = require('../middleware/auth');

// Materials
router.get('/', materialController.index);
router.get('/:id', materialController.show);
router.post('/', auth, materialController.create);
router.put('/:id', auth, materialController.update);
router.delete('/:id', auth, materialController.destroy);

// Material Steps
router.get('/:materialId/steps', materialController.showSteps);
router.post('/:materialId/steps', auth, materialController.createStep);
router.put('/steps/:stepId', auth, materialController.updateStep);
router.delete('/steps/:stepId', auth, materialController.deleteStep);

module.exports = router;
