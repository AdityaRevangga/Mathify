-- Migration: 002_seed_data.sql
-- Mengisi database Mathify dengan 5 Topik Utama dan 11 Materi Aljabar/Persamaan terperinci.

-- ==================== TOPICS ====================
-- Pastikan slugs tetap sesuai dengan kebutuhan hardcoded di frontend ('aljabar', 'geometri', 'aritmatika', 'statistika', 'trigonometri')
INSERT INTO topics (name, slug, description, icon_url, sort_order) VALUES
('Bentuk Aljabar', 'aljabar', 'Pelajari konsep variabel, suku sejenis, koefisien, konstanta, dan operasi aljabar dasar.', 'code', 1),
('Persamaan Linear (PLSV)', 'geometri', 'Pelajari konsep kalimat terbuka, kalimat tertutup, dan penyelesaian Persamaan Linear Satu Variabel.', 'triangle', 2),
('Pertidaksamaan Linear (PtLSV)', 'aritmatika', 'Pelajari konsep pertidaksamaan linear, lambang PtLSV, dan grafik garis bilangan.', 'calculator', 3),
('Sistem Persamaan Linear (SPLDV)', 'statistika', 'Pelajari konsep Sistem Persamaan Linear Dua Variabel and metode penyelesaian grafis maupun aljabar.', 'trending', 4),
('Aplikasi Aljabar & SPLDV', 'trigonometri', 'Pelajari penerapan persamaan aljabar dan sistem SPLDV untuk memecahkan soal cerita kehidupan sehari-hari.', 'ruler', 5);

-- ==================== MATERIALS ====================
-- 11 Materi terperinci dipetakan ke 5 Topik secara terstruktur
-- Topic 1 (Bentuk Aljabar -> aljabar)
INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'aljabar'), 'Pengenalan Bentuk Aljabar (Unsur-Unsur Aljabar)', 'pengenalan-bentuk-aljabar', 'Memahami konsep dasar aljabar, variabel, koefisien, suku sejenis, dan konstanta.', 1),
((SELECT id FROM topics WHERE slug = 'aljabar'), 'Penjumlahan dan Pengurangan Aljabar', 'penjumlahan-dan-pengurangan-aljabar', 'Menyederhanakan bentuk aljabar menggunakan operasi penjumlahan dan pengurangan suku sejenis.', 2),
((SELECT id FROM topics WHERE slug = 'aljabar'), 'Perkalian dan Pembagian Aljabar', 'perkalian-dan-pembagian-aljabar', 'Menyelesaikan perkalian distributif dan pembagian bentuk aljabar.', 3);

-- Topic 2 (Persamaan Linear -> geometri)
INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'geometri'), 'Konsep Dasar Persamaan Linear Satu Variabel (PLSV)', 'konsep-dasar-plsv', 'Memahami konsep dasar PLSV, kalimat terbuka, dan kalimat tertutup.', 1),
((SELECT id FROM topics WHERE slug = 'geometri'), 'Cara Menentukan Penyelesaian PLSV (Pindah Ruas & Aturan Dasar)', 'cara-menyelesaikan-plsv', 'Menentukan nilai variabel menggunakan aturan penyetaraan kedua ruas dan pindah ruas.', 2),
((SELECT id FROM topics WHERE slug = 'geometri'), 'Latihan Soal Cerita Persamaan Linear Satu Variabel', 'soal-cerita-plsv', 'Menerjemahkan soal cerita menjadi model matematika PLSV dan mencari penyelesaiannya.', 3);

-- Topic 3 (Pertidaksamaan Linear -> aritmatika)
INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'aritmatika'), 'Konsep Dasar Pertidaksamaan Linear Satu Variabel (PtLSV)', 'konsep-dasar-ptlsv', 'Memahami definisi, simbol-simbol pertidaksamaan, dan sifat dasar PtLSV.', 1),
((SELECT id FROM topics WHERE slug = 'aritmatika'), 'Menentukan Himpunan Penyelesaian PtLSV & Grafik Garis Bilangan', 'menyelesaikan-ptlsv', 'Menyelesaikan pertidaksamaan linear satu variabel dan memvisualisasikannya di garis bilangan.', 2);

-- Topic 4 (Sistem Persamaan -> statistika)
INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'statistika'), 'Pengenalan Sistem Persamaan Linear Dua Variabel (SPLDV)', 'pengenalan-spldv', 'Memahami konsep dasar SPLDV, persamaan linear dua variabel, dan bentuk umumnya.', 1),
((SELECT id FROM topics WHERE slug = 'statistika'), 'Metode Eliminasi dan Substitusi pada SPLDV', 'metode-eliminasi-substitusi-spldv', 'Menyelesaikan SPLDV menggunakan metode eliminasi dan metode substitusi secara akurat.', 2);

-- Topic 5 (Aplikasi Aljabar -> trigonometri)
INSERT INTO materials (topic_id, title, slug, description, sort_order) VALUES
((SELECT id FROM topics WHERE slug = 'trigonometri'), 'Aplikasi dan Soal Cerita SPLDV dalam Kehidupan Sehari-hari', 'aplikasi-soal-cerita-spldv', 'Menyelesaikan permasalahan kehidupan nyata terkait SPLDV seperti harga barang, umur, dan tarif.', 1);


-- ==================== PRACTICE QUESTIONS (LATIHAN SOAL) ====================
-- Latihan Soal untuk masing-masing dari 11 Materi

-- 1. Pengenalan Bentuk Aljabar
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'pengenalan-bentuk-aljabar'), 'Pada bentuk aljabar 3x - 8y + 5, yang merupakan konstanta adalah...', '3', 'x', '-8', '5', 3, 'Konstanta adalah suku yang nilainya tetap dan tidak memuat variabel. Pada bentuk aljabar tersebut, konstantanya adalah 5.', 1);

-- 2. Penjumlahan dan Pengurangan Aljabar
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'penjumlahan-dan-pengurangan-aljabar'), 'Bentuk sederhana dari 5x + 3y - 2x + y adalah...', '3x + 4y', '7x + 4y', '3x + 2y', '7x + 2y', 0, 'Kelompokkan suku sejenis: (5x - 2x) + (3y + y) = 3x + 4y.', 1);

-- 3. Perkalian dan Pembagian Aljabar
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'perkalian-dan-pembagian-aljabar'), 'Hasil pembagian dari bentuk aljabar 12ab : 3a adalah...', '4a', '4b', '4ab', '4', 1, 'Membagi koefisien: 12 : 3 = 4. Menyederhanakan variabel: ab : a = b. Hasilnya adalah 4b.', 1);

-- 4. Konsep Dasar PLSV
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'konsep-dasar-plsv'), 'Manakah di bawah ini yang merupakan contoh Kalimat Terbuka?', '3 + 5 = 8', 'Ibukota Indonesia adalah Jakarta', 'x + 6 = 10', 'Presiden pertama Indonesia adalah Soekarno', 2, 'Kalimat terbuka adalah kalimat yang nilai kebenarannya belum dapat ditentukan karena memuat variabel (seperti x). x + 6 = 10 adalah kalimat terbuka.', 1);

