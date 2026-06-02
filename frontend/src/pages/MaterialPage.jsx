import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api, { materialsAPI, quizzesAPI, practiceAPI } from '../services/api';
import '../styles/materi.css';

const MaterialPage = () => {
  const { topicId, materialId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [material, setMaterial] = useState(null);
  const [steps, setSteps] = useState([]);
  const [videos, setVideos] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [practiceQuestions, setPracticeQuestions] = useState([]);

  // Active view state: 'materi' | 'video' | 'latihan'
  const [currentView, setCurrentView] = useState('materi');

  // Interactive Latihan Soal state
  const [latihanAnswers, setLatihanAnswers] = useState({}); // { questionIndex: { chosen, correct, answered } }

  // Helper to parse standard YouTube URL to Embed URL safely (prevents SAMEORIGIN iframe blocking)
  const getEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };
  const currentLatihan = practiceQuestions;

  useEffect(() => {
    const loadMaterialDetails = async () => {
      setLoading(true);
      try {
        // Fetch material and steps
        const res = await materialsAPI.getById(topicId, materialId);
        setMaterial(res.data?.data?.material);
        setSteps(res.data?.data?.steps || []);

        // Fetch videos
        const vidRes = await api.get(`/api/topics/${topicId}/materials/${materialId}/videos`);
        setVideos(vidRes.data?.data?.videos || []);

        // Fetch quizzes
        const quizRes = await quizzesAPI.getByMaterial(topicId, materialId);
        setQuizzes(quizRes.data?.data?.quizzes || []);

        // Fetch practice questions from database
        const practiceRes = await practiceAPI.getByMaterial(topicId, materialId);
        const dbQuestions = practiceRes.data?.data?.practiceQuestions || [];
        const mappedQuestions = dbQuestions.map(q => ({
          soal: q.question_text,
          opsi: [q.option_a, q.option_b, q.option_c, q.option_d],
          jwb: q.correct_answer,
          cara: `Jawaban: ${['A', 'B', 'C', 'D'][q.correct_answer]} — ${[q.option_a, q.option_b, q.option_c, q.option_d][q.correct_answer]}\nCara: ${q.explanation}`
        }));
        setPracticeQuestions(mappedQuestions);
      } catch (error) {
        console.error('Error loading material details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMaterialDetails();
  }, [topicId, materialId]);

  const handleJawab = (qIdx, oIdx, correctIdx) => {
    if (latihanAnswers[qIdx]?.answered) return;

    setLatihanAnswers(prev => ({
      ...prev,
      [qIdx]: {
        chosen: oIdx,
        correct: correctIdx,
        answered: true
      }
    }));
  };

  const handleLanjutkan = () => {
    if (currentView === 'materi') {
      if (videos.length > 0) {
        setCurrentView('video');
      } else {
        setCurrentView('latihan');
      }
    } else if (currentView === 'video') {
      setCurrentView('latihan');
    } else if (currentView === 'latihan') {
      // Start quiz or navigate to Kuis
      if (quizzes.length > 0) {
        // Go directly to quiz view if exists
        navigate(`/quiz`);
      } else {
        navigate(`/quiz`);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'Plus Jakarta Sans' }}>
        <h3>Memuat Materi Pembelajaran...</h3>
      </div>
    );
  }

  return (
    <>
      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <Link to="/topics">Matematika</Link>
        <span className="sep">›</span>
        <Link to="/topics">{material?.topic_name || "Topik"}</Link>
        <span className="sep">›</span>
        <span className="current">{material?.title || "Materi"}</span>
      </div>

      {/* PAGE BODY */}
      <div className="page-body" style={{ flex: 1, width: '100%' }}>
        {/* MAIN CONTENT AREA */}
        <div className="content-area">
          {/* MATERI VIEW */}
          {currentView === 'materi' && (
            <div className="materi-view">
              <h1 className="materi-title">{material?.title}</h1>
              <div 
                className="materi-body"
                dangerouslySetInnerHTML={{ 
                  __html: steps[0]?.content || `<p>${material?.description}</p>` 
                }}
              />
            </div>
          )}

          {/* VIDEO VIEW */}
          {currentView === 'video' && (
            <div className="materi-view">
              <h1 className="materi-title" style={{ marginBottom: '1.5rem' }}>Tonton Video Pembelajaran</h1>
              {videos.length > 0 ? (
                <div>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'black', marginBottom: '1.5rem' }}>
                    <iframe
                      src={getEmbedUrl(videos[0].video_url)}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                      allowFullScreen
                      title={videos[0].title}
                    />
                  </div>
                  <h3>{videos[0].title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{videos[0].description}</p>
                </div>
              ) : (
                <p>Tidak ada video untuk materi ini.</p>
              )}
            </div>
          )}

          {/* LATIHAN VIEW */}
          {currentView === 'latihan' && (
            <div className="latihan-view" style={{ display: 'block' }}>
              <h1 className="materi-title">Latihan Soal</h1>
              <div className="latihan-soal-wrap">
                {currentLatihan.map((q, qIdx) => {
                  const state = latihanAnswers[qIdx];

                  return (
                    <div key={qIdx} className="soal-item">
                      <div className="soal-label">Soal {qIdx + 1}</div>
                      <div className="soal-text">{q.soal}</div>
                      <div className="soal-opsi-container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                        {q.opsi.map((o, oIdx) => {
                          let optClass = 'practice-option-btn';
                          const isAnswered = state?.answered;
                          const isCorrectChoice = oIdx === state?.correct;
                          const isChosenChoice = oIdx === state?.chosen;
                          const isWrongChoice = isChosenChoice && !isCorrectChoice;

                          if (isAnswered) {
                            if (isCorrectChoice) {
                              optClass += ' correct';
                            } else if (isWrongChoice) {
                              optClass += ' wrong';
                            } else {
                              optClass += ' disabled';
                            }
                          }

                          const optionLetter = ['A', 'B', 'C', 'D'][oIdx] || '';

                          return (
                            <button 
                              key={oIdx} 
                              className={optClass}
                              onClick={() => !isAnswered && handleJawab(qIdx, oIdx, q.jwb)}
                              disabled={isAnswered}
                            >
                              <span className="practice-option-label">
                                {optionLetter}
                              </span>
                              <span className="practice-option-text">
                                {o}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {state?.answered && (
                        <div className="soal-jawaban" style={{ display: 'block' }}>
                          <strong>{q.cara.split('\n')[0]}</strong>
                          <br />
                          {q.cara.split('\n').slice(1).join('\n')}
                        </div>
                      )}

                      {qIdx < currentLatihan.length - 1 && <hr className="soal-divider" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Materi Terkait / Video Section */}
          <div className="related-section">
            <div className="related-title">Materi Terkait</div>
            <div className="related-grid">
              {videos.map((vid) => (
                <a key={vid.id} href="#" className="related-card" onClick={(e) => { e.preventDefault(); setCurrentView('video'); }}>
                  <div className="related-thumb" style={{ background: `url(${vid.thumbnail_url}) center/cover no-repeat, linear-gradient(135deg, #EEF2FF, #C7D2FE)` }}>
                    📺
                    <span className="related-duration">{Math.floor(vid.duration / 60)} Min</span>
                  </div>
                  <div className="related-body">
                    <div className="related-level level-dasar">Video</div>
                    <h4>{vid.title}</h4>
                    <p>{vid.description?.substring(0, 45)}...</p>
                  </div>
                </a>
              ))}

              {videos.length === 0 && (
                <div style={{ gridColumn: 'span 3', padding: '1rem', textAlign: 'center', background: 'var(--bg-soft)', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Tidak ada materi video terkait.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STEPS SIDEBAR */}
        <aside className="steps-sidebar">
          <div className="steps-header">
            <div className="steps-header-title">Tahapan Pembelajaran</div>
            <span className="steps-badge">Aktif</span>
          </div>

          {/* Step 1: Baca Materi */}
          <div 
            className={`step-item ${currentView === 'materi' ? 'active' : ''}`}
            onClick={() => setCurrentView('materi')}
          >
            <div className={`step-icon ${currentView !== 'materi' ? 's-done' : 's-active'}`}>
              {currentView !== 'materi' ? '✓' : '1'}
            </div>
            <div className="step-info">
              <div className="step-name">Baca Materi Lengkap</div>
              <div className="step-sub">{steps.length} Subbab Pembahasan</div>
            </div>
          </div>

          {/* Step 2: Tonton Video (if exists) */}
          {videos.length > 0 && (
            <div 
              className={`step-item ${currentView === 'video' ? 'active' : ''}`}
              onClick={() => setCurrentView('video')}
            >
              <div className={`step-icon ${currentView === 'materi' ? 's-locked' : currentView === 'video' ? 's-active' : 's-done'}`}>
                {currentView === 'latihan' ? '✓' : '2'}
              </div>
              <div className="step-info">
                <div className="step-name">Tonton Video Pembelajaran</div>
                <div className="step-sub">{videos.length} Video</div>
              </div>
            </div>
          )}

          {/* Step 3: Latihan Soal */}
          <div 
            className={`step-item ${currentView === 'latihan' ? 'active' : ''}`}
            onClick={() => setCurrentView('latihan')}
          >
            <div className={`step-icon ${currentView !== 'latihan' ? 's-locked' : 's-active'}`}>
              {videos.length > 0 ? '3' : '2'}
            </div>
            <div className="step-info">
              <div className="step-name">Latihan Soal</div>
              <div className="step-sub">{currentLatihan.length} Pertanyaan</div>
            </div>
          </div>

          {/* Step 4: Kuis Akhir */}
          <div className="step-item no-click">
            <div className="step-icon s-locked">
              🔒
            </div>
            <div className="step-info">
              <div className="step-name">Kuis Akhir Modul</div>
              <div className="step-sub">Uji Pemahaman</div>
            </div>
          </div>

          {/* BUTTON LANJUT */}
          <button className="btn-lanjut" onClick={handleLanjutkan}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            </svg>
            <span>
              {currentView === 'materi' ? 'Lanjutkan Sekarang' : currentView === 'video' ? 'Lanjutkan Sekarang' : 'Mulai Kuis Sekarang'}
            </span>
          </button>
        </aside>
      </div>

      <button className="chat-fab" onClick={() => alert('Fitur Asisten AI Mathify akan segera hadir!')}>💬</button>
    </>
  );
};

export default MaterialPage;
