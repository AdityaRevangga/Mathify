-- ============================================================
-- SEED DATA TAMBAHAN: ALJABAR, GEOMETRI, TRIGONOMETRI,
--                     STATISTIKA, KALKULUS
-- Sesuai PDF referensi Mathify
-- correct_answer: 0=A, 1=B, 2=C, 3=D
-- ============================================================

-- ============================================================
-- TOPIK 2: ALJABAR
-- ============================================================
INSERT INTO topics (name, slug, description, icon_url, sort_order) VALUES
('Aljabar', 'aljabar', 'Pelajari simbol matematika, bentuk aljabar, persamaan linear, dan konsep fungsi serta relasi.', 'function', 2);

INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'aljabar'), 'Pemahaman Makna Simbol Matematika', 'simbol-matematika', 'Memahami simbol-simbol dasar matematika yang digunakan dalam aljabar, mulai dari simbol operasi, relasi, pengelompokan, hingga simbol khusus.', 1),
((SELECT id FROM topics WHERE slug = 'aljabar'), 'Bentuk Aljabar dan Operasinya', 'bentuk-aljabar-operasi', 'Mengenal suku, koefisien, variabel, konstanta, dan cara mengoperasikan bentuk aljabar.', 2),
((SELECT id FROM topics WHERE slug = 'aljabar'), 'Persamaan Linear Satu Variabel (PLSV)', 'plsv-aljabar', 'Memahami konsep persamaan linear dan cara menyelesaikannya secara sistematis.', 3),
((SELECT id FROM topics WHERE slug = 'aljabar'), 'Fungsi dan Relasi', 'fungsi-dan-relasi', 'Memahami konsep relasi, fungsi, domain, kodomain, dan cara menyatakan fungsi.', 4);

-- Material Steps - Aljabar
INSERT INTO material_steps (material_id, step_number, title, content, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'simbol-matematika'), 1, 'Simbol-simbol Matematika', '<h3>Memahami Makna Simbol Matematika</h3><p>Simbol matematika adalah tanda atau lambang yang mewakili nilai, operasi, hubungan, atau konsep tertentu dalam matematika. Simbol bersifat universal — artinya sama di seluruh dunia tanpa tergantung bahasa.</p><h3>Simbol Operasi</h3><ul><li><strong>+ (tambah)</strong> — menggabungkan dua nilai menjadi satu jumlah total.</li><li><strong>− (kurang)</strong> — menghitung selisih antara dua nilai.</li><li><strong>× atau · (kali)</strong> — menghitung hasil perkalian. Dalam aljabar, perkalian sering ditulis tanpa simbol: 3y artinya 3 dikali y.</li><li><strong>÷ atau / (bagi)</strong> — membagi satu nilai dengan nilai lain.</li></ul><h3>Simbol Relasi</h3><ul><li><strong>=</strong> berarti "sama dengan"</li><li><strong>≠</strong> berarti "tidak sama dengan"</li><li><strong>&gt;</strong> berarti "lebih besar dari"</li><li><strong>&lt;</strong> berarti "lebih kecil dari"</li><li><strong>≥</strong> berarti "lebih besar atau sama dengan"</li><li><strong>≤</strong> berarti "lebih kecil atau sama dengan"</li></ul><h3>Simbol Pengelompokan</h3><ul><li><strong>( )</strong> — tanda kurung biasa, dikerjakan paling dalam terlebih dahulu.</li><li><strong>[ ]</strong> — tanda kurung siku, digunakan di luar tanda kurung biasa.</li><li><strong>{ }</strong> — tanda kurung kurawal, digunakan di tingkat paling luar.</li></ul><p>Contoh: 2 × (3 + 4) = 2 × 7 = 14.</p><h3>Simbol Lainnya</h3><ul><li><strong>Σ (sigma)</strong> — berarti "jumlah dari" sejumlah nilai.</li><li><strong>√</strong> — akar kuadrat; √25 = 5.</li><li><strong>|x|</strong> — nilai mutlak; selalu positif. |−5| = 5.</li><li><strong>∞</strong> — tak hingga; nilai yang tidak terbatas.</li></ul>', 1),

((SELECT id FROM materials WHERE slug = 'bentuk-aljabar-operasi'), 1, 'Bentuk Aljabar dan Operasinya', '<h3>Mengenal Bentuk Aljabar</h3><p>Bentuk aljabar adalah ekspresi matematika yang terdiri dari variabel, koefisien, dan konstanta yang dihubungkan dengan operasi. Contoh: 3x² − 5x + 7.</p><h3>Bagian-bagian Bentuk Aljabar</h3><ul><li><strong>Suku</strong> adalah bagian yang dipisahkan oleh tanda + atau −. Pada 3x² − 5x + 7 terdapat 3 suku.</li><li><strong>Koefisien</strong> adalah angka yang mengalikan variabel. Pada 3x², koefisiennya adalah 3.</li><li><strong>Variabel</strong> adalah huruf yang mewakili nilai yang belum diketahui, seperti x.</li><li><strong>Konstanta</strong> adalah suku yang tidak memiliki variabel. Pada contoh di atas, konstantanya adalah 7.</li><li><strong>Suku sejenis</strong> adalah suku yang memiliki variabel dan pangkat yang sama. Suku 3x dan −5x adalah sejenis, sedangkan 3x dan 3x² bukan sejenis.</li></ul><p>Hanya suku sejenis yang dapat dijumlahkan atau dikurangkan langsung. Contoh: 4x + 3x = 7x tetapi 4x + 3x² tidak bisa disederhanakan.</p><h3>Perkalian Bentuk Aljabar</h3><p>Gunakan sifat distributif: a(b + c) = ab + ac. Contoh: 2x(3x − 4) = 6x² − 8x.</p>', 1),

((SELECT id FROM materials WHERE slug = 'plsv-aljabar'), 1, 'Persamaan Linear Satu Variabel', '<h3>Konsep PLSV</h3><p>Persamaan linear satu variabel adalah persamaan yang memuat satu variabel dengan pangkat tertinggi 1. Bentuk umumnya adalah ax + b = c di mana a, b, c adalah konstanta dan a ≠ 0.</p><h3>Prinsip Keseimbangan</h3><p>Apapun operasi yang dilakukan pada satu ruas, operasi yang sama harus dilakukan pada ruas yang lain agar keseimbangan terjaga.</p><h3>Langkah-langkah Menyelesaikan PLSV</h3><ol><li>Pindahkan semua suku variabel ke ruas kiri dan konstanta ke ruas kanan.</li><li>Sederhanakan setiap ruas.</li><li>Bagi atau kalikan kedua ruas untuk mengisolasi variabel.</li><li>Cek jawaban dengan mensubstitusikan kembali.</li></ol><p><strong>Contoh:</strong> Selesaikan 3x − 7 = 14. Tambah 7 ke kedua ruas: 3x = 21. Bagi dengan 3: x = 7. Cek: 3(7) − 7 = 14. ✓</p>', 1),

((SELECT id FROM materials WHERE slug = 'fungsi-dan-relasi'), 1, 'Fungsi dan Relasi', '<h3>Konsep Relasi dan Fungsi</h3><p><strong>Relasi</strong> adalah hubungan yang memasangkan anggota satu himpunan dengan anggota himpunan lain.</p><p><strong>Fungsi</strong> adalah relasi khusus di mana setiap anggota di himpunan pertama (domain) dipasangkan dengan tepat satu anggota di himpunan kedua (kodomain). Syarat fungsi: tidak boleh ada satu input yang menghasilkan lebih dari satu output.</p><h3>Terminologi Fungsi</h3><ul><li><strong>Domain</strong> adalah himpunan semua nilai input yang diizinkan.</li><li><strong>Kodomain</strong> adalah himpunan semua nilai output yang mungkin.</li><li><strong>Range</strong> adalah himpunan nilai output yang benar-benar dihasilkan.</li></ul><p>Fungsi biasanya ditulis sebagai f(x). Contoh: f(x) = 2x + 3. Jika domain = {1, 2, 3}, maka range = {5, 7, 9}.</p><h3>Jenis Fungsi</h3><ul><li><strong>Fungsi injektif (satu-satu):</strong> setiap output dihasilkan oleh paling banyak satu input.</li><li><strong>Fungsi surjektif (onto):</strong> setiap anggota kodomain menjadi output setidaknya sekali.</li><li><strong>Fungsi bijektif:</strong> sekaligus injektif dan surjektif.</li></ul>', 1);

-- Practice Questions - Aljabar
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'simbol-matematika'), 'Simbol yang menyatakan "lebih besar atau sama dengan" adalah…', '>', '<', '≥', '≤', 2, 'Simbol ≥ dibaca "lebih besar atau sama dengan", artinya nilai di kiri bisa lebih besar dari atau tepat sama dengan nilai di kanan.', 1),
((SELECT id FROM materials WHERE slug = 'simbol-matematika'), 'Ekspresi 2 × (3 + 4) menghasilkan nilai…', '10', '14', '11', '20', 1, 'Tanda kurung dikerjakan terlebih dahulu: 3 + 4 = 7. Kemudian 2 × 7 = 14.', 2),
((SELECT id FROM materials WHERE slug = 'simbol-matematika'), 'Arti dari penulisan 5y dalam aljabar adalah…', '5 ditambah y', '5 dikurangi y', '5 dikali y', '5 dibagi y', 2, 'Dalam aljabar, perkalian sering ditulis tanpa simbol ×. Penulisan angka di depan variabel (seperti 5y) berarti 5 dikali y.', 3),