-- 5. Cara Menentukan Penyelesaian PLSV
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'cara-menyelesaikan-plsv'), 'Penyelesaian dari persamaan linear 3x - 5 = 10 adalah...', 'x = 3', 'x = 4', 'x = 5', 'x = 15', 2, 'Pindahkan -5 ke ruas kanan: 3x = 10 + 5 -> 3x = 15. Bagi kedua ruas dengan 3: x = 5.', 1);

-- 6. Soal Cerita PLSV
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'soal-cerita-plsv'), 'Tiga kali sebuah bilangan ditambah 4 adalah 19. Bilangan yang dimaksud adalah...', '3', '4', '5', '6', 2, 'Model matematika: 3x + 4 = 19. Pindahkan 4: 3x = 15. Diperoleh x = 5.', 1);

-- 7. Konsep Dasar PtLSV
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'konsep-dasar-ptlsv'), 'Simbol pertidaksamaan yang dibaca "maksimal" atau "tidak lebih dari" adalah...', '<', '>', '≤', '≥', 2, '"Tidak lebih dari" berarti nilainya bisa kurang dari atau sama dengan (≤).', 1);

-- 8. Menentukan HP PtLSV
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'menyelesaikan-ptlsv'), 'Himpunan penyelesaian dari 2x - 3 < 7 adalah...', 'x < 5', 'x > 5', 'x ≤ 5', 'x ≥ 5', 0, 'Pindahkan -3 ke ruas kanan: 2x < 10. Bagi dengan 2: x < 5.', 1);

-- 9. Pengenalan SPLDV
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'pengenalan-spldv'), 'Yang merupakan contoh persamaan linear dua variabel adalah...', 'x² + y = 4', '2x + 3y = 12', 'x - 5 = 0', '2x + y - z = 6', 1, 'Persamaan linear dua variabel berpangkat tertinggi satu dan memiliki dua variabel. Contohnya 2x + 3y = 12.', 1);

-- 10. Metode Eliminasi & Substitusi SPLDV
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'metode-eliminasi-substitusi-spldv'), 'Penyelesaian dari sistem persamaan x + y = 5 dan x - y = 1 adalah...', 'x = 3, y = 2', 'x = 4, y = 1', 'x = 2, y = 3', 'x = 1, y = 4', 0, 'Jumlahkan kedua persamaan: 2x = 6 -> x = 3. Substitusi x = 3 ke persamaan pertama: 3 + y = 5 -> y = 2. Diperoleh (3, 2).', 1);

-- 11. Aplikasi SPLDV
INSERT INTO practice_questions (material_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'aplikasi-soal-cerita-spldv'), 'Harga 2 buku dan 1 pensil adalah Rp 5.000. Harga 1 buku dan 1 pensil adalah Rp 3.000. Harga 1 buku adalah...', 'Rp 1.000', 'Rp 1.500', 'Rp 2.000', 'Rp 2.500', 2, 'Misal buku = x, pensil = y. 2x + y = 5.000 dan x + y = 3.000. Kurangi persamaan: (2x - x) = (5.000 - 3.000) -> x = 2.000. Harga 1 buku = Rp 2.000.', 1);


