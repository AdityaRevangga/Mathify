# 🧮 Mathify - Platform Pembelajaran Matematika Online

Mathify adalah platform pembelajaran matematika online yang menyediakan materi step-by-step, video pembelajaran, quiz interaktif, dan pembahasan soal.

## 📋 Daftar Isi

- [Teknologi](#teknologi)
- [Struktur Project](#struktur-project)
- [Setup & Instalasi](#setup--instalasi)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Langkah Pembuatan](#langkah-pembuatan)

---

## 🛠 Teknologi

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Node.js | 18+ | Runtime JavaScript |
| Express.js | 4.x | Web Framework |
| PostgreSQL | 14+ | Database Relasional |
| pg | 8.x | PostgreSQL client untuk Node.js |
| bcryptjs | 2.x | Hashing password |
| jsonwebtoken | 9.x | Autentikasi JWT |
| cors | 2.x | Cross-Origin Resource Sharing |
| dotenv | 16.x | Environment variables |

---

## 📁 Struktur Project

```
mathify/
├── server.js                    # Entry point aplikasi
├── package.json                 # Dependencies & scripts
├── .env                         # Environment variables (TIDAK di-commit)
├── .gitignore                   # Git ignore rules
├── migrations/
│   ├── 001_init.sql             # Schema database (CREATE TABLE)
│   └── 002_seed_data.sql        # Data awal untuk testing
├── src/
│   ├── app.js                   # Express app configuration
│   ├── config/
│   │   └── database.js          # Koneksi PostgreSQL (Pool)
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── errorHandler.js      # Global error handler
│   ├── models/
│   │   ├── User.js              # Model user
│   │   ├── Topic.js             # Model topik matematika
│   │   ├── Material.js          # Model materi
│   │   ├── MaterialStep.js      # Model step-by-step materi
│   │   ├── Video.js             # Model video pembelajaran
│   │   ├── Quiz.js              # Model quiz
│   │   ├── QuizQuestion.js      # Model soal quiz
│   │   ├── QuizDiscussion.js    # Model pembahasan quiz
│   │   ├── QuizResult.js        # Model hasil quiz
│   │   └── RefreshToken.js      # Model refresh token
│   ├── controllers/
│   │   ├── authController.js    # Login, Register, Profile, Refresh, Logout
│   │   ├── topicController.js  # CRUD Topik
│   │   ├── materialController.js# CRUD Materi & Steps
│   │   ├── videoController.js   # CRUD Video
│   │   └── quizController.js    # CRUD Quiz, Submit, Hasil, Pembahasan
│   └── routes/
│       ├── authRoutes.js        # /api/auth/*
│       ├── topicRoutes.js       # /api/topics/*
│       ├── materialRoutes.js    # /api/topics/:topicId/materials/*
│       ├── videoRoutes.js       # /api/topics/:topicId/materials/:materialId/videos/*
│       └── quizRoutes.js        # /api/topics/:topicId/materials/:materialId/quizzes/*
└── README.md                    # Dokumentasi ini
```

---

## 🚀 Setup & Instalasi

### Prasyarat

1. **Node.js** versi 18 atau lebih baru terinstall
2. **PostgreSQL** versi 14 atau lebih baru terinstall dan berjalan

### Langkah Instalasi

#### 1. Clone / Masuk ke folder project

```bash
cd mathify
```

#### 2. Install dependencies

```bash
npm install
```

Ini akan menginstall semua package yang ada di `package.json`:
- express, cors, dotenv, pg, bcryptjs, jsonwebtoken (dependencies)
- nodemon (devDependencies - untuk hot reload saat development)

#### 3. Buat database PostgreSQL

Buka terminal / pgAdmin / psql, lalu jalankan:

```sql
CREATE DATABASE mathify;
```

#### 4. Konfigurasi environment variables

Edit file `.env` sesuai konfigurasi database Anda:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=mathify

JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=30m
JWT_REFRESH_EXPIRES_IN=7d
```

**Penting:** Ganti `DB_PASSWORD` dengan password PostgreSQL Anda, dan `JWT_SECRET` dengan string acak yang aman.

#### 5. Jalankan migrasi database

```bash
# Menggunakan script npm (menjalankan 001_init.sql)
npm run migrate

# Atau manual menggunakan psql
psql -U postgres -d mathify -f migrations/001_init.sql

# Untuk data awal (seed data)
psql -U postgres -d mathify -f migrations/002_seed_data.sql
```

#### 6. Jalankan server

```bash
# Development mode (dengan nodemon, auto-restart)
npm run dev

# Production mode
npm start
```

Server akan berjalan di `http://localhost:3000`

#### 7. Verifikasi

Buka browser atau gunakan curl:

```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "success": true,
  "message": "Mathify API is running",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

---

## 🗄 Database Schema

### Entity Relationship Diagram

```
users ─────────────────────────────────────────┐
    │                                          │
    │ 1                                        │
    ▼ N                                        │
quiz_results ◄───── quizzes ◄───── materials ◄───── topics
                      │               │
                      │ 1             │ 1
                      ▼ N             ▼ N
               quiz_questions    material_steps
                      │               │
                      │ 1             │ 1
                      ▼ 1             ▼ N
              quiz_discussions     videos

users ──1:N──► refresh_tokens
```

### Tabel-tabel

| Tabel | Deskripsi |
|-------|-----------|
| `users` | Data pengguna (username, email, password hash, role) |
| `topics` | Topik matematika (Aljabar, Geometri, dll) |
| `materials` | Materi pembelajaran dalam setiap topik |
| `material_steps` | Detail materi step-by-step |
| `videos` | Video pembelajaran untuk setiap materi |
| `quizzes` | Quiz untuk setiap materi |
| `quiz_questions` | Soal-soal quiz (pilihan ganda A/B/C/D) |
| `quiz_discussions` | Pembahasan untuk setiap soal quiz |
| `quiz_results` | Hasil pengerjaan quiz oleh user |
| `refresh_tokens` | Refresh token untuk memperbarui access token |

---

## 📡 API Endpoints

### Base URL: `/api`

---

### 🔐 Authentication

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | `/api/auth/register` | ❌ | Registrasi user baru |
| POST | `/api/auth/login` | ❌ | Login dan dapatkan access + refresh token |
| GET | `/api/auth/me` | ✅ | Dapatkan profil user saat ini |
| POST | `/api/auth/refresh` | ❌ | Perbarui access token menggunakan refresh token |
| POST | `/api/auth/logout` | ❌ | Logout (revoke refresh token) |
| POST | `/api/auth/logout-all` | ✅ | Logout dari semua perangkat |

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "siswa1",
  "email": "siswa1@email.com",
  "password": "password123",
  "full_name": "Siswa Satu"
}
```

Response:
```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "user": {
      "id": 1,
      "username": "siswa1",
      "email": "siswa1@email.com",
      "full_name": "Siswa Satu",
      "role": "student"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "a1b2c3d4e5f6..."
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "siswa1@email.com",
  "password": "password123"
}
```

Response: Sama seperti register, berisi user data + `accessToken` + `refreshToken`.

#### Get Profile

```http
GET /api/auth/me
Authorization: Bearer <accessToken>
```

#### Refresh Token

Ketika access token sudah kadaluarsa (30 menit), gunakan refresh token untuk mendapat token baru tanpa perlu login ulang.

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "a1b2c3d4e5f6..."
}
```

Response:
```json
{
  "success": true,
  "message": "Token berhasil diperbarui",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "x9y8z7w6v5u4..."
  }
}
```

**Catatan:** Setiap refresh menghasilkan refresh token baru (rotation). Token lama langsung di-revoke.

#### Logout

```http
POST /api/auth/logout
Content-Type: application/json

{
  "refreshToken": "a1b2c3d4e5f6..."
}
```

#### Logout dari Semua Perangkat

```http
POST /api/auth/logout-all
Authorization: Bearer <accessToken>
```

Response:
```json
{
  "success": true,
  "message": "Berhasil logout dari semua perangkat"
}
```

---

### 📚 Topics (Topik Matematika)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/topics` | ❌ | Daftar semua topik aktif |
| GET | `/api/topics/:id` | ❌ | Detail satu topik |
| POST | `/api/topics` | ✅ | Buat topik baru |
| PUT | `/api/topics/:id` | ✅ | Update topik |
| DELETE | `/api/topics/:id` | ✅ | Hapus topik |

#### Create Topic

```http
POST /api/topics
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Aljabar",
  "slug": "aljabar",
  "description": "Pelajari operasi matematika menggunakan simbol dan variabel",
  "icon_url": "📊",
  "sort_order": 1
}
```

---

### 📖 Materials (Materi)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/topics/:topicId/materials` | ❌ | Daftar materi dalam topik |
| GET | `/api/topics/:topicId/materials/:id` | ❌ | Detail materi + steps |
| POST | `/api/topics/:topicId/materials` | ✅ | Buat materi baru |
| PUT | `/api/topics/:topicId/materials/:id` | ✅ | Update materi |
| DELETE | `/api/topics/:topicId/materials/:id` | ✅ | Hapus materi |

#### Detail Materi (Step-by-step)

```http
GET /api/topics/1/materials/1
```

Response:
```json
{
  "success": true,
  "data": {
    "material": {
      "id": 1,
      "topic_id": 1,
      "title": "Persamaan Linear Satu Variabel",
      "slug": "persamaan-linear-satu-variabel",
      "description": "...",
      "topic_name": "Aljabar"
    },
    "steps": [
      {
        "id": 1,
        "step_number": 1,
        "title": "Apa itu Persamaan Linear?",
        "content": "Persamaan linear satu variabel adalah...",
        "image_url": null
      },
      {
        "id": 2,
        "step_number": 2,
        "title": "Memahami Bentuk Umum",
        "content": "Bentuk umum persamaan linear...",
        "image_url": null
      }
    ]
  }
}
```

---

### 📝 Material Steps (Detail Step-by-step)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/topics/:topicId/materials/:materialId/steps` | ❌ | Daftar semua step |
| POST | `/api/topics/:topicId/materials/:materialId/steps` | ✅ | Tambah step baru |
| PUT | `/api/topics/:topicId/materials/steps/:stepId` | ✅ | Update step |
| DELETE | `/api/topics/:topicId/materials/steps/:stepId` | ✅ | Hapus step |

#### Create Step

```http
POST /api/topics/1/materials/1/steps
Authorization: Bearer <token>
Content-Type: application/json

{
  "step_number": 1,
  "title": "Apa itu Persamaan Linear?",
  "content": "Persamaan linear satu variabel adalah...",
  "image_url": "https://example.com/image.png",
  "sort_order": 1
}
```

---

### 🎥 Videos (Video Pembelajaran)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/topics/:topicId/materials/:materialId/videos` | ❌ | Daftar video |
| GET | `/api/topics/:topicId/materials/:materialId/videos/:id` | ❌ | Detail video |
| POST | `/api/topics/:topicId/materials/:materialId/videos` | ✅ | Tambah video |
| PUT | `/api/topics/:topicId/materials/:materialId/videos/:id` | ✅ | Update video |
| DELETE | `/api/topics/:topicId/materials/:materialId/videos/:id` | ✅ | Hapus video |

#### Create Video

```http
POST /api/topics/1/materials/1/videos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Pengenalan Persamaan Linear",
  "description": "Video pembelajaran dasar persamaan linear",
  "video_url": "https://www.youtube.com/embed/example1",
  "thumbnail_url": "https://img.youtube.com/vi/example1/mqdefault.jpg",
  "duration": 600,
  "sort_order": 1
}
```

---

### ❓ Quiz

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/topics/:topicId/materials/:materialId/quizzes` | ❌ | Daftar quiz |
| GET | `/api/topics/:topicId/materials/:materialId/quizzes/:id` | ❌ | Detail quiz + soal (tanpa jawaban) |
| POST | `/api/topics/:topicId/materials/:materialId/quizzes` | ✅ | Buat quiz baru |
| PUT | `/api/topics/:topicId/materials/:materialId/quizzes/:id` | ✅ | Update quiz |
| DELETE | `/api/topics/:topicId/materials/:materialId/quizzes/:id` | ✅ | Hapus quiz |

#### Detail Quiz (Soal tanpa jawaban benar)

```http
GET /api/topics/1/materials/1/quizzes/1
```

Response:
```json
{
  "success": true,
  "data": {
    "quiz": {
      "id": 1,
      "title": "Quiz Persamaan Linear Satu Variabel",
      "description": "Uji pemahaman kamu...",
      "time_limit": 15,
      "passing_score": 70
    },
    "questions": [
      {
        "id": 1,
        "question_text": "Bentuk umum persamaan linear satu variabel adalah...",
        "option_a": "ax² + b = 0",
        "option_b": "ax + b = 0",
        "option_c": "ax + by = 0",
        "option_d": "a/x + b = 0"
      }
    ]
  }
}
```

**Catatan:** Field `correct_answer` sengaja disembunyikan saat menampilkan quiz agar tidak bisa dicurangi.

---

### 📝 Quiz Questions (Soal Quiz)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | `/api/topics/:topicId/materials/:materialId/quizzes/:id/questions` | ✅ | Tambah soal |
| PUT | `/api/topics/:topicId/materials/:materialId/quizzes/questions/:questionId` | ✅ | Update soal |
| DELETE | `/api/topics/:topicId/materials/:materialId/quizzes/questions/:questionId` | ✅ | Hapus soal |

#### Create Question

```http
POST /api/topics/1/materials/1/quizzes/1/questions
Authorization: Bearer <token>
Content-Type: application/json

{
  "question_text": "Bentuk umum persamaan linear satu variabel adalah...",
  "option_a": "ax² + b = 0",
  "option_b": "ax + b = 0",
  "option_c": "ax + by = 0",
  "option_d": "a/x + b = 0",
  "correct_answer": "b",
  "sort_order": 1
}
```

---

### ✅ Submit Quiz & Hasil

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | `/api/topics/:topicId/materials/:materialId/quizzes/:id/submit` | ✅ | Submit jawaban quiz |
| GET | `/api/topics/:topicId/materials/:materialId/quizzes/:id/results` | ✅ | Riwayat hasil quiz per quiz |
| GET | `/api/topics/:topicId/materials/:materialId/quizzes/results/:resultId` | ✅ | Detail hasil quiz |
| GET | `/api/my-results` | ✅ | Semua hasil quiz user |

#### Submit Quiz

```http
POST /api/topics/1/materials/1/quizzes/1/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "time_taken": 120,
  "answers": [
    { "question_id": 1, "selected_answer": "b" },
    { "question_id": 2, "selected_answer": "a" },
    { "question_id": 3, "selected_answer": "c" },
    { "question_id": 4, "selected_answer": "c" },
    { "question_id": 5, "selected_answer": "b" }
  ]
}
```

Response:
```json
{
  "success": true,
  "message": "Quiz berhasil disubmit",
  "data": {
    "result": {
      "id": 1,
      "score": 80,
      "total_questions": 5,
      "correct_answers": 4,
      "time_taken": 120,
      "passed": true,
      "answers": [
        {
          "question_id": 1,
          "selected_answer": "b",
          "correct_answer": "b",
          "is_correct": true
        },
        {
          "question_id": 2,
          "selected_answer": "a",
          "correct_answer": "b",
          "is_correct": false
        }
      ]
    }
  }
}
```

**Logika penilaian:**
- `score` = (jawaban benar / total soal) × 100
- `passed` = `true` jika `score >= passing_score` quiz

---

### 💡 Pembahasan Quiz

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/topics/:topicId/materials/:materialId/quizzes/:id/discussions` | ❌ | Pembahasan semua soal dalam quiz |
| POST | `/api/topics/:topicId/materials/:materialId/quizzes/questions/:questionId/discussions` | ✅ | Tambah pembahasan |
| PUT | `/api/topics/:topicId/materials/:materialId/quizzes/discussions/:discussionId` | ✅ | Update pembahasan |

