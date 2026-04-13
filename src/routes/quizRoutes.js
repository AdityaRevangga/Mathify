const express = require('express');
const router = express.Router({ mergeParams: true });
const quizController = require('../controllers/quizController');
const { auth } = require('../middleware/auth');

// Quiz CRUD
router.get('/', quizController.index);
router.get('/:id', quizController.show);
router.post('/', auth, quizController.create);
router.put('/:id', auth, quizController.update);
router.delete('/:id', auth, quizController.destroy);

// Quiz Questions
router.post('/:id/questions', auth, quizController.createQuestion);
router.put('/questions/:questionId', auth, quizController.updateQuestion);
router.delete('/questions/:questionId', auth, quizController.deleteQuestion);

// Submit Quiz
router.post('/:id/submit', auth, quizController.submit);

// Quiz Results
router.get('/:id/results', auth, quizController.getResultsByQuiz);
router.get('/results/:resultId', auth, quizController.getResult);

// Quiz Discussions (Pembahasan)
router.get('/:id/discussions', quizController.getDiscussions);
router.post('/questions/:questionId/discussions', auth, quizController.createDiscussion);
router.put('/discussions/:discussionId', auth, quizController.updateDiscussion);

module.exports = router;
