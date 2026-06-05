-- ============================================================
-- SEED DATA: TOPIK BILANGAN
-- Sesuai PDF referensi Mathify
-- correct_answer: 0=A, 1=B, 2=C, 3=D
-- ============================================================

-- ==================== TOPIC ====================
INSERT INTO topics (name, slug, description, icon_url, sort_order) VALUES
('Bilangan', 'bilangan', 'Pelajari jenis-jenis bilangan, operasi bilangan bulat, FPB & KPK, serta bilangan berpangkat dan akar.', 'hash', 1);

-- ==================== MATERIALS ====================
INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'bilangan'), 'Jenis-jenis Bilangan', 'jenis-jenis-bilangan', 'Mengenal berbagai jenis bilangan yang menjadi fondasi seluruh matematika.', 1),
((SELECT id FROM topics WHERE slug = 'bilangan'), 'Operasi pada Bilangan Bulat', 'operasi-bilangan-bulat', 'Memahami aturan penjumlahan, pengurangan, perkalian, dan pembagian bilangan bulat termasuk bilangan negatif.', 2),
((SELECT id FROM topics WHERE slug = 'bilangan'), 'Faktor, Kelipatan, FPB, dan KPK', 'fpb-dan-kpk', 'Memahami konsep faktor dan kelipatan serta cara mencari FPB dan KPK.', 3),
((SELECT id FROM topics WHERE slug = 'bilangan'), 'Bilangan Berpangkat dan Akar', 'bilangan-berpangkat-akar', 'Memahami notasi pangkat, sifat-sifat bilangan berpangkat, dan operasi akar.', 4);

-- ==================== MATERIAL STEPS ====================
INSERT INTO material_steps (material_id, step_number, title, content, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'jenis-jenis-bilangan'), 1, 'Jenis-jenis Bilangan', '<h3>Mengenal Jenis-jenis Bilangan</h3><p>Bilangan adalah konsep dasar yang digunakan untuk menghitung, mengukur, dan memberi label. Ada beberapa jenis bilangan yang perlu dipahami:</p><ul><li><strong>Bilangan asli</strong> adalah bilangan bulat positif mulai dari 1, 2, 3, dan seterusnya. Bilangan ini digunakan untuk menghitung benda nyata.</li><li><strong>Bilangan cacah</strong> adalah bilangan asli yang ditambah dengan nol, dimulai dari 0, 1, 2, 3, dan seterusnya.</li><li><strong>Bilangan bulat</strong> mencakup semua bilangan cacah ditambah bilangan negatif seperti −1, −2, −3. Bilangan bulat tidak memiliki pecahan atau koma.</li><li><strong>Bilangan rasional</strong> adalah bilangan yang dapat ditulis dalam bentuk pecahan p/q di mana p dan q adalah bilangan bulat dan q tidak sama dengan nol. Contoh: 1/2, 3/4, 0,75.</li><li><strong>Bilangan irasional</strong> adalah bilangan yang tidak bisa ditulis sebagai pecahan sederhana. Desimalnya tidak berulang dan tidak berhenti. Contoh: √2 = 1,41421... dan π = 3,14159...</li><li><strong>Bilangan real</strong> adalah gabungan dari semua bilangan rasional dan irasional.</li></ul>', 1),

((SELECT id FROM materials WHERE slug = 'operasi-bilangan-bulat'), 1, 'Operasi pada Bilangan Bulat', '<h3>Aturan Operasi Bilangan Bulat</h3><p>Ketika mengoperasikan bilangan bulat, ada aturan tanda yang wajib dipahami.</p><p>Pada penjumlahan dan pengurangan: bilangan positif bergerak ke kanan pada garis bilangan, bilangan negatif bergerak ke kiri. Contoh: 5 + (−3) = 5 − 3 = 2 dan −4 + (−2) = −6.</p><p>Pada perkalian dan pembagian, berlaku aturan tanda:</p><ul><li>Positif × Positif = Positif. Contoh: 3 × 4 = 12</li><li>Negatif × Negatif = Positif. Contoh: (−3) × (−4) = 12</li><li>Positif × Negatif = Negatif. Contoh: 3 × (−4) = −12</li><li>Negatif × Positif = Negatif. Contoh: (−3) × 4 = −12</li></ul><p>Aturan yang sama berlaku untuk pembagian.</p><p><strong>Urutan pengerjaan operasi (PEMDAS):</strong> Tanda kurung dikerjakan pertama, kemudian pangkat, lalu perkalian dan pembagian (dari kiri ke kanan), terakhir penjumlahan dan pengurangan.</p>', 1),