-- ==================== MATERIAL STEPS ====================
-- Mengisi Step Pembelajaran dasar untuk 11 materi
INSERT INTO material_steps (material_id, step_number, title, content, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'pengenalan-bentuk-aljabar'), 1, 'Struktur Bentuk Aljabar', '<h3>Mengenal Unsur-Unsur Bentuk Aljabar</h3><p>Bentuk aljabar adalah cara menuliskan ekspresi matematika menggunakan huruf (simbol) untuk mewakili nilai yang belum diketahui secara pasti. Mari kita bedah bentuk aljabar berikut: <strong>5x + 3y - 7</strong></p><p>Ekspresi di atas memiliki beberapa unsur penting pembentuknya:</p><ul><li><strong>1. Variabel (Peubah):</strong> Lambang pengganti suatu bilangan yang belum diketahui nilainya dengan jelas. Biasanya ditulis dalam huruf kecil. Pada bentuk di atas, variabelnya adalah <strong>x</strong> dan <strong>y</strong>.</li><li><strong>2. Koefisien:</strong> Bilangan yang berada di depan variabel dan bertindak sebagai pengali variabel tersebut. Pada bentuk di atas, koefisien untuk variabel x adalah <strong>5</strong>, sedangkan koefisien untuk variabel y adalah <strong>3</strong>.</li><li><strong>3. Konstanta:</strong> Suku dari bentuk aljabar yang berupa angka mandiri dan tidak memuat variabel sama sekali. Nilainya selalu tetap (konstan). Pada bentuk di atas, konstantanya adalah <strong>-7</strong> (jangan lupa tandanya ikut dibaca).</li><li><strong>4. Suku:</strong> Bagian-bagian dari bentuk aljabar yang dipisahkan oleh tanda operasi penjumlahan (+) atau pengurangan (-). Bentuk 5x + 3y - 7 memiliki <strong>3 suku</strong>, yaitu: 5x, 3y, dan -7.</li></ul>', 1),
((SELECT id FROM materials WHERE slug = 'penjumlahan-dan-pengurangan-aljabar'), 1, 'Operasi Suku Sejenis', '<h3>Aturan Penjumlahan & Pengurangan Aljabar</h3><p>Aturan emas dalam menjumlahkan dan mengurangkan bentuk aljabar adalah: <strong>Hanya suku-suku sejenis yang dapat dioperasikan!</strong></p><p>Suku sejenis adalah suku-suku yang memiliki <strong>variabel dan pangkat variabel yang persis sama</strong>. Mari kita gunakan analogi buah-buahan agar lebih mudah dipahami:</p><ul><li>Jika Anda memiliki 2 apel (2x) dan mendapatkan 3 apel lagi (3x), maka Anda sekarang memiliki <strong>5 apel (5x)</strong>. Ini sah karena sejenis!</li><li>Namun, jika Anda memiliki 2 apel (2x) dan 3 pisang (3y), Anda tidak bisa menggabungkannya menjadi 5 apel-pisang. Hasilnya tetap <strong>2x + 3y</strong>!</li></ul><p><strong>Contoh Langkah Penyederhanaan:</strong></p><ol><li>Sederhanakan bentuk: <em>4x + 5y - 2x + 3y - 6</em></li><li><strong>Langkah 1:</strong> Kelompokkan suku-suku sejenis.</li><li><em>(4x - 2x) + (5y + 3y) - 6</em></li><li><strong>Langkah 2:</strong> Operasikan koefisiennya.</li><li><em>2x + 8y - 6</em> (Ini adalah bentuk paling sederhana yang sudah tidak bisa dioperasikan lagi).</li></ol>', 1),
((SELECT id FROM materials WHERE slug = 'perkalian-dan-pembagian-aljabar'), 1, 'Operasi Distributif & Rasio', '<h3>Operasi Perkalian & Pembagian Bentuk Aljabar</h3><p>Berbeda dengan penjumlahan, pada perkalian dan pembagian aljabar, kita <strong>tidak perlu mencari suku yang sejenis</strong>. Semua suku bisa dikalikan atau dibagi satu sama lain!</p><h3>A. Perkalian Aljabar (Sifat Distributif)</h3><p>Untuk mengalikan bentuk aljabar suku satu dengan suku dua, kita menggunakan sifat distributif perkalian terhadap penjumlahan:</p><p style=\"padding-left:1rem; border-left:3px solid var(--blue); font-style:italic;\">a(b + c) = ab + ac</p><p><strong>Contoh Perkalian Suku Dua:</strong></p><ul><li>(x + 2)(x + 3) = x(x) + x(3) + 2(x) + 2(3)</li><li>= x² + 3x + 2x + 6</li><li>= <strong>x² + 5x + 6</strong></li></ul><h3>B. Pembagian Aljabar</h3><p>Pembagian bentuk aljabar diselesaikan dengan menyederhanakan pecahan aljabar melalui pembagian koefisien dengan koefisien, serta pengurangan pangkat variabel yang sejenis berdasarkan aturan eksponen.</p><p><strong>Contoh Pembagian:</strong></p><ul><li>Sederhanakan: 12x²y : 4xy</li><li>Bagi angkanya: 12 / 4 = 3</li><li>Kurangkan pangkat variabel sejenis: x²/x = x, dan y/y = 1</li><li>Hasil Akhir: <strong>3x</strong></li></ul>', 1),
((SELECT id FROM materials WHERE slug = 'konsep-dasar-plsv'), 1, 'Kalimat Terbuka vs Tertutup', '<h3>Mengenal Konsep Persamaan Linear Satu Variabel</h3><p>Sebelum masuk ke rumus, mari kita pahami dua jenis kalimat matematika berikut:</p><ul><li><strong>1. Kalimat Tertutup (Pernyataan):</strong> Kalimat matematika yang sudah jelas nilai kebenarannya (pasti benar atau pasti salah). Contoh: <em>\"3 + 5 = 8\"</em> (Kalimat benar), atau <em>\"10 - 2 = 5\"</em> (Kalimat salah).</li><li><strong>2. Kalimat Terbuka:</strong> Kalimat matematika yang belum bisa ditentukan benar atau salahnya karena memuat unsur yang belum diketahui (variabel). Contoh: <em>\"x + 4 = 10\"</em>. Kalimat ini bisa benar jika x = 6, dan salah jika x diisi angka lain.</li></ul><h3>Apa itu PLSV?</h3><p>Persamaan Linear Satu Variabel (PLSV) adalah kalimat terbuka yang memiliki karakteristik khusus:</p><ol><li>Dihubungkan oleh tanda **sama dengan (=)**.</li><li>Hanya memiliki **satu jenis variabel** (misalnya x saja, atau y saja).</li><li>Variabelnya berpangkat tertinggi **satu** (linear, tidak ada pangkat 2, 3, dst.).</li></ol><p>Bentuk umum PLSV adalah: <strong>ax + b = c</strong> (di mana a ≠ 0, dan x adalah variabel).</p>', 1),
((SELECT id FROM materials WHERE slug = 'cara-menyelesaikan-plsv'), 1, 'Metode Penyetaraan & Pindah Ruas', '<h3>Cara Menyelesaikan PLSV dengan Mudah</h3><p>Tujuan utama menyelesaikan PLSV adalah untuk mencari nilai dari variabel agar persamaan tersebut bernilai benar (menemukan Himpunan Penyelesaian).</p><h3>Prinsip Keseimbangan (Timbangan)</h3><p>Bayangkan persamaan linear sebagai sebuah timbangan yang seimbang. Agar timbangan tetap seimbang, apa pun operasi matematika (tambah, kurang, kali, bagi) yang Anda lakukan di ruas kiri, <strong>wajib Anda lakukan juga di ruas kanan</strong>!</p><h3>Shortcut: Metode Pindah Ruas</h3><p>Untuk mempercepat perhitungan, kita bisa memindahkan angka dari satu ruas ke ruas lainnya dengan syarat **membalik operasinya**:</p><ul><li>Positif (+) pindah ruas menjadi <strong>Negatif (-)</strong></li><li>Negatif (-) pindah ruas menjadi <strong>Positif (+)</strong></li><li>Perkalian (x) pindah ruas menjadi <strong>Pembagian (/)</strong></li><li>Pembagian (/) pindah ruas menjadi <strong>Perkalian (x)</strong></li></ul><p><strong>Contoh Langkah Demi Langkah:</strong></p><ol><li>Selesaikan: <em>3x - 5 = 10</em></li><li><strong>Langkah 1:</strong> Pindahkan -5 ke ruas kanan menjadi +5.</li><li><em>3x = 10 + 5</em> -> <em>3x = 15</em></li><li><strong>Langkah 2:</strong> Pindahkan perkalian 3 ke ruas kanan menjadi pembagian 3.</li><li><em>x = 15 / 3</em></li><li><em>x = 5</em>. Nilai penyelesaiannya adalah <strong>x = 5</strong>.</li></ol>', 1),
((SELECT id FROM materials WHERE slug = 'soal-cerita-plsv'), 1, 'Pembuatan Model Matematika', '<h3>Menerapkan PLSV pada Soal Cerita Kehidupan Nyata</h3><p>Banyak permasalahan sehari-hari yang dapat diselesaikan dengan mudah menggunakan konsep PLSV. Kunci utamanya adalah mengubah kalimat cerita verbal menjadi <strong>Model Matematika</strong> berbentuk persamaan aljabar.</p><h3>Langkah Menghadapi Soal Cerita:</h3><ul><li><strong>Langkah 1:</strong> Tentukan hal yang ditanyakan atau belum diketahui, lalu misalkan dengan variabel (misal: <em>x</em>).</li><li><strong>Langkah 2:</strong> Tulis hubungan matematika antar-informasi yang diberikan untuk menyusun persamaan linear.</li><li><strong>Langkah 3:</strong> Selesaikan persamaan tersebut untuk mencari nilai variabel.</li><li><strong>Langkah 4:</strong> Jawab pertanyaan soal cerita berdasarkan nilai variabel yang diperoleh.</li></ul><p><strong>Contoh Kasus Soal Cerita:</strong></p><p style=\"font-style:italic;\">\"Budi membeli 3 buah buku tulis yang sejenis. Ia membayar dengan selembar uang Rp 20.000 dan menerima kembalian Rp 5.000. Berapakah harga 1 buah buku tulis tersebut?\"</p><p><strong>Model Matematika:</strong></p><ul><li>Misalkan harga 1 buah buku = <em>x</em>.</li><li>Total belanja ditambah kembalian sama dengan jumlah uang mula-mula:</li><li><em>3x + 5.000 = 20.000</em></li><li><em>3x = 20.000 - 5.000</em> -> <em>3x = 15.000</em></li><li><em>x = 15.000 / 3</em> -> <em>x = 5.000</em></li><li>Jadi, harga satu buah buku tulis adalah <strong>Rp 5.000</strong>.</li></ul>', 1),
((SELECT id FROM materials WHERE slug = 'konsep-dasar-ptlsv'), 1, 'Simbol Hubung PtLSV', '<h3>Mengenal Pertidaksamaan Linear Satu Variabel</h3><p>Jika pada Persamaan Linear kita menggunakan tanda hubung sama dengan (=), pada Pertidaksamaan Linear Satu Variabel (PtLSV) kita dihubungkan oleh <strong>tanda ketidaksamaan</strong>.</p><p>Berikut adalah 4 lambang ketidaksamaan yang wajib Anda pahami:</p><ul><li><strong>&lt; (Kurang dari):</strong> Nilai di ruas kiri lebih kecil daripada ruas kanan.</li><li><strong>&gt; (Lebih dari):</strong> Nilai di ruas kiri lebih besar daripada ruas kanan.</li><li><strong>≤ (Kurang dari atau sama dengan):</strong> Digunakan juga untuk kata kunci <em>\"maksimum\"</em> atau <em>\"tidak lebih dari\"</em>.</li><li><strong>≥ (Lebih dari atau sama dengan):</strong> Digunakan juga untuk kata kunci <em>\"minimum\"</em> atau <em>\"tidak kurang dari\"</em>.</li></ul><p><strong>Perbedaan Hasil Penyelesaian:</strong></p><p>Jika persamaan <em>x = 3</em> hanya memiliki satu nilai tunggal sebagai jawaban, maka pertidaksamaan <em>x &gt; 3</em> memiliki rentang jawaban yang tak terhingga jumlahnya (misalnya: 4, 5, 6, 7, ... jika x adalah bilangan bulat).</p>', 1),
((SELECT id FROM materials WHERE slug = 'menyelesaikan-ptlsv'), 1, 'Pembalikan Tanda PtLSV', '<h3>Menyelesaikan PtLSV & Garis Bilangan</h3><p>Menyelesaikan pertidaksamaan hampir sama dengan persamaan biasa. Namun, ada satu <strong>ATURAN EMAS</strong> yang sangat krusial dan sering dilupakan oleh siswa:</p><p style=\"padding:0.75rem; background:#FFFBEB; border-left:4px solid var(--orange); font-weight:600;\">⚠️ Arah tanda pertidaksamaan WAJIB DIBALIK apabila Anda mengalikan atau membagi kedua ruas dengan BILANGAN NEGATIF yang sama!</p><p><strong>Mari kita lihat contoh pembalikan tanda:</strong></p><ol><li>Selesaikan: <em>-2x &lt; 6</em></li><li>Bagi kedua ruas dengan -2 (karena pembaginya negatif, balik tanda &lt; menjadi &gt;).</li><li><em>x &gt; 6 / -2</em></li><li><em>x &gt; -3</em>. Himpunan penyelesaiannya adalah seluruh angka yang lebih besar dari -3.</li></ol><h3>Garis Bilangan Penyelesaian</h3><p>Penyelesaian PtLSV digambarkan pada garis bilangan dengan ketentuan:</p><ul><li><strong>Bulatan Kosong (○):</strong> Untuk tanda hubung &lt; atau &gt; (angka pembatas tidak termasuk dalam jawaban).</li><li><strong>Bulatan Penuh (●):</strong> Untuk tanda hubung ≤ atau ≥ (angka pembatas termasuk dalam jawaban).</li></ul>', 1),
((SELECT id FROM materials WHERE slug = 'pengenalan-spldv'), 1, 'Sistem Linear Dua Persamaan', '<h3>Mengenal Sistem Persamaan Linear Dua Variabel (SPLDV)</h3><p>Mari kita tingkatkan pemahaman kita! Jika sebelumnya kita hanya bermain dengan satu variabel (x), sekarang kita akan berurusan dengan **dua variabel sekaligus** (biasanya <em>x</em> dan <em>y</em>).</p><p>SPLDV adalah kumpulan dua atau lebih persamaan linear dua variabel sejenis yang saling terhubung satu sama lain. Bentuk umum SPLDV adalah:</p><p style=\"padding-left:1rem; border-left:3px solid var(--blue); font-family:monospace; font-weight:700;\">ax + by = c<br />dx + ey = f</p><p>Di mana a, b, d, dan e adalah koefisien; c dan f adalah konstanta; serta x dan y adalah variabel.</p><h3>Mengapa Harus Ada Dua Persamaan?</h3><p>Satu persamaan linear dua variabel memiliki tak terhingga selesaian. Misalnya, pada <em>x + y = 5</em>, jawabannya bisa (1,4), (2,3), (5,0), dst. Agar kita mendapatkan **satu jawaban pasti yang unik** untuk nilai x dan y, kita wajib memiliki persamaan kedua yang membatasi nilai tersebut.</p>', 1),
((SELECT id FROM materials WHERE slug = 'metode-eliminasi-substitusi-spldv'), 1, 'Metode Aljabar Campuran', '<h3>Menyelesaikan SPLDV dengan Metode Aljabar Campuran</h3><p>Ada beberapa metode untuk menyelesaikan SPLDV, namun metode yang paling populer, cepat, dan akurat di sekolah adalah **Metode Campuran (Eliminasi-Substitusi)**.</p><h3>Langkah 1: Metode Eliminasi (Menghilangkan)</h3><p>Kita \"menghilangkan\" salah satu variabel untuk mencari variabel lainnya. Caranya dengan menyamakan koefisien variabel yang ingin dieliminasi dengan operasi perkalian, lalu kurangkan atau jumlahkan kedua persamaan.</p><h3>Langkah 2: Metode Substitusi (Mengganti)</h3><p>Setelah salah satu nilai variabel ditemukan dari metode eliminasi, masukkan nilai tersebut ke salah satu persamaan asal untuk mencari nilai variabel yang tersisa.</p><p><strong>Contoh Langkah Pengerjaan:</strong></p><p style=\"font-style:italic;\">Selesaikan SPLDV: { 2x + y = 8 } dan { x - y = 1 }</p><ol><li><strong>Eliminasi y:</strong> Karena koefisien y sudah sama (1 dan -1), langsung jumlahkan kedua persamaan agar y hilang.</li><li><em>(2x + x) + (y + (-y)) = 8 + 1</em> -> <em>3x = 9</em> -> <strong>x = 3</strong></li><li><strong>Substitusi nilai x = 3:</strong> Masukkan x = 3 ke persamaan kedua (x - y = 1).</li><li><em>3 - y = 1</em> -> <em>-y = 1 - 3</em> -> <em>-y = -2</em> -> <strong>y = 2</strong></li><li>Titik penyelesaiannya adalah <strong>(3, 2)</strong>.</li></ol>', 1),
((SELECT id FROM materials WHERE slug = 'aplikasi-soal-cerita-spldv'), 1, 'Penyelesaian Aplikasi SPLDV', '<h3>Penerapan SPLDV dalam Kehidupan Sehari-hari</h3><p>SPLDV sangat sering digunakan untuk menyelesaikan teka-teki praktis sehari-hari, seperti menghitung harga satuan barang belanjaan kombinasi, menghitung umur, hingga menentukan tiket masuk bioskop.</p><h3>Langkah Menyelesaikan Soal Cerita SPLDV:</h3><ol><li><strong>1. Buat Pemisalan:</strong> Tentukan variabel untuk dua hal yang tidak diketahui. Misalkan harga 1 buku = <em>x</em>, dan harga 1 pensil = <em>y</em>.</li><li><strong>2. Susun Persamaan:</strong> Terjemahkan soal cerita menjadi dua buah persamaan SPLDV yang logis.</li><li><strong>3. Selesaikan Persamaan:</strong> Gunakan metode eliminasi-substitusi untuk menghitung nilai x dan y.</li><li><strong>4. Simpulkan Jawaban:</strong> Jawab sesuai pertanyaan akhir pada soal cerita.</li></ol><p><strong>Contoh Kasus Belanjaan:</strong></p><p style=\"font-style:italic;\">\"Andi membeli 2 buku dan 3 pensil seharga Rp 12.000. Di toko yang sama, Budi membeli 1 buku dan 2 pensil seharga Rp 7.000. Berapakah harga 1 buku dan 1 pensil?\"</p><p><strong>Model Matematika:</strong></p><ul><li>Persamaan 1: <em>2x + 3y = 12.000</em></li><li>Persamaan 2: <em>x + 2y = 7.000</em></li><li>Kalikan Persamaan 2 dengan 2 agar koefisien x sama: <em>2x + 4y = 14.000</em></li><li>Kurangi: (2x + 4y) - (2x + 3y) = 14.000 - 12.000 -> <strong>y = 2.000</strong> (Harga 1 pensil = Rp 2.000)</li><li>Substitusi y = 2.000 ke Persamaan 2: <em>x + 2(2.000) = 7.000</em> -> <em>x + 4.000 = 7.000</em> -> <strong>x = 3.000</strong> (Harga 1 buku = Rp 3.000)</li><li>Jadi, harga 1 buku adalah Rp 3.000 dan harga 1 pensil adalah Rp 2.000.</li></ul>', 1);


