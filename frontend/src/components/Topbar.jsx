import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Topbar = ({ placeholder = "Cari materi...", onSearch }) => {
  const { user } = useAuth();

  const displayName = user?.full_name || user?.username || 'Budi Santoso';
  const roleText = user?.role === 'student' ? 'Siswa' : user?.role === 'admin' ? 'Admin' : 'Siswa';

  return (
    <header className="topbar">
      <div className="search-bar">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
      </div>
      <div className="topbar-right">
        <button className="topbar-icon-btn" aria-label="Notifikasi">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <Link to="/help" className="topbar-icon-btn" aria-label="Bantuan">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </Link>
        <Link to="/profile" className="user-chip">
          <div className="user-info">
            <div className="user-name">{displayName}</div>
            <div className="user-role">{roleText}</div>
          </div>
          <div className="user-avatar">👨‍🎓</div>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
