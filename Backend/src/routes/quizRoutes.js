const express = require('express');
const router = express.Router({ mergeParams: true });
const quizController = require('../controllers/quizController');
const { adminOnly, allRoles } = require('../middleware/auth');

// Quiz - Public untuk read
router.get('/', quizController.index);
router.get('/:id', quizController.show);

// Quiz - Admin only untuk CRUD
router.post('/', adminOnly, quizController.create);
router.put('/:id', adminOnly, quizController.update);
router.delete('/:id', adminOnly, quizController.destroy);

// Quiz Questions - Admin only
router.post('/:id/questions', adminOnly, quizController.createQuestion);
router.put('/questions/:questionId', adminOnly, quizController.updateQuestion);
router.delete('/questions/:questionId', adminOnly, quizController.deleteQuestion);

// Submit Quiz - Student & Admin bisa submit
router.post('/:id/submit', allRoles, quizController.submit);

// Quiz Results - Student & Admin bisa lihat hasil
router.get('/:id/results', allRoles, quizController.getResultsByQuiz);
router.get('/results/:resultId', allRoles, quizController.getResult);

// Quiz Discussions (Pembahasan) - Public untuk read
router.get('/:id/discussions', quizController.getDiscussions);

// Quiz Discussions - Admin only untuk create/update
router.post('/questions/:questionId/discussions', adminOnly, quizController.createDiscussion);
router.put('/discussions/:discussionId', adminOnly, quizController.updateDiscussion);

module.exports = router;
