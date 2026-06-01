import React, { useState, useEffect } from 'react';
import { topicsAPI, materialsAPI, quizzesAPI } from '../../services/api';
import '../../styles/admin.css';

const AdminQuizzesPage = () => {
  const [topics, setTopics] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [discussions, setDiscussions] = useState([]);

  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [selectedMaterialId, setSelectedMaterialId] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Quiz Form State
  const [isQuizFormOpen, setIsQuizFormOpen] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [quizFormData, setQuizFormData] = useState({
    title: '',
    description: '',
    time_limit: 15,
    passing_score: 70
  });

  // Question Form State
  const [isQFormOpen, setIsQFormOpen] = useState(false);
  const [editingQId, setEditingQId] = useState(null);
  const [qFormData, setQFormData] = useState({
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: 'A',
    sort_order: 1,
    explanation: '' // For QuizDiscussion
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
  useEffect(() => {
    const loadMaterials = async () => {
      if (!selectedTopicId) return;
      setLoadingMaterials(true);
      setSelectedMaterialId('');
      setQuizzes([]);
      setSelectedQuiz(null);
      try {
        const response = await materialsAPI.getByTopic(selectedTopicId);
        const loadedMaterials = response.data?.data?.materials || [];
        setMaterials(loadedMaterials);
        if (loadedMaterials.length > 0) {
          setSelectedMaterialId(loadedMaterials[0].id);
        }
      } catch (err) {
        console.error('Error loading materials:', err);
        setError('Gagal memuat daftar materi.');
      } finally {
        setLoadingMaterials(false);
      }
    };
    loadMaterials();
  }, [selectedTopicId]);

  // Load quizzes when selectedMaterialId changes
  const loadQuizzes = async () => {
    if (!selectedTopicId || !selectedMaterialId) return;
    setLoadingQuizzes(true);
    setSelectedQuiz(null);
    try {
      const response = await quizzesAPI.getByMaterial(selectedTopicId, selectedMaterialId);
      setQuizzes(response.data?.data?.quizzes || []);
    } catch (err) {
      console.error('Error loading quizzes:', err);
      setError('Gagal memuat daftar kuis.');
    } finally {
      setLoadingQuizzes(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, [selectedMaterialId]);

  // Load questions and discussions for selected quiz
  const loadQuizDetails = async (quiz) => {
    setLoadingQuestions(true);
    setError('');
    try {
      // 1. Fetch Quiz details (returns questions list with correct_answer for admin)
      const quizRes = await quizzesAPI.getById(selectedTopicId, selectedMaterialId, quiz.id);
      setQuestions(quizRes.data?.data?.questions || []);
      
      // 2. Fetch Discussions explanations
      const discRes = await quizzesAPI.getDiscussions(selectedTopicId, selectedMaterialId, quiz.id);
      setDiscussions(discRes.data?.data?.discussions || []);
      
      setSelectedQuiz(quiz);
    } catch (err) {
      console.error('Error loading quiz details:', err);
      setError('Gagal memuat detail pertanyaan kuis.');
    } finally {
      setLoadingQuestions(false);
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

  const handleAddQuizClick = () => {
    setError('');
    setSuccess('');
    setEditingQuizId(null);
    setQuizFormData({ title: '', description: '', time_limit: 15, passing_score: 70 });
    setIsQuizFormOpen(true);
  };

  const handleEditQuizClick = (quiz) => {
    setError('');
    setSuccess('');
    setEditingQuizId(quiz.id);
    setQuizFormData({
      title: quiz.title,
      description: quiz.description || '',
      time_limit: quiz.time_limit || 15,
      passing_score: quiz.passing_score || 70
    });
    setIsQuizFormOpen(true);
  };

  const handleDeleteQuizClick = async (id, title) => {
    if (!window.confirm(`Hapus kuis "${title}" beserta semua soalnya?`)) {
      return;
    }
    setError('');
    setSuccess('');
    try {
      await quizzesAPI.delete(selectedTopicId, selectedMaterialId, id);
      setSuccess(`Kuis "${title}" berhasil dihapus.`);
      loadQuizzes();
    } catch (err) {
      console.error('Error deleting quiz:', err);
      setError(err.response?.data?.message || 'Gagal menghapus kuis.');
    }
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingQuizId) {
        await quizzesAPI.update(selectedTopicId, selectedMaterialId, editingQuizId, quizFormData);
        setSuccess(`Kuis "${quizFormData.title}" berhasil diperbarui.`);
        setIsQuizFormOpen(false);
        setEditingQuizId(null);
        loadQuizzes();
      } else {
        await quizzesAPI.create(selectedTopicId, selectedMaterialId, quizFormData);
        setSuccess(`Kuis "${quizFormData.title}" berhasil ditambahkan.`);
        setIsQuizFormOpen(false);
        loadQuizzes();
      }
    } catch (err) {
      console.error('Error saving quiz:', err);
      setError(err.response?.data?.message || 'Gagal menyimpan kuis.');
    }
  };

  // --- QUESTION CRUD HANDLERS ---
  const handleQInputChange = (e) => {
    const { name, value } = e.target;
    setQFormData(prev => ({
      ...prev,
      [name]: name === 'sort_order' ? parseInt(value) || 1 : value
    }));
  };

  const handleAddQClick = () => {
    setError('');
    setSuccess('');
    setEditingQId(null);
    setQFormData({
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: 'A',
      sort_order: questions.length + 1,
      explanation: ''
    });
    setIsQFormOpen(true);
  };

  const handleEditQClick = (q) => {
    setError('');
    setSuccess('');
    setEditingQId(q.id);
    
    // Find matching discussion if exists
    const matchingDisc = discussions.find(d => d.question_id === q.id);
    
    setQFormData({
      question_text: q.question_text || '',
      option_a: q.option_a || '',
      option_b: q.option_b || '',
      option_c: q.option_c || '',
      option_d: q.option_d || '',
      correct_answer: q.correct_answer || 'A',
      sort_order: q.sort_order || 1,
      explanation: matchingDisc ? matchingDisc.explanation : ''
    });
    setIsQFormOpen(true);
  };

  const handleDeleteQClick = async (qId, idx) => {
    if (!window.confirm(`Hapus pertanyaan nomor ${idx}?`)) {
      return;
    }
    setError('');
    setSuccess('');
    try {
      await quizzesAPI.deleteQuestion(selectedTopicId, selectedMaterialId, qId);
      setSuccess(`Pertanyaan nomor ${idx} berhasil dihapus.`);
      loadQuizDetails(selectedQuiz);
    } catch (err) {
      console.error('Error deleting question:', err);
      setError(err.response?.data?.message || 'Gagal menghapus pertanyaan.');
    }
  };

  const handleQSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const questionPayload = {
      question_text: qFormData.question_text,
      option_a: qFormData.option_a,
      option_b: qFormData.option_b,
      option_c: qFormData.option_c,
      option_d: qFormData.option_d,
      correct_answer: qFormData.correct_answer,
      sort_order: qFormData.sort_order
    };

    try {
      let savedQuestionId;
      if (editingQId) {
        // Update Question
        await quizzesAPI.updateQuestion(selectedTopicId, selectedMaterialId, editingQId, questionPayload);
        savedQuestionId = editingQId;
      } else {
        // Create Question
        const response = await quizzesAPI.createQuestion(selectedTopicId, selectedMaterialId, selectedQuiz.id, questionPayload);
        savedQuestionId = response.data?.data?.question?.id;
      }

      // Handle Discussion explanation if provided
      if (savedQuestionId && qFormData.explanation.trim()) {
        const matchingDisc = discussions.find(d => d.question_id === savedQuestionId);
        
        if (matchingDisc) {
          // Update existing discussion explanation
          await quizzesAPI.updateDiscussion(selectedTopicId, selectedMaterialId, selectedQuiz.id, matchingDisc.id, {
            explanation: qFormData.explanation
          });
        } else {
          // Create new discussion explanation
          await quizzesAPI.createDiscussion(selectedTopicId, selectedMaterialId, selectedQuiz.id, savedQuestionId, {
            explanation: qFormData.explanation
          });
        }
      }

      setSuccess(editingQId ? 'Pertanyaan berhasil diperbarui.' : 'Pertanyaan baru berhasil ditambahkan.');
      setIsQFormOpen(false);
      setEditingQId(null);
      loadQuizDetails(selectedQuiz);
    } catch (err) {
      console.error('Error saving question/discussion:', err);
      setError(err.response?.data?.message || 'Gagal menyimpan pertanyaan.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* HEADER */}
      <div className="admin-header">
        <div className="admin-header-title">
          <h2>Kelola Kuis Pembelajaran</h2>
          <p>Kelola soal pilihan ganda, kunci jawaban, dan pembahasan kuis per materi.</p>
        </div>
        {selectedMaterialId && !isQuizFormOpen && (
          <button className="btn btn-primary" onClick={handleAddQuizClick}>
            <span>➕</span> Tambah Kuis Baru
          </button>
        )}
      </div>

      {/* CASCADE DROPDOWNS */}
      <div className="admin-filter-bar">
        <div className="admin-filter-group">
          <label htmlFor="selectTopic">Topik Utama</label>
          <select
            id="selectTopic"
            className="admin-select"
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
          >
            {topics.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div className="admin-filter-group">
          <label htmlFor="selectMaterial">Materi Belajar</label>
          <select
            id="selectMaterial"
            className="admin-select"
            value={selectedMaterialId}
            onChange={(e) => setSelectedMaterialId(e.target.value)}
            disabled={materials.length === 0}
          >
            {materials.map(m => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
            {materials.length === 0 && <option value="">Belum ada materi</option>}
          </select>
        </div>
      </div>

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

      {/* QUIZ FORM CARD */}
      {isQuizFormOpen && (
        <div className="admin-card">
          <div className="admin-card-title">
            <h3>{editingQuizId ? 'Edit Kuis' : 'Tambah Kuis Baru'}</h3>
            <button className="btn-icon" onClick={() => setIsQuizFormOpen(false)}>✕</button>
          </div>
          <form className="admin-form" onSubmit={handleQuizSubmit}>
            <div className="form-group-admin">
              <label htmlFor="quizTitle">Judul Kuis</label>
              <input
                type="text"
                id="quizTitle"
                name="title"
                className="admin-input"
                placeholder="Contoh: Kuis Harian Persamaan Aljabar"
                value={quizFormData.title}
                onChange={handleQuizInputChange}
                required
              />
            </div>
            <div className="form-group-admin">
              <label htmlFor="quizDesc">Deskripsi Kuis</label>
              <textarea
                id="quizDesc"
                name="description"
                rows="2"
                className="admin-textarea"
                placeholder="Tulis deskripsi kuis..."
                value={quizFormData.description}
                onChange={handleQuizInputChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group-admin">
                <label htmlFor="quizTime">Batas Waktu (Menit)</label>
                <input
                  type="number"
                  id="quizTime"
                  name="time_limit"
                  className="admin-input"
                  min="1"
                  value={quizFormData.time_limit}
                  onChange={handleQuizInputChange}
                  required
                />
              </div>
              <div className="form-group-admin">
                <label htmlFor="quizScore">Nilai Kelulusan Minimum (0 - 100)</label>
                <input
                  type="number"
                  id="quizScore"
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
            <div className="form-actions-admin">
              <button type="button" className="btn btn-outline" onClick={() => setIsQuizFormOpen(false)}>
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                {editingQuizId ? 'Simpan Kuis' : 'Tambah Kuis'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* QUIZZES TABLE */}
      {loadingQuizzes ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Memuat daftar kuis...</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Judul Kuis</th>
                <th style={{ width: '15%' }}>Batas Waktu</th>
                <th style={{ width: '15%' }}>Kriteria Lulus</th>
                <th style={{ width: '15%' }}>Soal Kuis</th>
                <th style={{ width: '15%' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz.id} style={{ background: selectedQuiz?.id === quiz.id ? 'var(--blue-light)' : 'transparent' }}>
                  <td style={{ fontWeight: 600 }}>{quiz.title}</td>
                  <td>⏱️ {quiz.time_limit} Menit</td>
                  <td>🎯 {quiz.passing_score}%</td>
                  <td>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', borderRadius: 'var(--radius-xs)' }}
                      onClick={() => loadQuizDetails(quiz)}
                    >
                      ❓ Edit Soal ({quiz.question_count || 0} Soal)
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon edit"
                        title="Edit Detail Kuis"
                        onClick={() => handleEditQuizClick(quiz)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon delete"
                        title="Hapus Kuis"
                        onClick={() => handleDeleteQuizClick(quiz.id, quiz.title)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {quizzes.length === 0 && (
                <tr>
                  <td colSpan="5" className="admin-empty-state">
                    <div className="admin-empty-icon">📝</div>
                    <h3>Belum Ada Kuis</h3>
                    <p>Silakan buat kuis terlebih dahulu untuk materi ini.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* --- SECTION NESTED: MANAGE QUESTIONS --- */}
      {selectedQuiz && (
        <div className="admin-card" style={{ border: '2px solid var(--blue)', boxShadow: 'var(--shadow)' }}>
          <div className="admin-card-title" style={{ borderColor: 'var(--blue)' }}>
            <div>
              <span className="badge badge-blue" style={{ marginRight: '0.5rem' }}>Kuis: {selectedQuiz.title}</span>
              <h3>Kelola Daftar Pertanyaan</h3>
            </div>
            {!isQFormOpen && (
              <button className="btn btn-primary" onClick={handleAddQClick} style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                ➕ Tambah Soal Kuis
              </button>
            )}
          </div>

          {/* QUESTION FORM */}
          {isQFormOpen && (
            <form className="admin-form" onSubmit={handleQSubmit} style={{ background: 'var(--bg-soft)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
                {editingQId ? 'Edit Soal Kuis' : 'Tambah Soal Kuis Baru'}
              </h4>
              <div className="form-row">
                <div className="form-group-admin" style={{ flex: 3 }}>
                  <label htmlFor="qText">Teks Pertanyaan / Soal</label>
                  <input
                    type="text"
                    id="qText"
                    name="question_text"
                    className="admin-input"
                    placeholder="Contoh: Hasil dari 3x + 2 = 11. Berapakah nilai x?"
                    value={qFormData.question_text}
                    onChange={handleQInputChange}
                    required
                  />
                </div>
                <div className="form-group-admin" style={{ flex: 1 }}>
                  <label htmlFor="qOrder">Urutan Soal</label>
                  <input
                    type="number"
                    id="qOrder"
                    name="sort_order"
                    className="admin-input"
                    min="1"
                    value={qFormData.sort_order}
                    onChange={handleQInputChange}
                    required
                  />
                </div>
              </div>

              {/* OPTIONS EDITOR */}
              <div className="form-group-admin">
                <label>Pilihan Jawaban (Pilih Radio Button di sebelah kanan untuk Jawaban yang Benar)</label>
                <div className="options-editor">
                  {['a', 'b', 'c', 'd'].map(opt => {
                    const optKey = `option_${opt}`;
                    const letter = opt.toUpperCase();
                    return (
                      <div className="option-row" key={opt}>
                        <span className="option-letter">{letter}</span>
                        <input
                          type="text"
                          name={optKey}
                          className="admin-input"
                          placeholder={`Jawaban Pilihan ${letter}`}
                          value={qFormData[optKey]}
                          onChange={handleQInputChange}
                          required
                        />
                        <label className="option-correct-label">
                          <input
                            type="radio"
                            name="correct_answer"
                            value={letter}
                            checked={qFormData.correct_answer === letter}
                            onChange={handleQInputChange}
                            className="option-correct-radio"
                          />
                          Benar
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* EXPLANATION / DISCUSSION */}
              <div className="form-group-admin" style={{ marginTop: '0.5rem' }}>
                <label htmlFor="qExp">Pembahasan & Penjelasan Soal (Quiz Discussion)</label>
                <textarea
                  id="qExp"
                  name="explanation"
                  rows="3"
                  className="admin-textarea"
                  placeholder="Berikan penjelasan bagaimana langkah-langkah memecahkan soal ini agar siswa memahaminya saat kuis selesai..."
                  value={qFormData.explanation}
                  onChange={handleQInputChange}
                />
              </div>

              <div className="form-actions-admin">
                <button type="button" className="btn btn-outline" onClick={() => setIsQFormOpen(false)} style={{ padding: '0.4rem 1rem' }}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>
                  Simpan Pertanyaan
                </button>
              </div>
            </form>
          )}

          {/* LIST QUESTIONS */}
          {loadingQuestions ? (
            <div style={{ textAlign: 'center', padding: '1rem' }}>Memuat soal...</div>
          ) : (
            <div className="admin-nested-list">
              {questions.sort((a, b) => a.sort_order - b.sort_order).map((q, idx) => {
                const discussion = discussions.find(d => d.question_id === q.id);
                return (
                  <div className="admin-nested-item" key={q.id} style={{ alignItems: 'flex-start', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                      <span className="admin-nested-subtitle" style={{ color: 'var(--blue)', fontWeight: 800 }}>
                        Soal #{q.sort_order || idx + 1}
                      </span>
                      <div className="action-buttons">
                        <button
                          className="btn-icon edit"
                          title="Edit Soal & Pembahasan"
                          onClick={() => handleEditQClick(q)}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-icon delete"
                          title="Hapus Soal"
                          onClick={() => handleDeleteQClick(q.id, q.sort_order || idx + 1)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div style={{ marginTop: '0.5rem', width: '100%' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)', marginBottom: '0.75rem' }}>
                        {q.question_text}
                      </div>
                      
                      {/* Options listing */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        {['a', 'b', 'c', 'd'].map(opt => {
                          const isCorrect = q.correct_answer === opt.toUpperCase();
                          return (
                            <div
                              key={opt}
                              style={{
                                padding: '0.5rem 0.75rem',
                                borderRadius: 'var(--radius-xs)',
                                border: `1.5px solid ${isCorrect ? 'var(--green)' : 'var(--border)'}`,
                                background: isCorrect ? '#D1FAE5' : 'var(--bg)',
                                fontSize: '0.85rem',
                                color: isCorrect ? '#065F46' : 'var(--text-muted)',
                                fontWeight: isCorrect ? 600 : 400
                              }}
                            >
                              <strong>{opt.toUpperCase()}.</strong> {q[`option_${opt}`]}
                            </div>
                          );
                        })}
                      </div>

                      {/* Discussion display */}
                      {discussion ? (
                        <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-soft)', borderRadius: 'var(--radius-xs)', borderLeft: '3px solid var(--blue)', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                          <strong style={{ color: 'var(--blue)', display: 'block', marginBottom: '0.15rem' }}>Pembahasan Pembelajaran:</strong>
                          {discussion.explanation}
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontStyle: 'italic', marginTop: '0.25rem' }}>
                          💡 Belum ada penjelasan pembahasan untuk soal ini.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {questions.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  📝 Belum ada soal kuis yang dibuat. Silakan klik tombol "Tambah Soal Kuis" di atas.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminQuizzesPage;
