import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { topicsAPI, materialsAPI, resultsAPI } from '../services/api';
import StatCard from '../components/StatCard';
import TopicCard from '../components/TopicCard';
import '../styles/dashboard.css';
import '../styles/topik.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Fetch topics
        const topicsRes = await topicsAPI.getAll();
        const loadedTopics = topicsRes.data?.data?.topics || [];
        setTopics(loadedTopics);

        // Fetch materials for all loaded topics
        const allMaterials = [];
        for (const topic of loadedTopics) {
          const matRes = await materialsAPI.getByTopic(topic.id);
          const topicMats = matRes.data?.data?.materials || [];
          // Attach topic details to each material
          const mappedMats = topicMats.map(mat => ({
            ...mat,
            topic_slug: topic.slug,
            topic_name: topic.name
          }));
          allMaterials.push(...mappedMats);
        }
        setMaterials(allMaterials);

        // Fetch quiz results
        const resultsRes = await resultsAPI.getMyResults();
        setResults(resultsRes.data?.data?.results || []);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const getDisplayName = () => {
    return user?.full_name || user?.username || 'Budi';
  };

  // Helper: calculate progress for a material based on quiz results
  const getMaterialProgress = (materialId) => {
    // If user has a passed result for any quiz in this material, progress is 100
    // In our backend seed, quizzes are associated with materials.
    // Let's check results to see if they completed the quiz for this material.
    const materialResults = results.filter(r => r.material_title?.toLowerCase() === materials.find(m => m.id === materialId)?.title?.toLowerCase());
    
    if (materialResults.length === 0) return 0;
    
    const passed = materialResults.some(r => r.passed);
    if (passed) return 100;

    // If they completed but not passed, let's say 50% progress
    return 50;
  };

  // Calculate stats
  const passedQuizzesCount = results.filter(r => r.passed).length;
  const quizPassRate = results.length > 0 ? Math.round((passedQuizzesCount / results.length) * 100) : 0;
  const calculatedXP = user?.xp || 0;
  const streakDays = user?.streak || 0;

  const getRankLabel = () => {
    const xp = user?.xp || 0;
    if (xp >= 2500) return 'Rank 1 overall';
    if (xp >= 1850) return 'Rank 2 overall';
    if (xp >= 1600) return 'Rank 3 overall';
    return 'Rank 4 overall';
  };

  // Topic card details mapping (colors, emojis, and levels based on topic slug)
  const getTopicStyle = (topicSlug) => {
    switch (topicSlug?.toLowerCase()) {
      case 'aljabar':
        return { emoji: '📊', color: 'blue', level: 'menengah', levelText: 'Intermediate' };
      case 'geometri':
        return { emoji: '📐', color: 'blue', level: 'dasar', levelText: 'Beginner' };
      case 'aritmatika':
        return { emoji: '🔢', color: 'orange', level: 'dasar', levelText: 'Beginner' };
      case 'statistika':
        return { emoji: '📈', color: 'purple', level: 'menengah', levelText: 'Intermediate' };
      case 'trigonometri':
        return { emoji: '📏', color: 'red', level: 'lanjutan', levelText: 'Advanced' };
      default:
        return { emoji: '📐', color: 'blue', level: 'dasar', levelText: 'Beginner' };
    }
  };

  const getTopicProgress = (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    if (!topic || results.length === 0) return 0;

    // Find all unique passed material titles for this topic
    const passedMaterials = new Set(
      results
        .filter(r => r.topic_id === topicId && r.passed)
        .map(r => r.material_title?.toLowerCase())
    );

    const totalMaterials = topic.material_count || 1; // avoid division by zero
    const progress = Math.round((passedMaterials.size / totalMaterials) * 100);
    return Math.min(progress, 100);
  };

  const handleResumeCourse = (topicId, materialId) => {
    // Navigate to Material page: /topics/:topicId/materials/:materialId
    navigate(`/topics/${topicId}/materials/${materialId}`);
  };

  const handleTopicClick = (topic) => {
    // Navigate to topics page and pass topic.id in location state to trigger auto-selection
    navigate('/topics', { state: { autoSelectTopicId: topic.id } });
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Plus Jakarta Sans' }}>
        <h3>Memuat Dashboard...</h3>
      </div>
    );
  }

  return (
    <>
      {/* WELCOME BANNER */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h2>Welcome back, {getDisplayName()}! 👋</h2>
          <p>
            {results.length > 0 
              ? "You're on a roll! Keep up the momentum and solve 5 more algebra problems to unlock your next achievement." 
              : "Selamat datang di Mathify! Mulai belajar matematika interaktif dengan materi visual langkah-demi-langkah sekarang."
            }
          </p>
          <div className="welcome-cta">
            {materials.length > 0 && (
              <button 
                className="btn-white" 
                onClick={() => handleResumeCourse(materials[0].topic_id, materials[0].id)}
              >
                {results.length > 0 ? "Resume Last Lesson" : "Mulai Belajar"}
              </button>
            )}
            <button className="btn-white-outline" onClick={() => navigate('/topics')}>View Goals</button>
          </div>
        </div>
        <div className="welcome-image">📊</div>
      </div>

      {/* STATS ROW */}
      <div className="stats-row">
        <StatCard
          icon="🔥"
          value={`${streakDays} Hari`}
          label="Current Streak"
          progress={streakDays > 0 ? 60 : 0}
          progressColor="var(--orange)"
        />
        <StatCard
          icon="⭐"
          value={`${calculatedXP.toLocaleString()} XP`}
          label={getRankLabel()}
          chips={calculatedXP > 0 ? ["Weekly +240 XP", "Top 5%"] : ["Belum ada XP"]}
        />
        <StatCard
          icon="✅"
          value={`${passedQuizzesCount} Kuis`}
          label={`Passing rate ${quizPassRate}%`}
          progress={quizPassRate}
          progressColor="var(--green)"
        />
      </div>

      {/* COURSE CARDS GRID */}
      <div className="section-row">
        <div className="section-row-text">
          <h3>Materi Pembelajaran</h3>
          <p>Lanjutkan materi pelajaran Anda untuk memperdalam pemahaman matematika.</p>
        </div>
        <a href="#" className="link-blue" onClick={(e) => { e.preventDefault(); navigate('/topics'); }}>
          Lihat Semua Topik <span>→</span>
        </a>
      </div>

      <div className="courses-grid">
        {topics.slice(0, 3).map((topic) => {
          const { emoji, color, level } = getTopicStyle(topic.slug);
          const progress = getTopicProgress(topic.id);
          const lessonsCount = topic.material_count || 0;

          return (
            <TopicCard
              key={topic.id}
              title={topic.name}
              description={topic.description}
              lessonsCount={lessonsCount}
              progress={progress}
              level={level}
              emoji={emoji}
              color={color}
              onClick={() => handleTopicClick(topic)}
            />
          );
        })}

        {topics.length === 0 && (
          <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text-muted)' }}>Belum ada topik pelajaran yang tersedia di database.</p>
          </div>
        )}
      </div>

      {/* SCHEDULED QUIZ BANNER */}
      <div className="quiz-banner">
        <div className="quiz-banner-left">
          <div className="quiz-banner-icon">📝</div>
          <div>
            <div className="quiz-banner-label">Scheduled Quiz</div>
            <h4>Quiz Mingguan - Aljabar & Geometri Dasar</h4>
            <p>Uji pemahaman gabungan topik aljabar persamaan linear dan bangun datar untuk mendapatkan bonus 500 XP!</p>
            <div className="quiz-meta">
              <span>⏱️ 15 Menit</span>
              <span>❓ 10 Pertanyaan</span>
            </div>
          </div>
        </div>
        <button className="btn-take-quiz" onClick={() => navigate('/quiz')}>Mulai Kuis</button>
      </div>
    </>
  );
};

export default DashboardPage;
