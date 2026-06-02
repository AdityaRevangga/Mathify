import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { topicsAPI, materialsAPI, resultsAPI } from '../services/api';
import TopicCard from '../components/TopicCard';
import '../styles/topik.css';

const TopicsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [results, setResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Sub-materi view state
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicMaterials, setTopicMaterials] = useState([]);
  const [loadingMaterials, setLoadingMaterials] = useState(false);

  useEffect(() => {
    const loadTopicsAndResults = async () => {
      try {
        const topicsRes = await topicsAPI.getAll();
        const loadedTopics = topicsRes.data?.data?.topics || [];
        setTopics(loadedTopics);

        const resultsRes = await resultsAPI.getMyResults();
        setResults(resultsRes.data?.data?.results || []);

        // Auto select topic if passed from navigation state (e.g. from Dashboard)
        const autoSelectId = location.state?.autoSelectTopicId;
        if (autoSelectId) {
          const topicToSelect = loadedTopics.find(t => t.id === autoSelectId);
          if (topicToSelect) {
            setSelectedTopic(topicToSelect);
            setLoadingMaterials(true);
            const matRes = await materialsAPI.getByTopic(autoSelectId);
            setTopicMaterials(matRes.data?.data?.materials || []);
            setLoadingMaterials(false);
          }
        }
      } catch (error) {
        console.error('Error loading topics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTopicsAndResults();
  }, [location.state]);

  const handleTopicClick = async (topic) => {
    setSelectedTopic(topic);
    setLoadingMaterials(true);
    try {
      const matRes = await materialsAPI.getByTopic(topic.id);
      setTopicMaterials(matRes.data?.data?.materials || []);
    } catch (error) {
      console.error('Error loading materials:', error);
    } finally {
      setLoadingMaterials(false);
    }
  };

  const getTopicStyle = (topic) => {
    const slug = typeof topic === 'string' ? topic : topic?.slug;
    const iconUrl = typeof topic === 'object' ? topic?.icon_url : null;
    const key = (iconUrl || slug || '').toLowerCase();

    switch (key) {
      case 'code':
      case 'aljabar':
        return { emoji: '📊', color: 'blue', level: 'menengah', levelText: 'Intermediate' };
      case 'triangle':
      case 'geometri':
        return { emoji: '📐', color: 'blue', level: 'dasar', levelText: 'Beginner' };
      case 'calculator':
      case 'aritmatika':
        return { emoji: '🔢', color: 'orange', level: 'dasar', levelText: 'Beginner' };
      case 'trending':
      case 'statistika':
        return { emoji: '📈', color: 'purple', level: 'menengah', levelText: 'Intermediate' };
      case 'ruler':
      case 'trigonometri':
        return { emoji: '📏', color: 'red', level: 'lanjutan', levelText: 'Advanced' };
      case 'book':
        return { emoji: '📚', color: 'green', level: 'dasar', levelText: 'Beginner' };
      case 'abacus':
        return { emoji: '🧮', color: 'orange', level: 'menengah', levelText: 'Intermediate' };
      case 'lightbulb':
        return { emoji: '💡', color: 'purple', level: 'dasar', levelText: 'Beginner' };
      case 'science':
        return { emoji: '🧪', color: 'red', level: 'lanjutan', levelText: 'Advanced' };
      default:
        return { emoji: '📚', color: 'green', level: 'dasar', levelText: 'Beginner' };
    }
  };

  const getMaterialProgress = (materialTitle) => {
    const matResults = results.filter(r => r.material_title?.toLowerCase() === materialTitle?.toLowerCase());
    if (matResults.length === 0) return 0;
    const passed = matResults.some(r => r.passed);
    return passed ? 100 : 50;
  };

  // Calculate dynamic overall progress for a topic
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

  const handleMaterialClick = (topicId, materialId) => {
    navigate(`/topics/${topicId}/materials/${materialId}`);
  };

  // Filter topics based on activeFilter and getTopicStyle level mapping
  const filteredTopics = topics.filter(topic => {
    if (activeFilter === 'all') return true;
    const { level } = getTopicStyle(topic);
    return level === activeFilter;
  });

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Plus Jakarta Sans' }}>
        <h3>Memuat Topik...</h3>
      </div>
    );
  }

  return (
    <>
      {/* PAGE HEADER */}
      <div className="page-header">
        {selectedTopic && (
          <button className="back-btn" onClick={() => setSelectedTopic(null)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Kembali ke Topik
          </button>
        )}
        <h2>{selectedTopic ? selectedTopic.name : "Explore Topics"}</h2>
        <p>
          {selectedTopic 
            ? selectedTopic.description 
            : "Master everything from basic arithmetic to advanced theoretical calculus with interactive visual guides."
          }
        </p>
      </div>

      {/* FILTER TABS & TOPIK GRID VIEW */}
      {!selectedTopic ? (
        <>
          <div className="filter-row">
            <button 
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'dasar' ? 'active' : ''}`}
              onClick={() => setActiveFilter('dasar')}
            >
              Beginner
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'menengah' ? 'active' : ''}`}
              onClick={() => setActiveFilter('menengah')}
            >
              Intermediate
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'lanjutan' ? 'active' : ''}`}
              onClick={() => setActiveFilter('lanjutan')}
            >
              Advanced
            </button>
          </div>

          <div className="topics-grid">
            {filteredTopics.map((topic) => {
              const { emoji, color, level } = getTopicStyle(topic);
              const progress = getTopicProgress(topic.id);
              // Count lessons (materials) dynamically from database
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

            {filteredTopics.length === 0 && (
              <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <p style={{ color: 'var(--text-muted)' }}>Tidak ada topik di level ini.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* SUB-MATERI VIEW */
        <div className="sub-grid">
          {loadingMaterials ? (
            <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '2rem' }}>
              <p>Memuat materi...</p>
            </div>
          ) : (
            topicMaterials.map((material, idx) => {
              const progress = getMaterialProgress(material.title);
              return (
                <div 
                  key={material.id} 
                  className="sub-card" 
                  onClick={() => handleMaterialClick(selectedTopic.id, material.id)}
                >
                  <div className="sub-card-top">
                    <div className="sub-num">0{idx + 1}</div>
                    {progress === 100 && (
                      <span className="badge-lulus" style={{ fontSize: '0.7rem' }}>Selesai</span>
                    )}
                  </div>
                  <h4>{material.title}</h4>
                  <p>{material.description}</p>
                  <div className="sub-meta">5 Steps • 2 Videos</div>
                </div>
              );
            })
          )}

          {!loadingMaterials && topicMaterials.length === 0 && (
            <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-muted)' }}>Belum ada materi untuk topik ini.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TopicsPage;
