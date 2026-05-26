import React from 'react';

const ProgressBar = ({ progress = 0, color = "var(--blue)" }) => {
  return (
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{ width: `${progress}%`, background: color }}
      ></div>
    </div>
  );
};

export default ProgressBar;
