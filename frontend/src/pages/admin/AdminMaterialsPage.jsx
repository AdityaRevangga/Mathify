import React, { useState, useEffect } from 'react';
import { topicsAPI, materialsAPI } from '../../services/api';
import '../../styles/admin.css';

const AdminMaterialsPage = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [materials, setMaterials] = useState([]);
  const [steps, setSteps] = useState([]);
  
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Material Form State
  const [isMatFormOpen, setIsMatFormOpen] = useState(false);
  const [editingMatId, setEditingMatId] = useState(null);
  const [matFormData, setMatFormData] = useState({
    title: '',
    slug: '',
    type: 'theory',
    order_seq: 1
  });

  // Steps Management State
  const [selectedMatForSteps, setSelectedMatForSteps] = useState(null);
  const [isStepFormOpen, setIsStepFormOpen] = useState(false);
  const [editingStepId, setEditingStepId] = useState(null);
  const [stepFormData, setStepFormData] = useState({
    title: '',
    content: '',
    order_seq: 1
  });

  // Load topics on mount
  useEffect(() => {
    const loadTopics = async () => {
      try {
        const response = await topicsAPI.getAll();
        const loadedTopics = response.data?.data?.topics || [];
        setTopics(loadedTopics);
        if (loadedTopics.length > 0) {
          setSelectedTopicId(loadedTopics[0].id);
        }
      } catch (err) {
        console.error('Error loading topics:', err);
        setError('Gagal memuat daftar topik pelajaran.');
      } finally {
        setLoadingTopics(false);
      }
    };
    loadTopics();
  }, []);

  // Load materials when selectedTopicId changes
  const loadMaterials = async () => {
    if (!selectedTopicId) return;
    setLoadingMaterials(true);
    setError('');
    setSelectedMatForSteps(null); // Clear active steps selection
    try {
      const response = await materialsAPI.getByTopic(selectedTopicId);
      setMaterials(response.data?.data?.materials || []);
    } catch (err) {
      console.error('Error loading materials:', err);
      setError('Gagal memuat daftar materi untuk topik ini.');
    } finally {
      setLoadingMaterials(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, [selectedTopicId]);

  // Load steps for a specific material
  const loadSteps = async (material) => {
    setLoadingSteps(true);
    setError('');
    try {
      const response = await materialsAPI.getSteps(selectedTopicId, material.id);
      setSteps(response.data?.data?.steps || []);
      setSelectedMatForSteps(material);
    } catch (err) {
      console.error('Error loading steps:', err);
      setError('Gagal memuat langkah belajar untuk materi ini.');
    } finally {
      setLoadingSteps(false);
    }
  };

  // --- MATERIAL CRUD HANDLERS ---
  const handleMatInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title' && !editingMatId) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setMatFormData(prev => ({
        ...prev,
        title: value,
        slug: generatedSlug
      }));
    } else {
      setMatFormData(prev => ({
        ...prev,
        [name]: name === 'order_seq' ? parseInt(value) || 1 : value
      }));
    }
  };

  const handleAddMatClick = () => {
    setError('');
    setSuccess('');
    setEditingMatId(null);
    setMatFormData({ title: '', slug: '', type: 'theory', order_seq: materials.length + 1 });
    setIsMatFormOpen(true);
  };

  const handleEditMatClick = (mat) => {
    setError('');
    setSuccess('');
    setEditingMatId(mat.id);
    setMatFormData({
      title: mat.title,
      slug: mat.slug,
      type: mat.type || 'theory',
      order_seq: mat.order_seq || 1
    });
    setIsMatFormOpen(true);
  };

  const handleDeleteMatClick = async (id, title) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus materi "${title}"?\nKuis dan langkah-langkah di dalam materi ini juga akan terhapus.`)) {
      return;
    }
    setError('');
    setSuccess('');
    try {
      await materialsAPI.delete(selectedTopicId, id);
      setSuccess(`Materi "${title}" berhasil dihapus.`);
      loadMaterials();
    } catch (err) {
      console.error('Error deleting material:', err);
      setError(err.response?.data?.message || 'Gagal menghapus materi.');
    }
  };

  const handleMatSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingMatId) {
        await materialsAPI.update(selectedTopicId, editingMatId, matFormData);
        setSuccess(`Materi "${matFormData.title}" berhasil diperbarui.`);
        setIsMatFormOpen(false);
        setEditingMatId(null);
        loadMaterials();
      } else {
        await materialsAPI.create(selectedTopicId, matFormData);
        setSuccess(`Materi "${matFormData.title}" berhasil ditambahkan.`);
        setIsMatFormOpen(false);
        loadMaterials();
      }
    } catch (err) {
      console.error('Error saving material:', err);
      setError(err.response?.data?.message || 'Gagal menyimpan materi.');
    }
  };

  // --- STEPS CRUD HANDLERS ---
  const handleStepInputChange = (e) => {
    const { name, value } = e.target;
    setStepFormData(prev => ({
      ...prev,
      [name]: name === 'order_seq' ? parseInt(value) || 1 : value
    }));
  };

  const handleAddStepClick = () => {
    setError('');
    setSuccess('');
    setEditingStepId(null);
    setStepFormData({ title: '', content: '', order_seq: steps.length + 1 });
    setIsStepFormOpen(true);
  };

  const handleEditStepClick = (step) => {
    setError('');
    setSuccess('');
    setEditingStepId(step.id);
    setStepFormData({
      title: step.title || '',
      content: step.content || '',
      order_seq: step.order_seq || 1
    });
    setIsStepFormOpen(true);
  };

  const handleDeleteStepClick = async (stepId, stepNum) => {
    if (!window.confirm(`Hapus langkah ke-${stepNum}?`)) {
      return;
    }
    setError('');
    setSuccess('');
    try {
      await materialsAPI.deleteStep(selectedTopicId, stepId);
      setSuccess(`Langkah belajar berhasil dihapus.`);
      loadSteps(selectedMatForSteps);
    } catch (err) {
      console.error('Error deleting step:', err);
      setError(err.response?.data?.message || 'Gagal menghapus langkah belajar.');
    }
  };

  const handleStepSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingStepId) {
        await materialsAPI.updateStep(selectedTopicId, editingStepId, stepFormData);
        setSuccess(`Langkah belajar berhasil diperbarui.`);
        setIsStepFormOpen(false);
        setEditingStepId(null);
        loadSteps(selectedMatForSteps);
      } else {
        await materialsAPI.createStep(selectedTopicId, selectedMatForSteps.id, stepFormData);
        setSuccess(`Langkah belajar baru berhasil ditambahkan.`);
        setIsStepFormOpen(false);
        loadSteps(selectedMatForSteps);
      }
    } catch (err) {
      console.error('Error saving step:', err);
      setError(err.response?.data?.message || 'Gagal menyimpan langkah belajar.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* HEADER */}
      <div className="admin-header">
        <div className="admin-header-title">
          <h2>Kelola Materi Pembelajaran</h2>
          <p>Kelola modul materi belajar langkah-demi-langkah (theory/practice) per topik.</p>
        </div>
        {selectedTopicId && !isMatFormOpen && (
          <button className="btn btn-primary" onClick={handleAddMatClick}>
            <span>➕</span> Tambah Materi Baru
          </button>
        )}
      </div>

      {/* FILTER TOPIC */}
      {loadingTopics ? (
        <div>Memuat daftar topik...</div>
      ) : (
        <div className="admin-filter-bar">
          <div className="admin-filter-group">
            <label htmlFor="filterTopic">Pilih Topik Utama</label>
            <select
              id="filterTopic"
              className="admin-select"
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
            >
              {topics.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ALERTS */}
      {error && (
        <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '0.8rem 1.25rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontWeight: 500 }}>
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div style={{ background: '#D1FAE5', border: '1px solid #A7F3D0', color: '#065F46', padding: '0.8rem 1.25rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontWeight: 500 }}>
          ✅ {success}
        </div>
      )}

      {/* MATERIAL FORM CARD */}
      {isMatFormOpen && (
        <div className="admin-card">
          <div className="admin-card-title">
            <h3>{editingMatId ? 'Edit Materi' : 'Tambah Materi Baru'}</h3>
            <button className="btn-icon" onClick={() => setIsMatFormOpen(false)}>✕</button>
          </div>
          <form className="admin-form" onSubmit={handleMatSubmit}>
            <div className="form-row">
              <div className="form-group-admin">
                <label htmlFor="matTitle">Judul Materi</label>
                <input
                  type="text"
                  id="matTitle"
                  name="title"
                  className="admin-input"
                  placeholder="Contoh: Operasi Penjumlahan Aljabar"
                  value={matFormData.title}
                  onChange={handleMatInputChange}
                  required
                />
              </div>
              <div className="form-group-admin">
                <label htmlFor="matSlug">Slug URL (Unik)</label>
                <input
                  type="text"
                  id="matSlug"
                  name="slug"
                  className="admin-input"
                  placeholder="Contoh: penjumlahan-aljabar"
                  value={matFormData.slug}
                  onChange={handleMatInputChange}
                  required
                  disabled={!!editingMatId}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group-admin">
                <label htmlFor="matType">Tipe Konten</label>
                <select
                  id="matType"
                  name="type"
                  className="admin-select"
                  value={matFormData.type}
                  onChange={handleMatInputChange}
                >
                  <option value="theory">Teori (Visual Steps)</option>
                  <option value="practice">Latihan (Interactive)</option>
                </select>
              </div>
              <div className="form-group-admin">
                <label htmlFor="matOrder">Urutan Tampil (Urutan Seq)</label>
                <input
                  type="number"
                  id="matOrder"
                  name="order_seq"
                  className="admin-input"
                  min="1"
                  value={matFormData.order_seq}
                  onChange={handleMatInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-actions-admin">
              <button type="button" className="btn btn-outline" onClick={() => setIsMatFormOpen(false)}>
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                {editingMatId ? 'Simpan Materi' : 'Tambah Materi'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MATERIALS TABLE */}
      {loadingMaterials ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Memuat daftar materi...</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '10%' }}>Urutan</th>
                <th style={{ width: '35%' }}>Judul Materi</th>
                <th style={{ width: '15%' }}>Tipe</th>
                <th style={{ width: '20%' }}>Langkah Belajar</th>
                <th style={{ width: '20%' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((mat) => (
                <tr key={mat.id} style={{ background: selectedMatForSteps?.id === mat.id ? 'var(--blue-light)' : 'transparent' }}>
                  <td style={{ fontWeight: 700, textAlign: 'center' }}>{mat.order_seq}</td>
                  <td style={{ fontWeight: 600 }}>{mat.title}</td>
                  <td>
                    <span className={`badge ${mat.type === 'theory' ? 'badge-blue' : 'badge-orange'}`}>
                      {mat.type === 'theory' ? 'Teori' : 'Latihan'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', borderRadius: 'var(--radius-xs)' }}
                      onClick={() => loadSteps(mat)}
                    >
                      📖 Kelola ({mat.step_count || 0} Steps)
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon edit"
                        title="Edit Materi"
                        onClick={() => handleEditMatClick(mat)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon delete"
                        title="Hapus Materi"
                        onClick={() => handleDeleteMatClick(mat.id, mat.title)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {materials.length === 0 && (
                <tr>
                  <td colSpan="5" className="admin-empty-state">
                    <div className="admin-empty-icon">📘</div>
                    <h3>Belum Ada Materi</h3>
                    <p>Silakan klik "Tambah Materi Baru" untuk membuat materi belajar pertama pada topik ini.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* --- SECTION NESTED: MANAGE STEPS --- */}
      {selectedMatForSteps && (
        <div className="admin-card" style={{ border: '2px solid var(--blue)', boxShadow: 'var(--shadow)' }}>
          <div className="admin-card-title" style={{ borderColor: 'var(--blue)' }}>
            <div>
              <span className="badge badge-blue" style={{ marginRight: '0.5rem' }}>Materi: {selectedMatForSteps.title}</span>
              <h3>Langkah Pembelajaran Visual</h3>
            </div>
            {!isStepFormOpen && (
              <button className="btn btn-primary" onClick={handleAddStepClick} style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                ➕ Tambah Langkah (Step)
              </button>
            )}
          </div>

          {/* STEP FORM */}
          {isStepFormOpen && (
            <form className="admin-form" onSubmit={handleStepSubmit} style={{ background: 'var(--bg-soft)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
                {editingStepId ? 'Edit Langkah' : 'Tambah Langkah Baru'}
              </h4>
              <div className="form-row">
                <div className="form-group-admin" style={{ flex: 3 }}>
                  <label htmlFor="stepTitle">Judul Langkah (Visual Header)</label>
                  <input
                    type="text"
                    id="stepTitle"
                    name="title"
                    className="admin-input"
                    placeholder="Contoh: Memisahkan Konstanta"
                    value={stepFormData.title}
                    onChange={handleStepInputChange}
                    required
                  />
                </div>
                <div className="form-group-admin" style={{ flex: 1 }}>
                  <label htmlFor="stepOrder">Urutan Langkah</label>
                  <input
                    type="number"
                    id="stepOrder"
                    name="order_seq"
                    className="admin-input"
                    min="1"
                    value={stepFormData.order_seq}
                    onChange={handleStepInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group-admin">
                <label htmlFor="stepContent">Konten Pembelajaran (Mendukung Teks / Rumus)</label>
                <textarea
                  id="stepContent"
                  name="content"
                  rows="4"
                  className="admin-textarea"
                  placeholder="Penjelasan detail dari langkah pembelajaran ini. Tulis rumus atau penjelasan interaktif..."
                  value={stepFormData.content}
                  onChange={handleStepInputChange}
                  required
                />
              </div>
              <div className="form-actions-admin">
                <button type="button" className="btn btn-outline" onClick={() => setIsStepFormOpen(false)} style={{ padding: '0.4rem 1rem' }}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>
                  Simpan Langkah
                </button>
              </div>
            </form>
          )}

          {/* LIST STEPS */}
          {loadingSteps ? (
            <div style={{ textAlign: 'center', padding: '1rem' }}>Memuat detail langkah...</div>
          ) : (
            <div className="admin-nested-list">
              {steps.sort((a, b) => a.order_seq - b.order_seq).map((step, idx) => (
                <div className="admin-nested-item" key={step.id}>
                  <div className="admin-nested-info">
                    <span className="admin-nested-subtitle" style={{ color: 'var(--blue)', fontWeight: 800 }}>
                      Langkah #{step.order_seq || idx + 1}
                    </span>
                    <span className="admin-nested-title">{step.title}</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem', whiteSpace: 'pre-line' }}>
                      {step.content}
                    </p>
                  </div>
                  <div className="action-buttons">
                    <button
                      className="btn-icon edit"
                      title="Edit Langkah"
                      onClick={() => handleEditStepClick(step)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-icon delete"
                      title="Hapus Langkah"
                      onClick={() => handleDeleteStepClick(step.id, step.order_seq || idx + 1)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
              {steps.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  📖 Belum ada langkah pembelajaran visual. Silakan klik tombol "Tambah Langkah" di atas.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminMaterialsPage;
