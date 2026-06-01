const Quiz = require('../models/Quiz');
const QuizQuestion = require('../models/QuizQuestion');
const QuizResult = require('../models/QuizResult');
const QuizDiscussion = require('../models/QuizDiscussion');

const quizController = {
  async index(req, res, next) {
    try {
      const quizzes = await Quiz.findByMaterialId(req.params.materialId);
      res.json({ success: true, data: { quizzes } });
    } catch (error) {
      next(error);
    }
  },

  async show(req, res, next) {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) {
        return res.status(404).json({ success: false, message: 'Quiz tidak ditemukan' });
      }
      const questions = await QuizQuestion.findByQuizId(quiz.id);
      // Sembunyikan jawaban benar saat menampilkan quiz (kecuali untuk admin)
      const showAnswers = req.user?.role === 'admin';
      const safeQuestions = questions.map(q => ({
        id: q.id,
        quiz_id: q.quiz_id,
        question_text: q.question_text,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        sort_order: q.sort_order,
        ...(showAnswers ? { correct_answer: q.correct_answer } : {}),
      }));
      res.json({ success: true, data: { quiz, questions: safeQuestions } });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { materialId } = req.params;
      const { title, description, time_limit, passing_score } = req.body;
      if (!title) {
        return res.status(400).json({ success: false, message: 'Judul quiz wajib diisi' });
      }
      const quiz = await Quiz.create({ material_id: materialId, title, description, time_limit, passing_score });
      res.status(201).json({ success: true, message: 'Quiz berhasil dibuat', data: { quiz } });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const quiz = await Quiz.update(req.params.id, req.body);
      if (!quiz) {
        return res.status(404).json({ success: false, message: 'Quiz tidak ditemukan' });
      }
      res.json({ success: true, message: 'Quiz berhasil diperbarui', data: { quiz } });
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      const quiz = await Quiz.delete(req.params.id);
      if (!quiz) {
        return res.status(404).json({ success: false, message: 'Quiz tidak ditemukan' });
      }
      res.json({ success: true, message: 'Quiz berhasil dihapus' });
    } catch (error) {
      next(error);
    }
  },

  // Submit Quiz & Hitung Hasil
  async submit(req, res, next) {
    try {
      const { id } = req.params;
      const { answers, time_taken } = req.body;
      const user_id = req.user.id;

      if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ success: false, message: 'Answers harus berupa array' });
      }

      const quiz = await Quiz.findById(id);
      if (!quiz) {
        return res.status(404).json({ success: false, message: 'Quiz tidak ditemukan' });
      }

      const questions = await QuizQuestion.findByQuizId(id);
      let correct_answers = 0;

      const evaluatedAnswers = answers.map((answer) => {
        const question = questions.find(q => q.id == answer.question_id);
        const isCorrect = question && answer.selected_answer === question.correct_answer;
        if (isCorrect) correct_answers++;
        return {
          question_id: answer.question_id,
          selected_answer: answer.selected_answer,
          correct_answer: question ? question.correct_answer : null,
          is_correct: isCorrect,
        };
      });

      const total_questions = questions.length;
      const score = total_questions > 0 ? Math.round((correct_answers / total_questions) * 100) : 0;
      const passed = score >= quiz.passing_score;

      const result = await QuizResult.create({
        quiz_id: id,
        user_id,
        score,
        total_questions,
        correct_answers,
        time_taken: time_taken || 0,
        passed,
        answers: evaluatedAnswers,
      });

      // Calculate XP Earned
      // Passing: +1000 XP, Failing: +200 XP
      // Perfect score (100): +500 XP extra bonus
      let xpEarned = passed ? 1000 : 200;
      if (score === 100) {
        xpEarned += 500;
      }

      const studySecs = time_taken || 0;

      // Update user stats in database
      const db = require('../config/database');
      await db.query(
        'UPDATE users SET xp = xp + $1, study_duration = study_duration + $2 WHERE id = $3',
        [xpEarned, studySecs, user_id]
      );

      // Fetch the updated user details
      const User = require('../models/User');
      const updatedUser = await User.findById(user_id);

      res.status(201).json({
        success: true,
        message: 'Quiz berhasil disubmit',
        data: {
          result: {
            id: result.id,
            score,
            total_questions,
            correct_answers,
            time_taken: result.time_taken,
            passed,
            answers: evaluatedAnswers,
            created_at: result.created_at,
          },
          user: updatedUser,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Hasil Quiz
  async getResult(req, res, next) {
    try {
      const result = await QuizResult.findById(req.params.resultId);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Hasil quiz tidak ditemukan' });
      }
      res.json({ success: true, data: { result } });
    } catch (error) {
      next(error);
    }
  },

  async getMyResults(req, res, next) {
    try {
      const results = await QuizResult.findByUserId(req.user.id);
      res.json({ success: true, data: { results } });
    } catch (error) {
      next(error);
    }
  },

  async getResultsByQuiz(req, res, next) {
    try {
      const results = await QuizResult.findByUserAndQuiz(req.user.id, req.params.id);
      res.json({ success: true, data: { results } });
    } catch (error) {
      next(error);
    }
  },

  // Pembahasan Quiz
  async getDiscussions(req, res, next) {
    try {
      const discussions = await QuizDiscussion.findByQuizId(req.params.id);
      res.json({ success: true, data: { discussions } });
    } catch (error) {
      next(error);
    }
  },

  // Quiz Questions CRUD
  async createQuestion(req, res, next) {
    try {
      const { id } = req.params;
      const { question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order } = req.body;
      if (!question_text || !option_a || !option_b || !option_c || !option_d || !correct_answer) {
        return res.status(400).json({ success: false, message: 'Semua field pertanyaan wajib diisi' });
      }
      const question = await QuizQuestion.create({
        quiz_id: id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order,
      });
      res.status(201).json({ success: true, message: 'Pertanyaan berhasil ditambahkan', data: { question } });
    } catch (error) {
      next(error);
    }
  },

  async updateQuestion(req, res, next) {
    try {
      const question = await QuizQuestion.update(req.params.questionId, req.body);
      if (!question) {
        return res.status(404).json({ success: false, message: 'Pertanyaan tidak ditemukan' });
      }
      res.json({ success: true, message: 'Pertanyaan berhasil diperbarui', data: { question } });
    } catch (error) {
      next(error);
    }
  },

  async deleteQuestion(req, res, next) {
    try {
      const question = await QuizQuestion.delete(req.params.questionId);
      if (!question) {
        return res.status(404).json({ success: false, message: 'Pertanyaan tidak ditemukan' });
      }
      res.json({ success: true, message: 'Pertanyaan berhasil dihapus' });
    } catch (error) {
      next(error);
    }
  },

  // Pembahasan per pertanyaan
  async createDiscussion(req, res, next) {
    try {
      const { questionId } = req.params;
      const { explanation, image_url } = req.body;
      if (!explanation) {
        return res.status(400).json({ success: false, message: 'Pembahasan wajib diisi' });
      }
      const discussion = await QuizDiscussion.create({ question_id: questionId, explanation, image_url });
      res.status(201).json({ success: true, message: 'Pembahasan berhasil ditambahkan', data: { discussion } });
    } catch (error) {
      next(error);
    }
  },

  async updateDiscussion(req, res, next) {
    try {
      const discussion = await QuizDiscussion.update(req.params.discussionId, req.body);
      if (!discussion) {
        return res.status(404).json({ success: false, message: 'Pembahasan tidak ditemukan' });
      }
      res.json({ success: true, message: 'Pembahasan berhasil diperbarui', data: { discussion } });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = quizController;
