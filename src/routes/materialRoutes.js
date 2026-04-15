const express = require('express');
const router = express.Router({ mergeParams: true });
const materialController = require('../controllers/materialController');
const { adminOnly } = require('../middleware/auth');

// Materials - Public untuk read
router.get('/', materialController.index);
router.get('/:id', materialController.show);

// Materials - Admin only untuk CRUD
router.post('/', adminOnly, materialController.create);
router.put('/:id', adminOnly, materialController.update);
router.delete('/:id', adminOnly, materialController.destroy);

// Material Steps - Public untuk read
router.get('/:materialId/steps', materialController.showSteps);

// Material Steps - Admin only untuk CRUD
router.post('/:materialId/steps', adminOnly, materialController.createStep);
router.put('/steps/:stepId', adminOnly, materialController.updateStep);
router.delete('/steps/:stepId', adminOnly, materialController.deleteStep);

module.exports = router;
