import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { topicsAPI, materialsAPI, videosAPI, quizzesAPI } from '../../services/api';
import '../../styles/admin.css';

const AdminMaterialsPage = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [materials, setMaterials] = useState([]);
  
  // Active Management State
  const [selectedMatForSteps, setSelectedMatForSteps] = useState(null);
  const [activeStepTab, setActiveStepTab] = useState('theory'); // 'theory' | 'video' | 'practice' | 'quiz'

  // Step 1: Theory State
  const [steps, setSteps] = useState([]);
  const [isStepFormOpen, setIsStepFormOpen] = useState(false);
  const [editingStepId, setEditingStepId] = useState(null);
  const [stepFormData, setStepFormData] = useState({
    title: '',
    content: '',
    order_seq: 1
  });

  // Step 2: Video State
  const [materialVideos, setMaterialVideos] = useState([]);
  const [videoFormData, setVideoFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    duration: 300,
    sort_order: 1
  });

  // Step 3: Practice State
  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [isPracticeFormOpen, setIsPracticeFormOpen] = useState(false);
  const [editingPracticeId, setEditingPracticeId] = useState(null);
  const [practiceFormData, setPracticeFormData] = useState({
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: 0,
    explanation: '',
    sort_order: 1
  });

  // Step 4: Quiz State
  const [materialQuiz, setMaterialQuiz] = useState(null);
  const [quizFormData, setQuizFormData] = useState({
    title: '',
    description: '',
    time_limit: 15,
    passing_score: 70
  });

  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [loadingFlow, setLoadingFlow] = useState(false);
  
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

  // Load complete Flow of a Material (Theory, Video, Practice, Quiz)
  const loadMaterialFlow = async (material) => {
    setLoadingFlow(true);
    setError('');
    try {
      // 1. Fetch theory steps
      const stepsRes = await materialsAPI.getSteps(selectedTopicId, material.id);
      setSteps(stepsRes.data?.data?.steps || []);

      // 2. Fetch videos
      const vidRes = await videosAPI.getByMaterial(selectedTopicId, material.id);
      const loadedVids = vidRes.data?.data?.videos || [];
      setMaterialVideos(loadedVids);
      if (loadedVids.length > 0) {
        setVideoFormData({
          title: loadedVids[0].title || '',
          description: loadedVids[0].description || '',
          video_url: loadedVids[0].video_url || '',
          duration: loadedVids[0].duration || 300,
          sort_order: loadedVids[0].sort_order || 1
        });
      } else {
        setVideoFormData({
          title: '',
          description: '',
          video_url: '',
          duration: 300,
          sort_order: 1
        });
      }

      // 3. Fetch practice questions
      const practiceRes = await materialsAPI.getPractice(selectedTopicId, material.id);
      setPracticeQuestions(practiceRes.data?.data?.practiceQuestions || []);

      // 4. Fetch quiz
      const quizRes = await quizzesAPI.getByMaterial(selectedTopicId, material.id);
      const loadedQuizzes = quizRes.data?.data?.quizzes || [];
      const quiz = loadedQuizzes[0] || null;
      setMaterialQuiz(quiz);
      if (quiz) {
        setQuizFormData({
          title: quiz.title || '',
          description: quiz.description || '',
          time_limit: quiz.time_limit || 15,
          passing_score: quiz.passing_score || 70
        });
      } else {
        setQuizFormData({
          title: `Kuis Akhir: ${material.title}`,
          description: `Kuis evaluasi akhir pemahaman materi ${material.title}`,
          time_limit: 15,
          passing_score: 70
        });
      }

      setSelectedMatForSteps(material);
    } catch (err) {
      console.error('Error loading material flow details:', err);
      setError('Gagal memuat detail alur belajar untuk materi ini.');
    } finally {
      setLoadingFlow(false);
    }
  };

  const handleSelectMaterialToManage = (mat) => {
    setActiveStepTab('theory'); // Default to Tab 1
    setIsStepFormOpen(false);
    setIsPracticeFormOpen(false);
    loadMaterialFlow(mat);
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
        const response = await materialsAPI.create(selectedTopicId, matFormData);
        setSuccess(`Materi "${matFormData.title}" berhasil ditambahkan.`);
        setIsMatFormOpen(false);
        
        // Refresh materials list, then auto-open the newly created material
        const loadedMatsResponse = await materialsAPI.getByTopic(selectedTopicId);
        const freshMats = loadedMatsResponse.data?.data?.materials || [];
        setMaterials(freshMats);
        
        const newMat = response.data?.data?.material;
        const matchingMat = freshMats.find(m => m.slug === matFormData.slug) || newMat;
        if (matchingMat) {
          handleSelectMaterialToManage(matchingMat);
        }
      }
    } catch (err) {
      console.error('Error saving material:', err);
      setError(err.response?.data?.message || 'Gagal menyimpan materi.');
    }
  };

  // --- STEPS (THEORY) CRUD HANDLERS ---
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
      order_seq: step.step_number || step.order_seq || 1
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
      loadMaterialFlow(selectedMatForSteps);
    } catch (err) {
      console.error('Error deleting step:', err);
      setError(err.response?.data?.message || 'Gagal menghapus langkah belajar.');
    }
  };

  const handleStepSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      title: stepFormData.title,
      content: stepFormData.content,
      step_number: stepFormData.order_seq,
      sort_order: stepFormData.order_seq
    };

    try {
      if (editingStepId) {
        await materialsAPI.updateStep(selectedTopicId, editingStepId, payload);
        setSuccess(`Langkah belajar berhasil diperbarui.`);
        setIsStepFormOpen(false);
        setEditingStepId(null);
        loadMaterialFlow(selectedMatForSteps);
      } else {
        await materialsAPI.createStep(selectedTopicId, selectedMatForSteps.id, payload);
        setSuccess(`Langkah belajar baru berhasil ditambahkan.`);
        setIsStepFormOpen(false);
        loadMaterialFlow(selectedMatForSteps);
      }
    } catch (err) {
      console.error('Error saving step:', err);
      setError(err.response?.data?.message || 'Gagal menyimpan langkah belajar.');
    }
  };

  // --- VIDEO CRUD HANDLERS ---
  const handleVideoInputChange = (e) => {
    const { name, value } = e.target;
    setVideoFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'sort_order' ? parseInt(value) || 0 : value
    }));
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (materialVideos.length > 0) {
        const existingVideo = materialVideos[0];
        await videosAPI.update(selectedTopicId, selectedMatForSteps.id, existingVideo.id, videoFormData);
        setSuccess('Video pembelajaran berhasil diperbarui.');
      } else {
        await videosAPI.create(selectedTopicId, selectedMatForSteps.id, videoFormData);
        setSuccess('Video pembelajaran berhasil ditambahkan.');
      }
      loadMaterialFlow(selectedMatForSteps);
    } catch (err) {
      console.error('Error saving video:', err);
      setError(err.response?.data?.message || 'Gagal menyimpan video.');
    }
  };

  const handleVideoDelete = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus video pembelajaran ini?')) return;
    setError('');
    setSuccess('');
    try {
      const existingVideo = materialVideos[0];
      if (existingVideo) {
        await videosAPI.delete(selectedTopicId, selectedMatForSteps.id, existingVideo.id);
        setSuccess('Video pembelajaran berhasil dihapus.');
        loadMaterialFlow(selectedMatForSteps);
      }
    } catch (err) {
      console.error('Error deleting video:', err);
      setError('Gagal menghapus video.');
    }
  };

  // --- PRACTICE QUESTIONS CRUD HANDLERS ---
  const handlePracticeInputChange = (e) => {
    const { name, value } = e.target;
    setPracticeFormData(prev => ({
      ...prev,
      [name]: name === 'correct_answer' || name === 'sort_order' ? parseInt(value) : value
    }));
  };

  const handleAddPracticeClick = () => {
    setError('');
    setSuccess('');
    setEditingPracticeId(null);
    setPracticeFormData({
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: 0,
      explanation: '',
      sort_order: practiceQuestions.length + 1
    });
    setIsPracticeFormOpen(true);
  };

  const handleEditPracticeClick = (pq) => {
    setError('');
    setSuccess('');
    setEditingPracticeId(pq.id);
    setPracticeFormData({
      question_text: pq.question_text || '',
      option_a: pq.option_a || '',
      option_b: pq.option_b || '',
      option_c: pq.option_c || '',
      option_d: pq.option_d || '',
      correct_answer: pq.correct_answer !== undefined ? parseInt(pq.correct_answer) : 0,
      explanation: pq.explanation || '',
      sort_order: pq.sort_order || 1
    });
    setIsPracticeFormOpen(true);
  };

  const handleDeletePracticeClick = async (practiceId, num) => {
    if (!window.confirm(`Hapus latihan soal nomor ${num}?`)) return;
    setError('');
    setSuccess('');
    try {
      await materialsAPI.deletePractice(selectedTopicId, practiceId);
      setSuccess(`Latihan soal nomor ${num} berhasil dihapus.`);
      loadMaterialFlow(selectedMatForSteps);
    } catch (err) {
      console.error('Error deleting practice question:', err);
      setError('Gagal menghapus latihan soal.');
    }
  };

  const handlePracticeSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editingPracticeId) {
        await materialsAPI.updatePractice(selectedTopicId, editingPracticeId, practiceFormData);
        setSuccess('Latihan soal berhasil diperbarui.');
      } else {
        await materialsAPI.createPractice(selectedTopicId, selectedMatForSteps.id, practiceFormData);
        setSuccess('Latihan soal baru berhasil ditambahkan.');
      }
      setIsPracticeFormOpen(false);
      setEditingPracticeId(null);
      loadMaterialFlow(selectedMatForSteps);
    } catch (err) {
      console.error('Error saving practice question:', err);
      setError(err.response?.data?.message || 'Gagal menyimpan latihan soal.');
    }
  };

  // --- QUIZ CRUD HANDLERS ---
  const handleQuizInputChange = (e) => {
    const { name, value } = e.target;
    setQuizFormData(prev => ({
      ...prev,
      [name]: name === 'time_limit' || name === 'passing_score' ? parseInt(value) || 0 : value
    }));
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (materialQuiz) {
        await quizzesAPI.update(selectedTopicId, selectedMatForSteps.id, materialQuiz.id, quizFormData);
        setSuccess('Detail kuis berhasil diperbarui.');
      } else {
        await quizzesAPI.create(selectedTopicId, selectedMatForSteps.id, quizFormData);
        setSuccess('Kuis akhir modul berhasil dibuat.');
      }
      loadMaterialFlow(selectedMatForSteps);
    } catch (err) {
      console.error('Error saving quiz:', err);
      setError(err.response?.data?.message || 'Gagal menyimpan kuis.');
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
                <th style={{ width: '20%' }}>Alur Pembelajaran</th>
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
                      onClick={() => handleSelectMaterialToManage(mat)}
                    >
                      ⚙️ Kelola Alur Belajar
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

      {/* --- UNIFIED SECTION: LOCKED 4-STEPS FLOW MANAGEMENT --- */}
      {selectedMatForSteps && (
        <div className="admin-card" style={{ border: '2px solid var(--blue)', boxShadow: 'var(--shadow)', marginTop: '2rem' }}>
          <div className="admin-card-title" style={{ borderColor: 'var(--blue)', marginBottom: '1rem' }}>
            <div>
              <span className="badge badge-blue" style={{ marginRight: '0.5rem' }}>Materi: {selectedMatForSteps.title}</span>
              <h3>Kelola Alur Pembelajaran (Locked 4 Steps)</h3>
            </div>
            <button className="btn-icon" onClick={() => setSelectedMatForSteps(null)}>✕ Tutup</button>
          </div>

          {/* TAB HEADERS FOR 4 STEPS */}
          <div className="admin-tabs" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeStepTab === 'theory' ? 'var(--blue)' : 'var(--bg-soft)',
                color: activeStepTab === 'theory' ? 'white' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: '1px solid var(--border)'
              }}
              onClick={() => { setActiveStepTab('theory'); setIsStepFormOpen(false); }}
            >
              📖 Langkah 1: Teori ({steps.length} Bab)
            </button>
            <button
              type="button"
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeStepTab === 'video' ? 'var(--blue)' : 'var(--bg-soft)',
                color: activeStepTab === 'video' ? 'white' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: '1px solid var(--border)'
              }}
              onClick={() => setActiveStepTab('video')}
            >
              📺 Langkah 2: Video ({materialVideos.length > 0 ? 'Ada' : 'Belum Ada'})
            </button>
            <button
              type="button"
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeStepTab === 'practice' ? 'var(--blue)' : 'var(--bg-soft)',
                color: activeStepTab === 'practice' ? 'white' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: '1px solid var(--border)'
              }}
              onClick={() => { setActiveStepTab('practice'); setIsPracticeFormOpen(false); }}
            >
              ✍️ Langkah 3: Latihan Soal ({practiceQuestions.length} Soal)
            </button>
            <button
              type="button"
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeStepTab === 'quiz' ? 'var(--blue)' : 'var(--bg-soft)',
                color: activeStepTab === 'quiz' ? 'white' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: '1px solid var(--border)'
              }}
              onClick={() => setActiveStepTab('quiz')}
            >
              🏆 Langkah 4: Kuis Akhir ({materialQuiz ? 'Tersedia' : 'Belum Tersedia'})
            </button>
          </div>

          {loadingFlow ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Memuat konfigurasi alur pembelajaran...</div>
          ) : (
            <div className="tab-content-area" style={{ minHeight: '200px' }}>
              
              {/* === TAB 1: THEORY STEPS === */}
              {activeStepTab === 'theory' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                    <h4 style={{ fontWeight: 700 }}>Kelola Konten Pembelajaran Teori</h4>
                    {!isStepFormOpen && (
                      <button className="btn btn-primary" onClick={handleAddStepClick} style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
                        ➕ Tambah Bab Teori
                      </button>
                    )}
                  </div>

                  {isStepFormOpen && (
                    <form className="admin-form" onSubmit={handleStepSubmit} style={{ background: 'var(--bg-soft)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                      <h5 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
                        {editingStepId ? 'Edit Bab Teori' : 'Tambah Bab Teori Baru'}
                      </h5>
                      <div className="form-row">
                        <div className="form-group-admin" style={{ flex: 3 }}>
                          <label>Judul Bab (Visual Header)</label>
                          <input
                            type="text"
                            name="title"
                            className="admin-input"
                            placeholder="Contoh: Definisikan Bentuk Aljabar"
                            value={stepFormData.title}
                            onChange={handleStepInputChange}
                            required
                          />
                        </div>
                        <div className="form-group-admin" style={{ flex: 1 }}>
                          <label>Urutan Bab</label>
                          <input
                            type="number"
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
                        <label>Konten Penjelasan (Mendukung HTML & Teks)</label>
                        <textarea
                          name="content"
                          rows="5"
                          className="admin-textarea"
                          placeholder="Tulis materi penjelasan teori lengkap di sini..."
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
                          Simpan Bab Teori
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="admin-nested-list">
                    {steps.sort((a, b) => (a.step_number || a.order_seq || 0) - (b.step_number || b.order_seq || 0)).map((step, idx) => (
                      <div className="admin-nested-item" key={step.id}>
                        <div className="admin-nested-info">
                          <span className="admin-nested-subtitle" style={{ color: 'var(--blue)', fontWeight: 800 }}>
                            Bab #{step.step_number || step.order_seq || idx + 1}
                          </span>
                          <span className="admin-nested-title">{step.title}</span>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem', whiteSpace: 'pre-line' }}>
                            {step.content?.substring(0, 150)}...
                          </p>
                        </div>
                        <div className="action-buttons">
                          <button className="btn-icon edit" onClick={() => handleEditStepClick(step)}>✏️</button>
                          <button className="btn-icon delete" onClick={() => handleDeleteStepClick(step.id, step.step_number || step.order_seq || idx + 1)}>🗑️</button>
                        </div>
                      </div>
                    ))}
                    {steps.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        📖 Belum ada konten pembelajaran teori. Silakan tambah bab teori pertama di atas.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* === TAB 2: VIDEO PEMBELAJARAN === */}
              {activeStepTab === 'video' && (
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Kelola Video YouTube Pembelajaran</h4>
                  
                  <form className="admin-form" onSubmit={handleVideoSubmit} style={{ background: 'var(--bg-soft)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    <div className="form-group-admin">
                      <label>Judul Video</label>
                      <input
                        type="text"
                        name="title"
                        className="admin-input"
                        placeholder="Contoh: Video Penjelasan Limit Fungsi Aljabar"
                        value={videoFormData.title}
                        onChange={handleVideoInputChange}
                        required
                      />
                    </div>
                    <div className="form-group-admin">
                      <label>Deskripsi Video</label>
                      <textarea
                        name="description"
                        rows="2"
                        className="admin-textarea"
                        placeholder="Tulis deskripsi singkat mengenai video ini..."
                        value={videoFormData.description}
                        onChange={handleVideoInputChange}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group-admin" style={{ flex: 3 }}>
                        <label>Tautan URL YouTube</label>
                        <input
                          type="url"
                          name="video_url"
                          className="admin-input"
                          placeholder="Contoh: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                          value={videoFormData.video_url}
                          onChange={handleVideoInputChange}
                          required
                        />
                      </div>
                      <div className="form-group-admin" style={{ flex: 1 }}>
                        <label>Durasi (Detik)</label>
                        <input
                          type="number"
                          name="duration"
                          className="admin-input"
                          min="1"
                          value={videoFormData.duration}
                          onChange={handleVideoInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-actions-admin" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                      <div>
                        {materialVideos.length > 0 && (
                          <button type="button" className="btn btn-outline" style={{ borderColor: 'var(--red)', color: 'var(--red)' }} onClick={handleVideoDelete}>
                            🗑️ Hapus Video
                          </button>
                        )}
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
                        {materialVideos.length > 0 ? 'Perbarui Video' : 'Simpan Video Baru'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* === TAB 3: PRACTICE QUESTIONS === */}
              {activeStepTab === 'practice' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                    <h4 style={{ fontWeight: 700 }}>Daftar Latihan Soal Interaktif (Practice)</h4>
                    {!isPracticeFormOpen && (
                      <button className="btn btn-primary" onClick={handleAddPracticeClick} style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
                        ➕ Tambah Latihan Soal
                      </button>
                    )}
                  </div>

                  {isPracticeFormOpen && (
                    <form className="admin-form" onSubmit={handlePracticeSubmit} style={{ background: 'var(--bg-soft)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                      <h5 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
                        {editingPracticeId ? 'Edit Latihan Soal' : 'Tambah Latihan Soal Baru'}
                      </h5>
                      <div className="form-row">
                        <div className="form-group-admin" style={{ flex: 3 }}>
                          <label>Teks Pertanyaan / Soal</label>
                          <input
                            type="text"
                            name="question_text"
                            className="admin-input"
                            placeholder="Contoh: Berapakah hasil dari 2x + 5 = 15?"
                            value={practiceFormData.question_text}
                            onChange={handlePracticeInputChange}
                            required
                          />
                        </div>
                        <div className="form-group-admin" style={{ flex: 1 }}>
                          <label>Urutan Tampil</label>
                          <input
                            type="number"
                            name="sort_order"
                            className="admin-input"
                            min="1"
                            value={practiceFormData.sort_order}
                            onChange={handlePracticeInputChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Options and radio select correct answer */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                        {['a', 'b', 'c', 'd'].map((letter, optIdx) => {
                          const optionField = `option_${letter}`;
                          return (
                            <div className="form-group-admin" key={letter} style={{ border: '1px solid var(--border)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', background: 'white' }}>
                              <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                                <span>Opsi {letter.toUpperCase()}</span>
                                <label style={{ fontWeight: 400, fontSize: '0.8rem', cursor: 'pointer' }}>
                                  <input
                                    type="radio"
                                    name="correct_answer"
                                    value={optIdx}
                                    checked={practiceFormData.correct_answer === optIdx}
                                    onChange={handlePracticeInputChange}
                                    style={{ marginRight: '0.25rem' }}
                                  />
                                  Jawaban Benar
                                </label>
                              </label>
                              <input
                                type="text"
                                name={optionField}
                                className="admin-input"
                                placeholder={`Isi pilihan jawaban ${letter.toUpperCase()}`}
                                value={practiceFormData[optionField] || ''}
                                onChange={handlePracticeInputChange}
                                required
                              />
                            </div>
                          );
                        })}
                      </div>

                      <div className="form-group-admin" style={{ marginTop: '1rem' }}>
                        <label>Penjelasan Pembahasan Soal</label>
                        <textarea
                          name="explanation"
                          rows="3"
                          className="admin-textarea"
                          placeholder="Tuliskan bagaimana cara menyelesaikan latihan soal ini..."
                          value={practiceFormData.explanation}
                          onChange={handlePracticeInputChange}
                          required
                        />
                      </div>

                      <div className="form-actions-admin">
                        <button type="button" className="btn btn-outline" onClick={() => setIsPracticeFormOpen(false)} style={{ padding: '0.4rem 1rem' }}>
                          Batal
                        </button>
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>
                          Simpan Latihan Soal
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="admin-nested-list">
                    {practiceQuestions.map((pq, idx) => (
                      <div className="admin-nested-item" key={pq.id} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <span className="admin-nested-subtitle" style={{ color: 'var(--blue)', fontWeight: 800 }}>
                            Soal Latihan #{pq.sort_order || idx + 1}
                          </span>
                          <div className="action-buttons">
                            <button className="btn-icon edit" onClick={() => handleEditPracticeClick(pq)}>✏️</button>
                            <button className="btn-icon delete" onClick={() => handleDeletePracticeClick(pq.id, pq.sort_order || idx + 1)}>🗑️</button>
                          </div>
                        </div>
                        <div style={{ marginTop: '0.5rem', width: '100%' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                            {pq.question_text}
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                            {['a', 'b', 'c', 'd'].map((letter, optIdx) => {
                              const isCorrect = pq.correct_answer === optIdx;
                              return (
                                <div
                                  key={letter}
                                  style={{
                                    padding: '0.5rem',
                                    borderRadius: 'var(--radius-xs)',
                                    border: `1.5px solid ${isCorrect ? 'var(--green)' : 'var(--border)'}`,
                                    background: isCorrect ? '#D1FAE5' : 'var(--bg)',
                                    fontSize: '0.82rem',
                                    color: isCorrect ? '#065F46' : 'var(--text-muted)'
                                  }}
                                >
                                  <strong>{letter.toUpperCase()}.</strong> {pq[`option_${letter}`]}
                                </div>
                              );
                            })}
                          </div>
                          {pq.explanation && (
                            <div style={{ background: 'var(--bg-soft)', borderLeft: '3px solid var(--blue)', padding: '0.5rem 1rem', marginTop: '0.5rem', borderRadius: 'var(--radius-xs)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              <strong>Pembahasan:</strong> {pq.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {practiceQuestions.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        ✍️ Belum ada latihan soal interaktif. Silakan tambah latihan soal pertama di atas.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* === TAB 4: KUIS AKHIR MODUL === */}
              {activeStepTab === 'quiz' && (
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Konfigurasi Kuis Akhir Modul</h4>

                  <form className="admin-form" onSubmit={handleQuizSubmit} style={{ background: 'var(--bg-soft)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    <div className="form-group-admin">
                      <label>Judul Kuis</label>
                      <input
                        type="text"
                        name="title"
                        className="admin-input"
                        placeholder="Contoh: Kuis Akhir Modul Aljabar"
                        value={quizFormData.title}
                        onChange={handleQuizInputChange}
                        required
                      />
                    </div>
                    <div className="form-group-admin">
                      <label>Deskripsi Kuis</label>
                      <textarea
                        name="description"
                        rows="2"
                        className="admin-textarea"
                        placeholder="Tulis petunjuk kuis untuk siswa..."
                        value={quizFormData.description}
                        onChange={handleQuizInputChange}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group-admin">
                        <label>Batas Waktu (Menit)</label>
                        <input
                          type="number"
                          name="time_limit"
                          className="admin-input"
                          min="1"
                          value={quizFormData.time_limit}
                          onChange={handleQuizInputChange}
                          required
                        />
                      </div>
                      <div className="form-group-admin">
                        <label>Passing Score (%)</label>
                        <input
                          type="number"
                          name="passing_score"
                          className="admin-input"
                          min="0"
                          max="100"
                          value={quizFormData.passing_score}
                          onChange={handleQuizInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-actions-admin" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                      <div>
                        {materialQuiz && (
                          <Link to="/admin/quizzes" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <span>❓</span> Kelola Soal Kuis ({materialQuiz.question_count || 0} Soal)
                          </Link>
                        )}
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
                        {materialQuiz ? 'Perbarui Kuis' : 'Buat Kuis Akhir Baru'}
                      </button>
                    </div>
                  </form>
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
