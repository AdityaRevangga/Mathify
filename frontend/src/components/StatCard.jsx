import React from 'react';

const StatCard = ({ icon, value, label, subText, progress, progressColor = "var(--orange)", chips }) => {
  // Determine the correct class names for icon background based on icon emoji/type
  const getIconClass = (emoji) => {
    if (emoji === '🔥') return 'stat-icon fire';
    if (emoji === '⭐') return 'stat-icon star';
    if (emoji === '✅') return 'stat-icon check';
    return 'stat-icon';
  };

  return (
    <div className="stat-card">
      <div className={getIconClass(icon)}>{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      
      {subText && (
        <div className="stat-sub">
          {subText}
        </div>
      )}

      {progress !== undefined && (
        <div className="stat-progress">
          <div 
            className="stat-progress-fill" 
            style={{ width: `${progress}%`, background: progressColor }}
          ></div>
        </div>
      )}

      {chips && chips.length > 0 && (
        <div className="stat-chips">
          {chips.map((chip, idx) => (
            <span key={idx} className="stat-chip">{chip}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatCard;