((SELECT id FROM materials WHERE slug = 'bentuk-aljabar-operasi'), 'Dari bentuk 5x² − 3x + 8, koefisien dari suku x adalah…', '5', '−3', '3', '8', 1, 'Koefisien adalah angka yang berada tepat di depan variabel. Suku −3x memiliki koefisien −3, termasuk tanda negatifnya.', 1),
((SELECT id FROM materials WHERE slug = 'bentuk-aljabar-operasi'), 'Hasil penjumlahan (3x² + 2x − 1) + (x² − 5x + 4) adalah…', '4x² + 7x + 3', '4x² − 3x + 3', '4x² − 3x − 3', '2x² − 3x + 3', 1, 'Kelompokkan suku sejenis. 3x² + x² = 4x², 2x + (−5x) = −3x, −1 + 4 = 3. Hasilnya 4x² − 3x + 3.', 2),
((SELECT id FROM materials WHERE slug = 'bentuk-aljabar-operasi'), 'Hasil dari 3x(2x − 5) adalah…', '6x − 15', '6x² − 15x', '6x² − 15', '5x² − 15x', 1, 'Gunakan sifat distributif. 3x × 2x = 6x² dan 3x × (−5) = −15x. Hasilnya 6x² − 15x.', 3),

((SELECT id FROM materials WHERE slug = 'plsv-aljabar'), 'Penyelesaian dari 2x + 5 = 17 adalah…', 'x = 4', 'x = 6', 'x = 11', 'x = 7', 1, '2x = 17 − 5 = 12. x = 12 ÷ 2 = 6. Cek: 2(6) + 5 = 17. ✓', 1),
((SELECT id FROM materials WHERE slug = 'plsv-aljabar'), 'Penyelesaian dari 5x − 3 = 2x + 9 adalah…', 'x = 2', 'x = 3', 'x = 4', 'x = 6', 2, 'Pindahkan suku x ke kiri dan konstanta ke kanan: 5x − 2x = 9 + 3 → 3x = 12 → x = 4.', 2),
((SELECT id FROM materials WHERE slug = 'plsv-aljabar'), 'Umur Rina 3 tahun lebih tua dari Dina. Jumlah umur mereka 27 tahun. Umur Dina adalah…', '10 tahun', '12 tahun', '15 tahun', '9 tahun', 1, 'Misalkan umur Dina = x, maka umur Rina = x + 3. x + (x + 3) = 27 → 2x = 24 → x = 12.', 3),

((SELECT id FROM materials WHERE slug = 'fungsi-dan-relasi'), 'Manakah yang merupakan fungsi?', '{(1,2), (1,3), (2,4)}', '{(1,2), (2,2), (3,2)}', '{(1,2), (2,3), (1,4)}', '{(1,2), (2,3), (2,4)}', 1, 'Syarat fungsi adalah setiap input muncul tepat satu kali. Pada B, setiap input (1,2,3) muncul tepat sekali meskipun outputnya sama — ini valid.', 1),
((SELECT id FROM materials WHERE slug = 'fungsi-dan-relasi'), 'Diketahui f(x) = 3x − 4. Nilai dari f(5) adalah…', '7', '11', '15', '19', 1, 'Substitusikan x = 5: f(5) = 3(5) − 4 = 15 − 4 = 11.', 2),
((SELECT id FROM materials WHERE slug = 'fungsi-dan-relasi'), 'Diketahui g(x) = x² + 1. Jika g(a) = 10, maka nilai a adalah…', '2', '3', '4', '9', 1, 'a² + 1 = 10 → a² = 9 → a = 3.', 3);

-- Quizzes - Aljabar
INSERT INTO quizzes (material_id, title, description, time_limit, passing_score) VALUES
((SELECT id FROM materials WHERE slug = 'simbol-matematika'), 'Kuis Simbol Matematika', 'Uji pemahaman simbol-simbol dasar matematika', 15, 70),
((SELECT id FROM materials WHERE slug = 'bentuk-aljabar-operasi'), 'Kuis Bentuk Aljabar dan Operasinya', 'Uji pemahaman suku, koefisien, dan operasi bentuk aljabar', 15, 70),
((SELECT id FROM materials WHERE slug = 'plsv-aljabar'), 'Kuis Persamaan Linear Satu Variabel', 'Uji kemampuan menyelesaikan PLSV', 15, 70),
((SELECT id FROM materials WHERE slug = 'fungsi-dan-relasi'), 'Kuis Fungsi dan Relasi', 'Uji pemahaman konsep fungsi, domain, dan range', 15, 70);

-- Quiz Questions - Aljabar
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Simbol Matematika'), 'Simbol yang menyatakan "tidak sama dengan" adalah…', '=', '≤', '≠', '>', 'c', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Simbol Matematika'), 'Nilai dari |−9| + |3| adalah…', '−6', '6', '12', '−12', 'c', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Simbol Matematika'), 'Simbol Σ (sigma) digunakan untuk…', 'Menunjukkan akar kuadrat', 'Menunjukkan penjumlahan sejumlah nilai', 'Menunjukkan nilai mutlak', 'Menunjukkan tak hingga', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Simbol Matematika'), 'Simbol ≠ berarti…', 'Lebih besar dari', 'Tidak sama dengan', 'Lebih kecil atau sama dengan', 'Sama dengan', 'b', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Simbol Matematika'), 'Penulisan 7ab dalam aljabar berarti…', '7 + a + b', '7 − ab', '7 dikali a dikali b', '7 dibagi ab', 'c', 5),

((SELECT id FROM quizzes WHERE title = 'Kuis Bentuk Aljabar dan Operasinya'), 'Manakah yang merupakan pasangan suku sejenis?', '3x² dan 3x', '5xy dan 5x', '7ab dan −2ab', '4x dan 4y', 'c', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Bentuk Aljabar dan Operasinya'), 'Hasil dari (2x + 3)(x − 4) adalah…', '2x² + 5x − 12', '2x² − 5x − 12', '2x² − 5x + 12', '2x² + 5x + 12', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Bentuk Aljabar dan Operasinya'), 'Jika P = 4x − 3 dan Q = x + 5, maka P − Q adalah…', '3x − 8', '3x + 2', '5x + 2', '5x − 8', 'a', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Bentuk Aljabar dan Operasinya'), 'Konstanta dari 3x² − 7x + 4 adalah…', '3', '−7', '4', 'x', 'c', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Bentuk Aljabar dan Operasinya'), 'Bentuk sederhana dari 6x²y − 3xy + 9xy² jika difaktorkan adalah…', '3xy(2x − 1 + 3y)', '3x(2xy − y + 3y²)', 'xy(6x − 3 + 9y)', '3(2x²y − xy + 3xy²)', 'a', 5),

((SELECT id FROM quizzes WHERE title = 'Kuis Persamaan Linear Satu Variabel'), 'Penyelesaian dari 4(x − 2) = 20 adalah…', 'x = 5', 'x = 7', 'x = 3', 'x = 9', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Persamaan Linear Satu Variabel'), 'Penyelesaian dari (x + 3)/2 = 5 adalah…', 'x = 4', 'x = 7', 'x = 13', 'x = 10', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Persamaan Linear Satu Variabel'), 'Nilai x yang memenuhi 3x + 4 = x − 6 adalah…', 'x = −5', 'x = 5', 'x = −1', 'x = 1', 'a', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Persamaan Linear Satu Variabel'), 'Harga buku dua kali harga pena. Total keduanya Rp36.000, harga buku adalah…', 'Rp9.000', 'Rp12.000', 'Rp18.000', 'Rp24.000', 'd', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Persamaan Linear Satu Variabel'), 'Penyelesaian dari 2x + 5 = 17 adalah…', 'x = 4', 'x = 6', 'x = 11', 'x = 7', 'b', 5),

((SELECT id FROM quizzes WHERE title = 'Kuis Fungsi dan Relasi'), 'Jika f(x) = 2x² − x + 3, maka nilai f(−2) adalah…', '9', '13', '7', '5', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Fungsi dan Relasi'), 'Diketahui f(x) = 5x + 2. Nilai x jika f(x) = 22 adalah…', 'x = 3', 'x = 4', 'x = 5', 'x = 6', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Fungsi dan Relasi'), 'Fungsi f(x) = x² − 3 dengan domain {−1, 0, 1, 2}. Range-nya adalah…', '{−3, −2, −1, 0}', '{−4, −3, −2, 1}', '{−2, −3, −2, 1}', '{−3, −2, 1}', 'd', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Fungsi dan Relasi'), 'Pernyataan yang benar tentang fungsi adalah…', 'Satu input boleh menghasilkan lebih dari satu output', 'Satu output boleh dihasilkan oleh lebih dari satu input', 'Setiap anggota kodomain pasti masuk ke dalam range', 'Domain dan range selalu memiliki jumlah anggota yang sama', 'b', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Fungsi dan Relasi'), 'Diketahui f(x) = 3x − 4. Nilai dari f(5) adalah…', '7', '11', '15', '19', 'b', 5);

-- ============================================================
-- TOPIK 3: GEOMETRI
-- ============================================================
INSERT INTO topics (name, slug, description, icon_url, sort_order) VALUES
('Geometri', 'geometri', 'Pelajari konsep titik, garis, bidang, bangun datar, teorema Pythagoras, dan bangun ruang.', 'triangle', 3);

INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'geometri'), 'Titik, Garis, dan Bidang', 'titik-garis-bidang', 'Memahami konsep dasar geometri yang menjadi fondasi seluruh pembahasan bangun datar dan ruang.', 1),
((SELECT id FROM topics WHERE slug = 'geometri'), 'Luas dan Keliling Bangun Datar', 'luas-keliling-bangun-datar', 'Menghitung luas dan keliling berbagai bangun datar beserta penerapannya.', 2),
((SELECT id FROM topics WHERE slug = 'geometri'), 'Teorema Pythagoras', 'teorema-pythagoras', 'Memahami dan menerapkan teorema Pythagoras pada segitiga siku-siku.', 3),
((SELECT id FROM topics WHERE slug = 'geometri'), 'Volume dan Luas Permukaan Bangun Ruang', 'volume-bangun-ruang', 'Menghitung volume dan luas permukaan bangun ruang seperti kubus, balok, prisma, dan tabung.', 4);

