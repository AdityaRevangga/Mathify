import React from 'react';
import '../styles/shared.css';

const HelpPage = () => {
  const faqList = [
    {
      q: 'Bagaimana cara menaikkan tingkat pemahaman materi?',
      a: 'Setiap modul materi terdiri dari 4 tahapan belajar: membaca teori lengkap, menonton video penjelasan interaktif, mengerjakan latihan soal mandiri, dan menempuh kuis akhir modul. Selesaikan setiap langkah berurutan untuk memaksimalkan pemahaman Anda!'
    },
    {
      q: 'Bagaimana perhitungan poin XP di Mathify?',
      a: 'Anda mendapatkan 1.000 XP untuk setiap kuis yang berhasil diselesaikan dengan status lulus (skor >= 70). Jika Anda belum lulus, Anda tetap mendapatkan 200 XP sebagai apresiasi atas usaha belajar Anda. XP terkumpul akan menaikkan peringkat Anda di Papan Peringkat Mingguan.'
    },
    {
      q: 'Bagaimana cara menjaga Streak Belajar tetap menyala?',
      a: 'Streak Belajar menunjukkan konsistensi belajar Anda setiap hari. Selesaikan minimal satu latihan soal atau kuis setiap harinya untuk mempertahankan jumlah streak harian Anda. Jangan lewatkan satu hari pun!'
    },
    {
      q: 'Apakah saya bisa mengulang kuis yang tidak lulus?',
      a: 'Tentu saja! Di Mathify, kegagalan adalah bagian dari belajar. Anda dapat mengulang kuis modul kapan saja tanpa batas. Skor tertinggi Anda akan selalu dicatat sebagai pencapaian terbaik.'
    },
    {
      q: 'Bagaimana cara mengganti tingkatan kelas atau profil?',
      a: 'Buka halaman "Profile" atau "Pengaturan" di sidebar kiri. Di sana Anda dapat mengklik tombol "Edit Profil" untuk mengubah nama, email, username, serta tingkatan sekolah Anda (SD, SMP, SMA, atau Kuliah).'
    }
  ];

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* PAGE HEADER */}
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h2>Pusat Bantuan &amp; Panduan Belajar</h2>
        <p>Temukan tips, trik, penjelasan fitur, dan jawaban atas pertanyaan umum seputar platform Mathify.</p>
      </div>

      {/* QUICK GUIDE SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {/* Card 1: Memulai Belajar */}
        <div className="help-card" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--blue-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: '1.2rem', color: 'var(--blue)', marginBottom: '1rem', justifyContent: 'center' }}>📖</div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>1. Tahapan Alur Belajar</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Masuk ke halaman <strong>Topik Matematika</strong>, pilih modul, lalu ikuti panduan langkah demi langkah. Mulailah dengan teori visual, ikuti pembelajaran video, uji diri di latihan mandiri, lalu selesaikan kuis akhir.
          </p>
        </div>

        {/* Card 2: Sistem Gamifikasi */}
        <div className="help-card" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '40px', height: '40px', background: '#FFF7ED', borderRadius: '8px', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: '1.2rem', color: 'var(--orange)', marginBottom: '1rem', justifyContent: 'center' }}>🔥</div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>2. Poin XP &amp; Streak Harian</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Raih bonus 500 XP ekstra dengan menyelesaikan kuis sempurna tanpa salah! Jaga streak belajar harian Anda untuk bersaing dengan siswa lain secara sportif di papan peringkat mingguan Mathify.
          </p>
        </div>

        {/* Card 3: Asisten AI Interaktif */}
        <div className="help-card" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '40px', height: '40px', background: '#ECFDF5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: '1.2rem', color: 'var(--green)', marginBottom: '1rem', justifyContent: 'center' }}>💬</div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>3. Asisten Belajar Mathify AI</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Butuh bantuan ekstra saat membaca penjelasan rumus matematika? Gunakan Floating Action Button (FAB) obrolan chat bertanda balon pesan di kanan bawah untuk berinteraksi dengan AI tutor pribadi Anda.
          </p>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="help-card" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
          <span>❓</span> Pertanyaan Sering Diajukan (FAQ)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {faqList.map((item, idx) => (
            <div key={idx} style={{ paddingBottom: idx < faqList.length - 1 ? '1.25rem' : '0', borderBottom: idx < faqList.length - 1 ? '1px dashed var(--border)' : 'none' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--blue)' }}>Q:</span>
                {item.q}
              </h4>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.6', paddingLeft: '1.25rem' }}>
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT SUPPORT */}
      <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg, var(--blue), var(--blue-hover))', borderRadius: 'var(--radius)', padding: '1.5rem 2rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Masih butuh bantuan atau punya saran fitur?</h4>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>Hubungi tim dukungan akademis dan developer kami untuk masukan.</p>
        </div>
        <a 
          href="mailto:support@mathify.com" 
          className="btn"
          style={{ background: 'white', color: 'var(--blue)', borderRadius: 'var(--radius-xs)', fontSize: '0.825rem', padding: '0.55rem 1.1rem', fontWeight: 700 }}
        >
          Kirim Email Dukungan
        </a>
      </div>
    </div>
  );
};

export default HelpPage;
