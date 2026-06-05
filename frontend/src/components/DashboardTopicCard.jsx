import React from 'react';
import '../styles/dashboard-topic-card.css';

const DashboardTopicCard = ({ 
  title, 
  description, 
  levelText = "Beginner", 
  imageUrl = null,
  onClick 
}) => {
  // Mapping level colors similar to the design
  const getBadgeColor = (text) => {
    switch (text.toLowerCase()) {
      case 'beginner': return 'var(--green)'; // or #065F46
      case 'intermediate': return 'var(--blue)'; // or #1E3A8A
      case 'advanced': return '#A0522D'; // Brownish/Orange
      default: return 'var(--blue)';
    }
  };

  return (
    <div className="dash-topic-card" onClick={onClick}>
      <div className="dash-topic-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="dash-topic-image" />
        ) : (
          <div className="dash-topic-placeholder"></div>
        )}
        <div className="dash-topic-badge" style={{ color: getBadgeColor(levelText) }}>
          {levelText}
        </div>
      </div>
      <div className="dash-topic-content">
        <h4 className="dash-topic-title">{title}</h4>
        <p className="dash-topic-desc">{description}</p>
      </div>
    </div>
  );
};

export default DashboardTopicCard;