-- Material Steps - Geometri
INSERT INTO material_steps (material_id, step_number, title, content, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'titik-garis-bidang'), 1, 'Konsep Dasar Geometri', '<h3>Titik, Garis, dan Bidang</h3><p><strong>Titik</strong> adalah konsep paling dasar dalam geometri. Titik tidak memiliki ukuran — tidak ada panjang, lebar, maupun tinggi. Titik hanya menunjukkan posisi, dilambangkan dengan huruf kapital seperti A, B, C.</p><p><strong>Garis</strong> adalah kumpulan titik yang berjajar lurus tanpa batas ke dua arah. Jika hanya memiliki satu ujung, disebut sinar garis. Jika memiliki dua ujung, disebut ruas garis (segmen).</p><p><strong>Bidang</strong> adalah permukaan datar yang meluas tanpa batas ke segala arah. Bidang ditentukan oleh minimal tiga titik yang tidak segaris.</p><h3>Hubungan Antar Garis</h3><ul><li><strong>Garis sejajar (∥):</strong> dua garis yang tidak berpotongan meskipun diperpanjang sejauh apapun.</li><li><strong>Garis berpotongan:</strong> dua garis yang bertemu di satu titik.</li><li><strong>Garis tegak lurus (⊥):</strong> dua garis yang berpotongan membentuk sudut 90°.</li></ul><h3>Jenis-jenis Sudut</h3><ul><li>Sudut lancip: &lt; 90°</li><li>Sudut siku-siku: = 90°</li><li>Sudut tumpul: antara 90° dan 180°</li><li>Sudut lurus: = 180°</li><li>Sudut refleks: &gt; 180°</li></ul>', 1),

((SELECT id FROM materials WHERE slug = 'luas-keliling-bangun-datar'), 1, 'Luas dan Keliling Bangun Datar', '<h3>Rumus Bangun Datar</h3><p><strong>Persegi</strong> (sisi s): Keliling = 4s, Luas = s².</p><p><strong>Persegi panjang</strong> (panjang p, lebar l): Keliling = 2(p + l), Luas = p × l.</p><p><strong>Segitiga</strong> (alas a, tinggi t): Luas = ½ × a × t. Keliling = jumlah ketiga sisinya.</p><p><strong>Lingkaran</strong> (jari-jari r): Keliling = 2πr, Luas = πr².</p><p><strong>Trapesium</strong> (sisi sejajar a dan b, tinggi t): Luas = ½ × (a + b) × t.</p><p><strong>Jajargenjang</strong> (alas a, tinggi t): Luas = a × t.</p><p>Ingat: tinggi selalu diukur tegak lurus terhadap alas, bukan sepanjang sisi miring.</p>', 1),

((SELECT id FROM materials WHERE slug = 'teorema-pythagoras'), 1, 'Teorema Pythagoras', '<h3>Pernyataan Teorema Pythagoras</h3><p>Pada segitiga siku-siku, kuadrat sisi miring (hipotenusa) sama dengan jumlah kuadrat kedua sisi siku-sikunya: <strong>c² = a² + b²</strong></p><p>Hipotenusa selalu merupakan sisi terpanjang dan selalu berhadapan dengan sudut siku-siku.</p><h3>Penggunaan</h3><ul><li>Mencari hipotenusa: c = √(a² + b²)</li><li>Mencari sisi siku-siku: a = √(c² − b²)</li></ul><h3>Triple Pythagoras</h3><p>Tiga bilangan bulat yang memenuhi teorema Pythagoras: (3,4,5), (5,12,13), (8,15,17), dan kelipatannya seperti (6,8,10) atau (9,12,15).</p>', 1),

((SELECT id FROM materials WHERE slug = 'volume-bangun-ruang'), 1, 'Volume dan Luas Permukaan Bangun Ruang', '<h3>Rumus Bangun Ruang</h3><p><strong>Kubus</strong> (rusuk s): Volume = s³, Luas permukaan = 6s².</p><p><strong>Balok</strong> (p, l, t): Volume = p × l × t, Luas permukaan = 2(pl + pt + lt).</p><p><strong>Tabung</strong> (jari-jari r, tinggi t): Volume = πr²t, Luas permukaan = 2πr(r + t).</p><p><strong>Kerucut</strong> (jari-jari r, tinggi t, garis pelukis l): Volume = ⅓πr²t, Luas permukaan = πr(r + l). Garis pelukis l = √(r² + t²).</p><p><strong>Bola</strong> (jari-jari r): Volume = (4/3)πr³, Luas permukaan = 4πr².</p>', 1);

-- Practice Questions - Geometri
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'titik-garis-bidang'), 'Dua sinar garis yang berpangkal di titik yang sama membentuk…', 'Ruas garis', 'Bidang', 'Sudut', 'Garis', 2, 'Definisi sudut adalah daerah yang dibentuk oleh dua sinar garis yang bertemu di satu titik (titik sudut).', 1),
((SELECT id FROM materials WHERE slug = 'titik-garis-bidang'), 'Jika sudut A = 65°, maka sudut A termasuk jenis…', 'Siku-siku', 'Tumpul', 'Lancip', 'Lurus', 2, 'Sudut lancip adalah sudut yang besarnya lebih dari 0° dan kurang dari 90°. Karena 65° < 90°, maka sudut A adalah sudut lancip.', 2),
((SELECT id FROM materials WHERE slug = 'titik-garis-bidang'), 'Berapa titik minimal untuk menentukan sebuah bidang?', '1 titik', '2 titik', '3 titik', '4 titik', 2, 'Satu titik hanya menentukan posisi. Dua titik menentukan garis. Tiga titik yang tidak segaris barulah dapat menentukan bidang.', 3),

((SELECT id FROM materials WHERE slug = 'luas-keliling-bangun-datar'), 'Luas lingkaran dengan jari-jari 7 cm adalah… (π = 22/7)', '44 cm²', '154 cm²', '308 cm²', '77 cm²', 1, 'Luas = πr² = (22/7) × 7² = (22/7) × 49 = 154 cm².', 1),
((SELECT id FROM materials WHERE slug = 'luas-keliling-bangun-datar'), 'Trapesium dengan sisi sejajar 8 cm dan 12 cm, tinggi 5 cm. Luasnya…', '40 cm²', '50 cm²', '60 cm²', '100 cm²', 1, 'Luas = ½ × (a + b) × t = ½ × (8 + 12) × 5 = ½ × 20 × 5 = 50 cm².', 2),
((SELECT id FROM materials WHERE slug = 'luas-keliling-bangun-datar'), 'Keliling persegi panjang 44 cm. Panjangnya 14 cm. Lebarnya…', '6 cm', '8 cm', '10 cm', '16 cm', 1, 'Keliling = 2(p + l) → 44 = 2(14 + l) → 22 = 14 + l → l = 8 cm.', 3),

((SELECT id FROM materials WHERE slug = 'teorema-pythagoras'), 'Segitiga siku-siku dengan sisi 9 cm dan 12 cm. Hipotenusanya…', '13 cm', '15 cm', '21 cm', '18 cm', 1, 'c = √(9² + 12²) = √(81 + 144) = √225 = 15 cm. Triple Pythagoras (9,12,15).', 1),
((SELECT id FROM materials WHERE slug = 'teorema-pythagoras'), 'Hipotenusa 13 cm, satu sisi 5 cm. Sisi lainnya…', '8 cm', '10 cm', '12 cm', '11 cm', 2, 'a = √(13² − 5²) = √(169 − 25) = √144 = 12 cm.', 2),
((SELECT id FROM materials WHERE slug = 'teorema-pythagoras'), 'Tangga 10 m bersandar di dinding, kaki tangga 6 m dari dinding. Tinggi dinding yang dicapai…', '7 m', '8 m', '9 m', '4 m', 1, 'Tinggi = √(10² − 6²) = √(100 − 36) = √64 = 8 m.', 3),

((SELECT id FROM materials WHERE slug = 'volume-bangun-ruang'), 'Volume balok panjang 8 cm, lebar 5 cm, tinggi 3 cm…', '60 cm³', '79 cm³', '120 cm³', '240 cm³', 2, 'Volume = p × l × t = 8 × 5 × 3 = 120 cm³.', 1),
((SELECT id FROM materials WHERE slug = 'volume-bangun-ruang'), 'Luas permukaan kubus dengan rusuk 6 cm…', '36 cm²', '150 cm²', '216 cm²', '180 cm²', 2, 'Luas permukaan = 6s² = 6 × 6² = 6 × 36 = 216 cm².', 2),
((SELECT id FROM materials WHERE slug = 'volume-bangun-ruang'), 'Volume tabung jari-jari 7 cm tinggi 10 cm… (π = 22/7)', '1.540 cm³', '770 cm³', '440 cm³', '3.080 cm³', 0, 'Volume = πr²t = (22/7) × 49 × 10 = 1.540 cm³.', 3);

-- Quizzes - Geometri
INSERT INTO quizzes (material_id, title, description, time_limit, passing_score) VALUES
((SELECT id FROM materials WHERE slug = 'titik-garis-bidang'), 'Kuis Titik, Garis, dan Bidang', 'Uji pemahaman konsep dasar geometri', 15, 70),
((SELECT id FROM materials WHERE slug = 'luas-keliling-bangun-datar'), 'Kuis Luas dan Keliling Bangun Datar', 'Uji kemampuan menghitung luas dan keliling bangun datar', 15, 70),
((SELECT id FROM materials WHERE slug = 'teorema-pythagoras'), 'Kuis Teorema Pythagoras', 'Uji penerapan teorema Pythagoras', 15, 70),
((SELECT id FROM materials WHERE slug = 'volume-bangun-ruang'), 'Kuis Volume dan Luas Permukaan Bangun Ruang', 'Uji kemampuan menghitung volume dan luas permukaan bangun ruang', 15, 70);

