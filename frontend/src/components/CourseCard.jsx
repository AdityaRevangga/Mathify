import React from 'react';

const CourseCard = ({ 
  title, 
  description, 
  level = "Beginner", 
  progress = 0, 
  emoji = "📐", 
  color = "blue", 
  onResume 
}) => {
  // Determine badge class
  const getBadgeClass = (lvl) => {
    const l = lvl.toLowerCase();
    if (l === 'menengah' || l === 'intermediate') return 'course-level-badge badge-intermediate';
    if (l === 'pemula' || l === 'beginner' || l === 'dasar') return 'course-level-badge badge-beginner';
    return 'course-level-badge badge-advanced';
  };

  // Determine level translation
  const getLevelLabel = (lvl) => {
    const l = lvl.toLowerCase();
    if (l === 'menengah' || l === 'intermediate') return 'Menengah';
    if (l === 'pemula' || l === 'beginner' || l === 'dasar') return 'Pemula';
    return 'Lanjutan';
  };

  return (
    <div className="course-card">
      <div className={`course-thumb ${color}-bg`}>
        {emoji}
        <span className={getBadgeClass(level)}>{getLevelLabel(level)}</span>
      </div>
      <div className="course-body">
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="course-progress-row">
          <span>Progress Belajar</span>
          <span className={`progress-pct pct-${color}`}>{progress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-fill fill-${color}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <button 
          className={`btn-resume btn-resume-${color}`} 
          onClick={onResume}
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
