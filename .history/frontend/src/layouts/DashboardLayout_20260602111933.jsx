import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../styles/dashboard.css'; // Make sure the dashboard grid is imported

const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', background: 'var(--bg-soft)' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Topbar />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
// Note: individual pages will import their own CSS files if they override styles or add specific grids.