#### Get Discussions

```http
GET /api/topics/1/materials/1/quizzes/1/discussions
```

Response:
```json
{
  "success": true,
  "data": {
    "discussions": [
      {
        "id": 1,
        "question_id": 1,
        "question_text": "Bentuk umum persamaan linear satu variabel adalah...",
        "option_a": "ax² + b = 0",
        "option_b": "ax + b = 0",
        "option_c": "ax + by = 0",
        "option_d": "a/x + b = 0",
        "correct_answer": "b",
        "explanation": "Persamaan linear satu variabel memiliki bentuk umum ax + b = 0...",
        "image_url": null
      }
    ]
  }
}
```

---

## 🏗 Langkah Pembuatan

Berikut adalah langkah-langkah pembuatan backend Mathify secara berurutan:

### Langkah 1: Inisialisasi Project

```bash
cd mathify
npm init -y
```

Membuat `package.json` sebagai file konfigurasi project Node.js. Kemudian edit package.json untuk menambahkan scripts dan dependencies.

### Langkah 2: Install Dependencies

```bash
npm install express cors dotenv pg bcryptjs jsonwebtoken
npm install --save-dev nodemon
```

- **express**: Framework web untuk membuat REST API
- **cors**: Mengizinkan request dari domain lain (frontend)
- **dotenv**: Membaca konfigurasi dari file `.env`
- **pg**: Driver PostgreSQL untuk Node.js
- **bcryptjs**: Mengenkripsi password agar aman
- **jsonwebtoken**: Membuat dan memverifikasi token JWT untuk autentikasi
- **nodemon**: Auto-restart server saat file berubah (development)