-- Quiz Questions - Geometri
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Titik, Garis, dan Bidang'), 'Dua garis dikatakan tegak lurus jika membentuk sudut…', '45°', '90°', '120°', '180°', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Titik, Garis, dan Bidang'), 'Sudut yang besarnya tepat 180° disebut…', 'Sudut tumpul', 'Sudut refleks', 'Sudut lurus', 'Sudut penuh', 'c', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Titik, Garis, dan Bidang'), 'Garis sejajar adalah dua garis yang…', 'Berpotongan di titik jauh', 'Tidak pernah berpotongan', 'Membentuk sudut 90°', 'Hanya ada di bidang lengkung', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Titik, Garis, dan Bidang'), 'Sudut tumpul memiliki besar antara…', '0° dan 90°', '90° dan 180°', '180° dan 270°', '270° dan 360°', 'b', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Titik, Garis, dan Bidang'), 'Ruas garis berbeda dari garis karena…', 'Tidak berpotongan', 'Memiliki dua ujung yang terbatas', 'Tidak memiliki titik awal', 'Meluas tanpa batas', 'b', 5),

((SELECT id FROM quizzes WHERE title = 'Kuis Luas dan Keliling Bangun Datar'), 'Persegi dengan keliling 48 m. Luasnya…', '96 m²', '144 m²', '192 m²', '48 m²', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Luas dan Keliling Bangun Datar'), 'Segitiga siku-siku alas 6 cm tinggi 8 cm. Luasnya…', '48 cm²', '24 cm²', '14 cm²', '28 cm²', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Luas dan Keliling Bangun Datar'), 'Diameter lingkaran 20 cm. Kelilingnya… (π = 3,14)', '31,4 cm', '62,8 cm', '314 cm', '125,6 cm', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Luas dan Keliling Bangun Datar'), 'Jajargenjang luas 72 cm², alas 12 cm. Tingginya…', '5 cm', '6 cm', '8 cm', '9 cm', 'b', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Luas dan Keliling Bangun Datar'), 'Luas persegi dengan sisi 9 cm adalah…', '36 cm²', '45 cm²', '72 cm²', '81 cm²', 'd', 5),

((SELECT id FROM quizzes WHERE title = 'Kuis Teorema Pythagoras'), 'Manakah yang merupakan triple Pythagoras?', '(4, 5, 6)', '(6, 7, 8)', '(7, 24, 25)', '(8, 10, 12)', 'c', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Teorema Pythagoras'), 'Diagonal persegi panjang 26 cm, lebar 10 cm. Panjangnya…', '20 cm', '24 cm', '22 cm', '16 cm', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Teorema Pythagoras'), 'Persegi dengan diagonal 8√2 cm. Panjang sisinya…', '4 cm', '6 cm', '8 cm', '10 cm', 'c', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Teorema Pythagoras'), 'Titik A(0,0) dan B(3,4). Jarak AB…', '7 satuan', '5 satuan', '6 satuan', '25 satuan', 'b', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Teorema Pythagoras'), 'Sisi siku-siku 5 cm dan 12 cm. Hipotenusanya…', '13 cm', '15 cm', '17 cm', '11 cm', 'a', 5),

((SELECT id FROM quizzes WHERE title = 'Kuis Volume dan Luas Permukaan Bangun Ruang'), 'Bak mandi 100×60×50 cm. Daya tampungnya…', '200 liter', '300 liter', '400 liter', '500 liter', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Volume dan Luas Permukaan Bangun Ruang'), 'Luas permukaan bola r=21 cm (π=22/7)…', '5.544 cm²', '2.772 cm²', '1.386 cm²', '11.088 cm²', 'a', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Volume dan Luas Permukaan Bangun Ruang'), 'Volume kerucut r=6 cm, t=14 cm (π=22/7)…', '528 cm³', '264 cm³', '792 cm³', '1.056 cm³', 'a', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Volume dan Luas Permukaan Bangun Ruang'), 'Kubus volume 512 cm³. Rusuknya…', '6 cm', '7 cm', '8 cm', '9 cm', 'c', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Volume dan Luas Permukaan Bangun Ruang'), 'Luas permukaan kubus rusuk 4 cm…', '64 cm²', '96 cm²', '16 cm²', '48 cm²', 'b', 5);

-- ============================================================
-- TOPIK 4: TRIGONOMETRI
-- ============================================================
INSERT INTO topics (name, slug, description, icon_url, sort_order) VALUES
('Trigonometri', 'trigonometri', 'Pelajari perbandingan trigonometri, trigonometri di semua kuadran, aturan sinus cosinus, dan identitas trigonometri.', 'activity', 4);

INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'trigonometri'), 'Perbandingan Trigonometri pada Segitiga Siku-siku', 'perbandingan-trigonometri', 'Memahami definisi sin, cos, tan dan cara menggunakannya untuk mencari sisi atau sudut segitiga siku-siku.', 1),
((SELECT id FROM topics WHERE slug = 'trigonometri'), 'Trigonometri di Semua Kuadran', 'trigonometri-kuadran', 'Memahami tanda dan nilai fungsi trigonometri di keempat kuadran bidang koordinat.', 2),
((SELECT id FROM topics WHERE slug = 'trigonometri'), 'Aturan Sinus dan Aturan Cosinus', 'aturan-sinus-cosinus', 'Menggunakan aturan sinus dan cosinus untuk menyelesaikan segitiga sembarang.', 3),
((SELECT id FROM topics WHERE slug = 'trigonometri'), 'Identitas Trigonometri', 'identitas-trigonometri', 'Memahami dan membuktikan identitas trigonometri dasar serta penggunaannya dalam penyederhanaan ekspresi.', 4);

-- Material Steps - Trigonometri
INSERT INTO material_steps (material_id, step_number, title, content, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'perbandingan-trigonometri'), 1, 'Perbandingan Trigonometri', '<h3>Perbandingan Trigonometri pada Segitiga Siku-siku</h3><p>Pada segitiga siku-siku terdapat tiga sisi: sisi depan (opposite), sisi samping (adjacent), dan sisi miring (hypotenuse).</p><h3>SOH-CAH-TOA</h3><ul><li><strong>sin θ</strong> = sisi depan / sisi miring</li><li><strong>cos θ</strong> = sisi samping / sisi miring</li><li><strong>tan θ</strong> = sisi depan / sisi samping</li></ul><h3>Nilai Sudut Istimewa</h3><table style="border-collapse:collapse;width:100%"><tr><th style="padding:8px;border:1px solid #ccc">Sudut</th><th style="padding:8px;border:1px solid #ccc">sin</th><th style="padding:8px;border:1px solid #ccc">cos</th><th style="padding:8px;border:1px solid #ccc">tan</th></tr><tr><td style="padding:8px;border:1px solid #ccc">0°</td><td style="padding:8px;border:1px solid #ccc">0</td><td style="padding:8px;border:1px solid #ccc">1</td><td style="padding:8px;border:1px solid #ccc">0</td></tr><tr><td style="padding:8px;border:1px solid #ccc">30°</td><td style="padding:8px;border:1px solid #ccc">1/2</td><td style="padding:8px;border:1px solid #ccc">½√3</td><td style="padding:8px;border:1px solid #ccc">1/√3</td></tr><tr><td style="padding:8px;border:1px solid #ccc">45°</td><td style="padding:8px;border:1px solid #ccc">½√2</td><td style="padding:8px;border:1px solid #ccc">½√2</td><td style="padding:8px;border:1px solid #ccc">1</td></tr><tr><td style="padding:8px;border:1px solid #ccc">60°</td><td style="padding:8px;border:1px solid #ccc">½√3</td><td style="padding:8px;border:1px solid #ccc">1/2</td><td style="padding:8px;border:1px solid #ccc">√3</td></tr><tr><td style="padding:8px;border:1px solid #ccc">90°</td><td style="padding:8px;border:1px solid #ccc">1</td><td style="padding:8px;border:1px solid #ccc">0</td><td style="padding:8px;border:1px solid #ccc">tidak terdefinisi</td></tr></table>', 1),

((SELECT id FROM materials WHERE slug = 'trigonometri-kuadran'), 1, 'Trigonometri di Semua Kuadran', '<h3>Tanda Fungsi Trigonometri per Kuadran</h3><ul><li><strong>Kuadran I (0°−90°):</strong> sin, cos, tan semuanya positif.</li><li><strong>Kuadran II (90°−180°):</strong> sin positif, cos dan tan negatif.</li><li><strong>Kuadran III (180°−270°):</strong> tan positif, sin dan cos negatif.</li><li><strong>Kuadran IV (270°−360°):</strong> cos positif, sin dan tan negatif.</li></ul><p>Cara mudah mengingat: <strong>"Semua Siswa Tahu Cara"</strong> untuk Kuadran I, II, III, IV.</p><h3>Rumus Sudut Berelasi</h3><ul><li>Kuadran II: sin(180° − α) = sin α, cos(180° − α) = −cos α</li><li>Kuadran III: sin(180° + α) = −sin α, cos(180° + α) = −cos α</li><li>Kuadran IV: sin(360° − α) = −sin α, cos(360° − α) = cos α</li></ul>', 1),

((SELECT id FROM materials WHERE slug = 'aturan-sinus-cosinus'), 1, 'Aturan Sinus dan Cosinus', '<h3>Aturan Sinus</h3><p>Untuk segitiga sembarang dengan sisi a, b, c berhadapan dengan sudut A, B, C:</p><p style="padding:0.75rem;background:#e8f4fd;border-radius:8px;font-weight:600;">a/sin A = b/sin B = c/sin C</p><p>Digunakan untuk kasus: dua sudut dan satu sisi (AAS/ASA), atau dua sisi dan sudut tidak diapit (SSA).</p><h3>Aturan Cosinus</h3><p style="padding:0.75rem;background:#e8f4fd;border-radius:8px;font-weight:600;">a² = b² + c² − 2bc cos A</p><p>Digunakan untuk kasus: tiga sisi (SSS), atau dua sisi dan sudut yang diapit (SAS).</p><h3>Luas Segitiga Sembarang</h3><p>Luas = ½ × b × c × sin A</p>', 1),

