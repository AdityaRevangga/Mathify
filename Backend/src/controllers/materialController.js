const Material = require('../models/Material');
const MaterialStep = require('../models/MaterialStep');

const materialController = {
  async index(req, res, next) {
    try {
      const { topicId } = req.params;
      const materials = await Material.findByTopicId(topicId);
      res.json({ success: true, data: { materials } });
    } catch (error) {
      next(error);
    }
  },

  async show(req, res, next) {
    try {
      const material = await Material.findById(req.params.id);
      if (!material) {
        return res.status(404).json({ success: false, message: 'Materi tidak ditemukan' });
      }
      const steps = await MaterialStep.findByMaterialId(material.id);
      res.json({ success: true, data: { material, steps } });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { topicId } = req.params;
      const { title, slug, description, type, sort_order } = req.body;
      if (!title || !slug) {
        return res.status(400).json({ success: false, message: 'Judul dan slug wajib diisi' });
      }
      const material = await Material.create({ topic_id: topicId, title, slug, description, type, sort_order });
      res.status(201).json({ success: true, message: 'Materi berhasil dibuat', data: { material } });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const material = await Material.update(req.params.id, req.body);
      if (!material) {
        return res.status(404).json({ success: false, message: 'Materi tidak ditemukan' });
      }
      res.json({ success: true, message: 'Materi berhasil diperbarui', data: { material } });
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      const material = await Material.delete(req.params.id);
      if (!material) {
        return res.status(404).json({ success: false, message: 'Materi tidak ditemukan' });
      }
      res.json({ success: true, message: 'Materi berhasil dihapus' });
    } catch (error) {
      next(error);
    }
  },

  // Material Steps
  async showSteps(req, res, next) {
    try {
      const steps = await MaterialStep.findByMaterialId(req.params.materialId);
      res.json({ success: true, data: { steps } });
    } catch (error) {
      next(error);
    }
  },

  async createStep(req, res, next) {
    try {
      const { materialId } = req.params;
      const { step_number, title, content, image_url, sort_order } = req.body;
      if (!step_number || !title || !content) {
        return res.status(400).json({ success: false, message: 'Nomor step, judul, dan konten wajib diisi' });
      }
      const step = await MaterialStep.create({ material_id: materialId, step_number, title, content, image_url, sort_order });
      res.status(201).json({ success: true, message: 'Step berhasil dibuat', data: { step } });
    } catch (error) {
      next(error);
    }
  },

  async updateStep(req, res, next) {
    try {
      const step = await MaterialStep.update(req.params.stepId, req.body);
      if (!step) {
        return res.status(404).json({ success: false, message: 'Step tidak ditemukan' });
      }
      res.json({ success: true, message: 'Step berhasil diperbarui', data: { step } });
    } catch (error) {
      next(error);
    }
  },

  async deleteStep(req, res, next) {
    try {
      const step = await MaterialStep.delete(req.params.stepId);
      if (!step) {
        return res.status(404).json({ success: false, message: 'Step tidak ditemukan' });
      }
      res.json({ success: true, message: 'Step berhasil dihapus' });
    } catch (error) {
      next(error);
    }
  },

  async showPractice(req, res, next) {
    try {
      const db = require('../config/database');
      const result = await db.query(
        'SELECT * FROM practice_questions WHERE material_id = $1 ORDER BY sort_order ASC, id ASC',
        [req.params.materialId]
      );
      res.json({ success: true, data: { practiceQuestions: result.rows } });
    } catch (error) {
      next(error);
    }
  },

  async createPractice(req, res, next) {
    try {
      const { materialId } = req.params;
      const { question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order } = req.body;
      if (!question_text || !option_a || !option_b || !option_c || !option_d || correct_answer === undefined) {
        return res.status(400).json({ success: false, message: 'Semua field latihan soal wajib diisi' });
      }
      const db = require('../config/database');
      const result = await db.query(
        `INSERT INTO practice_questions 
        (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          materialId,
          question_text,
          option_a,
          option_b,
          option_c,
          option_d,
          parseInt(correct_answer),
          explanation || '',
          parseInt(sort_order) || 0
        ]
      );
      res.status(201).json({ success: true, message: 'Latihan soal berhasil ditambahkan', data: { practiceQuestion: result.rows[0] } });
    } catch (error) {
      next(error);
    }
  },

  async updatePractice(req, res, next) {
    try {
      const { practiceId } = req.params;
      const { question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order } = req.body;
      
      const db = require('../config/database');
      const result = await db.query(
        `UPDATE practice_questions SET
          question_text = COALESCE($1, question_text),
          option_a = COALESCE($2, option_a),
          option_b = COALESCE($3, option_b),
          option_c = COALESCE($4, option_c),
          option_d = COALESCE($5, option_d),
          correct_answer = COALESCE($6, correct_answer),
          explanation = COALESCE($7, explanation),
          sort_order = COALESCE($8, sort_order)
         WHERE id = $9 RETURNING *`,
        [
          question_text,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_answer !== undefined ? parseInt(correct_answer) : null,
          explanation,
          sort_order !== undefined ? parseInt(sort_order) : null,
          practiceId
        ]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Latihan soal tidak ditemukan' });
      }
      res.json({ success: true, message: 'Latihan soal berhasil diperbarui', data: { practiceQuestion: result.rows[0] } });
    } catch (error) {
      next(error);
    }
  },

  async deletePractice(req, res, next) {
    try {
      const { practiceId } = req.params;
      const db = require('../config/database');
      const result = await db.query('DELETE FROM practice_questions WHERE id = $1 RETURNING *', [practiceId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Latihan soal tidak ditemukan' });
      }
      res.json({ success: true, message: 'Latihan soal berhasil dihapus' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = materialController;