### Langkah 3: Buat Struktur Folder

```
src/
├── config/        → Konfigurasi database
├── middleware/    → Middleware (auth, error handler)
├── models/        → Query database (data access layer)
├── controllers/   → Logic bisnis (request handler)
└── routes/        → Definisi endpoint API
migrations/        → SQL schema & seed data
```

Pemisahan folder mengikuti pola **MVC (Model-View-Controller)** yang dimodifikasi untuk API:
- **Model**: Berinteraksi langsung dengan database
- **Controller**: Menghandle request, memanggil model, mengembalikan response
- **Routes**: Mendefinisikan URL endpoint dan menghubungkannya ke controller

### Langkah 4: Konfigurasi Environment Variables

Membuat file `.env` untuk menyimpan konfigurasi sensitif (password database, JWT secret) agar tidak hardcoded di source code. File ini ditambahkan ke `.gitignore`.

### Langkah 5: Setup Database Connection

Membuat `src/config/database.js` menggunakan **pg.Pool** untuk connection pooling. Pool mengelola kumpulan koneksi database yang bisa digunakan ulang, lebih efisien daripada membuat koneksi baru setiap request.

### Langkah 6: Buat Database Schema (Migration)

Membuat `migrations/001_init.sql` yang berisi:
- 9 tabel: users, topics, materials, material_steps, videos, quizzes, quiz_questions, quiz_discussions, quiz_results
- Relasi antar tabel menggunakan FOREIGN KEY
- Index untuk optimasi query performa

