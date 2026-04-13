-- Seed Data untuk Mathify
-- Jalankan setelah migration 001_init.sql

-- ...existing code...

-- ==================== USERS ====================
INSERT INTO users (username, email, password, full_name, role) VALUES
('siswa1', 'siswa1@mathify.com', 'hashed_password_1', 'Ahmad Rizki', 'student'),
('siswa2', 'siswa2@mathify.com', 'hashed_password_2', 'Siti Nurhaliza', 'student'),
('guru1', 'guru1@mathify.com', 'hashed_password_3', 'Budi Santoso', 'teacher'),
('admin1', 'admin1@mathify.com', 'hashed_password_4', 'Admin Mathify', 'admin');

-- ==================== REFRESH TOKENS ====================
INSERT INTO refresh_tokens (user_id, token, expires_at, is_revoked) VALUES
((SELECT id FROM users WHERE username = 'siswa1'), 'refresh_token_siswa1_12345', NOW() + INTERVAL '7 days', false),
((SELECT id FROM users WHERE username = 'siswa2'), 'refresh_token_siswa2_67890', NOW() + INTERVAL '7 days', false),
((SELECT id FROM users WHERE username = 'guru1'), 'refresh_token_guru1_abcdef', NOW() + INTERVAL '7 days', false);

-- ==================== TOPICS ====================
INSERT INTO topics (name, slug, description, icon_url, sort_order) VALUES
('Aljabar', 'aljabar', 'Pelajari operasi matematika menggunakan simbol dan variabel', 'chart', 1),
('Geometri', 'geometri', 'Pelajari bentuk, ukuran, dan posisi bangun datar dan ruang', 'triangle', 2),
('Aritmatika', 'aritmatika', 'Pelajari operasi dasar bilangan: penjumlahan, pengurangan, perkalian, pembagian', 'numbers', 3),
('Statistika', 'statistika', 'Pelajari pengumpulan, pengolahan, dan analisis data', 'trending', 4),
('Trigonometri', 'trigonometri', 'Pelajari hubungan antara sudut dan sisi segitiga', 'ruler', 5);

-- ==================== MATERIALS ====================
-- Aljabar
INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'aljabar'), 'Persamaan Linear Satu Variabel', 'persamaan-linear-satu-variabel', 'Memahami dan menyelesaikan persamaan linear dengan satu variabel', 1),
((SELECT id FROM topics WHERE slug = 'aljabar'), 'Persamaan Linear Dua Variabel', 'persamaan-linear-dua-variabel', 'Menyelesaikan sistem persamaan linear dua variabel', 2),
((SELECT id FROM topics WHERE slug = 'aljabar'), 'Persamaan Kuadrat', 'persamaan-kuadrat', 'Memahami dan menyelesaikan persamaan kuadrat', 3);

-- Geometri
INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'geometri'), 'Bangun Datar', 'bangun-datar', 'Menghitung luas dan keliling bangun datar', 1),
((SELECT id FROM topics WHERE slug = 'geometri'), 'Bangun Ruang', 'bangun-ruang', 'Menghitung luas permukaan dan volume bangun ruang', 2);

-- Aritmatika
INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'aritmatika'), 'Operasi Bilangan Bulat', 'operasi-bilangan-bulat', 'Penjumlahan, pengurangan, perkalian, dan pembagian bilangan bulat', 1),
((SELECT id FROM topics WHERE slug = 'aritmatika'), 'FPB dan KPK', 'fpb-dan-kpk', 'Faktor Persekutuan Terbesar dan Kelipatan Persekutuan Terkecil', 2);

-- ==================== MATERIAL STEPS ====================
-- Steps untuk "Persamaan Linear Satu Variabel"
INSERT INTO material_steps (material_id, step_number, title, content, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'persamaan-linear-satu-variabel'), 1, 'Apa itu Persamaan Linear?', 'Persamaan linear satu variabel adalah persamaan yang memiliki satu variabel (biasanya x) dan pangkat tertingginya 1. Bentuk umumnya: ax + b = 0, dimana a tidak sama dengan 0.', 1),
((SELECT id FROM materials WHERE slug = 'persamaan-linear-satu-variabel'), 2, 'Memahami Bentuk Umum', 'Bentuk umum persamaan linear satu variabel adalah ax + b = 0. Contoh: 2x + 4 = 0, 3x - 6 = 0, -5x + 10 = 0. Variabel x memiliki pangkat 1 (tidak ada x kuadrat).', 2),
((SELECT id FROM materials WHERE slug = 'persamaan-linear-satu-variabel'), 3, 'Metode Penyelesaian', 'Untuk menyelesaikan persamaan linear satu variabel, pindahkan suku yang mengandung x ke satu sisi dan konstanta ke sisi lain. Contoh: 2x + 4 = 0, maka 2x = -4, maka x = -4/2 = -2.', 3),
((SELECT id FROM materials WHERE slug = 'persamaan-linear-satu-variabel'), 4, 'Contoh Soal', 'Selesaikan: 3x - 9 = 0. Langkah 1: 3x = 9. Langkah 2: x = 9/3. Langkah 3: x = 3. Jadi, penyelesaiannya adalah x = 3.', 4),
((SELECT id FROM materials WHERE slug = 'persamaan-linear-satu-variabel'), 5, 'Latihan', 'Coba selesaikan persamaan berikut: 1) 4x + 8 = 0  2) 5x - 15 = 0  3) -2x + 10 = 0. Jawaban: 1) x = -2  2) x = 3  3) x = 5', 5);

