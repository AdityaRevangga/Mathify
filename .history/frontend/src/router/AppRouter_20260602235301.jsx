import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';
import MateriLayout from '../layouts/MateriLayout';
import GoogleCallbackPage from '../pages/GoogleCallbackPage';

// Pages
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import TopicsPage from '../pages/TopicsPage';
import MaterialPage from '../pages/MaterialPage';
import QuizListPage from '../pages/QuizListPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import HelpPage from '../pages/HelpPage';

// Admin Pages
import AdminTopicsPage from '../pages/admin/AdminTopicsPage';
import AdminMaterialsPage from '../pages/admin/AdminMaterialsPage';
import AdminQuizzesPage from '../pages/admin/AdminQuizzesPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';

const AppRouter = () => {
  return (
    <Routes>
      {/* Landing Page - public, tidak dibungkus AuthLayout */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/quiz" element={<QuizListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />

          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/topics" element={<AdminTopicsPage />} />
            <Route path="/admin/materials" element={<AdminMaterialsPage />} />
            <Route path="/admin/quizzes" element={<AdminQuizzesPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
          </Route>
        </Route>

        <Route element={<MateriLayout />}>
          <Route path="/topics/:topicId/materials/:materialId" element={<MaterialPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
