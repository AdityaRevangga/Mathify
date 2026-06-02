import React from 'react';

const QuizCard = ({ 
  title, 
  description, 
  questionsCount = 5, 
  bestScore = null, 
  completed = false, 
  isNew = false, 
  color = "blue", 
  onAction 
}) => {
  return (
    <div className={`quiz-card ${completed ? 'completed' : ''}`}>
      <div className="quiz-card-top">
        <div className={`quiz-icon ${color}`}>📝</div>
        {completed ? (
          <span className="badge-lulus">Lulus</span>
        ) : isNew ? (
          <span className="badge-new">New</span>
        ) : null}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="quiz-meta-row">
        <span className="quiz-questions">{questionsCount} Pertanyaan</span>
        {bestScore !== null ? (
          <span className="quiz-score-best">Skor Terbaik: {bestScore}/100</span>
        ) : (
          <span className="quiz-score-none">Belum Dikerjakan</span>
        )}
      </div>
      {completed ? (
        <button className="btn-retry" onClick={onAction}>Coba Lagi</button>
      ) : (
        <button className="btn-start" onClick={onAction}>Mulai Kuis</button>
      )}
    </div>
  );
};

export default QuizCard;
