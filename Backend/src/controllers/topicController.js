const Topic = require('../models/Topic');

const topicController = {
  async index(req, res, next) {
    try {
      const topics = await Topic.findAll();
      res.json({ success: true, data: { topics } });
    } catch (error) {
      next(error);
    }
  },

  async show(req, res, next) {
    try {
      const topic = await Topic.findById(req.params.id);
      if (!topic) {
        return res.status(404).json({ success: false, message: 'Topik tidak ditemukan' });
      }
      res.json({ success: true, data: { topic } });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { name, slug, description, icon_url, sort_order } = req.body;
      if (!name || !slug) {
        return res.status(400).json({ success: false, message: 'Nama dan slug wajib diisi' });
      }
      const topic = await Topic.create({ name, slug, description, icon_url, sort_order });
      res.status(201).json({ success: true, message: 'Topik berhasil dibuat', data: { topic } });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const topic = await Topic.update(req.params.id, req.body);
      if (!topic) {
        return res.status(404).json({ success: false, message: 'Topik tidak ditemukan' });
      }
      res.json({ success: true, message: 'Topik berhasil diperbarui', data: { topic } });
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      const topic = await Topic.delete(req.params.id);
      if (!topic) {
        return res.status(404).json({ success: false, message: 'Topik tidak ditemukan' });
      }
      res.json({ success: true, message: 'Topik berhasil dihapus' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = topicController;
