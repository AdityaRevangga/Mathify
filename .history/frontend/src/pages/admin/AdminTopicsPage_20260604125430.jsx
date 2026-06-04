import React, { useState, useEffect } from 'react';
import { topicsAPI } from '../../services/api';
import '../../styles/admin.css';

const AdminTopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });

  const loadTopics = async () => {
    setLoading(true);
    try {
      const response = await topicsAPI.getAll();
      setTopics(response.data?.data?.topics || []);
    } catch (err) {
      console.error('Error loading topics:', err);
      setError('Gagal memuat daftar topik pelajaran.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Automatically generate slug from name if user is editing name
    if (name === 'name' && !editingId) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: generatedSlug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddClick = () => {
    setError('');
    setSuccess('');
    setEditingId(null);
    setFormData({ name: '', slug: '', description: '' });
    setIsFormOpen(true);
  };

  const handleEditClick = (topic) => {
    setError('');
    setSuccess('');
    setEditingId(topic.id);
    setFormData({
      name: topic.name,
      slug: topic.slug,
      description: topic.description || ''
    });
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (id, name) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus topik "${name}"?\nSemua materi dan kuis di bawah topik ini juga akan ikut terhapus.`)) {
      return;
    }
    
    setError('');
    setSuccess('');
    try {
      const response = await topicsAPI.delete(id);
      if (response.data && response.data.success) {
        setSuccess(`Topik "${name}" berhasil dihapus.`);
        loadTopics();
      }
    } catch (err) {
      console.error('Error deleting topic:', err);
      setError(err.response?.data?.message || 'Gagal menghapus topik.');
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim() || !formData.slug.trim()) {
      setError('Nama dan Slug topik wajib diisi.');
      return;
    }

    try {
      let response;
      if (editingId) {
        // Update existing topic
        response = await topicsAPI.update(editingId, formData);
        if (response.data && response.data.success) {
          setSuccess(`Topik "${formData.name}" berhasil diperbarui.`);
          setIsFormOpen(false);
          setEditingId(null);
          loadTopics();
        }
      } else {
        // Create new topic
        response = await topicsAPI.create(formData);
        if (response.data && response.data.success) {
          setSuccess(`Topik "${formData.name}" berhasil ditambahkan.`);
          setIsFormOpen(false);
          loadTopics();
        }
      }
    } catch (err) {
      console.error('Error saving topic:', err);
      setError(err.response?.data?.message || 'Gagal menyimpan topik. Pastikan slug unik.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* HEADER */}
      <div className="admin-header">
        <div className="admin-header-title">
          <h2>Kelola Topik Matematika</h2>
          <p>Tambahkan, edit, atau hapus topik utama pembelajaran matematika.</p>
        </div>
        {!isFormOpen && (
          <button className="btn btn-primary" onClick={handleAddClick}>
            <span>➕</span> Tambah Topik Baru
          </button>
        )}
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

      {/* FORM CARD (ADD / EDIT) */}
      {isFormOpen && (
        <div className="admin-card">
          <div className="admin-card-title">
            <h3>{editingId ? 'Edit Topik' : 'Tambah Topik Baru'}</h3>
            <button className="btn-icon" onClick={handleCancel}>✕</button>
          </div>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group-admin">
                <label htmlFor="name">Nama Topik</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="admin-input"
                  placeholder="Contoh: Geometri Bangun Datar"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group-admin">
                <label htmlFor="slug">Slug URL (Unik)</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  className="admin-input"
                  placeholder="Contoh: geometri-bangun-datar"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  disabled={!!editingId} // Disable slug editing for safety
                />
              </div>
            </div>
            <div className="form-group-admin">
              <label htmlFor="description">Deskripsi Singkat</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                className="admin-textarea"
                placeholder="Deskripsi mengenai materi yang dipelajari pada topik ini..."
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-actions-admin">
              <button type="button" className="btn btn-outline" onClick={handleCancel}>
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Simpan Perubahan' : 'Tambah Topik'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DATA TABLE */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h4>Memuat data topik...</h4>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '15%' }}>Slug</th>
                <th style={{ width: '25%' }}>Nama Topik</th>
                <th style={{ width: '40%' }}>Deskripsi</th>
                <th style={{ width: '10%' }}>Materi</th>
                <th style={{ width: '10%' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic) => (
                <tr key={topic.id}>
                  <td>
                    <span className="badge badge-blue">{topic.slug}</span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{topic.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{topic.description || '-'}</td>
                  <td>
                    <span className="badge badge-green" style={{ 
                      fontSize: '0.75rem',
                      whiteSpace: 'nowrap',
                      padding: '0.25rem 0.6rem'
                    }}>
                      {topic.material_count || 0} Materi
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon edit"
                        title="Edit Topik"
                        onClick={() => handleEditClick(topic)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon delete"
                        title="Hapus Topik"
                        onClick={() => handleDeleteClick(topic.id, topic.name)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {topics.length === 0 && (
                <tr>
                  <td colSpan="5" className="admin-empty-state">
                    <div className="admin-empty-icon">📊</div>
                    <h3>Belum Ada Topik</h3>
                    <p>Silakan klik tombol "Tambah Topik Baru" di atas untuk memulai.</p>
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

export default AdminTopicsPage;