((SELECT id FROM materials WHERE slug = 'fpb-dan-kpk'), 1, 'Faktor, Kelipatan, FPB, dan KPK', '<h3>Konsep Faktor dan Kelipatan</h3><p><strong>Faktor</strong> suatu bilangan adalah bilangan-bilangan yang dapat membagi bilangan tersebut secara habis. Contoh: faktor dari 12 adalah 1, 2, 3, 4, 6, dan 12.</p><p><strong>Kelipatan</strong> suatu bilangan adalah hasil perkalian bilangan tersebut dengan bilangan asli. Contoh: kelipatan 4 adalah 4, 8, 12, 16, 20, dan seterusnya.</p><p><strong>FPB (Faktor Persekutuan Terbesar)</strong> adalah faktor terbesar yang dimiliki bersama oleh dua bilangan atau lebih. Cara mencari FPB menggunakan faktorisasi prima.</p><p>Contoh mencari FPB dari 24 dan 36: Faktorisasi prima 24 = 2³ × 3 dan 36 = 2² × 3². FPB diambil dari faktor yang sama dengan pangkat terkecil: 2² × 3 = 12.</p><p><strong>KPK (Kelipatan Persekutuan Terkecil)</strong> adalah kelipatan terkecil yang dimiliki bersama. Dari faktorisasi prima, KPK diambil semua faktor dengan pangkat terbesar: 2³ × 3² = 72.</p><p>FPB berguna untuk menyederhanakan pecahan. KPK berguna untuk menyamakan penyebut pecahan.</p>', 1),

((SELECT id FROM materials WHERE slug = 'bilangan-berpangkat-akar'), 1, 'Bilangan Berpangkat dan Akar', '<h3>Bilangan Berpangkat</h3><p>Bilangan berpangkat ditulis sebagai aⁿ yang berarti bilangan a dikalikan dengan dirinya sendiri sebanyak n kali. Bilangan a disebut basis dan n disebut eksponen atau pangkat. Contoh: 2⁵ = 32.</p><p>Sifat-sifat penting bilangan berpangkat:</p><ul><li>aᵐ × aⁿ = aᵐ⁺ⁿ (perkalian basis sama, pangkat dijumlah)</li><li>aᵐ ÷ aⁿ = aᵐ⁻ⁿ (pembagian basis sama, pangkat dikurangi)</li><li>(aᵐ)ⁿ = aᵐˣⁿ (pangkat dari pangkat, dikalikan)</li><li>a⁰ = 1 untuk semua nilai a yang tidak nol</li><li>a⁻ⁿ = 1/aⁿ (pangkat negatif berarti pecahan)</li></ul><h3>Akar</h3><p>Akar adalah kebalikan dari pemangkatan. √a berarti mencari bilangan yang jika dikuadratkan menghasilkan a. Contoh: √49 = 7 karena 7² = 49.</p><p>Bilangan akar yang tidak bisa disederhanakan menjadi bilangan bulat disebut bentuk akar. Contoh: √8 = √(4 × 2) = 2√2.</p>', 1);

-- ==================== PRACTICE QUESTIONS ====================
-- Jenis-jenis Bilangan (3 soal)
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'jenis-jenis-bilangan'), 'Manakah yang termasuk bilangan irasional?', '0,5', '√9', '√7', '3/4', 2, '√9 = 3 yang merupakan bilangan bulat, jadi bukan irasional. √7 tidak bisa disederhanakan menjadi pecahan atau bilangan bulat, desimalnya 2,6457... tidak berulang dan tidak berhenti, sehingga termasuk bilangan irasional.', 1),
((SELECT id FROM materials WHERE slug = 'jenis-jenis-bilangan'), 'Bilangan −5 termasuk ke dalam kelompok…', 'Bilangan asli', 'Bilangan cacah', 'Bilangan bulat', 'Bilangan irasional', 2, 'Bilangan asli dan cacah hanya mencakup bilangan positif (dan nol untuk cacah). Bilangan bulat mencakup semua bilangan positif, nol, dan negatif tanpa pecahan. Karena −5 adalah bilangan negatif tanpa koma, ia masuk kelompok bilangan bulat.', 2),
((SELECT id FROM materials WHERE slug = 'jenis-jenis-bilangan'), 'Urutan kelompok bilangan dari yang paling sempit hingga paling luas adalah…', 'Asli → Cacah → Bulat → Rasional → Real', 'Real → Rasional → Bulat → Cacah → Asli', 'Bulat → Asli → Cacah → Real → Rasional', 'Asli → Bulat → Cacah → Real → Rasional', 0, 'Setiap kelompok mencakup kelompok sebelumnya. Bilangan asli adalah bagian dari cacah, cacah bagian dari bulat, bulat bagian dari rasional, dan rasional (beserta irasional) membentuk bilangan real.', 3);