((SELECT id FROM materials WHERE slug = 'identitas-trigonometri'), 1, 'Identitas Trigonometri', '<h3>Identitas Pythagoras</h3><ul><li><strong>sin²θ + cos²θ = 1</strong></li><li>1 + tan²θ = sec²θ</li><li>1 + cot²θ = csc²θ</li></ul><h3>Identitas Kebalikan</h3><ul><li>sin θ × csc θ = 1</li><li>cos θ × sec θ = 1</li><li>tan θ × cot θ = 1</li></ul><h3>Identitas Sudut Ganda</h3><ul><li>sin 2θ = 2 sin θ cos θ</li><li>cos 2θ = cos²θ − sin²θ = 1 − 2sin²θ = 2cos²θ − 1</li></ul><p>Strategi membuktikan identitas: pilih satu ruas (biasanya yang lebih kompleks), ubah hingga sama dengan ruas lainnya.</p>', 1);

-- Practice Questions - Trigonometri
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'perbandingan-trigonometri'), 'Segitiga siku-siku sudut A, sisi depan A = 5 cm, sisi miring = 13 cm. Nilai sin A…', '5/12', '12/13', '5/13', '13/5', 2, 'sin A = sisi depan / sisi miring = 5/13.', 1),
((SELECT id FROM materials WHERE slug = 'perbandingan-trigonometri'), 'Nilai dari tan 60° adalah…', '1/2', '√3', '½√3', '1', 1, 'Dari tabel sudut istimewa, tan 60° = √3.', 2),
((SELECT id FROM materials WHERE slug = 'perbandingan-trigonometri'), 'Tangga membentuk sudut 30° dengan lantai, panjang tangga 6 m. Tinggi yang dicapai…', '3 m', '3√3 m', '2 m', '6√3 m', 0, 'Tinggi = tangga × sin 30° = 6 × 1/2 = 3 m.', 3),

((SELECT id FROM materials WHERE slug = 'trigonometri-kuadran'), 'Nilai sin 150° adalah…', '−1/2', '½√3', '1/2', '−½√3', 2, '150° di kuadran II, sudut referensi 30°. Di kuadran II sin positif. sin 150° = sin 30° = 1/2.', 1),
((SELECT id FROM materials WHERE slug = 'trigonometri-kuadran'), 'Nilai cos 240° adalah…', '1/2', '−1/2', '½√3', '−½√3', 1, '240° di kuadran III, sudut referensi 60°. Di kuadran III cos negatif. cos 240° = −cos 60° = −1/2.', 2),
((SELECT id FROM materials WHERE slug = 'trigonometri-kuadran'), '315° berada di kuadran berapa, dan tanda tan-nya?', 'Kuadran III, positif', 'Kuadran IV, negatif', 'Kuadran IV, positif', 'Kuadran III, negatif', 1, '315° berada di antara 270° dan 360° (kuadran IV). Di kuadran IV hanya cos positif, tan negatif.', 3),

((SELECT id FROM materials WHERE slug = 'aturan-sinus-cosinus'), 'Segitiga ABC, sudut A=30°, B=60°, sisi a=5 cm. Panjang sisi b…', '5 cm', '5√3 cm', '10 cm', '5√2 cm', 1, 'b/sin 60° = 5/sin 30° → b = 5 × (½√3)/(1/2) = 5√3.', 1),
((SELECT id FROM materials WHERE slug = 'aturan-sinus-cosinus'), 'Segitiga dengan b=7, c=8, sudut A=60°. Panjang sisi a…', '√57', '√113', '√49', '√64', 0, 'a² = 49 + 64 − 2(7)(8)(1/2) = 113 − 56 = 57. Maka a = √57.', 2),
((SELECT id FROM materials WHERE slug = 'aturan-sinus-cosinus'), 'Luas segitiga dengan b=6, c=10, sudut A=30°…', '15 cm²', '30 cm²', '60 cm²', '18 cm²', 0, 'Luas = ½ × 6 × 10 × sin 30° = ½ × 6 × 10 × 1/2 = 15 cm².', 3),

((SELECT id FROM materials WHERE slug = 'identitas-trigonometri'), 'Jika sin θ = 3/5, nilai cos²θ adalah…', '4/5', '9/25', '16/25', '4/25', 2, 'cos²θ = 1 − sin²θ = 1 − 9/25 = 16/25.', 1),
((SELECT id FROM materials WHERE slug = 'identitas-trigonometri'), 'Nilai dari sin 2(45°) adalah…', '1', '½√2', '½', '√2', 0, 'sin 2(45°) = sin 90° = 1. Atau: 2 × ½√2 × ½√2 = 2 × 1/2 = 1.', 2),
((SELECT id FROM materials WHERE slug = 'identitas-trigonometri'), 'Sederhanakan: (1 − sin²θ) / cos θ', 'cos θ', 'sin θ', 'tan θ', 'sec θ', 0, '1 − sin²θ = cos²θ. Maka cos²θ / cos θ = cos θ.', 3);

-- Quizzes - Trigonometri
INSERT INTO quizzes (material_id, title, description, time_limit, passing_score) VALUES
((SELECT id FROM materials WHERE slug = 'perbandingan-trigonometri'), 'Kuis Perbandingan Trigonometri', 'Uji pemahaman sin, cos, tan pada segitiga siku-siku', 15, 70),
((SELECT id FROM materials WHERE slug = 'trigonometri-kuadran'), 'Kuis Trigonometri di Semua Kuadran', 'Uji pemahaman tanda fungsi trigonometri di tiap kuadran', 15, 70),
((SELECT id FROM materials WHERE slug = 'aturan-sinus-cosinus'), 'Kuis Aturan Sinus dan Cosinus', 'Uji kemampuan menerapkan aturan sinus dan cosinus', 15, 70),
((SELECT id FROM materials WHERE slug = 'identitas-trigonometri'), 'Kuis Identitas Trigonometri', 'Uji pemahaman dan penerapan identitas trigonometri', 15, 70);

-- Quiz Questions - Trigonometri
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Perbandingan Trigonometri'), 'Jika cos θ = 4/5, maka nilai sin θ adalah…', '3/5', '4/3', '5/4', '3/4', 'a', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Perbandingan Trigonometri'), 'Nilai dari sin 45° × cos 45° adalah…', '1', '1/2', '√2', '½√2', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Perbandingan Trigonometri'), 'Pohon memiliki bayangan 10 m, sudut elevasi 60°. Tinggi pohon…', '10 m', '10√3 m', '5√3 m', '20 m', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Perbandingan Trigonometri'), 'Nilai sin²30° + cos²30° adalah…', '1/2', '3/4', '1', '√3', 'c', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Perbandingan Trigonometri'), 'Nilai tan 45° adalah…', '0', '1/2', '√3', '1', 'd', 5),

((SELECT id FROM quizzes WHERE title = 'Kuis Trigonometri di Semua Kuadran'), 'Nilai sin 210° adalah…', '1/2', '½√3', '−1/2', '−½√3', 'c', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Trigonometri di Semua Kuadran'), 'Jika sin θ < 0 dan cos θ > 0, θ berada di…', 'Kuadran I', 'Kuadran II', 'Kuadran III', 'Kuadran IV', 'd', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Trigonometri di Semua Kuadran'), 'Nilai tan 300° adalah…', '√3', '−√3', '1/√3', '−1/√3', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Trigonometri di Semua Kuadran'), 'Nilai cos 270° adalah…', '1', '−1', '0', 'tidak terdefinisi', 'c', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Trigonometri di Semua Kuadran'), 'Di kuadran mana sin dan tan keduanya negatif?', 'Kuadran I', 'Kuadran II', 'Kuadran III', 'Kuadran IV', 'd', 5),

((SELECT id FROM quizzes WHERE title = 'Kuis Aturan Sinus dan Cosinus'), 'Untuk menyelesaikan segitiga dengan tiga sisi diketahui, digunakan…', 'Aturan sinus', 'Aturan cosinus', 'Teorema Pythagoras', 'Perbandingan trigonometri biasa', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Aturan Sinus dan Cosinus'), 'Segitiga PQR, p=10, q=10, sudut R=120°. Luas segitiga PQR…', '25 cm²', '25√3 cm²', '50 cm²', '50√3 cm²', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Aturan Sinus dan Cosinus'), 'Luas segitiga sisi b=4, c=6, sudut A=90°…', '6 cm²', '12 cm²', '24 cm²', '8 cm²', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Aturan Sinus dan Cosinus'), 'Aturan sinus digunakan pada kasus…', 'SSS', 'SAS', 'AAS', 'Semua kasus', 'c', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Aturan Sinus dan Cosinus'), 'Jika diketahui dua sisi dan sudut yang diapit, aturan yang digunakan adalah…', 'Aturan sinus', 'Aturan cosinus', 'Keduanya bisa', 'Teorema Pythagoras', 'b', 5),

((SELECT id FROM quizzes WHERE title = 'Kuis Identitas Trigonometri'), 'Nilai sin²60° + cos²60° adalah…', '3/4', '1/4', '1', '7/4', 'c', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Identitas Trigonometri'), 'Bentuk cos 2θ yang hanya mengandung sin adalah…', '2cos²θ − 1', 'cos²θ − sin²θ', '1 − 2sin²θ', '2sinθ cosθ', 'c', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Identitas Trigonometri'), 'Sederhanakan: tan θ × cos θ', 'sin θ', 'cos θ', 'sec θ', '1', 'a', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Identitas Trigonometri'), 'cos θ = −4/5 dan θ di kuadran III, nilai sin θ adalah…', '3/5', '−3/5', '4/5', '−4/5', 'b', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Identitas Trigonometri'), 'Nilai dari 1 + tan²45° adalah…', '1', '2', '√2', '3', 'b', 5);