-- ==================== VIDEOS ====================
-- Semua video diisi lengkap menggunakan Tautan YouTube Embed Resmi yang valid sesuai permintaan pengguna.
INSERT INTO videos (material_id, title, description, video_url, thumbnail_url, duration, sort_order) VALUES
((SELECT id FROM materials WHERE slug = 'pengenalan-bentuk-aljabar'), 'Bentuk Aljabar (1) - Pengenalan Aljabar, Bentuk Aljabar', 'Materi dasar memahami konsep bentuk aljabar dan struktur pembentuknya.', 'https://www.youtube.com/embed/SB5XDV-8lzk', 'https://img.youtube.com/vi/SB5XDV-8lzk/mqdefault.jpg', 640, 1),
((SELECT id FROM materials WHERE slug = 'penjumlahan-dan-pengurangan-aljabar'), 'Bentuk Aljabar (2) - Penjumlahan Aljabar dan Pengurangan Aljabar Sederhana', 'Mempelajari cara menyederhanakan bentuk aljabar melalui penjumlahan dan pengurangan.', 'https://www.youtube.com/embed/bPzunLXFtFk', 'https://img.youtube.com/vi/bPzunLXFtFk/mqdefault.jpg', 780, 1),
((SELECT id FROM materials WHERE slug = 'perkalian-dan-pembagian-aljabar'), 'Aljabar [Part 3] - Perkalian dan Pembagian Aljabar', 'Video penjelasan materi operasi perkalian distributif dan pembagian bentuk aljabar.', 'https://www.youtube.com/embed/ZQV300vGWhU', 'https://img.youtube.com/vi/ZQV300vGWhU/mqdefault.jpg', 820, 1),
((SELECT id FROM materials WHERE slug = 'konsep-dasar-plsv'), 'PERSAMAAN LINEAR SATU VARIABEL - MATEMATIKA KELAS 7', 'Mempelajari kalimat terbuka dan konsep persamaan satu variabel pangkat satu.', 'https://www.youtube.com/embed/7H_EhKcK2G4', 'https://img.youtube.com/vi/7H_EhKcK2G4/mqdefault.jpg', 900, 1),
((SELECT id FROM materials WHERE slug = 'cara-menyelesaikan-plsv'), 'Persamaan Linear Satu Variabel (PLSV) - Cara Menentukan Penyelesaian', 'Langkah demi langkah menentukan himpunan penyelesaian PLSV dengan mudah.', 'https://www.youtube.com/embed/p7e4z1fvBBA', 'https://img.youtube.com/vi/p7e4z1fvBBA/mqdefault.jpg', 850, 1),
((SELECT id FROM materials WHERE slug = 'soal-cerita-plsv'), 'Model Matematika dan Aplikasi Persamaan Linear Satu Variabel (Soal Cerita)', 'Menerapkan konsep persamaan linear ke dalam pengerjaan soal cerita kehidupan sehari-hari.', 'https://www.youtube.com/embed/uN2nE8qW9hQ', 'https://img.youtube.com/vi/uN2nE8qW9hQ/mqdefault.jpg', 720, 1),
((SELECT id FROM materials WHERE slug = 'konsep-dasar-ptlsv'), 'Pertidaksamaan Linear Satu Variabel | PtLSV | Matematika Kelas 7', 'Video penjelasan lambang pertidaksamaan dan konsep dasar PtLSV.', 'https://www.youtube.com/embed/SM7qejnJv28', 'https://img.youtube.com/vi/SM7qejnJv28/mqdefault.jpg', 680, 1),
((SELECT id FROM materials WHERE slug = 'menyelesaikan-ptlsv'), 'Pertidaksamaan Linear Satu Variabel, Menentukan Himpunan Penyelesaian', 'Menyelesaikan pertidaksamaan linear dan menggambar grafik garis bilangan penyelesaian.', 'https://www.youtube.com/embed/JT5H_g3oxpI', 'https://img.youtube.com/vi/JT5H_g3oxpI/mqdefault.jpg', 960, 1),
((SELECT id FROM materials WHERE slug = 'pengenalan-spldv'), 'Materi lengkap sistem persamaan linear dua variabel', 'Memahami pengertian, struktur, dan konsep dasar sistem linear dua variabel.', 'https://www.youtube.com/embed/TqQSypY8x2M', 'https://img.youtube.com/vi/TqQSypY8x2M/mqdefault.jpg', 840, 1),
((SELECT id FROM materials WHERE slug = 'metode-eliminasi-substitusi-spldv'), 'Sistem persamaan linear dua variabel lengkap dengan latihan soal', 'Menyelesaikan SPLDV dengan metode kombinasi eliminasi aljabar dan substitusi.', 'https://www.youtube.com/embed/qdczqWuBLgo', 'https://img.youtube.com/vi/qdczqWuBLgo/mqdefault.jpg', 750, 1),
((SELECT id FROM materials WHERE slug = 'aplikasi-soal-cerita-spldv'), 'Cara Mudah Menyelesaikan Soal Cerita SPLDV - Matematika', 'Latihan penerapan metode SPLDV pada permasalahan jual beli barang sehari-hari.', 'https://www.youtube.com/embed/fA3f5Bv7h0E', 'https://img.youtube.com/vi/fA3f5Bv7h0E/mqdefault.jpg', 920, 1);