-- Steps untuk "Bangun Datar"
INSERT INTO material_steps (material_id, step_number, title, content, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'bangun-datar'), 1, 'Pengenalan Bangun Datar', 'Bangun datar adalah bangun yang terletak pada satu bidang datar. Contoh: persegi, persegi panjang, segitiga, lingkaran, trapesium, jajar genjang, dan layang-layang.', 1),
((SELECT id FROM materials WHERE slug = 'bangun-datar'), 2, 'Luas dan Keliling Persegi', 'Persegi memiliki keempat sisi sama panjang. Luas = sisi kali sisi = s kuadrat. Keliling = 4 kali sisi = 4s. Contoh: sisi = 5 cm, Luas = 25 cm2, Keliling = 20 cm.', 2),
((SELECT id FROM materials WHERE slug = 'bangun-datar'), 3, 'Luas dan Keliling Persegi Panjang', 'Persegi panjang memiliki sisi berhadapan sama panjang. Luas = panjang kali lebar = p kali l. Keliling = 2(p + l). Contoh: p=8 cm, l=5 cm, Luas = 40 cm2, Keliling = 26 cm.', 3);

-- ==================== VIDEOS ====================
INSERT INTO videos (material_id, title, description, video_url, thumbnail_url, duration, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'persamaan-linear-satu-variabel'), 'Pengenalan Persamaan Linear', 'Video pembelajaran dasar persamaan linear satu variabel', 'https://www.youtube.com/embed/example1', 'https://img.youtube.com/vi/example1/mqdefault.jpg', 600, 1),
((SELECT id FROM materials WHERE slug = 'persamaan-linear-satu-variabel'), 'Cara Menyelesaikan Persamaan Linear', 'Tutorial langkah demi langkah penyelesaian persamaan linear', 'https://www.youtube.com/embed/example2', 'https://img.youtube.com/vi/example2/mqdefault.jpg', 900, 2),
((SELECT id FROM materials WHERE slug = 'bangun-datar'), 'Menghitung Luas Bangun Datar', 'Video penjelasan rumus luas berbagai bangun datar', 'https://www.youtube.com/embed/example3', 'https://img.youtube.com/vi/example3/mqdefault.jpg', 720, 1);

-- ==================== QUIZZES ====================
INSERT INTO quizzes (material_id, title, description, time_limit, passing_score) VALUES
((SELECT id FROM materials WHERE slug = 'persamaan-linear-satu-variabel'), 'Quiz Persamaan Linear Satu Variabel', 'Uji pemahaman kamu tentang persamaan linear satu variabel', 15, 70),
((SELECT id FROM materials WHERE slug = 'bangun-datar'), 'Quiz Bangun Datar', 'Uji pemahaman kamu tentang luas dan keliling bangun datar', 20, 70);

-- ==================== QUIZ QUESTIONS ====================
-- Quiz: Persamaan Linear
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Quiz Persamaan Linear Satu Variabel'), 'Bentuk umum persamaan linear satu variabel adalah...', 'ax kuadrat + b = 0', 'ax + b = 0', 'ax + by = 0', 'a/x + b = 0', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Quiz Persamaan Linear Satu Variabel'), 'Penyelesaian dari 2x + 6 = 0 adalah...', 'x = 3', 'x = -3', 'x = 6', 'x = -6', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Quiz Persamaan Linear Satu Variabel'), 'Penyelesaian dari 3x - 12 = 0 adalah...', 'x = -4', 'x = 3', 'x = 4', 'x = 12', 'c', 3),
((SELECT id FROM quizzes WHERE title = 'Quiz Persamaan Linear Satu Variabel'), 'Jika 5x = 25, maka x = ...', '3', '4', '5', '6', 'c', 4),
((SELECT id FROM quizzes WHERE title = 'Quiz Persamaan Linear Satu Variabel'), 'Penyelesaian dari -2x + 8 = 0 adalah...', 'x = -4', 'x = 4', 'x = 8', 'x = -8', 'b', 5);

