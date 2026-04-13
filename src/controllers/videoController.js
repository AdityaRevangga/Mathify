const Video = require('../models/Video');

const videoController = {
  async index(req, res, next) {
    try {
      const videos = await Video.findByMaterialId(req.params.materialId);
      res.json({ success: true, data: { videos } });
    } catch (error) {
      next(error);
    }
  },

  async show(req, res, next) {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(404).json({ success: false, message: 'Video tidak ditemukan' });
      }
      res.json({ success: true, data: { video } });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { materialId } = req.params;
      const { title, description, video_url, thumbnail_url, duration, sort_order } = req.body;
      if (!title || !video_url) {
        return res.status(400).json({ success: false, message: 'Judul dan URL video wajib diisi' });
      }
      const video = await Video.create({ material_id: materialId, title, description, video_url, thumbnail_url, duration, sort_order });
      res.status(201).json({ success: true, message: 'Video berhasil ditambahkan', data: { video } });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const video = await Video.update(req.params.id, req.body);
      if (!video) {
        return res.status(404).json({ success: false, message: 'Video tidak ditemukan' });
      }
      res.json({ success: true, message: 'Video berhasil diperbarui', data: { video } });
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      const video = await Video.delete(req.params.id);
      if (!video) {
        return res.status(404).json({ success: false, message: 'Video tidak ditemukan' });
      }
      res.json({ success: true, message: 'Video berhasil dihapus' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = videoController;