-- ============================================================
-- TOPIK 5: STATISTIKA
-- ============================================================
INSERT INTO topics (name, slug, description, icon_url, sort_order) VALUES
('Statistika', 'statistika', 'Pelajari pengumpulan dan penyajian data, ukuran pemusatan, ukuran penyebaran, dan konsep peluang dasar.', 'bar-chart', 5);

INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'statistika'), 'Pengumpulan dan Penyajian Data', 'pengumpulan-penyajian-data', 'Memahami jenis data, cara mengumpulkan, dan cara menyajikan data secara efektif.', 1),
((SELECT id FROM topics WHERE slug = 'statistika'), 'Ukuran Pemusatan Data (Mean, Median, Modus)', 'ukuran-pemusatan-data', 'Menghitung dan menginterpretasikan mean, median, dan modus sebagai ukuran pusat data.', 2),
((SELECT id FROM topics WHERE slug = 'statistika'), 'Ukuran Penyebaran Data', 'ukuran-penyebaran-data', 'Memahami range, varians, dan standar deviasi sebagai ukuran seberapa menyebar data.', 3),
((SELECT id FROM topics WHERE slug = 'statistika'), 'Peluang Dasar', 'peluang-dasar', 'Memahami konsep peluang, ruang sampel, dan cara menghitung peluang suatu kejadian.', 4);

-- Material Steps - Statistika
INSERT INTO material_steps (material_id, step_number, title, content, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'pengumpulan-penyajian-data'), 1, 'Jenis Data dan Penyajiannya', '<h3>Jenis-jenis Data</h3><p><strong>Data kualitatif</strong> adalah data berbentuk kategori atau label. Contoh: warna favorit, jenis kelamin.</p><p><strong>Data kuantitatif</strong> adalah data berbentuk angka, dibagi menjadi:</p><ul><li><strong>Diskrit:</strong> hasil menghitung, hanya bilangan bulat. Contoh: jumlah siswa.</li><li><strong>Kontinu:</strong> hasil mengukur, bisa berupa pecahan. Contoh: berat badan.</li></ul><h3>Cara Pengumpulan Data</h3><ul><li><strong>Angket (kuesioner):</strong> daftar pertanyaan yang diisi responden.</li><li><strong>Wawancara:</strong> pengumpulan data langsung melalui tanya jawab.</li><li><strong>Observasi:</strong> pengamatan langsung terhadap objek penelitian.</li><li><strong>Studi dokumentasi:</strong> menggunakan data yang sudah ada.</li></ul><h3>Cara Penyajian Data</h3><ul><li><strong>Diagram batang:</strong> membandingkan nilai antar kategori.</li><li><strong>Diagram garis:</strong> menampilkan perubahan data dari waktu ke waktu.</li><li><strong>Diagram lingkaran (pie chart):</strong> menampilkan proporsi tiap kategori.</li><li><strong>Histogram:</strong> diagram batang khusus untuk data kontinu yang dikelompokkan.</li></ul>', 1),

((SELECT id FROM materials WHERE slug = 'ukuran-pemusatan-data'), 1, 'Mean, Median, dan Modus', '<h3>Ukuran Pemusatan Data</h3><p><strong>Mean (rata-rata)</strong> adalah jumlah semua nilai dibagi banyaknya data. Mean = Σxᵢ / n. Sensitif terhadap nilai ekstrem (outlier).</p><p><strong>Median</strong> adalah nilai tengah data setelah diurutkan. Tidak terpengaruh oleh outlier. Jika data genap, median = rata-rata dua nilai tengah.</p><p><strong>Modus</strong> adalah nilai yang paling sering muncul. Data bisa memiliki tidak ada modus, satu modus, atau lebih.</p><h3>Kapan Menggunakan</h3><ul><li><strong>Mean:</strong> data numerik tanpa outlier ekstrem.</li><li><strong>Median:</strong> data dengan outlier, atau data ordinal.</li><li><strong>Modus:</strong> data kategorikal, atau nilai paling populer.</li></ul>', 1),

((SELECT id FROM materials WHERE slug = 'ukuran-penyebaran-data'), 1, 'Ukuran Penyebaran Data', '<h3>Jenis Ukuran Penyebaran</h3><p><strong>Range (jangkauan)</strong> = nilai max − nilai min. Mudah dihitung tetapi dipengaruhi outlier.</p><p><strong>Varians (s²)</strong> = Σ(xᵢ − x̄)² / n. Mengukur rata-rata kuadrat simpangan dari mean.</p><p><strong>Standar deviasi</strong> = √varians. Satuan sama dengan data aslinya, lebih mudah diinterpretasikan.</p><p>Semakin kecil standar deviasi → data semakin seragam. Semakin besar → data semakin beragam.</p><h3>Kuartil</h3><p>Membagi data terurut menjadi empat bagian sama besar. Q1 = kuartil bawah, Q2 = median, Q3 = kuartil atas. IQR = Q3 − Q1.</p>', 1),

((SELECT id FROM materials WHERE slug = 'peluang-dasar'), 1, 'Konsep Peluang', '<h3>Definisi Peluang</h3><p>Peluang mengukur seberapa mungkin suatu kejadian terjadi. Nilai peluang antara 0 dan 1: P=0 berarti mustahil, P=1 berarti pasti terjadi.</p><p><strong>Rumus peluang klasik:</strong> P(A) = n(A) / n(S)</p><p>di mana n(A) = banyak cara kejadian A terjadi, n(S) = banyak semua kemungkinan (ruang sampel).</p><h3>Aturan Peluang</h3><ul><li><strong>Komplemen:</strong> P(Aᶜ) = 1 − P(A)</li><li><strong>Saling lepas:</strong> P(A atau B) = P(A) + P(B)</li><li><strong>Tidak saling lepas:</strong> P(A atau B) = P(A) + P(B) − P(A dan B)</li><li><strong>Saling bebas:</strong> P(A dan B) = P(A) × P(B)</li></ul>', 1);

-- Practice Questions - Statistika
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'pengumpulan-penyajian-data'), 'Data "nilai ujian siswa" termasuk jenis data…', 'Kualitatif diskrit', 'Kuantitatif diskrit', 'Kualitatif kontinu', 'Kuantitatif kontinu', 1, 'Nilai ujian berupa angka (kuantitatif) dan merupakan bilangan bulat (diskrit).', 1),
((SELECT id FROM materials WHERE slug = 'pengumpulan-penyajian-data'), 'Diagram paling tepat untuk perkembangan penjualan bulan Januari−Desember adalah…', 'Diagram lingkaran', 'Diagram batang', 'Diagram garis', 'Histogram', 2, 'Diagram garis paling efektif untuk menampilkan tren atau perubahan data dari waktu ke waktu.', 2),
((SELECT id FROM materials WHERE slug = 'pengumpulan-penyajian-data'), 'Pie chart menunjukkan 25% dari 120 siswa menyukai matematika. Jumlahnya…', '25 siswa', '30 siswa', '40 siswa', '45 siswa', 1, '25% × 120 = 0,25 × 120 = 30 siswa.', 3),

((SELECT id FROM materials WHERE slug = 'ukuran-pemusatan-data'), 'Data: 70, 80, 75, 90, 85, 80, 95, 80. Modus data tersebut…', '80', '82', '85', '75', 0, 'Nilai 80 muncul 3 kali, lebih banyak dari yang lain. Modus = 80.', 1),
((SELECT id FROM materials WHERE slug = 'ukuran-pemusatan-data'), 'Data: 12, 15, 11, 18, 14, 16, 13. Median data tersebut…', '13', '14', '15', '16', 1, 'Urutkan: 11, 12, 13, 14, 15, 16, 18. Data berjumlah 7, nilai tengah adalah ke-4 = 14.', 2),
((SELECT id FROM materials WHERE slug = 'ukuran-pemusatan-data'), 'Rata-rata 6 siswa adalah 75. Satu siswa baru bergabung dengan nilai 82. Rata-rata baru…', '76', '77', '78', '79', 0, 'Total 6 siswa = 450. Ditambah 82 = 532. Rata-rata = 532/7 = 76.', 3),

((SELECT id FROM materials WHERE slug = 'ukuran-penyebaran-data'), 'Data: 10, 14, 18, 22, 26. Range data tersebut…', '14', '16', '18', '12', 1, 'Range = nilai max − nilai min = 26 − 10 = 16.', 1),
((SELECT id FROM materials WHERE slug = 'ukuran-penyebaran-data'), 'Data: 4, 6, 8, 10, 12. Varians data tersebut…', '4', '6', '8', '10', 2, 'Mean = 8. Simpangan kuadrat: 16+4+0+4+16=40. Varians = 40/5 = 8.', 2),
((SELECT id FROM materials WHERE slug = 'ukuran-penyebaran-data'), 'Jika varians suatu data adalah 25, standar deviasinya…', '5', '12,5', '625', '50', 0, 'Standar deviasi = √varians = √25 = 5.', 3),

((SELECT id FROM materials WHERE slug = 'peluang-dasar'), 'Sebuah dadu dilempar sekali. Peluang muncul angka genap…', '1/6', '1/3', '1/2', '2/3', 2, 'Angka genap = {2,4,6}, n(A)=3. P = 3/6 = 1/2.', 1),
((SELECT id FROM materials WHERE slug = 'peluang-dasar'), 'Dari 52 kartu remi, peluang terambil kartu As…', '1/52', '1/13', '1/4', '4/52', 1, 'Ada 4 kartu As. P = 4/52 = 1/13.', 2),
((SELECT id FROM materials WHERE slug = 'peluang-dasar'), 'Peluang hujan hari ini 0,3. Peluang tidak hujan…', '0,3', '0,7', '0,5', '1,3', 1, 'Komplemen: 1 − 0,3 = 0,7.', 3);

