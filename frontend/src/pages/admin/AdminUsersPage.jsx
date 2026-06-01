import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { usersAPI } from '../../services/api';
import '../../styles/admin.css';

const AdminUsersPage = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    jenjang: 'smp',
    role: 'student',
    xp: 0,
    streak: 0,
    study_duration: 0
  });

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data?.data?.users || []);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Gagal memuat daftar pengguna.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['xp', 'streak', 'study_duration'];
    setFormData(prev => ({
      ...prev,
      [name]: numericFields.includes(name) ? parseInt(value) || 0 : value
    }));
  };

  const handleEditClick = (user) => {
    setError('');
    setSuccess('');
    setEditingUserId(user.id);
    setFormData({
      full_name: user.full_name || '',
      username: user.username || '',
      email: user.email || '',
      jenjang: user.jenjang || 'smp',
      role: user.role || 'student',
      xp: user.xp || 0,
      streak: user.streak || 0,
      study_duration: user.study_duration || 0
    });
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (id, name) => {
    if (currentUser && currentUser.id == id) {
      setError('Anda tidak dapat menghapus akun Admin Anda sendiri.');
      return;
    }

    if (!window.confirm(`Apakah Anda yakin ingin menghapus pengguna "${name}"?\nTindakan ini permanen dan akan menghapus semua riwayat kuis pengguna tersebut.`)) {
      return;
    }

    setError('');
    setSuccess('');
    try {
      const response = await usersAPI.delete(id);
      if (response.data && response.data.success) {
        setSuccess(`Akun "${name}" berhasil dihapus.`);
        loadUsers();
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.response?.data?.message || 'Gagal menghapus pengguna.');
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingUserId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.full_name.trim() || !formData.username.trim() || !formData.email.trim()) {
      setError('Nama lengkap, username, dan email wajib diisi.');
      return;
    }

    // Safeguard: Prevent current admin from demoting themselves
    if (editingUserId == currentUser.id && formData.role !== 'admin') {
      setError('Anda tidak dapat menonaktifkan hak akses Admin pada akun Anda sendiri.');
      return;
    }

    try {
      const response = await usersAPI.update(editingUserId, formData);
      if (response.data && response.data.success) {
        setSuccess(`Akun "${formData.full_name}" berhasil diperbarui.`);
        setIsFormOpen(false);
        setEditingUserId(null);
        loadUsers();
      }
    } catch (err) {
      console.error('Error saving user data:', err);
      setError(err.response?.data?.message || 'Gagal menyimpan perubahan.');
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(u => {
    const query = searchQuery.toLowerCase();
    return (
      (u.full_name || '').toLowerCase().includes(query) ||
      (u.username || '').toLowerCase().includes(query) ||
      (u.email || '').toLowerCase().includes(query)
    );
  });

  const formatStudyDuration = (seconds) => {
    if (!seconds) return '0 Menit';
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins} Menit`;
    const hrs = (mins / 60).toFixed(1);
    return `${hrs} Jam`;
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* HEADER */}
      <div className="admin-header">
        <div className="admin-header-title">
          <h2>Kelola Pengguna Mathify</h2>
          <p>Pantau progress, ubah peran (role), sesuaikan statistik belajar, atau hapus akun pengguna.</p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="admin-filter-bar" style={{ padding: '0.75rem 1rem' }}>
        <div className="search-bar" style={{ width: '100%', maxWidth: 'none', border: 'none', background: 'transparent', padding: 0 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Cari berdasarkan nama lengkap, username, atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.92rem', padding: '0.5rem 0.75rem', background: 'transparent', color: 'var(--text)' }}
          />
        </div>
      </div>

      {/* ALERTS */}
      {error && (
        <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '0.8rem 1.25rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontWeight: 500 }}>
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div style={{ background: '#D1FAE5', border: '1px solid #A7F3D0', color: '#065F46', padding: '0.8rem 1.25rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontWeight: 500 }}>
          ✅ {success}
        </div>
      )}

      {/* EDIT USER FORM CARD */}
      {isFormOpen && (
        <div className="admin-card">
          <div className="admin-card-title">
            <h3>Edit Detail Pengguna</h3>
            <button className="btn-icon" onClick={handleCancel}>✕</button>
          </div>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group-admin">
                <label htmlFor="fullName">Nama Lengkap</label>
                <input
                  type="text"
                  id="fullName"
                  name="full_name"
                  className="admin-input"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group-admin">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="admin-input"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group-admin">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="admin-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group-admin">
                <label htmlFor="jenjang">Jenjang Pendidikan</label>
                <select
                  id="jenjang"
                  name="jenjang"
                  className="admin-select"
                  value={formData.jenjang}
                  onChange={handleInputChange}
                >
                  <option value="sd">SD / MI</option>
                  <option value="smp">SMP / MTs</option>
                  <option value="sma">SMA / SMK / MA</option>
                </select>
              </div>
            </div>

            <div className="form-row" style={{ borderTop: '1px dashed var(--border)', paddingTop: '1.25rem', marginTop: '0.25rem' }}>
              <div className="form-group-admin">
                <label htmlFor="role" style={{ color: 'var(--blue)', fontWeight: 700 }}>Hak Akses Peran (Role)</label>
                <select
                  id="role"
                  name="role"
                  className="admin-select"
                  value={formData.role}
                  onChange={handleInputChange}
                  style={{ border: '1.5px solid var(--blue)' }}
                >
                  <option value="student">Siswa (Student)</option>
                  <option value="admin">Administrator (Admin)</option>
                </select>
              </div>
              <div className="form-group-admin">
                <label htmlFor="xp">Total Poin (XP)</label>
                <input
                  type="number"
                  id="xp"
                  name="xp"
                  className="admin-input"
                  min="0"
                  value={formData.xp}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group-admin">
                <label htmlFor="streak">Streak Belajar (Hari)</label>
                <input
                  type="number"
                  id="streak"
                  name="streak"
                  className="admin-input"
                  min="0"
                  value={formData.streak}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group-admin">
                <label htmlFor="duration">Total Durasi Belajar (Detik)</label>
                <input
                  type="number"
                  id="duration"
                  name="study_duration"
                  className="admin-input"
                  min="0"
                  value={formData.study_duration}
                  onChange={handleInputChange}
                  placeholder="Masukkan dalam detik..."
                />
              </div>
            </div>

            <div className="form-actions-admin">
              <button type="button" className="btn btn-outline" onClick={handleCancel}>
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DATA TABLE */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h4>Memuat data pengguna...</h4>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Pengguna</th>
                <th style={{ width: '20%' }}>Email</th>
                <th style={{ width: '15%' }}>Role</th>
                <th style={{ width: '30%' }}>Statistik Belajar</th>
                <th style={{ width: '10%' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const isSelf = currentUser && currentUser.id == user.id;
                return (
                  <tr key={user.id} style={{ background: isSelf ? 'rgba(47, 84, 235, 0.05)' : 'transparent' }}>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text)' }}>
                          {user.full_name} {isSelf && <span className="badge badge-blue" style={{ fontSize: '0.65rem', marginLeft: '0.25rem' }}>Anda</span>}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>@{user.username}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 700, marginTop: '0.15rem' }}>
                          Jenjang: {user.jenjang?.toUpperCase() || 'SMP'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>{user.email}</span>
                    </td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'badge-red' : 'badge-green'}`} style={{ fontWeight: 700 }}>
                        {user.role === 'admin' ? 'Admin' : 'Siswa'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', fontSize: '0.78rem' }}>
                        <span className="badge badge-blue">⭐ {user.xp?.toLocaleString() || 0} XP</span>
                        <span className="badge badge-orange">🔥 {user.streak || 0} Hari</span>
                        <span className="badge badge-blue" style={{ background: 'var(--bg-gray)', color: 'var(--text-muted)' }}>
                          ⏱️ {formatStudyDuration(user.study_duration)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon edit"
                          title="Edit Pengguna"
                          onClick={() => handleEditClick(user)}
                        >
                          ✏️
                        </button>
                        {!isSelf && (
                          <button
                            className="btn-icon delete"
                            title="Hapus Pengguna"
                            onClick={() => handleDeleteClick(user.id, user.full_name)}
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="admin-empty-state">
                    <div className="admin-empty-icon">👥</div>
                    <h3>Pengguna Tidak Ditemukan</h3>
                    <p>Tidak ada pengguna yang cocok dengan kriteria pencarian "{searchQuery}".</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
