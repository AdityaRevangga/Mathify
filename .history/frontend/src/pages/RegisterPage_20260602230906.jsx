import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/register.css';

import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jenjang, setJenjang] = useState('smp');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !fullName) {
      setError('Semua field wajib diisi');
      return;
    }

    const result = await register(username, email, password, fullName, jenjang);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Registrasi gagal. Email atau username mungkin sudah digunakan.');
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', background: 'white' }}>
      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="panel-logo">
          <div className="logo-icon">⊞</div>
          MathIfy
        </div>

        <div className="panel-content">
          <h2>Start your math mastery today.</h2>
          <p>Join millions of students learning geometry, algebra, and statistics through visual steps.</p>
        </div>

        <div className="panel-illustration">
          <span>🎯</span>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="form-container">
          <div className="form-header">
            <h3>Daftar Akun Baru</h3>
            <p>Mulai perjalanan belajar matematika interaktif Anda sekarang.</p>
          </div>

          {error && (
            <div style={{ 
              background: '#FEE2E2', 
              border: '1px solid #FCA5A5', 
              color: '#991B1B', 
              padding: '0.75rem 1rem', 
              borderRadius: 'var(--radius-sm)', 
              fontSize: '0.875rem', 
              fontWeight: 500,
              marginBottom: '1.25rem' 
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Nama Lengkap</label>
              <input
                type="text"
                id="fullName"
                placeholder="Ahmad Rizki"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="siswa1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="jenjang-label">Jenjang Pendidikan</div>
            <div className="jenjang-grid">
              <div className="jenjang-option">
                <input
                  type="radio"
                  name="jenjang"
                  id="sd"
                  value="sd"
                  checked={jenjang === 'sd'}
                  onChange={() => setJenjang('sd')}
                />
                <label htmlFor="sd" className="jenjang-card">
                  <div className="jenjang-icon sd">🎒</div>
                  <span className="jenjang-name">SD</span>
                </label>
              </div>

              <div className="jenjang-option">
                <input
                  type="radio"
                  name="jenjang"
                  id="smp"
                  value="smp"
                  checked={jenjang === 'smp'}
                  onChange={() => setJenjang('smp')}
                />
                <label htmlFor="smp" className="jenjang-card">
                  <div className="jenjang-icon smp">📐</div>
                  <span className="jenjang-name">SMP</span>
                </label>
              </div>

              <div className="jenjang-option">
                <input
                  type="radio"
                  name="jenjang"
                  id="sma"
                  value="sma"
                  checked={jenjang === 'sma'}
                  onChange={() => setJenjang('sma')}
                />
                <label htmlFor="sma" className="jenjang-card">
                  <div className="jenjang-icon sma">📚</div>
                  <span className="jenjang-name">SMA</span>
                </label>
              </div>

              <div className="jenjang-option">
                <input
                  type="radio"
                  name="jenjang"
                  id="kuliah"
                  value="kuliah"
                  checked={jenjang === 'kuliah'}
                  onChange={() => setJenjang('kuliah')}
                />
                <label htmlFor="kuliah" className="jenjang-card">
                  <div className="jenjang-icon kuliah">🎓</div>
                  <span className="jenjang-name">Kuliah</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn-submit">
              Daftar Akun
            </button>
          </form>

          <div className="divider">atau daftar dengan</div>

          <div className="social-btns">
            <button className="btn-social" onClick={() => alert('Google registration coming soon!')}>
              <span className="google-icon">G</span>
              Google
            </button>
            <button className="btn-social" onClick={() => alert('Apple registration coming soon!')}>
              <span className="apple-icon">🍎</span>
              Apple
            </button>
          </div>

          <div className="form-footer">
            Sudah punya akun? <Link to="/login">Masuk sekarang</Link>
          </div>

          <div className="form-legal">
            <a href="#" onClick={(e) => e.preventDefault()}>Ketentuan Layanan</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
