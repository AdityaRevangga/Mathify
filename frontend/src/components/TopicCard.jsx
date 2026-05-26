import React from 'react';

const TopicCard = ({ 
  title, 
  description, 
  lessonsCount = 0, 
  progress = 0, 
  level = "dasar", 
  emoji = "🔢", 
  color = "blue", 
  onClick 
}) => {
  // Determine progress label classes and labels
  const getProgressLabelAndClass = (prog) => {
    if (prog === 0) {
      return { label: "Not Started", className: "topic-progress-label prog-none" };
    }
    if (prog === 100) {
      return { label: "Completed", className: "topic-progress-label prog-green" };
    }
    return { label: `${prog}% Complete`, className: `topic-progress-label prog-${color}` };
  };

  const { label: progLabel, className: labelClass } = getProgressLabelAndClass(progress);

  return (
    <div className="topic-card" data-level={level} onClick={onClick}>
      <div className="topic-card-top">
        <div className={`topic-icon icon-${color}`}>{emoji}</div>
        <span className={labelClass}>{progLabel}</span>
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
      <div className="topic-meta">{lessonsCount} Lessons</div>
      <div className="progress-bar">
        <div 
          className={`progress-fill ${progress === 0 ? 'fill-none' : `fill-${color}`}`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TopicCard;
