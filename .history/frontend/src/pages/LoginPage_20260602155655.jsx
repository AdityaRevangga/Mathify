import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/login.css';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      if (result.user?.role === 'admin') {
        navigate('/admin/topics');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message || 'Email atau password salah');
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
          <h2>Continue your learning journey.</h2>
          <p>Your progress is saved. Your materials, quizzes, and achievements await your return.</p>
        </div>

        <div className="testimonial-card">
          <div className="testimonial-user">
            <div className="testimonial-avatar">👨🏾‍🎓</div>
            <div>
              <div className="testimonial-name">Alex Rivera</div>
              <div className="testimonial-role">11th Grade Student</div>
            </div>
          </div>
          <p className="testimonial-quote">
            "Mathify has completely transformed how I study. The interactive topics and step-by-step solutions make complex calculus feel like a game!"
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="form-container">
          <div className="form-header">
            <h3>Masuk ke Mathify</h3>
            <p>Selamat datang kembali! Silakan masukkan detail akun Anda.</p>
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
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-row-label">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>Lupa Password?</a>
              </div>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
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

            <div className="checkbox-group">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Ingat saya untuk 30 hari</label>
            </div>

            <button type="submit" className="btn-submit">
              Masuk ke Akun
              <span>→</span>
            </button>
          </form>

<div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleGoogleLogin()}
              className="btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 w-full h-[43px] rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <FcGoogle size={18} />
              Google
            </button>
            <button
              onClick={() => handleGoogleLogin()}
              className="btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 w-full h-[43px] rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <FaApple size={18} />
              Apple
            </button>
          </div>

          <div className="divider">atau</div>

          <div className="form-footer">
            Belum punya akun? <Link to="/register">Daftar sekarang</Link>
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

export default LoginPage;