-- Quiz: Bangun Datar
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Quiz Bangun Datar'), 'Luas persegi dengan sisi 7 cm adalah...', '28 cm2', '49 cm2', '14 cm2', '35 cm2', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Quiz Bangun Datar'), 'Keliling persegi panjang dengan p=10 cm dan l=6 cm adalah...', '60 cm2', '16 cm', '32 cm', '30 cm', 'c', 2),
((SELECT id FROM quizzes WHERE title = 'Quiz Bangun Datar'), 'Luas persegi panjang dengan p=12 cm dan l=8 cm adalah...', '96 cm2', '20 cm2', '40 cm2', '80 cm2', 'a', 3),
((SELECT id FROM quizzes WHERE title = 'Quiz Bangun Datar'), 'Keliling persegi dengan sisi 9 cm adalah...', '81 cm', '36 cm', '18 cm', '27 cm', 'b', 4),
((SELECT id FROM quizzes WHERE title = 'Quiz Bangun Datar'), 'Luas segitiga dengan alas 10 cm dan tinggi 6 cm adalah...', '60 cm2', '30 cm2', '16 cm2', '36 cm2', 'b', 5);

-- ==================== QUIZ DISCUSSIONS ====================
-- Pembahasan Quiz Persamaan Linear
INSERT INTO quiz_discussions (question_id, explanation) VALUES
((SELECT id FROM quiz_questions WHERE question_text = 'Bentuk umum persamaan linear satu variabel adalah...'), 'Persamaan linear satu variabel memiliki bentuk umum ax + b = 0, dimana a tidak sama dengan 0. Variabel x memiliki pangkat 1 (bukan x kuadrat). Pilihan A salah karena mengandung x kuadrat, pilihan C adalah bentuk dua variabel, pilihan D bukan bentuk linear.'),
((SELECT id FROM quiz_questions WHERE question_text = 'Penyelesaian dari 2x + 6 = 0 adalah...'), 'Dari 2x + 6 = 0, pindahkan 6 ke ruas kanan: 2x = -6. Bagi kedua ruas dengan 2: x = -6/2 = -3. Jadi x = -3.'),
((SELECT id FROM quiz_questions WHERE question_text = 'Penyelesaian dari 3x - 12 = 0 adalah...'), 'Dari 3x - 12 = 0, pindahkan -12 ke ruas kanan: 3x = 12. Bagi kedua ruas dengan 3: x = 12/3 = 4. Jadi x = 4.'),
((SELECT id FROM quiz_questions WHERE question_text = 'Jika 5x = 25, maka x = ...'), 'Dari 5x = 25, bagi kedua ruas dengan 5: x = 25/5 = 5. Jadi x = 5.'),
((SELECT id FROM quiz_questions WHERE question_text = 'Penyelesaian dari -2x + 8 = 0 adalah...'), 'Dari -2x + 8 = 0, pindahkan 8 ke ruas kanan: -2x = -8. Bagi kedua ruas dengan -2: x = -8/(-2) = 4. Jadi x = 4.');

-- Pembahasan Quiz Bangun Datar
INSERT INTO quiz_discussions (question_id, explanation) VALUES
((SELECT id FROM quiz_questions WHERE question_text LIKE 'Luas persegi dengan sisi 7 cm%'), 'Luas persegi = sisi kali sisi = s kuadrat. Dengan s = 7 cm, Luas = 7 kali 7 = 49 cm2. Jadi jawabannya 49 cm2.'),
((SELECT id FROM quiz_questions WHERE question_text LIKE 'Keliling persegi panjang dengan p=10 cm%'), 'Keliling persegi panjang = 2(p + l) = 2(10 + 6) = 2 kali 16 = 32 cm. Perhatikan satuan: keliling menggunakan satuan panjang (cm), bukan cm2.'),
((SELECT id FROM quiz_questions WHERE question_text LIKE 'Luas persegi panjang dengan p=12 cm%'), 'Luas persegi panjang = p kali l = 12 kali 8 = 96 cm2. Jawabannya 96 cm2.'),
((SELECT id FROM quiz_questions WHERE question_text LIKE 'Keliling persegi dengan sisi 9 cm%'), 'Keliling persegi = 4 kali sisi = 4 kali 9 = 36 cm. Jawabannya 36 cm.'),
((SELECT id FROM quiz_questions WHERE question_text LIKE 'Luas segitiga dengan alas 10 cm%'), 'Luas segitiga = 1/2 kali alas kali tinggi = 1/2 kali 10 kali 6 = 30 cm2. Ingat selalu setengah dari alas kali tinggi, bukan langsung alas kali tinggi.');

-- ==================== QUIZ RESULTS ====================
INSERT INTO quiz_results (quiz_id, user_id, score, total_questions, correct_answers, time_taken, passed, answers) VALUES
((SELECT id FROM quizzes WHERE title = 'Quiz Persamaan Linear Satu Variabel'), (SELECT id FROM users WHERE username = 'siswa1'), 80, 5, 4, 600, true, '{"1":"b","2":"b","3":"c","4":"c","5":"b"}'),
((SELECT id FROM quizzes WHERE title = 'Quiz Bangun Datar'), (SELECT id FROM users WHERE username = 'siswa1'), 100, 5, 5, 900, true, '{"1":"b","2":"c","3":"a","4":"b","5":"b"}'),
((SELECT id FROM quizzes WHERE title = 'Quiz Persamaan Linear Satu Variabel'), (SELECT id FROM users WHERE username = 'siswa2'), 60, 5, 3, 750, false, '{"1":"a","2":"b","3":"c","4":"d","5":"a"}');