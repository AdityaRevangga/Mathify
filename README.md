# 📐 Mathify - Platform Pembelajaran Matematika Online (Monorepo)

**Mathify** adalah platform pembelajaran matematika online interaktif kelas dunia yang dirancang khusus untuk mempermudah siswa memahami materi matematika (terutama konsep Aljabar dan Persamaan Linear) dengan metode gamifikasi yang modern, terstruktur, dan premium. 

Proyek ini menggunakan struktur **Monorepo** untuk menyatukan aplikasi **Frontend (React.js + Vite)** dan **Backend (Node.js + Express.js + PostgreSQL)** secara berdampingan sehingga memudahkan proses pengembangan, pengujian, dan penyebaran aplikasi.

---

## 🚀 Fitur Utama (Key Features)

*   **🎮 Gamifikasi & Progres Dinamis:** Dilengkapi dengan fitur XP (Experience Points), *daily streak*, pelacakan progres per topik secara *real-time*, dan visualisasi progres yang interaktif di Dashboard.
*   **📚 Kurikulum Aljabar Lengkap:** Menyediakan 5 Topik Utama dan 11 Sub-Materi Aljabar yang kaya akan konten edukatif, lengkap dengan ilustrasi HTML, rumus, dan visualisasi interaktif.
*   **🎬 Video Pembelajaran Terintegrasi:** Setiap materi dilengkapi dengan video tutorial interaktif menggunakan *responsive embedded YouTube player* untuk mendukung metode belajar visual.
*   **✨ Premium Practice Interface:** Area latihan soal interaktif dengan pilihan jawaban dinamis yang memberikan respons warna *real-time* (Hijau untuk jawaban benar, Merah untuk salah) lengkap dengan pembahasan penjelasan instan setelah dijawab.
*   **📝 Ujian Kuis Interaktif:** Dilengkapi dengan 11 Kuis unik untuk menguji pemahaman di setiap sub-materi dengan batas waktu (*time limit*) dan ambang batas kelulusan (*passing score*).
*   **👤 Manajemen Akun & Sinkronisasi Profil:** Fitur registrasi dan login yang aman menggunakan enkripsi JWT, sinkronisasi jenjang sekolah (SD, SMP, SMA, Kuliah), hingga fitur **Hapus Akun secara Permanen (Danger Zone)** yang menghapus seluruh data user dari database PostgreSQL secara bersih.
*   **🌐 Kompatibilitas Tunneling (Localtunnel/Ngrok Ready):** Konfigurasi Vite & Axios yang dioptimalkan untuk mempermudah pengujian di luar jaringan lokal menggunakan *tunneling* tanpa terblokir oleh *host security policy*.

---

## 🛠️ Teknologi yang Digunakan (Tech Stack)

### **Frontend (Client)**
*   **Core:** React.js (Vite 6)
*   **Styling:** Vanilla CSS (Desain modern *custom*, transisi halus, *responsive UI*, dan *dark/light details*)
*   **Routing:** React Router v6
*   **State & API Call:** React Context API & Axios

### **Backend (Server)**
*   **Core:** Node.js, Express.js
*   **Autentikasi:** JSON Web Token (JWT) & BcryptJS untuk enkripsi password
*   **Database:** PostgreSQL (Driver `pg`)
*   **Utilitas:** Concurrently (untuk menjalankan frontend & backend bersamaan)

---

## 📂 Struktur Folder Proyek

```text
Mathify/
├── Backend/               # Server API Node.js + Express
│   ├── migrations/        # File SQL inisialisasi tabel & benih data (seed)
│   ├── src/               # Logika kode backend (controllers, models, routes)
│   ├── .env               # Konfigurasi database & JWT backend (lokal)
│   ├── server.js          # Entry point server backend
│   └── setup-db.js        # Script inisialisasi & seeding PostgreSQL otomatis
├── frontend/              # Web Client React.js + Vite
│   ├── public/            # Aset statik publik frontend
│   ├── src/               # Komponen, halaman, gaya CSS, konteks, & API service
│   ├── .env               # Konfigurasi URL API backend
│   └── vite.config.js     # Konfigurasi Vite & proxy dev server
├── package.json           # Skrip Monorepo Root (Concurrently)
└── README.md              # Dokumentasi proyek (File ini)
```

---

## ⚙️ Persyaratan Sistem & Prasyarat
Sebelum menjalankan aplikasi, pastikan komputer Anda telah terinstal:
1.  **Node.js** (Rekomendasi versi LTS terbaru)
2.  **PostgreSQL** (Pastikan layanannya berjalan aktif di komputer lokal Anda)

---

## 💻 Panduan Instalasi & Cara Menjalankan Aplikasi

Ikuti 5 langkah mudah berikut untuk memulai aplikasi dari awal:

