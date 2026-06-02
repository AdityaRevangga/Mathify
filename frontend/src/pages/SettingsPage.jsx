import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/pengaturan.css';

const SettingsPage = () => {
  const { user, updateUserLocalState } = useAuth();

  // Settings states
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Notifications states
  const [emailNotif, setEmailNotif] = useState(true);
  const [quizReminders, setQuizReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  // Appearance
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('id');

  // Track baseline settings to compare changes dynamically (derived state)
  const [initialSettings, setInitialSettings] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    emailNotif: true,
    quizReminders: true,
    weeklyReports: false,
    theme: 'light',
    language: 'id'
  });

  useEffect(() => {
    if (user) {
      const isDark = document.body.classList.contains('dark-mode');
      const currentTheme = isDark ? 'dark' : 'light';
      
      setName(user.full_name || '');
      setUsername(user.username || '');
      setEmail(user.email || '');
      setTheme(currentTheme);

      setInitialSettings({
        name: user.full_name || '',
        username: user.username || '',
        email: user.email || '',
        password: '',
        emailNotif: true,
        quizReminders: true,
        weeklyReports: false,
        theme: currentTheme,
        language: 'id'
      });
    }
  }, [user]);

  // Derived state to determine if any changes have been made
  const hasChanges = 
    name !== initialSettings.name ||
    username !== initialSettings.username ||
    email !== initialSettings.email ||
    password !== initialSettings.password ||
    emailNotif !== initialSettings.emailNotif ||
    quizReminders !== initialSettings.quizReminders ||
    weeklyReports !== initialSettings.weeklyReports ||
    theme !== initialSettings.theme ||
    language !== initialSettings.language;

  const handleInputChange = (field, val) => {
    if (field === 'name') setName(val);
    if (field === 'username') setUsername(val);
    if (field === 'email') setEmail(val);
    if (field === 'password') setPassword(val);
  };

  const handleToggleChange = (setter, val) => {
    setter(val);
  };

  const handleAppearanceChange = (themeMode) => {
    setTheme(themeMode);
    if (themeMode === 'dark') {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleDiscard = () => {
    setName(initialSettings.name);
    setUsername(initialSettings.username);
    setEmail(initialSettings.email);
    setPassword(initialSettings.password);
    setEmailNotif(initialSettings.emailNotif);
    setQuizReminders(initialSettings.quizReminders);
    setWeeklyReports(initialSettings.weeklyReports);
    setLanguage(initialSettings.language);
    
    // Revert visual theme back to baseline
    const originalTheme = initialSettings.theme;
    setTheme(originalTheme);
    if (originalTheme === 'dark') {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSave = () => {
    if (!name || !username || !email) {
      alert('Nama, Username, dan Email wajib diisi!');
      return;
    }

    // Update context
    updateUserLocalState({
      ...user,
      full_name: name,
      username: username,
      email: email
    });

    // Synchronize initialSettings baseline
    setInitialSettings({
      name: name,
      username: username,
      email: email,
      password: '',
      emailNotif: emailNotif,
      quizReminders: quizReminders,
      weeklyReports: weeklyReports,
      theme: theme,
      language: language
    });
    setPassword('');

    alert('Pengaturan berhasil disimpan!');
  };

  return (
    <>
      {/* PAGE HEADER */}
      <div className="page-header">
        <h2>Pengaturan Akun</h2>
        <p>Kelola informasi pribadi, preferensi notifikasi, dan tampilan aplikasi Mathify Anda.</p>
      </div>

      {/* SETTINGS CARD: PERSONAL INFO */}
      <div className="settings-card">
        <div className="settings-card-header">
          <div className="settings-icon blue">👤</div>
          <div className="settings-card-title">Informasi Pribadi</div>
        </div>
        
        <div className="fields-grid" style={{ marginBottom: '1rem' }}>
          <div className="form-group">
            <label htmlFor="name">Nama Lengkap</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => handleInputChange('name', e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => handleInputChange('username', e.target.value)} 
            />
          </div>
        </div>

        <div className="fields-grid">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => handleInputChange('email', e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Ganti Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)} 
            />
          </div>
        </div>
      </div>

      {/* SETTINGS CARD: NOTIFICATIONS */}
      <div className="settings-card">
        <div className="settings-card-header">
          <div className="settings-icon orange">🔔</div>
          <div className="settings-card-title">Preferensi Notifikasi</div>
        </div>

        <div className="toggle-row">
          <div className="toggle-info">
            <h4>Notifikasi Email</h4>
            <p>Dapatkan email notifikasi ketika ada pembaruan materi pembelajaran baru.</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={emailNotif} 
              onChange={(e) => handleToggleChange(setEmailNotif, e.target.checked)} 
            />
            <span className="toggle-track"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-info">
            <h4>Pengingat Kuis Mingguan</h4>
            <p>Terima pengingat kuis mingguan untuk mempertahankan performa streak Anda.</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={quizReminders} 
              onChange={(e) => handleToggleChange(setQuizReminders, e.target.checked)} 
            />
            <span className="toggle-track"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-info">
            <h4>Laporan Progress Mingguan</h4>
            <p>Terima rangkuman statistik belajar mingguan langsung di email Anda.</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={weeklyReports} 
              onChange={(e) => handleToggleChange(setWeeklyReports, e.target.checked)} 
            />
            <span className="toggle-track"></span>
          </label>
        </div>
      </div>

      {/* SETTINGS CARD: APPEARANCE */}
      <div className="settings-card">
        <div className="settings-card-header">
          <div className="settings-icon green">🎨</div>
          <div className="settings-card-title">Tampilan &amp; Bahasa</div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Tema Aplikasi
          </div>
          <div className="appearance-grid">
            <div className="appearance-option">
              <input 
                type="radio" 
                name="theme" 
                id="theme-light" 
                checked={theme === 'light'} 
                onChange={() => handleAppearanceChange('light')} 
              />
              <label htmlFor="theme-light" className="appearance-card">
                <div className="appearance-icon">☀️</div>
                <div className="appearance-label">
                  <h4>Light Mode</h4>
                  <p>Tampilan cerah standar</p>
                </div>
                <div className="check-icon">✓</div>
              </label>
            </div>

            <div className="appearance-option">
              <input 
                type="radio" 
                name="theme" 
                id="theme-dark" 
                checked={theme === 'dark'} 
                onChange={() => handleAppearanceChange('dark')} 
              />
              <label htmlFor="theme-dark" className="appearance-card">
                <div className="appearance-icon">🌙</div>
                <div className="appearance-label">
                  <h4>Dark Mode</h4>
                  <p>Tampilan gelap ramah mata</p>
                </div>
                <div className="check-icon">✓</div>
              </label>
            </div>
          </div>
        </div>

        <div className="select-wrap">
          <label htmlFor="language">Bahasa Aplikasi</label>
          <select 
            id="language" 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="id">Bahasa Indonesia (ID)</option>
            <option value="en">English (US)</option>
          </select>
          <span className="select-arrow">▼</span>
        </div>
      </div>

      {/* SAVE BAR */}
      {hasChanges && (
        <div className="save-bar">
          <button className="btn-discard" onClick={handleDiscard}>Batalkan</button>
          <button className="btn-save-changes" onClick={handleSave}>Simpan Perubahan</button>
        </div>
      )}
    </>
  );
};

export default SettingsPage;