-- ==================== QUIZZES ====================
-- Setiap sub-topik (materi) wajib memiliki kuis pendukung.
INSERT INTO quizzes (material_id, title, description, time_limit, passing_score) VALUES
((SELECT id FROM materials WHERE slug = 'pengenalan-bentuk-aljabar'), 'Kuis Pengenalan Bentuk Aljabar', 'Uji pemahaman unsur-unsur pembentuk aljabar Anda', 15, 70),
((SELECT id FROM materials WHERE slug = 'penjumlahan-dan-pengurangan-aljabar'), 'Kuis Penjumlahan dan Pengurangan Aljabar', 'Uji operasi hitung suku sejenis bentuk aljabar Anda', 15, 70),
((SELECT id FROM materials WHERE slug = 'perkalian-dan-pembagian-aljabar'), 'Kuis Perkalian dan Pembagian Aljabar', 'Uji perkalian distributif dan rasio bentuk aljabar Anda', 15, 70),
((SELECT id FROM materials WHERE slug = 'konsep-dasar-plsv'), 'Kuis Konsep Dasar PLSV', 'Uji kalimat terbuka dan konsep persamaan satu variabel Anda', 15, 70),
((SELECT id FROM materials WHERE slug = 'cara-menyelesaikan-plsv'), 'Kuis Cara Menentukan Penyelesaian PLSV', 'Uji metode penyelesaian dan pindah ruas PLSV Anda', 15, 70),
((SELECT id FROM materials WHERE slug = 'soal-cerita-plsv'), 'Kuis Soal Cerita PLSV', 'Uji model matematika dari soal cerita PLSV Anda', 15, 70),
((SELECT id FROM materials WHERE slug = 'konsep-dasar-ptlsv'), 'Kuis Konsep Dasar PtLSV', 'Uji pemahaman lambang ketidaksamaan PtLSV Anda', 15, 70),
((SELECT id FROM materials WHERE slug = 'menyelesaikan-ptlsv'), 'Kuis Penyelesaian PtLSV', 'Uji pembalikan tanda dan garis bilangan PtLSV Anda', 15, 70),
((SELECT id FROM materials WHERE slug = 'pengenalan-spldv'), 'Kuis Pengenalan SPLDV', 'Uji konsep dasar dan bentuk persamaan ganda Anda', 15, 70),
((SELECT id FROM materials WHERE slug = 'metode-eliminasi-substitusi-spldv'), 'Kuis Metode Eliminasi dan Substitusi SPLDV', 'Uji metode eliminasi dan substitusi SPLDV Anda', 15, 70),
((SELECT id FROM materials WHERE slug = 'aplikasi-soal-cerita-spldv'), 'Kuis Aplikasi dan Soal Cerita SPLDV', 'Uji penyelesaian masalah kehidupan sehari-hari SPLDV Anda', 15, 70);