### **1. Buka Folder Utama**
Buka terminal (Command Prompt / PowerShell) di komputer Anda, lalu arahkan ke direktori root proyek:
```bash
cd path/to/Mathify
```

### **2. Konfigurasi File Lingkungan (`.env`)**

*   **Pada folder `Backend/.env`:**
    Buka file tersebut dan sesuaikan kredensial PostgreSQL lokal Anda:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=Isi_Password_PostgreSQL_Anda  # Ubah sesuai password PostgreSQL Anda
    DB_NAME=mathify
    JWT_SECRET=mathify_secret
    ```

*   **Pada folder `frontend/.env`:**
    Pastikan diarahkan ke port API backend Anda:
    ```env
    VITE_API_URL=http://localhost:3000
    ```

### **3. Install Semua Dependensi (Packages)**
Di terminal utama (direktori root `Mathify`), jalankan perintah berikut untuk menginstall library monorepo secara otomatis:
```bash
npm install
```

### **4. Jalankan Inisialisasi Database (Setup & Seeding)**
Jalankan perintah berikut untuk membuat database `mathify`, menyusun tabel-tabel relasional, dan mengimpor seluruh data pembelajaran serta akun dummy bawaan ke database secara otomatis:
```bash
npm run setup-db
```
*(Pastikan PostgreSQL Anda aktif sebelum menjalankan perintah ini. Jika berhasil, terminal akan menampilkan pesan `=== SETUP COMPLETED SUCCESSFULLY ===`)*

### **5. Jalankan Aplikasi secara Concurrently (Sekaligus)**
Untuk menjalankan server backend Express (port 3000) dan frontend React Vite (port 5173) secara bersamaan dalam satu terminal, cukup jalankan:
```bash
npm run dev
```
Setelah aplikasi berjalan, buka browser Anda dan akses: **`http://localhost:5173`**

---

## 👥 Akun Uji Coba Default (Seeded Accounts)

Untuk mempermudah pengujian seluruh fitur dan penyusunan laporan, Anda dapat menggunakan kredensial dummy bawaan database berikut tanpa harus mendaftar dari awal:

| Peran (Role) | Email | Username | Password | Deskripsi Fitur Uji |
|---|---|---|---|---|
| **Siswa 1 (Student)** | `siswa1@mathify.com` | `siswa1` | `siswa1` | Mencoba dashboard gamifikasi penuh, belajar materi, menjawab latihan, mengerjakan kuis, dan melihat poin XP/streak. |
| **Siswa 2 (Student)** | `siswa2@mathify.com` | `siswa2` | `siswa2` | Alternatif akun siswa lain untuk simulasi persaingan poin belajar. |
| **Guru (Teacher)** | `guru1@mathify.com` | `guru1` | `guru1` | Akun pendidik untuk meninjau materi pembelajaran. |
| **Admin** | `admin1@mathify.com` | `admin1` | `admin1` | Akun administrator platform. |

---

## 📸 Panduan Screenshot untuk Kebutuhan Dokumen Laporan
Jika Anda sedang menyusun laporan akademik atau proyek, sangat direkomendasikan untuk mengambil tangkapan layar (*screenshot*) pada bagian-bagian berikut:
1.  **Struktur Kode Monorepo:** Menampilkan susunan folder `/frontend` dan `/Backend` yang berdampingan di editor VS Code Anda.
2.  **Hasil Setup Database (`setup-db.js`):** Bukti terminal saat sukses mengeksekusi `npm run setup-db` yang memuat log tabel terbuat.
3.  **Halaman Autentikasi Modern:** Halaman login dengan desain bertema matematika dan kaca transparan (*glassmorphism*).
4.  **Halaman Dashboard:** Memperlihatkan grafik progres, tingkatan level belajar, jumlah XP, dan *weekly missions*.
5.  **Tampilan Pembelajaran & Video Player:** Konten tulisan interaktif dengan navigasi langkah-langkah (*steps*) dan pemutar video YouTube terintegrasi.
6.  **Fitur Penilaian Latihan Langsung:** Screenshot ketika mengklik jawaban latihan soal di mana tombol pilihan berubah warna menjadi hijau (jika benar) atau merah (jika salah) beserta teks pembahasan di bawahnya.
7.  **Sertifikasi Kuis Akhir:** Halaman ringkasan setelah menyelesaikan kuis 5 soal yang mencantumkan skor akhir kelulusan dan waktu tempuh.
8.  **Manajemen Profil & Danger Zone:** Halaman akun tempat pengguna mengganti profil atau menguji fitur penghapusan akun permanen.

---

📐 **Mathify** - *Belajar Matematika Jadi Lebih Mudah, Menyenangkan, dan Premium!*
