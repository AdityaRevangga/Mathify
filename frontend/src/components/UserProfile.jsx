import React from 'react';

const UserProfile = ({ name, role, avatar = "👨‍🎓", size = "sm" }) => {
  return (
    <div className={`user-chip ${size}`}>
      <div className="user-info">
        <div className="user-name">{name}</div>
        <div className="user-role">{role}</div>
      </div>
      <div className="user-avatar">{avatar}</div>
    </div>
  );
};

export default UserProfile;