-- ==================== QUIZ QUESTIONS ====================
-- Kuis 1: Pengenalan Bentuk Aljabar
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Pengenalan Bentuk Aljabar'), 'Pada bentuk aljabar 4x - 7, variabelnya adalah...', 'x', '4', '-7', '4x', 'a', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Pengenalan Bentuk Aljabar'), 'Koefisien dari y pada bentuk aljabar 3x - 5y + 8 adalah...', '3', '5', '-5', '8', 'c', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Pengenalan Bentuk Aljabar'), 'Konstanta dari bentuk aljabar 2x² - 3x + 10 adalah...', '2', '-3', '-3x', '10', 'd', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Pengenalan Bentuk Aljabar'), 'Suku-suku sejenis dari bentuk aljabar 2x + 3y - x + 5 adalah...', '2x dan 3y', '2x dan -x', '3y dan 5', '2x dan 5', 'b', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Pengenalan Bentuk Aljabar'), 'Banyak suku pada bentuk aljabar 2x + 3y - 5 adalah...', '3 suku', '2 suku', '4 suku', '1 suku', 'a', 5);

-- Kuis 2: Penjumlahan dan Pengurangan Aljabar
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Penjumlahan dan Pengurangan Aljabar'), 'Hasil penjumlahan dari 5x + 3x adalah...', '8x', '2x', '15x', '8', 'a', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Penjumlahan dan Pengurangan Aljabar'), 'Hasil penyederhanaan dari 3a + 5b - 2a + b adalah...', 'a - 6b', 'a + 6b', '5a + 6b', '5a + 4b', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Penjumlahan dan Pengurangan Aljabar'), 'Hasil pengurangan 8x - 5y oleh 2x + 3y adalah...', '6x - 2y', '10x - 2y', '6x - 8y', '10x - 8y', 'c', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Penjumlahan dan Pengurangan Aljabar'), 'Hasil dari (2x + 5) + (3x - 2) adalah...', '5x - 3', 'x + 3', 'x - 3', '5x + 3', 'd', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Penjumlahan dan Pengurangan Aljabar'), 'Bentuk sederhana dari 4x - (2x - 3) adalah...', '2x + 3', '2x - 3', '6x + 3', '6x - 3', 'a', 5);

-- Kuis 3: Perkalian dan Pembagian Aljabar
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Perkalian dan Pembagian Aljabar'), 'Hasil perkalian dari 3 * (2x - 5) adalah...', '6x - 15', '6x - 5', '5x - 15', '5x - 5', 'a', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Perkalian dan Pembagian Aljabar'), 'Hasil dari 2x * 4y adalah...', '8x', '8xy', '6xy', '8y', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Perkalian dan Pembagian Aljabar'), 'Hasil pembagian dari 12x : 3 adalah...', '4', '12', '4x', '12x', 'c', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Perkalian dan Pembagian Aljabar'), 'Hasil pembagian dari 8ab : 2a adalah...', '4', '4a', '4ab', '4b', 'd', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Perkalian dan Pembagian Aljabar'), 'Hasil perkalian dari (x + 2)(x + 3) adalah...', 'x² + 5', 'x² + 5x + 6', 'x² + 6', 'x² + 6x + 5', 'b', 5);

-- Kuis 4: Konsep Dasar PLSV
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Konsep Dasar PLSV'), 'Manakah di bawah ini yang merupakan contoh kalimat terbuka PLSV?', '3 + 5 = 8', 'x + y = 10', '2x - 5 = 11', 'x² - 9 = 0', 'c', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Konsep Dasar PLSV'), 'Kalimat terbuka di bawah ini yang bernilai salah jika x = 3 adalah...', '2x - 1 = 6', 'x + 4 = 7', '3x = 9', 'x - 1 = 2', 'a', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Konsep Dasar PLSV'), 'Pangkat tertinggi variabel pada persamaan linear adalah...', '0', '1', '2', '3', 'b', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Konsep Dasar PLSV'), 'Manakah yang merupakan contoh kalimat tertutup bernilai benar?', '4x = 12', '6 - 2 < 3', 'Presiden Indonesia saat ini adalah Soekarno', '5 + 3 = 8', 'd', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Konsep Dasar PLSV'), 'Hubungan matematika yang digunakan pada persamaan linear adalah...', 'Sama dengan (=)', 'Kurang dari (<)', 'Lebih dari (>)', 'Tidak sama dengan (≠)', 'a', 5);