-- Operasi Bilangan Bulat (3 soal)
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'operasi-bilangan-bulat'), 'Hasil dari (−6) × (−3) adalah…', '−18', '−9', '18', '9', 2, 'Negatif dikali negatif menghasilkan positif. 6 × 3 = 18, maka (−6) × (−3) = +18.', 1),
((SELECT id FROM materials WHERE slug = 'operasi-bilangan-bulat'), 'Hasil dari −20 ÷ 4 + 3 adalah…', '−2', '−8', '2', '8', 0, 'Kerjakan pembagian dulu: −20 ÷ 4 = −5. Kemudian −5 + 3 = −2.', 2),
((SELECT id FROM materials WHERE slug = 'operasi-bilangan-bulat'), 'Hasil dari 3 × (−2) − (−4) adalah…', '−10', '−2', '2', '10', 1, 'Kerjakan perkalian dulu: 3 × (−2) = −6. Kemudian −6 − (−4) = −6 + 4 = −2. Ingat, mengurangi bilangan negatif sama dengan menambahkan bilangan positifnya.', 2);

-- FPB dan KPK (3 soal)
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'fpb-dan-kpk'), 'FPB dari 18 dan 30 adalah…', '3', '6', '9', '90', 1, 'Faktorisasi prima 18 = 2 × 3² dan 30 = 2 × 3 × 5. Faktor yang sama adalah 2 dan 3 (pangkat terkecil). FPB = 2 × 3 = 6.', 1),
((SELECT id FROM materials WHERE slug = 'fpb-dan-kpk'), 'KPK dari 4 dan 6 adalah…', '2', '12', '24', '48', 1, 'Faktorisasi prima 4 = 2² dan 6 = 2 × 3. KPK diambil semua faktor dengan pangkat terbesar: 2² × 3 = 12.', 2),
((SELECT id FROM materials WHERE slug = 'fpb-dan-kpk'), 'Dua lampu berkedip bersama. Lampu A berkedip setiap 6 detik, lampu B setiap 8 detik. Keduanya berkedip bersama lagi setelah berapa detik?', '14 detik', '24 detik', '48 detik', '2 detik', 1, 'Masalah ini memerlukan KPK dari 6 dan 8. Faktorisasi: 6 = 2 × 3 dan 8 = 2³. KPK = 2³ × 3 = 24 detik.', 3);

-- Bilangan Berpangkat dan Akar (3 soal)
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'bilangan-berpangkat-akar'), 'Hasil dari 3⁴ ÷ 3² adalah…', '3', '6', '9', '27', 2, 'Gunakan sifat aᵐ ÷ aⁿ = aᵐ⁻ⁿ. Maka 3⁴ ÷ 3² = 3⁴⁻² = 3² = 9.', 1),
((SELECT id FROM materials WHERE slug = 'bilangan-berpangkat-akar'), 'Nilai dari 5⁰ + 2⁻¹ adalah…', '0', '0,5', '1,5', '3', 2, '5⁰ = 1 (semua bilangan berpangkat nol = 1). 2⁻¹ = 1/2. Maka 1 + 1/2 = 1,5.', 2),
((SELECT id FROM materials WHERE slug = 'bilangan-berpangkat-akar'), 'Bentuk sederhana dari √72 adalah…', '6√2', '4√3', '3√8', '8√3', 0, 'Urai 72 menjadi faktor yang memiliki kuadrat sempurna: 72 = 36 × 2. Maka √72 = √36 × √2 = 6√2.', 3);

-- ==================== QUIZZES ====================
INSERT INTO quizzes (material_id, title, description, time_limit, passing_score) VALUES
((SELECT id FROM materials WHERE slug = 'jenis-jenis-bilangan'), 'Kuis Jenis-jenis Bilangan', 'Uji pemahaman jenis-jenis bilangan', 15, 70),
((SELECT id FROM materials WHERE slug = 'operasi-bilangan-bulat'), 'Kuis Operasi Bilangan Bulat', 'Uji kemampuan operasi hitung bilangan bulat', 15, 70),
((SELECT id FROM materials WHERE slug = 'fpb-dan-kpk'), 'Kuis FPB dan KPK', 'Uji kemampuan mencari FPB dan KPK', 15, 70),
((SELECT id FROM materials WHERE slug = 'bilangan-berpangkat-akar'), 'Kuis Bilangan Berpangkat dan Akar', 'Uji pemahaman sifat pangkat dan operasi akar', 15, 70);

