import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const subjects = [
    { title: 'Bilangan', lessons: 11, color: '#FF6B35', image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&q=80' },
    { title: 'Aljabar dan Fungsi', lessons: 21, color: '#1A1A2E', image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&q=80' },
    { title: 'Trigonometry', lessons: 76, color: '#E91E8C', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80' },
    { title: 'Geometry', lessons: 19, color: '#2D2D2D', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  ];

  const features = [
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="3" /><polygon points="10,8 16,12 10,16" />
        </svg>
      ),
      title: 'Pelajaran Video',
      desc: 'Panduan berkualitas tinggi untuk konsep-konsep kompleks, dipecah menjadi modul 5 menit yang mudah dipahami.',
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 13h4" />
        </svg>
      ),
      title: 'Kuis Cerdas',
      desc: 'Penilaian adaptif yang menyesuaikan tingkat kesulitan berdasarkan performa Anda untuk memastikan penguasaan materi.',
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 6h18M3 12h12M3 18h8" />
        </svg>
      ),
      title: 'Langkah demi Langkah',
      desc: 'Bukan hanya mendapatkan jawaban; pahami logika di balik setiap langkah perhitungan.',
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
        </svg>
      ),
      title: 'Pelacakan Langsung',
      desc: 'Analitik visual bagi siswa dan orang tua untuk melacak perkembangan serta mengidentifikasi area yang memerlukan perhatian lebih.',
    },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif", backgroundColor: '#F8F9FF', color: '#1A1A2E', overflowX: 'hidden' }}>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 5%',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.07)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <span style={{ fontWeight: 800, fontSize: 22, color: '#2563EB', letterSpacing: '-0.5px' }}>Mathify</span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{
            padding: '8px 20px', borderRadius: 8, border: '1.5px solid #D1D5DB',
            background: 'white', color: '#374151', fontWeight: 600, fontSize: 14, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.borderColor = '#2563EB'; e.target.style.color = '#2563EB'; }}
            onMouseLeave={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.color = '#374151'; }}>
            Log In
          </button>
          <button onClick={() => navigate('/register')} style={{
            padding: '8px 20px', borderRadius: 8, border: 'none',
            background: '#2563EB', color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.target.style.background = '#1D4ED8'}
            onMouseLeave={e => e.target.style.background = '#2563EB'}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '100px 5% 60px',
        background: 'linear-gradient(135deg, #EFF6FF 0%, #F8F9FF 60%, #EDE9FE 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', top: 80, right: '8%', width: 420, height: 420, borderRadius: '50%', background: 'rgba(37,99,235,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 40, left: '3%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(139,92,246,0.07)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 60, width: '100%', maxWidth: 1200, margin: '0 auto', flexWrap: 'wrap' }}>
          {/* Left */}
          <div style={{ flex: 1, minWidth: 300, animation: 'fadeUp 0.8s ease both' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#EFF6FF', border: '1px solid #BFDBFE',
              borderRadius: 100, padding: '6px 16px', marginBottom: 24,
              fontSize: 13, fontWeight: 600, color: '#2563EB',
            }}>
              <span>✦</span> Merevolusi Pendidikan Matematika K-12
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: '-1px' }}>
              Kuasai Matematika<br />bersama{' '}
              <span style={{ color: '#2563EB' }}>Mathify</span>
            </h1>
            <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
              Buka potensi Anda dengan pelajaran interaktif, latihan berbasis AI yang dipersonalisasi, dan kurikulum yang dirancang untuk mengubah kecemasan terhadap matematika menjadi penguasaan matematika.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/register')} style={{
                padding: '14px 28px', borderRadius: 10, border: 'none',
                background: '#2563EB', color: 'white', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(37,99,235,0.3)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.target.style.background = '#1D4ED8'; e.target.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.target.style.background = '#2563EB'; e.target.style.transform = 'none'; }}>
                Mulai Belajar
              </button>
              <button style={{
                padding: '14px 28px', borderRadius: 10,
                border: '1.5px solid #D1D5DB', background: 'white',
                color: '#374151', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.target.style.borderColor = '#2563EB'; e.target.style.color = '#2563EB'; }}
                onMouseLeave={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.color = '#374151'; }}>
                Lihat Kurikulum
              </button>
            </div>
          </div>

          {/* Right image */}
          <div style={{ flex: 1, minWidth: 280, display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              width: '100%', maxWidth: 480, height: 340,
              borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(37,99,235,0.15)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80"
                alt="Math tools"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Mathify */}
      <section style={{ padding: '80px 5%', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, marginBottom: 12 }}>Mengapa Memilih Mathify?</h2>
            <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Kami menggabungkan pedagogi dengan teknologi mutakhir untuk menciptakan pengalaman belajar yang benar-benar efektif dan melekat.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                padding: '32px 28px', borderRadius: 16,
                border: '1.5px solid #F3F4F6',
                background: 'white',
                transition: 'all 0.25s',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#BFDBFE';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,99,235,0.1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#F3F4F6';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'none';
                }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: '#EFF6FF', color: '#2563EB',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section style={{ padding: '80px 5%', background: '#F8F9FF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#2563EB', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Jelajahi Mata Pelajaran</p>
              <h2 style={{ fontSize: 'clamp(12px, 3vw, 22px)', fontWeight: 300, lineHeight: 1.3, maxWidth: 800 }}>
                Dari aritmatika dasar hingga kalkulus tingkat lanjut, kami mencakup seluruh spektrum K-12 dengan jalur pembelajaran yang terkurasi.
              </h2>
            </div>
            <a href="#" style={{ color: '#2563EB', fontWeight: 600, fontSize: 14, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              View all 24 subjects →
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {subjects.map((s, i) => (
              <div key={i} style={{
                borderRadius: 16, overflow: 'hidden', position: 'relative',
                height: 280, cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'; }}>
                <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)`,
                }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 16px' }}>
                  <h3 style={{ color: 'white', fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{s.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{s.lessons} Lessons</span>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: 14,
                    }}>→</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        padding: '72px 5%',
        background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
        textAlign: 'center',
      }}>
        <h2 style={{ color: 'white', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, marginBottom: 16 }}>
          Siap untuk Mulai Belajar?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
          Bergabunglah dengan ribuan siswa yang sudah menguasai matematika bersama Mathify.
        </p>
        <button onClick={() => navigate('/register')} style={{
          padding: '14px 36px', borderRadius: 10,
          background: 'white', color: '#2563EB',
          fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
          onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)'; }}>
          Daftar Gratis Sekarang
        </button>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0F172A', color: 'white', padding: '60px 5% 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: 20, color: '#60A5FA', marginBottom: 12 }}>Mathify</h3>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>
                Empowering the next generation of mathematicians through accessible, engaging, and highly effective digital education.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                {['🌐', '✉️', '▶️'].map((icon, i) => (
                  <div key={i} style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, cursor: 'pointer',
                  }}>{icon}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: '#94A3B8', marginBottom: 16 }}>Celerates</h4>
              {['Our Team', 'About', 'Contact'].map(item => (
                <div key={item} style={{ marginBottom: 10 }}>
                  <a href="#" style={{ color: '#CBD5E1', fontSize: 14, textDecoration: 'none' }}>{item}</a>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: '#94A3B8', marginBottom: 16 }}>Learning</h4>
              {['All Courses', 'Smart Quizzes', 'Video Library', 'Study Planner'].map(item => (
                <div key={item} style={{ marginBottom: 10 }}>
                  <a href="#" style={{ color: '#CBD5E1', fontSize: 14, textDecoration: 'none' }}>{item}</a>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: '#94A3B8', marginBottom: 16 }}>Newsletter</h4>
              <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 14 }}>Get the latest math tips and course updates.</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input placeholder="Your email address" style={{
                  flex: 1, padding: '10px 14px', borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.07)', color: 'white',
                  fontSize: 14, outline: 'none',
                }} />
                <button style={{
                  padding: '10px 14px', borderRadius: 8, border: 'none',
                  background: '#2563EB', color: 'white', cursor: 'pointer', fontWeight: 700,
                }}>→</button>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ color: '#64748B', fontSize: 13 }}>© 2026 Mathify Academy. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 24 }}>
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map(item => (
                <a key={item} href="#" style={{ color: '#64748B', fontSize: 13, textDecoration: 'none' }}>{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;