**Relasi utama:**
- Topic → Materials (1:N)
- Material → Steps (1:N)
- Material → Videos (1:N)
- Material → Quizzes (1:N)
- Quiz → Questions (1:N)
- Question → Discussion (1:1)
- Quiz + User → Results (N:M)

### Langkah 7: Buat Seed Data

Membuat `migrations/002_seed_data.sql` dengan data contoh:
- 5 topik: Aljabar, Geometri, Aritmatika, Statistika, Trigonometri
- 7 materi dengan pembagian per topik
- Langkah-langkah materi untuk "Persamaan Linear" dan "Bangun Datar"
- 3 video pembelajaran
- 2 quiz dengan masing-masing 5 soal pilihan ganda
- Pembahasan untuk setiap soal quiz

### Langkah 8: Buat Middleware

- **auth.js**: Middleware yang memverifikasi JWT token dari header `Authorization: Bearer <token>`. Jika valid, informasi user disimpan di `req.user`. Jika tidak valid, return 401.
- **errorHandler.js**: Global error handler yang menangkap semua error, termasuk PostgreSQL error codes (23505 untuk duplicate, 23503 untuk foreign key violation).

### Langkah 9: Buat Models

Setiap model berisi fungsi-fungsi CRUD yang menjalankan SQL query menggunakan `db.query()`:
- **User**: create, findByEmail, findByUsername, findById, verifyPassword
- **Topic**: findAll, findById, findBySlug, create, update, delete
- **Material**: findByTopicId, findById, findBySlug, create, update, delete
- **MaterialStep**: findByMaterialId, findById, create, update, delete
- **Video**: findByMaterialId, findById, create, update, delete
- **Quiz**: findByMaterialId, findById, create, update, delete
- **QuizQuestion**: findByQuizId, findById, create, update, delete, countByQuizId
- **QuizDiscussion**: findByQuestionId, findByQuizId, create, update, delete
- **QuizResult**: create, findByUserAndQuiz, findByUserId, findById, getBestScore

