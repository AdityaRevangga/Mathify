import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api, { topicsAPI, materialsAPI, quizzesAPI, resultsAPI, leaderboardAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import QuizCard from '../components/QuizCard';
import '../styles/quiz-list.css';

const QuizListPage = () => {
  const { user, updateUserLocalState } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Play states: 'list' | 'intro' | 'play' | 'result'
  const [playState, setPlayState] = useState('list');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userSelections, setUserSelections] = useState({}); // { questionId: selectedOption }
  const [currentFeedback, setCurrentFeedback] = useState(null); // { isCorrect, explanation, correctAnswer }
  const [quizDiscussions, setQuizDiscussions] = useState([]); // Array of discussions

  // Play details
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 minutes
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

  // Completed result display state
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    const loadQuizzesAndResults = async () => {
      try {
        // Fetch topics to get materialIds
        const topicsRes = await topicsAPI.getAll();
        const loadedTopics = topicsRes.data?.data?.topics || [];

        const loadedQuizzes = [];
        for (const topic of loadedTopics) {
          const matRes = await materialsAPI.getByTopic(topic.id);
          const topicMats = matRes.data?.data?.materials || [];

          for (const mat of topicMats) {
            const quizRes = await quizzesAPI.getByMaterial(topic.id, mat.id);
            const matQuizzes = quizRes.data?.data?.quizzes || [];
            const mappedQuizzes = matQuizzes.map(q => ({
              ...q,
              topic_id: topic.id,
              material_id: mat.id,
              topic_slug: topic.slug,
              topic_name: topic.name
            }));
            loadedQuizzes.push(...mappedQuizzes);
          }
        }
        setQuizzes(loadedQuizzes);

        // Fetch results
        const resultsRes = await resultsAPI.getMyResults();
        setResults(resultsRes.data?.data?.results || []);

        // Fetch leaderboard
        try {
          const lbRes = await leaderboardAPI.getLeaderboard();
          setLeaderboard(lbRes.data?.data?.leaderboard || []);
        } catch (lbErr) {
          console.error('Failed to load leaderboard:', lbErr);
        }
      } catch (error) {
        console.error('Error loading quiz list:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzesAndResults();
  }, [playState]);

  // Auto-start quiz if navigated with autoStartQuizId
  useEffect(() => {
    if (quizzes.length > 0 && location.state?.autoStartQuizId && playState === 'list') {
      const quizToStart = quizzes.find(q => q.id === location.state.autoStartQuizId);
      if (quizToStart) {
        handleStartQuizIntro(quizToStart);
        // Clear the state so it doesn't auto-start again on back/refresh
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [quizzes, location.state, playState, navigate]);

  // Timer effect
  useEffect(() => {
    if (timerActive && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      clearInterval(timerRef.current);
      handleSubmitQuiz();
    }

    return () => clearInterval(timerRef.current);
  }, [timerActive, secondsLeft]);

  const handleStartQuizIntro = async (quiz) => {
    setActiveQuiz(quiz);
    setPlayState('intro');
  };

  const startQuizPlay = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/topics/${activeQuiz.topic_id}/materials/${activeQuiz.material_id}/quizzes/${activeQuiz.id}`);
      if (res.data?.success) {
        setQuizQuestions(res.data.data.questions || []);
        setCurrentQuestionIdx(0);
        setUserSelections({});
        setCurrentFeedback(null);
        setSecondsLeft(600);

        // Fetch discussions
        try {
          const discRes = await quizzesAPI.getDiscussions(activeQuiz.topic_id, activeQuiz.material_id, activeQuiz.id);
          if (discRes.data?.success) {
            setQuizDiscussions(discRes.data.data.discussions || []);
          } else {
            setQuizDiscussions([]);
          }
        } catch (e) {
          console.error('Failed to load discussions:', e);
          setQuizDiscussions([]);
        }

        setPlayState('play');
        setTimerActive(true);
      }
    } catch (error) {
      console.error('Error loading quiz questions:', error);
      alert('Gagal memuat pertanyaan kuis.');
      setPlayState('list');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId, optionLetter) => {
    setUserSelections(prev => ({
      ...prev,
      [questionId]: optionLetter
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    setTimerActive(false);
    clearInterval(timerRef.current);
    setLoading(true);

    try {
      // Map answers format expected by backend:
      // answers: [{ question_id: number, selected_answer: 'a'|'b'|'c'|'d' }]
      const mappedAnswers = quizQuestions.map(q => ({
        question_id: q.id,
        selected_answer: userSelections[q.id] || 'a' // default fallback if skipped
      }));

      const timeTaken = 600 - secondsLeft;

      const res = await quizzesAPI.submit(
        activeQuiz.topic_id,
        activeQuiz.material_id,
        activeQuiz.id,
        mappedAnswers,
        timeTaken
      );

      if (res.data?.success) {
        setSubmissionResult(res.data.data.result);
        if (res.data.data.user) {
          updateUserLocalState(res.data.data.user);
        }
        setPlayState('result');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Gagal mensubmit kuis.');
      setPlayState('list');
    } finally {
      setLoading(false);
    }
  };

  const getBestScore = (quizId) => {
    const quizResults = results.filter(r => r.quiz_id === quizId);
    if (quizResults.length === 0) return null;
    return Math.max(...quizResults.map(r => r.score));
  };

  const isCompleted = (quizId) => {
    return results.some(r => r.quiz_id === quizId && r.passed);
  };

  // Filters
  const filteredQuizzes = quizzes.filter(quiz => {
    if (activeFilter === 'all') return true;
    const completed = isCompleted(quiz.id);
    if (activeFilter === 'lulus') return completed;
    return !completed; // 'belum'
  });

  const getTopicColor = (topicSlug) => {
    switch (topicSlug?.toLowerCase()) {
      case 'aljabar': return 'blue';
      case 'geometri': return 'green';
      default: return 'pink';
    }
  };

  const getQuizTopicLabel = (topicSlug) => {
    return topicSlug?.toUpperCase() || 'KUIS';
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (loading && playState === 'list') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Plus Jakarta Sans' }}>
        <h3>Memuat Daftar Kuis...</h3>
      </div>
    );
  }

  return (
    <>
      {playState === 'list' && (
        <>
          {/* PAGE HEADER */}
          <div className="page-header">
            <h2>Kuis Interaktif</h2>
            <p>Uji pemahaman Anda pada setiap materi dan dapatkan XP ekstra untuk menaikkan peringkat Anda.</p>
          </div>

          {/* FILTER TABS */}
          <div className="filter-row">
            <button 
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Semua Kuis
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'belum' ? 'active' : ''}`}
              onClick={() => setActiveFilter('belum')}
            >
              Belum Selesai
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'lulus' ? 'active' : ''}`}
              onClick={() => setActiveFilter('lulus')}
            >
              Sudah Lulus
            </button>
          </div>

          {/* GROUPED BY TOPICS (DYNAMICS) */}
          {Array.from(new Set(filteredQuizzes.map(q => q.topic_slug))).map((topicSlug) => {
            const topicQuizzes = filteredQuizzes.filter(q => q.topic_slug === topicSlug);
            if (topicQuizzes.length === 0) return null;

            const firstQuiz = topicQuizzes[0];
            const topicName = firstQuiz.topic_name || (topicSlug.charAt(0).toUpperCase() + topicSlug.slice(1));
              
            const topicEmoji = topicSlug === 'aljabar' ? '📊'
              : topicSlug === 'geometri' ? '📐'
              : topicSlug === 'aritmatika' ? '🔢'
              : topicSlug === 'statistika' ? '📈'
              : topicSlug === 'trigonometri' ? '📏'
              : '📐';

            return (
              <div key={topicSlug} className="topic-quiz-group" style={{ marginBottom: '2.5rem' }}>
                <h3 className="topic-group-title" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>{topicEmoji}</span> {topicName}
                </h3>
                <div className="quiz-grid">
                  {topicQuizzes.map((quiz) => {
                    const completed = isCompleted(quiz.id);
                    const bestScore = getBestScore(quiz.id);
                    const color = getTopicColor(quiz.topic_slug);

                    return (
                      <QuizCard
                        key={quiz.id}
                        title={quiz.title}
                        description={quiz.description}
                        questionsCount={quiz.question_count || 5}
                        bestScore={bestScore}
                        completed={completed}
                        isNew={!completed && bestScore === null}
                        color={color}
                        onAction={() => handleStartQuizIntro(quiz)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredQuizzes.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-muted)' }}>Tidak ada kuis di kategori ini.</p>
            </div>
          )}

          {/* BOTTOM ROW (LEADERBOARD & MISSION) */}
          <div className="bottom-row">
            {/* Leaderboard */}
            <div className="leaderboard-card">
              <div className="card-title-row">
                <div className="card-title">🏆 Peringkat Siswa</div>
                <div className="card-label">Weekly XP</div>
              </div>

              {leaderboard.map((item, idx) => {
                const isMe = item.id === user?.id;
                const displayName = isMe ? `Anda (${item.full_name || item.username})` : (item.full_name || item.username);
                const avatar = item.role === 'teacher' ? '👨‍🏫' : (idx % 2 === 0 ? '👨‍🎓' : '👩‍🎓');
                return (
                  <div key={item.id} className={`leaderboard-item ${isMe ? 'me' : ''}`}>
                    <div className="rank-num">{idx + 1}</div>
                    <div className="lb-avatar">{avatar}</div>
                    <div className="lb-name">{displayName}</div>
                    <div className="lb-xp">{(item.xp || 0).toLocaleString()} XP</div>
                  </div>
                );
              })}

              {leaderboard.length === 0 && (
                <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>
                  Belum ada data peringkat.
                </div>
              )}
            </div>

            {/* Special Mission */}
            <div className="mission-card">
              <div className="mission-header">
                <div className="mission-title">🚀 Misi Mingguan</div>
                <span className="mission-badge">🔥</span>
              </div>
              <p className="mission-desc">
                Selesaikan 2 kuis aljabar dan geometri dengan nilai sempurna (100) minggu ini untuk membuka lencana "Master Geometri"!
              </p>
              <div className="mission-progress-track">
                <div 
                  className="mission-progress-fill" 
                  style={{ width: `${Math.min((results.filter(r => r.score === 100).length / 2) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="mission-meta">
                <span className="mission-completed">
                  {Math.min(results.filter(r => r.score === 100).length, 2)}/2 Selesai
                </span>
                <span className="mission-reward">Hadiah: +500 XP</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* INTRO SCREEN */}
      {playState === 'intro' && activeQuiz && (
        <div style={{ display: 'flex', width: '100%', minHeight: '80vh', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="intro-card">
            <div className="intro-icon">🚀</div>
            <div className="intro-tag">KUIS MODUL • 5 SOAL</div>
            <div className="intro-title">SIAP TAKLUKKAN <span>{getQuizTopicLabel(activeQuiz.topic_slug)}?</span></div>
            <div className="intro-meta-row">
              <div className="intro-meta-item">
                <div className="meta-label">SOAL</div>
                <div className="meta-value">5</div>
              </div>
              <div className="intro-meta-item highlight">
                <div className="meta-label">HADIAH</div>
                <div className="meta-value">1,000 XP</div>
              </div>
              <div className="intro-meta-item">
                <div className="meta-label">LULUS</div>
                <div className="meta-value">≥{activeQuiz.passing_score}%</div>
              </div>
            </div>
            <button className="btn-start-mission" onClick={startQuizPlay}>MULAI KUIS SEKARANG!</button>
            <p className="intro-rules">Kerjakan dengan jujur. Waktu pengerjaan maksimal 10 menit.</p>
            <button 
              className="btn-retry" 
              style={{ border: 'none', background: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginTop: '0.75rem', cursor: 'pointer' }}
              onClick={() => setPlayState('list')}
            >
              Batalkan & Kembali
            </button>
          </div>
        </div>
      )}

      {/* PLAY SCREEN */}
      {playState === 'play' && quizQuestions.length > 0 && (
        <div style={{ display: 'flex', width: '100%', minHeight: '85vh', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
          <div className="quiz-area">
            <div className="quiz-progress-row">
              <span className="quiz-progress-label">
                SOAL {String(currentQuestionIdx + 1).padStart(2, '0')}/{String(quizQuestions.length).padStart(2, '0')}
              </span>
              <span className="quiz-timer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{formatTime(secondsLeft)}</span>
              </span>
            </div>
            <div className="quiz-progress-bar">
              <div 
                className="quiz-progress-fill" 
                style={{ width: `${(currentQuestionIdx / quizQuestions.length) * 100}%` }}
              ></div>
            </div>

            <div className="question-card">
              <div className="question-accent"></div>
              <p className="question-text">{quizQuestions[currentQuestionIdx].question_text}</p>
            </div>

            <div className="options-grid">
              {['a', 'b', 'c', 'd'].map((letter, idx) => {
                const optText = quizQuestions[currentQuestionIdx][`option_${letter}`];
                const isSelected = userSelections[quizQuestions[currentQuestionIdx].id] === letter;

                return (
                  <button 
                    key={letter}
                    className={`option-btn ${isSelected ? 'selected-correct' : ''}`}
                    onClick={() => handleSelectOption(quizQuestions[currentQuestionIdx].id, letter)}
                    style={{ borderColor: isSelected ? 'var(--blue)' : 'var(--border)' }}
                  >
                    <span className="option-label" style={{ background: isSelected ? 'var(--blue)' : 'white', color: isSelected ? 'white' : 'var(--text)' }}>
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    {optText}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', width: '100%' }}>
              <button 
                className="btn-discard" 
                style={{ padding: '0.65rem 1.5rem', cursor: 'pointer' }}
                onClick={() => {
                  if (confirm('Batalkan kuis? Progress saat ini akan hilang.')) {
                    setTimerActive(false);
                    setPlayState('list');
                  }
                }}
              >
                Keluar Kuis
              </button>

              {currentQuestionIdx < quizQuestions.length - 1 ? (
                <button 
                  className="btn-save-changes"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                  onClick={handleNextQuestion}
                  disabled={!userSelections[quizQuestions[currentQuestionIdx].id]}
                >
                  Pertanyaan Berikutnya <span>→</span>
                </button>
              ) : (
                <button 
                  className="btn-save-changes"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'var(--green)' }}
                  onClick={handleSubmitQuiz}
                  disabled={!userSelections[quizQuestions[currentQuestionIdx].id]}
                >
                  Selesaikan Kuis <span>✓</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RESULT SCREEN */}
      {playState === 'result' && submissionResult && (
        <div style={{ display: 'flex', width: '100%', minHeight: '85vh', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
          <div className="result-screen">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.5rem', textAlign: 'center' }}>
              Hasil Evaluasi Kuis
            </h2>
            <div className="result-layout">
              <div className="result-summary">
                <div className="result-date">
                  Tanggal Kuis: {new Date(submissionResult.created_at || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="result-stat-label">Total soal</div>
                <div className="result-stat-value" style={{ color: 'var(--text)', fontSize: '2.5rem' }}>
                  {submissionResult.total_questions}
                </div>
                <div className="result-stat-label">Skor Akhir</div>
                <div className={`result-stat-value ${submissionResult.passed ? 'score-pass' : 'score-fail'}`}>
                  {submissionResult.score}
                </div>
                <p className="result-congrats">
                  {submissionResult.passed 
                    ? 'Selamat! Anda telah lulus kuis modul ini dengan sangat baik. 🎉' 
                    : 'Anda belum mencapai skor kelulusan kuis. Pelajari kembali materinya dan coba lagi!'
                  }
                </p>
                <button className="btn-retry" onClick={() => setPlayState('list')}>
                  Kembali ke Daftar Kuis
                </button>
              </div>

              <div className="result-questions">
                {quizQuestions.map((q, idx) => {
                  const evalItem = submissionResult.answers.find(a => a.question_id == q.id) || {};
                  const isCorrect = evalItem.is_correct;
                  const selectedAns = evalItem.selected_answer;
                  const correctAns = evalItem.correct_answer;

                  return (
                    <div key={q.id} className="result-q">
                      <div className="result-q-label">Soal {idx + 1}</div>
                      <div className="result-q-text">{q.question_text}</div>

                      {['a', 'b', 'c', 'd'].map((letter, optIdx) => {
                        const optText = q[`option_${letter}`];
                        let statusClass = '';
                        if (letter === correctAns) {
                          statusClass = 'correct';
                        } else if (letter === selectedAns && !isCorrect) {
                          statusClass = 'wrong';
                        }

                        return (
                          <div key={letter} className={`result-option ${statusClass}`}>
                            <span style={{ fontWeight: 800, marginRight: '0.5rem' }}>
                              {['A', 'B', 'C', 'D'][optIdx]}.
                            </span>
                            {optText}
                          </div>
                        );
                      })}

                      {/* We mock explanation or can render a general discussion if returned by api */}
                      <div className="result-explanation">
                        <strong>Pembahasan Soal:</strong>
                        <br />
                        {(() => {
                          const discussion = quizDiscussions.find(d => d.question_id === q.id);
                          if (discussion && discussion.explanation) {
                            return discussion.explanation;
                          }
                          return isCorrect 
                            ? 'Jawaban Anda benar! Konsep ini membuktikan keakuratan pemahaman matematika visual Anda.' 
                            : `Jawaban benar adalah ${correctAns?.toUpperCase()}. Silakan periksa kembali metode penyelesaian yang telah diajarkan di modul materi.`;
                        })()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizListPage;