-- Quizzes - Statistika
INSERT INTO quizzes (material_id, title, description, time_limit, passing_score) VALUES
((SELECT id FROM materials WHERE slug = 'pengumpulan-penyajian-data'), 'Kuis Pengumpulan dan Penyajian Data', 'Uji pemahaman jenis data dan cara penyajiannya', 15, 70),
((SELECT id FROM materials WHERE slug = 'ukuran-pemusatan-data'), 'Kuis Mean, Median, dan Modus', 'Uji kemampuan menghitung ukuran pemusatan data', 15, 70),
((SELECT id FROM materials WHERE slug = 'ukuran-penyebaran-data'), 'Kuis Ukuran Penyebaran Data', 'Uji pemahaman range, varians, dan standar deviasi', 15, 70),
((SELECT id FROM materials WHERE slug = 'peluang-dasar'), 'Kuis Peluang Dasar', 'Uji kemampuan menghitung peluang suatu kejadian', 15, 70);

-- Quiz Questions - Statistika
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Pengumpulan dan Penyajian Data'), 'Data "tinggi badan siswa dalam cm" termasuk jenis data…', 'Kualitatif', 'Kuantitatif diskrit', 'Kuantitatif kontinu', 'Kualitatif kontinu', 'c', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Pengumpulan dan Penyajian Data'), 'Contoh pengumpulan data dengan metode observasi adalah…', 'Menyebarkan kuesioner', 'Mewawancarai kepala sekolah', 'Menghitung kendaraan melintas selama satu jam', 'Menggunakan data sensus dari BPS', 'c', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Pengumpulan dan Penyajian Data'), 'Kolom "frekuensi relatif" dalam tabel berisi…', 'Banyak data di setiap kelas', 'Persentase setiap kelas terhadap total data', 'Nilai tengah setiap kelas', 'Jumlah kumulatif frekuensi', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Pengumpulan dan Penyajian Data'), 'Diagram yang tepat untuk membandingkan nilai antar kategori adalah…', 'Diagram garis', 'Diagram batang', 'Histogram', 'Diagram lingkaran', 'b', 4),

((SELECT id FROM quizzes WHERE title = 'Kuis Mean, Median, dan Modus'), 'Data: 5, 8, 3, 9, 7, 6, 4, 8, 7, 8. Nilai mean…', '6,5', '7', '6', '7,5', 'a', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Mean, Median, dan Modus'), 'Upah 9 pegawai: 80,85,90,90,95,100,100,100,200 (ribu). Ukuran terbaik mewakili data ini…', 'Mean=104,4', 'Median=95', 'Modus=100', 'Mean=95', 'c', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Mean, Median, dan Modus'), 'Data genap: 14,17,22,25,28,31. Median data tersebut…', '22', '23', '23,5', '25', 'c', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Mean, Median, dan Modus'), 'Rata-rata 5 bilangan adalah 12. Bilangan 20 dihapus. Rata-rata 4 sisanya…', '10', '11', '12', '9', 'a', 4),

((SELECT id FROM quizzes WHERE title = 'Kuis Ukuran Penyebaran Data'), 'Kelas A SD=3, kelas B SD=12, rata-rata sama. Pernyataan benar…', 'Kemampuan setara', 'Kelas A lebih merata', 'Kelas B lebih merata', 'Kelas B lebih berprestasi', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Ukuran Penyebaran Data'), 'Data terurut: 5,7,9,11,13,15,17,19. Q1 dan Q3 adalah…', 'Q1=7, Q3=15', 'Q1=8, Q3=16', 'Q1=7, Q3=17', 'Q1=9, Q3=15', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Ukuran Penyebaran Data'), 'IQR dari data di soal sebelumnya adalah…', '6', '8', '10', '14', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Ukuran Penyebaran Data'), 'Standar deviasi data 3,3,3,3,3 adalah…', '3', '1', '0', '15', 'c', 4),

((SELECT id FROM quizzes WHERE title = 'Kuis Peluang Dasar'), 'Dua koin dilempar. Peluang muncul tepat satu sisi angka…', '1/4', '1/2', '3/4', '1', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Peluang Dasar'), 'Kotak berisi 5 bola merah, 3 biru, 2 hijau. Peluang terambil bola biru…', '3/10', '1/3', '3/8', '1/5', 'a', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Peluang Dasar'), 'P(A lulus)=0,8, P(B lulus)=0,7, saling bebas. P(keduanya lulus)…', '0,56', '0,75', '0,94', '1,5', 'a', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Peluang Dasar'), 'Dari angka 1−20, peluang terambil angka prima…', '2/5', '1/4', '9/20', '2/4', 'a', 4);

-- ============================================================
-- TOPIK 6: KALKULUS
-- ============================================================
INSERT INTO topics (name, slug, description, icon_url, sort_order) VALUES
('Kalkulus', 'kalkulus', 'Pelajari konsep limit fungsi, turunan (diferensial), integral tak tentu, dan integral tentu beserta penerapannya.', 'trending-up', 6);

INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'kalkulus'), 'Limit Fungsi', 'limit-fungsi', 'Memahami konsep limit sebagai fondasi kalkulus dan cara menghitungnya.', 1),
((SELECT id FROM topics WHERE slug = 'kalkulus'), 'Turunan (Diferensial)', 'turunan-diferensial', 'Memahami konsep turunan, aturan-aturan diferensiasi, dan penerapannya.', 2),
((SELECT id FROM topics WHERE slug = 'kalkulus'), 'Integral Tak Tentu', 'integral-tak-tentu', 'Memahami konsep integral sebagai kebalikan diferensiasi dan aturan-aturan integrasi dasar.', 3),
((SELECT id FROM topics WHERE slug = 'kalkulus'), 'Integral Tentu dan Luas Daerah', 'integral-tentu', 'Memahami integral tentu, teorema dasar kalkulus, dan penerapannya untuk menghitung luas daerah.', 4);

-- Material Steps - Kalkulus
INSERT INTO material_steps (material_id, step_number, title, content, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'limit-fungsi'), 1, 'Konsep Limit Fungsi', '<h3>Apa itu Limit?</h3><p>Limit menggambarkan nilai yang didekati oleh sebuah fungsi ketika variabelnya mendekati suatu nilai tertentu. Notasi: <strong>lim(x→a) f(x) = L</strong></p><p>Limit berkaitan dengan nilai yang <em>didekati</em>, bukan nilai tepat di titik tersebut.</p><h3>Cara Menghitung Limit</h3><ol><li><strong>Substitusi langsung:</strong> ganti x dengan a. Jika hasilnya bukan 0/0 atau ∞/∞, itulah limitnya.</li><li><strong>Bentuk tak tentu 0/0:</strong> faktorkan pembilang dan penyebut, sederhanakan, lalu substitusi.</li><li><strong>Bentuk ∞/∞:</strong> bagi semua suku dengan pangkat tertinggi x.</li></ol><h3>Teorema Limit Penting</h3><ul><li>lim(x→a) c = c</li><li>lim(x→a) [f(x) ± g(x)] = lim f(x) ± lim g(x)</li><li>lim(x→∞) 1/x = 0</li></ul>', 1),

((SELECT id FROM materials WHERE slug = 'turunan-diferensial'), 1, 'Turunan Fungsi', '<h3>Konsep Turunan</h3><p>Turunan f''(x) atau dy/dx menyatakan laju perubahan fungsi. Secara geometris, turunan adalah kemiringan garis singgung kurva di suatu titik.</p><h3>Aturan-aturan Turunan</h3><ul><li><strong>Konstanta:</strong> d/dx(c) = 0</li><li><strong>Pangkat:</strong> d/dx(xⁿ) = nxⁿ⁻¹</li><li><strong>Penjumlahan:</strong> (f+g)'' = f'' + g''</li><li><strong>Aturan rantai:</strong> d/dx[f(g(x))] = f''(g(x)) × g''(x)</li></ul><p><strong>Contoh:</strong> f(x) = 3x⁴ − 2x² + 5x − 7 → f''(x) = 12x³ − 4x + 5</p><h3>Nilai Ekstrem</h3><p>Titik kritis terjadi saat f''(x) = 0. Jika f''''(x) &lt; 0 → maksimum lokal. Jika f''''(x) &gt; 0 → minimum lokal.</p>', 1),

((SELECT id FROM materials WHERE slug = 'integral-tak-tentu'), 1, 'Integral Tak Tentu', '<h3>Konsep Integral</h3><p>Integral adalah kebalikan (invers) dari turunan. Integral tak tentu ditulis:</p><p style="padding:0.75rem;background:#e8f4fd;border-radius:8px;font-weight:600;">∫f(x)dx = F(x) + C</p><p>C adalah konstanta integrasi yang tidak boleh dilupakan.</p><h3>Aturan Integrasi Dasar</h3><ul><li>∫c dx = cx + C</li><li>∫xⁿ dx = xⁿ⁺¹/(n+1) + C (untuk n ≠ −1)</li><li>∫[f(x) + g(x)] dx = ∫f(x) dx + ∫g(x) dx</li></ul><p><strong>Contoh:</strong> ∫(4x³ − 2x + 5) dx = x⁴ − x² + 5x + C</p>', 1),