Menggunakan **parameterized queries** ($1, $2, dst) untuk mencegah SQL injection.

### Langkah 10: Buat Controllers

Controller menghandle request dari client:
- **authController**: Register (validasi + hash password + generate token), Login (verifikasi password + generate token), Me (get profil dari token)
- **topicController**: CRUD standar untuk topik
- **materialController**: CRUD materi + CRUD material steps (nested resource)
- **videoController**: CRUD video pembelajaran
- **quizController**: CRUD quiz + CRUD questions + submit quiz + hasil quiz + pembahasan

**Logika Submit Quiz:**
1. Ambil semua soal dari database
2. Bandingkan jawaban user dengan correct_answer
3. Hitung skor = (benar / total) × 100
4. Tentukan passed = skor >= passing_score
5. Simpan hasil ke quiz_results dengan answers dalam format JSONB

### Langkah 11: Buat Routes

Mendefinisikan endpoint API dan menghubungkannya ke controller:
- **authRoutes**: `/api/auth/*`
- **topicRoutes**: `/api/topics/*`
- **materialRoutes**: `/api/topics/:topicId/materials/*` (nested route dengan mergeParams)
- **videoRoutes**: `/api/topics/:topicId/materials/:materialId/videos/*`
- **quizRoutes**: `/api/topics/:topicId/materials/:materialId/quizzes/*`

