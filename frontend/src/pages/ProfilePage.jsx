import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { resultsAPI, authAPI } from '../services/api';
import '../styles/profil.css';

const ProfilePage = () => {
  const { user, updateUserLocalState, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Edit profile form state
  const [editName, setEditName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editJenjang, setEditJenjang] = useState('smp');

  useEffect(() => {
    if (user) {
      setEditName(user.full_name || '');
      setEditUsername(user.username || '');
      setEditEmail(user.email || '');
      setEditJenjang(user.jenjang || 'smp');
    }

    const loadProfileData = async () => {
      try {
        const res = await resultsAPI.getMyResults();
        setResults(res.data?.data?.results || []);
      } catch (error) {
        console.error('Error loading results in profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!editName || !editUsername || !editEmail) {
      alert('Semua field wajib diisi!');
      return;
    }

    try {
      const res = await authAPI.updateProfile({
        full_name: editName,
        username: editUsername,
        email: editEmail,
        jenjang: editJenjang
      });
      if (res.data && res.data.success) {
        updateUserLocalState(res.data.data.user);
        setIsEditing(false);
        alert('Profil berhasil diperbarui!');
      } else {
        alert(res.data.message || 'Gagal memperbarui profil.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert(err.response?.data?.message || 'Gagal memperbarui profil.');
    }
  };

  // Calculate dynamic stats from database quiz results
  const passedQuizzesCount = results.filter(r => r.passed).length;
  const avgScore = results.length > 0 
    ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length) 
    : 0;
  const totalXP = user?.xp || 0;

  const getStudyDurationString = () => {
    if (results.length === 0) return '0 Jam';
    // Sum user study duration directly from database (seeded user stats have it, new stats build it)
    const totalSeconds = user?.study_duration || 0;
    const hours = totalSeconds / 3600;
    if (hours < 1) {
      return `${Math.round(totalSeconds / 60)} Menit`;
    }
    return `${hours.toFixed(1).replace('.0', '')} Jam`;
  };

  const getWeeklyActivity = () => {
    const activity = { Sen: 0, Sel: 0, Rab: 0, Kam: 0, Jum: 0, Sab: 0, Min: 0 };
    const dayMap = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    
    results.forEach(r => {
      const date = new Date(r.created_at);
      const dayName = dayMap[date.getDay()];
      activity[dayName] += 30 + (r.correct_answers * 10);
    });

    return Object.keys(activity).map(day => ({
      day,
      val: activity[day] === 0 ? 0 : Math.min(activity[day], 95)
    }));
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Plus Jakarta Sans' }}>
        <h3>Memuat Profil...</h3>
      </div>
    );
  }

  return (
    <>
      {/* PROFILE BANNER */}
      <div className="profile-banner">
        <div className="profile-banner-left">
          <div className="profile-avatar-lg">👨‍🎓</div>
          <div className="profile-banner-info">
            <h2>{user?.full_name || user?.username || 'Budi Santoso'}</h2>
            <div className="profile-badges">
              <span className="profile-badge badge-active">Siswa Aktif</span>
              <span className="profile-badge badge-premium">Premium Akun</span>
            </div>
            <div className="profile-jenjang">Pendidikan: {editJenjang.toUpperCase()} • Bergabung {new Date(user?.created_at || Date.now()).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</div>
          </div>
        </div>
        <div className="profile-banner-actions">
          {!isEditing ? (
            <button className="btn-banner-outline" onClick={() => setIsEditing(true)}>
              Edit Profil
            </button>
          ) : (
            <button className="btn-banner-solid" onClick={() => setIsEditing(false)}>
              Batal
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        {/* VIEW DETAILS MODE */}
        {!isEditing ? (
          <>
            {/* TABS */}
            <div className="profile-tabs">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Ringkasan Belajar
              </button>
              <button 
                className={`tab-btn ${activeTab === 'pencapaian' ? 'active' : ''}`}
                onClick={() => setActiveTab('pencapaian')}
              >
                Lencana Pencapaian
              </button>
            </div>

            {activeTab === 'overview' && (
              <>
                {/* STATS GRID */}
                <div className="stats-grid">
                  <div className="stat-box">
                    <div className="stat-box-label">Durasi Belajar</div>
                    <div className="stat-box-value">{getStudyDurationString()}</div>
                  </div>
                  <div className="stat-box-value" style={{ display: 'none' }}></div> {/* dummy to maintain grid */}
                  <div className="stat-box">
                    <div className="stat-box-label">Total Poin Pangkat</div>
                    <div className="stat-box-value">{totalXP.toLocaleString()} XP</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-box-label">Kuis Lulus</div>
                    <div className="stat-box-value">{passedQuizzesCount} Kuis</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-box-label">Rata-rata Skor</div>
                    <div className="stat-box-value">{avgScore}%</div>
                  </div>
                </div>

                {/* INFO BELAJAR */}
                <div className="info-section">
                  <div className="info-section-title">Informasi Akun &amp; Pendidikan</div>
                  <div className="info-grid">
                    <div className="info-card">
                      <div className="info-card-icon">🏫</div>
                      <div>
                        <div className="info-card-label">Jenjang Sekolah</div>
                        <div className="info-card-value">{(user?.jenjang || 'smp').toUpperCase()}</div>
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-card-icon">💎</div>
                      <div>
                        <div className="info-card-label">Tipe Keanggotaan</div>
                        <div className="info-card-value">Mathify Premium</div>
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-card-icon">✉️</div>
                      <div>
                        <div className="info-card-label">Email Terdaftar</div>
                        <div className="info-card-value">{user?.email}</div>
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-card-icon">🔑</div>
                      <div>
                        <div className="info-card-label">Role Akun</div>
                        <div className="info-card-value">{user?.role === 'student' ? 'Siswa' : 'Pengajar'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CHART SECTION */}
                <div className="chart-section">
                  <div className="chart-title">Aktivitas Belajar 7 Hari Terakhir</div>
                  <div className="chart-box">
                    <div className="chart-label">Jumlah Latihan Soal &amp; Kuis Selesai</div>
                    <div className="chart-sub">Senin - Minggu</div>
                    
                    {/* Visual Bar Chart Grid using Flexbox */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '120px', padding: '1rem 2rem 0', background: 'var(--bg-soft)', borderRadius: 'var(--radius-sm)' }}>
                      {getWeeklyActivity().map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30px' }}>
                          <div style={{ width: '12px', height: `${item.val}px`, background: item.val > 60 ? 'var(--green)' : 'var(--blue)', borderRadius: '4px 4px 0 0', transition: 'height 0.5s ease-out' }}></div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontWeight: 600 }}>{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'pencapaian' && (
              <div className="info-section">
                <div className="info-section-title">Lencana Pencapaian Anda</div>
                <div className="info-grid">
                  <div className="info-card" style={{ opacity: results.length > 0 ? 1 : 0.4 }}>
                    <div className="info-card-icon" style={{ background: '#FFF7ED', fontSize: '1.75rem' }}>🔥</div>
                    <div>
                      <div className="info-card-value">Streak Pembelajar</div>
                      <div className="info-card-label">Belajar berturut-turut selama 7 hari.</div>
                    </div>
                  </div>

                  <div className="info-card" style={{ opacity: passedQuizzesCount > 0 ? 1 : 0.4 }}>
                    <div className="info-card-icon" style={{ background: '#EFF6FF', fontSize: '1.75rem' }}>🎓</div>
                    <div>
                      <div className="info-card-value">Master Aljabar Modul 1</div>
                      <div className="info-card-label">Menyelesaikan kuis aljabar pertama.</div>
                    </div>
                  </div>

                  <div className="info-card" style={{ opacity: avgScore >= 90 ? 1 : 0.4 }}>
                    <div className="info-card-icon" style={{ background: '#ECFDF5', fontSize: '1.75rem' }}>⭐</div>
                    <div>
                      <div className="info-card-value">Skor Sempurna</div>
                      <div className="info-card-label">Meraih skor 100 di kuis manapun.</div>
                    </div>
                  </div>

                  <div className="info-card" style={{ opacity: totalXP >= 3000 ? 1 : 0.4 }}>
                    <div className="info-card-icon" style={{ background: '#F5F3FF', fontSize: '1.75rem' }}>👑</div>
                    <div>
                      <div className="info-card-value">Kolektor XP</div>
                      <div className="info-card-label">Mengumpulkan total lebih dari 3000 XP.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* EDIT PROFILE VIEW MODE */
          <div className="edit-profile" style={{ display: 'block' }}>
            <button className="edit-back" onClick={() => setIsEditing(false)}>
              ← Batal &amp; Kembali
            </button>
            <div className="edit-card">
              <h3 className="edit-title">Ubah Detail Profil Anda</h3>
              <p className="edit-sub">Sesuaikan identitas akun Mathify Anda di bawah ini.</p>
              
              <form onSubmit={handleSaveProfile}>
                <div className="avatar-upload">
                  <div className="avatar-wrap">
                    <div className="avatar-edit-lg">👨‍🎓</div>
                    <div className="avatar-edit-btn">📷</div>
                  </div>
                  <span className="avatar-hint">Klik tombol kamera untuk mengganti avatar</span>
                </div>

                <div className="form-group">
                  <label htmlFor="editName">Nama Lengkap</label>
                  <input
                    type="text"
                    id="editName"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="editUsername">Username</label>
                    <input
                      type="text"
                      id="editUsername"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editEmail">Email Address</label>
                    <input
                      type="email"
                      id="editEmail"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="jenjang-title">Pilih Tingkatan Pendidikan Anda</div>
                <div className="jenjang-grid">
                  {['sd', 'smp', 'sma', 'kuliah'].map((j) => (
                    <div key={j} className="jenjang-option">
                      <input
                        type="radio"
                        name="editJenjang"
                        id={`edit-${j}`}
                        value={j}
                        checked={editJenjang === j}
                        onChange={() => setEditJenjang(j)}
                      />
                      <label htmlFor={`edit-${j}`} className="jenjang-card">
                        <div className={`jenjang-icon ${j}`}>
                          {j === 'sd' ? '🎒' : j === 'smp' ? '📐' : j === 'sma' ? '📚' : '🎓'}
                        </div>
                        <span className="jenjang-name">{j.toUpperCase()}</span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="edit-actions">
                  <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>
                    Batal
                  </button>
                  <button type="submit" className="btn-save">
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>

            {/* Danger Zone */}
            <div className="danger-zone">
              <div>
                <div className="danger-title">Danger Zone</div>
                <div className="danger-desc">Hapus akun secara permanen. Tindakan ini tidak bisa dibatalkan.</div>
              </div>
              <button 
                className="btn-danger"
                onClick={async () => {
                  if (confirm('Apakah Anda yakin ingin menghapus akun Anda secara permanen? Semua data progress belajar akan hilang.')) {
                    try {
                      const res = await authAPI.deleteAccount();
                      if (res.data && res.data.success) {
                        alert('Akun berhasil dihapus secara permanen.');
                        await logout();
                        navigate('/login');
                      } else {
                        alert(res.data.message || 'Gagal menghapus akun.');
                      }
                    } catch (err) {
                      console.error('Error deleting account:', err);
                      alert(err.response?.data?.message || 'Gagal menghapus akun.');
                    }
                  }
                }}
              >
                Hapus Akun
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