((SELECT id FROM materials WHERE slug = 'integral-tentu'), 1, 'Integral Tentu dan Luas Daerah', '<h3>Integral Tentu</h3><p>Integral tentu ditulis ∫[a ke b] f(x) dx dan menghasilkan nilai numerik. Merepresentasikan luas daerah yang dibatasi kurva y = f(x), sumbu x, dan garis x = a serta x = b.</p><h3>Teorema Dasar Kalkulus</h3><p style="padding:0.75rem;background:#e8f4fd;border-radius:8px;font-weight:600;">∫[a ke b] f(x) dx = F(b) − F(a)</p><h3>Luas Daerah</h3><p>Luas selalu positif. Jika fungsi di bawah sumbu x, nilai integral negatif harus diabsolutkan.</p><p><strong>Luas antara dua kurva:</strong> Luas = ∫[a ke b] [f(x) − g(x)] dx, di mana f(x) ≥ g(x).</p><h3>Langkah Menghitung</h3><ol><li>Cari antiturunan F(x) dari f(x).</li><li>Hitung F(b) − F(a).</li></ol>', 1);

-- Practice Questions - Kalkulus
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'limit-fungsi'), 'Nilai dari lim(x→3) (x² − 9)/(x − 3) adalah…', '0', '3', '6', 'tidak ada', 2, 'Bentuk 0/0. Faktorkan: (x−3)(x+3)/(x−3) = x+3. Substitusi x=3: 3+3 = 6.', 1),
((SELECT id FROM materials WHERE slug = 'limit-fungsi'), 'Nilai dari lim(x→2) (3x² − x + 1) adalah…', '9', '11', '13', '7', 1, 'Substitusi langsung: 3(4) − 2 + 1 = 12 − 2 + 1 = 11.', 2),
((SELECT id FROM materials WHERE slug = 'limit-fungsi'), 'Nilai dari lim(x→∞) (3x² + 2x)/(x² − 1) adalah…', '0', '2', '3', '∞', 2, 'Bagi dengan x²: (3 + 2/x)/(1 − 1/x²). Ketika x→∞ → 3/1 = 3.', 3),

((SELECT id FROM materials WHERE slug = 'turunan-diferensial'), 'Turunan dari f(x) = 5x³ − 4x² + 3 adalah…', '15x² − 8x + 3', '15x² − 8x', '5x² − 4x', '15x² + 8x', 1, 'd/dx(5x³)=15x², d/dx(−4x²)=−8x, d/dx(3)=0. Hasilnya 15x² − 8x.', 1),
((SELECT id FROM materials WHERE slug = 'turunan-diferensial'), 'Turunan dari f(x) = (2x + 3)⁴ adalah…', '4(2x + 3)³', '8(2x + 3)³', '4(2x + 3)⁴', '2(2x + 3)³', 1, 'Aturan rantai: 4(2x+3)³ × 2 = 8(2x+3)³.', 2),
((SELECT id FROM materials WHERE slug = 'turunan-diferensial'), 'Kurva y = x² − 4x + 3, titik dengan kemiringan garis singgung = 2 adalah…', '(3, 0)', '(2, −1)', '(1, 0)', '(4, 3)', 0, 'y'' = 2x−4 = 2 → x=3. y = 9−12+3 = 0. Titiknya (3,0).', 3),

((SELECT id FROM materials WHERE slug = 'integral-tak-tentu'), 'Hasil dari ∫(3x² + 2x) dx adalah…', 'x³ + x² + C', '6x + 2', 'x³ + x + C', '3x³ + x² + C', 0, '∫3x² dx = x³ dan ∫2x dx = x². Hasilnya x³ + x² + C.', 1),
((SELECT id FROM materials WHERE slug = 'integral-tak-tentu'), 'Hasil dari ∫(5) dx adalah…', '5x', '5x + C', '5', '0', 1, 'Integral konstanta c adalah cx + C. Maka ∫5 dx = 5x + C.', 2),
((SELECT id FROM materials WHERE slug = 'integral-tak-tentu'), 'F''(x) = 6x² − 4x + 3 dan F(0) = 2. Maka F(x) adalah…', '2x³ − 2x² + 3x + 2', '2x³ − 2x² + 3x', '2x³ − 4x² + 3x + 2', '6x³ − 4x² + 3x + 2', 0, 'F(x) = 2x³ − 2x² + 3x + C. F(0) = 2 → C = 2. Hasilnya 2x³ − 2x² + 3x + 2.', 3),

((SELECT id FROM materials WHERE slug = 'integral-tentu'), 'Nilai dari ∫[0 ke 2] (3x²) dx adalah…', '6', '8', '12', '4', 1, 'Antiturunan x³. Hitung dari 0 ke 2: 2³ − 0³ = 8.', 1),
((SELECT id FROM materials WHERE slug = 'integral-tentu'), 'Luas daerah di bawah y = x² antara x=0 dan x=3 adalah…', '6 satuan luas', '9 satuan luas', '27 satuan luas', '3 satuan luas', 1, '∫[0 ke 3] x² dx = [x³/3] = 27/3 − 0 = 9.', 2),
((SELECT id FROM materials WHERE slug = 'integral-tentu'), 'Luas daerah antara y=x dan y=x² pada [0,1] adalah…', '1/6 satuan luas', '1/3 satuan luas', '1/2 satuan luas', '1 satuan luas', 0, 'Luas = ∫[0 ke 1] (x−x²) dx = [x²/2 − x³/3] = 1/2 − 1/3 = 1/6.', 3);

-- Quizzes - Kalkulus
INSERT INTO quizzes (material_id, title, description, time_limit, passing_score) VALUES
((SELECT id FROM materials WHERE slug = 'limit-fungsi'), 'Kuis Limit Fungsi', 'Uji pemahaman konsep limit dan cara menghitungnya', 15, 70),
((SELECT id FROM materials WHERE slug = 'turunan-diferensial'), 'Kuis Turunan (Diferensial)', 'Uji kemampuan menurunkan fungsi menggunakan aturan diferensiasi', 15, 70),
((SELECT id FROM materials WHERE slug = 'integral-tak-tentu'), 'Kuis Integral Tak Tentu', 'Uji kemampuan mengintegralkan fungsi dan menemukan antiturunan', 15, 70),
((SELECT id FROM materials WHERE slug = 'integral-tentu'), 'Kuis Integral Tentu dan Luas Daerah', 'Uji kemampuan menghitung integral tentu dan luas daerah', 15, 70);

-- Quiz Questions - Kalkulus
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Limit Fungsi'), 'Nilai dari lim(x→0) (x² + 5x)/x adalah…', '0', '5', '1', 'tidak ada', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Limit Fungsi'), 'Nilai dari lim(x→1) (x² − 1)/(x − 1) adalah…', '0', '1', '2', 'tak terdefinisi', 'c', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Limit Fungsi'), 'Nilai dari lim(x→∞) (5x + 3)/(2x − 1) adalah…', '5/2', '3', '5', '0', 'a', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Limit Fungsi'), 'lim(x→a) f(x)=4, lim(x→a) g(x)=3. Nilai lim [2f(x) − g(x)] adalah…', '5', '7', '14', '8', 'a', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Limit Fungsi'), 'Nilai dari lim(x→2) (x² − 4)/(x − 2) adalah…', '0', '2', '4', 'tidak ada', 'c', 5),

((SELECT id FROM quizzes WHERE title = 'Kuis Turunan (Diferensial)'), 'Turunan dari f(x) = 6x² − 3x + 1 di x=2 adalah…', '21', '24', '18', '15', 'a', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Turunan (Diferensial)'), 'f(x) = x³ − 3x² + 4 mencapai minimum lokal di x=…', 'x = 0', 'x = 1', 'x = 2', 'x = 3', 'c', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Turunan (Diferensial)'), 'Turunan dari f(x) = √x adalah…', '1/√x', '1/(2√x)', '2√x', '√x/2', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Turunan (Diferensial)'), 'v(t) = 3t² − 6t. Percepatan benda pada t=3 detik adalah…', '6 m/s²', '12 m/s²', '9 m/s²', '3 m/s²', 'b', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Turunan (Diferensial)'), 'Turunan dari f(x) = 4x³ adalah…', '4x²', '12x', '12x²', '3x²', 'c', 5),

((SELECT id FROM quizzes WHERE title = 'Kuis Integral Tak Tentu'), 'Hasil dari ∫(x³ − 2x² + x) dx adalah…', 'x⁴/4 − 2x³/3 + x²/2 + C', 'x⁴ − 2x³ + x² + C', '3x² − 4x + 1', 'x⁴/4 − 2x³/3 + x²/2', 'a', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Integral Tak Tentu'), 'Hasil dari ∫(8x⁷) dx adalah…', '56x⁶', 'x⁸', '8x⁸ + C', 'x⁸ + C', 'd', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Integral Tak Tentu'), 'Hasil dari ∫(√x) dx adalah…', '(3/2)x^(3/2) + C', '(2/3)x^(3/2) + C', '(1/2)x^(−1/2) + C', '2x^(1/2) + C', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Integral Tak Tentu'), 'Hasil dari ∫(2x + 3) dx adalah…', 'x² + 3x', 'x² + 3x + C', '2 + C', '2x² + 3x + C', 'b', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Integral Tak Tentu'), 'Hasil dari ∫(6x²) dx adalah…', '2x³', '2x³ + C', '12x', '3x³ + C', 'b', 5),

((SELECT id FROM quizzes WHERE title = 'Kuis Integral Tentu dan Luas Daerah'), 'Nilai dari ∫[−1 ke 2] (x + 2) dx adalah…', '7,5', '6', '9', '4,5', 'a', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Integral Tentu dan Luas Daerah'), 'Luas daerah antara kurva y = x² dan garis y = x pada [0,1] adalah…', '1/6 satuan luas', '1/3 satuan luas', '1/2 satuan luas', '1 satuan luas', 'a', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Integral Tentu dan Luas Daerah'), 'Nilai dari ∫[0 ke 2] (3x²) dx adalah…', '6', '8', '12', '4', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Integral Tentu dan Luas Daerah'), 'Jika ∫[0 ke k] 4x dx = 50, maka nilai k adalah…', '4', '5', '25', '10', 'b', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Integral Tentu dan Luas Daerah'), 'Nilai dari ∫[1 ke 3] (2x + 1) dx adalah…', '8', '10', '12', '14', 'b', 5);