Route menggunakan **nested resource pattern** agar URL merepresentasikan hubungan hierarki: Topic → Material → Video/Quiz.

### Langkah 12: Buat App & Server Entry Point

- **app.js**: Konfigurasi Express (cors, json parser, routes, 404 handler, error handler)
- **server.js**: Menjalankan server pada PORT yang dikonfigurasi

### Langkah 13: Testing

Jalankan server dan test endpoint menggunakan Postman / curl / Thunder Client.

---

## 📌 Catatan Penting

1. **Keamanan Password**: Password di-hash menggunakan bcryptjs sebelum disimpan ke database, tidak pernah disimpan plain text.
2. **Dual Token (Access + Refresh)**:
   - **Access Token**: Berusia pendek (30m), digunakan untuk akses API. Dikirim di header `Authorization: Bearer <accessToken>`.
   - **Refresh Token**: Berusia panjang (7d), disimpan di database. Digunakan untuk mendapat access token baru tanpa login ulang.
   - Saat refresh, token lama di-revoke dan diganti token baru (**rotation**) untuk mencegah replay attack.
3. **SQL Injection Prevention**: Semua query menggunakan parameterized queries ($1, $2).
4. **Quiz Security**: Endpoint detail quiz menyembunyikan `correct_answer`, baru terlihat saat submit dan pembahasan.
5. **CORS**: Diaktifkan untuk mengizinkan frontend mengakses API dari domain/port berbeda.
6. **Logout**: Refresh token di-revoke dari database saat logout, sehingga token yang dicuri tidak bisa digunakan lagi.