-- Kuis 5: Cara Menentukan Penyelesaian PLSV
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Cara Menentukan Penyelesaian PLSV'), 'Penyelesaian dari x + 5 = 12 adalah...', 'x = 17', 'x = 7', 'x = -7', 'x = 12', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Cara Menentukan Penyelesaian PLSV'), 'Penyelesaian dari 2x - 3 = 7 adalah...', 'x = 5', 'x = 2', 'x = 10', 'x = 4', 'a', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Cara Menentukan Penyelesaian PLSV'), 'Penyelesaian dari 3x = 18 adalah...', 'x = 3', 'x = 15', 'x = 6', 'x = 54', 'c', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Cara Menentukan Penyelesaian PLSV'), 'Penyelesaian dari 4x + 2 = 2x + 10 adalah...', 'x = 2', 'x = 6', 'x = 8', 'x = 4', 'd', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Cara Menentukan Penyelesaian PLSV'), 'Penyelesaian dari -2x + 8 = 0 adalah...', 'x = -4', 'x = 4', 'x = 2', 'x = -2', 'b', 5);

-- Kuis 6: Soal Cerita PLSV
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Soal Cerita PLSV'), 'Umur Budi 5 tahun lebih muda dari Ali. Jika jumlah umur mereka 25 tahun, umur Ali adalah...', '10 tahun', '15 tahun', '20 tahun', '12 tahun', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Soal Cerita PLSV'), 'Tiga kali sebuah bilangan ditambah 4 adalah 19. Bilangan yang dimaksud adalah...', '5', '3', '4', '6', 'a', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Soal Cerita PLSV'), 'Keliling persegi panjang adalah 24 cm. Jika panjangnya lebih 2 cm dari lebarnya, lebarnya adalah...', '7 cm', '6 cm', '5 cm', '4 cm', 'c', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Soal Cerita PLSV'), 'Sebuah toko menjual buku seharga x rupiah. Jika membeli 4 buku uangnya sisa Rp 2.000 dari Rp 10.000, harga buku adalah...', 'Rp 1.500', 'Rp 2.500', 'Rp 3.000', 'Rp 2.000', 'd', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Soal Cerita PLSV'), 'Jumlah dua bilangan bulat berurutan adalah 15. Bilangan terkecilnya adalah...', '7', '8', '6', '9', 'a', 5);

-- Kuis 7: Konsep Dasar PtLSV
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Konsep Dasar PtLSV'), 'Simbol pertidaksamaan yang menyatakan "kurang dari" adalah...', '<', '>', '≤', '≥', 'a', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Konsep Dasar PtLSV'), 'Simbol pertidaksamaan yang menyatakan "maksimal" atau "tidak lebih dari" adalah...', '<', '≤', '>', '≥', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Konsep Dasar PtLSV'), 'Manakah di bawah ini yang merupakan PtLSV?', '3x - 5 = 7', '2x + y < 5', '3x - 5 > 7', 'x² - 4 ≤ 0', 'c', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Konsep Dasar PtLSV'), 'Jika x > y, maka jika kedua ruas dikali bilangan negatif -1 akan menjadi...', '-x > -y', '-x ≥ -y', '-x ≤ -y', '-x < -y', 'd', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Konsep Dasar PtLSV'), 'Simbol ≥ dibaca sebagai...', 'Lebih besar dari atau sama dengan', 'Lebih kecil dari atau sama dengan', 'Kurang dari', 'Tidak sama dengan', 'a', 5);

-- Kuis 8: Penyelesaian PtLSV
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Penyelesaian PtLSV'), 'Himpunan penyelesaian dari x + 3 < 8 adalah...', 'x < 11', 'x < 5', 'x > 5', 'x ≤ 5', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Penyelesaian PtLSV'), 'Himpunan penyelesaian dari 2x - 4 ≥ 6 adalah...', 'x ≥ 5', 'x ≤ 5', 'x ≥ 10', 'x ≥ 1', 'a', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Penyelesaian PtLSV'), 'Himpunan penyelesaian dari -3x < 9 adalah...', 'x < -3', 'x ≤ -3', 'x > -3', 'x ≥ -3', 'c', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Penyelesaian PtLSV'), 'Jika x bilangan cacah, himpunan penyelesaian dari x - 2 ≤ 2 adalah...', '{0, 1, 2, 3}', '{1, 2, 3, 4}', '{0, 1, 2, 3, 4, 5}', '{0, 1, 2, 3, 4}', 'd', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Penyelesaian PtLSV'), 'Pada grafik garis bilangan, bulatan penuh digunakan untuk simbol...', '≤ atau ≥', '< atau >', 'hanya <', 'hanya >', 'a', 5);

-- Kuis 9: Pengenalan SPLDV
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Pengenalan SPLDV'), 'SPLDV adalah singkatan dari...', 'Sistem Persamaan Linier Dengan Variabel', 'Sistem Persamaan Linear Dimensi Variabel', 'Sistem Persamaan Linear Dua Variabel', 'Sistem Persamaan Linear Dua Vektor', 'c', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Pengenalan SPLDV'), 'Bentuk umum SPLDV melibatkan...', '1 persamaan 2 variabel', '2 persamaan dengan 2 variabel pangkat satu', '2 persamaan berpangkat kuadrat', '3 persamaan 3 variabel', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Pengenalan SPLDV'), 'Manakah di bawah ini yang merupakan persamaan linear dua variabel?', '2x + 3y = 12', 'x² + y = 4', 'x - 5 = 0', '2x + y - z = 6', 'a', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Pengenalan SPLDV'), 'Untuk menyelesaikan SPLDV, minimal dibutuhkan berapa persamaan?', '1 persamaan', '3 persamaan', '4 persamaan', '2 persamaan', 'd', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Pengenalan SPLDV'), 'Pasangan berurutan (x, y) yang memenuhi persamaan disebut...', 'Penyelesaian', 'Variabel', 'Konstanta', 'Koefisien', 'a', 5);