-- ==================== QUIZ QUESTIONS ====================
-- Kuis: Jenis-jenis Bilangan
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Jenis-jenis Bilangan'), 'Bilangan 0 termasuk ke dalam jenis bilangan…', 'Bilangan asli', 'Bilangan cacah', 'Bilangan irasional', 'Bilangan negatif', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Jenis-jenis Bilangan'), 'Nilai π (pi) termasuk bilangan…', 'Rasional', 'Bulat', 'Irasional', 'Cacah', 'c', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Jenis-jenis Bilangan'), 'Manakah yang bukan termasuk bilangan real?', '−7', '√3', '2/5', 'Tidak ada, semua termasuk bilangan real', 'd', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Jenis-jenis Bilangan'), '0,333... (0,3 berulang) dan √5, manakah pernyataan yang benar?', 'Keduanya irasional', 'Keduanya rasional', '0,333... rasional, √5 irasional', '0,333... irasional, √5 rasional', 'c', 4);

-- Kuis: Operasi Bilangan Bulat
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Operasi Bilangan Bulat'), 'Hasil dari (−5) × (−2) × (−1) adalah…', '10', '−10', '−3', '3', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Operasi Bilangan Bulat'), 'Suhu kota A adalah −8°C. Suhu kota B lebih tinggi 15°C dari kota A. Suhu kota B adalah…', '23°C', '7°C', '−7°C', '−23°C', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Operasi Bilangan Bulat'), 'Hasil dari 18 ÷ (−3) + (−4) × 2 adalah…', '−14', '14', '−2', '2', 'a', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Operasi Bilangan Bulat'), 'Manakah yang menghasilkan nilai positif?', '(−3)³', '(−2)⁴', '(−1) × (−2) × (−3)', '−5 + 3', 'b', 4);

-- Kuis: FPB dan KPK
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis FPB dan KPK'), 'Faktorisasi prima dari 60 adalah…', '2² × 3 × 5', '2 × 3 × 5²', '2³ × 3 × 5', '2² × 15', 'a', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis FPB dan KPK'), 'FPB dari 48 dan 72 adalah…', '12', '24', '36', '6', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis FPB dan KPK'), 'Pedagang memiliki 42 apel dan 56 jeruk. Maksimal berapa keranjang yang bisa dibuat (tiap keranjang sama jumlah tiap jenis buah)?', '7', '14', '6', '8', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis FPB dan KPK'), 'KPK dari 12, 15, dan 20 adalah…', '30', '60', '120', '300', 'b', 4);

-- Kuis: Bilangan Berpangkat dan Akar
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Bilangan Berpangkat dan Akar'), 'Hasil dari (2³)² × 2⁰ adalah…', '32', '64', '128', '12', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Bilangan Berpangkat dan Akar'), 'Nilai dari 4⁻² + √16 adalah…', '4,0625', '3,9375', '4,5', '5', 'a', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Bilangan Berpangkat dan Akar'), 'Jika 2ˣ = 32, maka nilai x adalah…', '4', '5', '6', '16', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Bilangan Berpangkat dan Akar'), 'Bentuk sederhana dari √(a⁴b²) adalah…', 'a²b', 'ab²', '2ab', 'a²b²', 'a', 4);

-- ==================== VIDEOS ====================
INSERT INTO videos (material_id, title, description, video_url, thumbnail_url, duration, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'jenis-jenis-bilangan'), 'Video: Jenis-jenis Bilangan', 'Penjelasan lengkap mengenai bilangan asli, cacah, bulat, rasional, dan irasional.', 'https://www.youtube.com/watch?v=Rc6vjXtS70Q', 'https://img.youtube.com/vi/9B3q3A3M6xQ/maxresdefault.jpg', 600, 1),
((SELECT id FROM materials WHERE slug = 'operasi-bilangan-bulat'), 'Video: Operasi Bilangan Bulat', 'Cara mudah memahami penjumlahan, pengurangan, perkalian, dan pembagian bilangan bulat.', 'https://www.youtube.com/watch?v=cQAwIhfC6Dg', 'https://img.youtube.com/vi/E-b-PZ_z8mI/maxresdefault.jpg', 720, 1),
((SELECT id FROM materials WHERE slug = 'fpb-dan-kpk'), 'Video: Cara Cepat FPB dan KPK', 'Trik menyelesaikan soal cerita dan mencari FPB & KPK dengan pohon faktor.', 'https://www.youtube.com/watch?v=j3-vxTMQlXM', 'https://img.youtube.com/vi/tY8D_JzX2eQ/maxresdefault.jpg', 840, 1),
((SELECT id FROM materials WHERE slug = 'bilangan-berpangkat-akar'), 'Video: Bilangan Berpangkat & Akar', 'Penyederhanaan dan sifat-sifat eksponen serta bentuk akar.', 'https://www.youtube.com/watch?v=Qnkaep-LsoY', 'https://img.youtube.com/vi/Zc2X2MvP-t0/maxresdefault.jpg', 900, 1);
