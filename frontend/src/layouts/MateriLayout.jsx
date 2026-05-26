import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import '../styles/materi.css'; // Make sure materi styles are loaded

const MateriLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Topbar />
      <Outlet />
    </div>
  );
};

export default MateriLayout;