-- Kuis 10: Metode Eliminasi dan Substitusi SPLDV
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Metode Eliminasi dan Substitusi SPLDV'), 'Metode penyelesaian SPLDV dengan cara menghilangkan salah satu variabel disebut...', 'Metode Substitusi', 'Metode Eliminasi', 'Metode Grafik', 'Metode Campuran', 'b', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Metode Eliminasi dan Substitusi SPLDV'), 'Penyelesaian dari x + y = 5 dan x - y = 1 adalah...', 'x = 3, y = 2', 'x = 4, y = 1', 'x = 2, y = 3', 'x = 1, y = 4', 'a', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Metode Eliminasi dan Substitusi SPLDV'), 'Jika x + 2y = 8 dan x = 2, maka nilai y adalah...', '1', '2', '3', '4', 'c', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Metode Eliminasi dan Substitusi SPLDV'), 'Metode penyelesaian SPLDV dengan mengganti salah satu variabel disebut...', 'Metode Grafik', 'Metode Eliminasi', 'Metode Eliminasi Aljabar', 'Metode Substitusi', 'd', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Metode Eliminasi dan Substitusi SPLDV'), 'Jika 2x - y = 4 dan x + y = 5, maka nilai x adalah...', '2', '3', '4', '5', 'b', 5);

-- Kuis 11: Kuis Aplikasi dan Soal Cerita SPLDV
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, sort_order) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Aplikasi dan Soal Cerita SPLDV'), 'Harga 2 buku dan 1 pensil adalah Rp 5.000. Harga 1 buku dan 1 pensil adalah Rp 3.000. Harga 1 buku adalah...', 'Rp 1.000', 'Rp 2.000', 'Rp 1.500', 'Rp 2.500', 'b', 1),
((SELECT id FROM quizzes WHERE title = 'Kuis Aplikasi dan Soal Cerita SPLDV'), 'Jumlah dua bilangan adalah 20 dan selisihnya adalah 4. Bilangan terbesarnya adalah...', '12', '16', '8', '10', 'a', 2),
((SELECT id FROM quizzes WHERE title = 'Kuis Aplikasi dan Soal Cerita SPLDV'), 'Di sebuah parkiran terdapat 10 kendaraan berupa motor dan mobil. Jumlah roda seluruhnya 28. Banyak motor adalah...', '4 motor', '8 motor', '6 motor', '5 motor', 'c', 3),
((SELECT id FROM quizzes WHERE title = 'Kuis Aplikasi dan Soal Cerita SPLDV'), 'Harga 3 baju dan 2 kaos adalah Rp 280.000, sedangkan harga 1 baju dan 3 kaos adalah Rp 210.000. Harga 1 baju adalah...', 'Rp 40.000', 'Rp 50.000', 'Rp 30.000', 'Rp 60.000', 'd', 4),
((SELECT id FROM quizzes WHERE title = 'Kuis Aplikasi dan Soal Cerita SPLDV'), 'Umur ayah sekarang 3 kali umur anak. Selisih umur mereka 30 tahun. Umur anak sekarang adalah...', '10 tahun', '15 tahun', '20 tahun', '12 tahun', 'b', 5);


-- ==================== QUIZ DISCUSSIONS ====================
-- Menyediakan pembahasan untuk pertanyaan pertama di setiap kuis
INSERT INTO quiz_discussions (question_id, explanation) VALUES
((SELECT id FROM quiz_questions WHERE question_text = 'Pada bentuk aljabar 4x - 7, variabelnya adalah...'), 'Variabel adalah lambang pengganti suatu bilangan yang belum diketahui nilainya dengan jelas, biasanya dilambangkan dengan huruf kecil seperti x.'),
((SELECT id FROM quiz_questions WHERE question_text = 'Hasil penjumlahan dari 5x + 3x adalah...'), 'Kedua suku merupakan suku sejenis karena variabelnya sama (x). Penjumlahan dilakukan dengan menjumlahkan koefisiennya: 5 + 3 = 8, hasilnya adalah 8x.'),
((SELECT id FROM quiz_questions WHERE question_text = 'Hasil perkalian dari 3 * (2x - 5) adalah...'), 'Gunakan sifat perkalian distributif aljabar: 3 * 2x = 6x, dan 3 * (-5) = -15. Hasilnya adalah 6x - 15.'),
((SELECT id FROM quiz_questions WHERE question_text = 'Manakah di bawah ini yang merupakan contoh kalimat terbuka PLSV...'), 'Persamaan linear satu variabel wajib memiliki satu variabel berpangkat satu dan dihubungkan tanda "=". Pilihan 2x - 5 = 11 memenuhi syarat ini.'),
((SELECT id FROM quiz_questions WHERE question_text = 'Penyelesaian dari x + 5 = 12 adalah...'), 'Pindahkan angka 5 ke ruas kanan dengan mengubah operasinya menjadi pengurangan: x = 12 - 5 -> x = 7.'),
((SELECT id FROM quiz_questions WHERE question_text = 'Umur Budi 5 tahun lebih muda dari Ali. Jika jumlah umur mereka 25 tahun, umur Ali adalah...'), 'Misal umur Ali = A, Budi = A - 5. A + (A - 5) = 25 -> 2A = 30 -> A = 15. Umur Ali adalah 15 tahun.'),
((SELECT id FROM quiz_questions WHERE question_text = 'Simbol pertidaksamaan yang menyatakan "kurang dari" adalah...'), 'Simbol "<" adalah lambang ketidaksamaan yang menyatakan nilai yang lebih kecil atau kurang dari.'),
((SELECT id FROM quiz_questions WHERE question_text = 'Himpunan penyelesaian dari x + 3 < 8 adalah...'), 'Kurangkan kedua ruas dengan 3: x < 8 - 3 -> x < 5.'),
((SELECT id FROM quiz_questions WHERE question_text = 'SPLDV adalah singkatan dari...'), 'SPLDV singkatan dari Sistem Persamaan Linear Dua Variabel, merupakan dua buah persamaan linear berderajat satu yang saling berkaitan.'),
((SELECT id FROM quiz_questions WHERE question_text = 'Penyelesaian dari x + y = 5 dan x - y = 1 adalah...'), 'Gunakan metode eliminasi penjumlahan: 2x = 6 -> x = 3. Substitusi x = 3 ke persamaan pertama: y = 2. Penyelesaiannya adalah (3, 2).'),
((SELECT id FROM quiz_questions WHERE question_text = 'Harga 2 buku dan 1 pensil adalah Rp 5.000. Harga 1 buku dan 1 pensil adalah Rp 3.000. Harga 1 buku adalah...'), 'Kurangkan kedua persamaan belanjaan tersebut: (2 buku + 1 pensil) - (1 buku + 1 pensil) = Rp 5.000 - Rp 3.000. Tersisa 1 buku = Rp 2.000.');


-- ==================== QUIZ RESULTS ====================
-- Mengisi kuis sempurna untuk mengaktifkan Misi Mingguan awal (1/2 selesai).
INSERT INTO quiz_results (quiz_id, user_id, score, total_questions, correct_answers, time_taken, passed, answers) VALUES
((SELECT id FROM quizzes WHERE title = 'Kuis Pengenalan Bentuk Aljabar'), (SELECT id FROM users WHERE username = 'siswa1'), 100, 5, 5, 450, true, '[{"question_id": 1, "selected_answer": "a", "is_correct": true}, {"question_id": 2, "selected_answer": "c", "is_correct": true}, {"question_id": 3, "selected_answer": "d", "is_correct": true}, {"question_id": 4, "selected_answer": "b", "is_correct": true}, {"question_id": 5, "selected_answer": "a", "is_correct": true}]');