const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Wijaya25',
};

async function setup() {
  console.log('=== MATHIFY DATABASE SETUP ===');
  console.log('Checking database connection with configuration:', {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    database: process.env.DB_NAME || 'mathify'
  });

  // 1. Connect to default 'postgres' database
  const pgClient = new Client({
    ...dbConfig,
    database: 'postgres'
  });

  try {
    await pgClient.connect();
    console.log('Successfully connected to PostgreSQL default database.');
  } catch (error) {
    console.error('\nERROR: Cannot connect to PostgreSQL!');
    console.error('Please make sure PostgreSQL is running and credentials in .env are correct.');
    console.error('Error Details:', error.message);
    process.exit(1);
  }

  const dbName = process.env.DB_NAME || 'mathify';

  // Check if database exists, create if not
  try {
    const res = await pgClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    if (res.rowCount === 0) {
      console.log(`Database "${dbName}" does not exist. Creating it now...`);
      await pgClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (error) {
    console.error('Error checking/creating database:', error.message);
    await pgClient.end();
    process.exit(1);
  } finally {
    await pgClient.end();
  }

  // 2. Connect to 'mathify' database
  console.log(`\nConnecting to "${dbName}" database...`);
  const client = new Client({
    ...dbConfig,
    database: dbName
  });

  try {
    await client.connect();
    console.log(`Connected to "${dbName}" database.`);
  } catch (error) {
    console.error('Connection failed:', error.message);
    process.exit(1);
  }

  // 3. Run migration 001_init.sql
  try {
    console.log('\nRunning migration: 001_init.sql...');
    const initSqlPath = path.join(__dirname, 'migrations', '001_init.sql');
    const initSql = fs.readFileSync(initSqlPath, 'utf8');
    await client.query(initSql);
    console.log('Migration 001_init.sql completed successfully (Tables & Indexes created).');
  } catch (error) {
    console.error('Error running 001_init.sql:', error.message);
    await client.end();
    process.exit(1);
  }

  // 4. Seed users jika belum ada
  try {
    const userCheck = await client.query('SELECT COUNT(*) FROM users');
    const userCount = parseInt(userCheck.rows[0].count);

    if (userCount === 0) {
      console.log('\nSeeding default users...');

      const pSiswa1 = await bcrypt.hash('siswa1', 10);
      const pSiswa2 = await bcrypt.hash('siswa2', 10);
      const pGuru1  = await bcrypt.hash('guru1', 10);
      const pAdmin1 = await bcrypt.hash('admin1', 10);

      await client.query(`
        INSERT INTO users (username, email, password, full_name, role, xp, streak, study_duration, last_active) VALUES
        ('siswa1', 'siswa1@mathify.com', $1, 'Ahmad Rizki',    'student', 2500, 12, 64800, NOW() - INTERVAL '1 day'),
        ('siswa2', 'siswa2@mathify.com', $2, 'Siti Nurhaliza', 'student', 1850,  3, 36000, NOW() - INTERVAL '1 day'),
        ('guru1',  'guru1@mathify.com',  $3, 'Budi Santoso',   'teacher', 1600,  2, 21600, NOW() - INTERVAL '1 day'),
        ('admin1', 'admin1@mathify.com', $4, 'Admin Mathify',  'admin',      0,  0,     0, NOW());
      `, [pSiswa1, pSiswa2, pGuru1, pAdmin1]);

      console.log('✔ Users seeded (with secure bcrypt passwords and realistic stats).');
      console.log('\nDefault credentials you can use to log in:');
      console.log('1. Siswa:  siswa1@mathify.com  | Password: siswa1');
      console.log('2. Siswa:  siswa2@mathify.com  | Password: siswa2');
      console.log('3. Guru:   guru1@mathify.com   | Password: guru1');
    } else {
      console.log('\nUsers already exist. Skipping user seed.');
    }
  } catch (error) {
    console.error('Error during user seeding:', error.message);
  }

  // 5. Jalankan 002_seed_data.sql jika topik belum ada
  try {
    const topicCheck = await client.query(`SELECT COUNT(*) FROM topics WHERE slug = 'aljabar'`);
    const exists = parseInt(topicCheck.rows[0].count) > 0;

    if (!exists) {
      console.log('\nRunning seed: 002_seed_data.sql...');
      const seedSqlPath = path.join(__dirname, 'migrations', '002_seed_data.sql');
      let seedSql = fs.readFileSync(seedSqlPath, 'utf8');
      // Skip INSERT users karena sudah di-handle di atas
      seedSql = seedSql.replace(/INSERT INTO users[\s\S]*?\([\s\S]*?\);/i, '-- Skipped default user insert');
      await client.query(seedSql);
      console.log('✔ 002_seed_data.sql seeded successfully!');
    } else {
      console.log('✔ 002_seed_data.sql already seeded. Skipping.');
    }
  } catch (error) {
    console.error('Error running 002_seed_data.sql:', error.message);
  }

  // ─────────────────────────────────────────────────────────────
  // 6. AUTO-RUN semua file seed 003, 004, 005, dst
  //    Cukup taruh file SQL baru di folder migrations/
  //    dengan nama 003_*.sql, 004_*.sql, dst
  //    lalu jalankan: node setup-db.js
  // ─────────────────────────────────────────────────────────────
  try {
    const migrationsDir = path.join(__dirname, 'migrations');
    const allFiles = fs.readdirSync(migrationsDir).sort();

    // Ambil semua file yang dimulai dari 003 ke atas
    const extraSeeds = allFiles.filter(f => {
      const num = parseInt(f.split('_')[0]);
      return f.endsWith('.sql') && num >= 3;
    });

    if (extraSeeds.length === 0) {
      console.log('\nTidak ada file seed tambahan (003+) yang ditemukan.');
    }

    for (const seedFile of extraSeeds) {
      // Ambil penanda unik dari nama file untuk cek duplikat
      // Contoh: 003_bilangan_seed.sql → cek slug 'bilangan'
      const slugGuess = seedFile.replace(/^\d+_/, '').replace(/_seed\.sql$/, '').replace(/_/g, '-');

      try {
        const checkResult = await client.query(
          `SELECT COUNT(*) FROM topics WHERE slug = $1`,
          [slugGuess]
        );
        const alreadySeeded = parseInt(checkResult.rows[0].count) > 0;

        if (alreadySeeded) {
          console.log(`✔ ${seedFile} already seeded (slug: ${slugGuess}). Skipping.`);
          continue;
        }
      } catch {
        // Kalau cek gagal, tetap jalankan file-nya
      }

      console.log(`\nRunning seed: ${seedFile}...`);
      try {
        const sqlPath = path.join(migrationsDir, seedFile);
        const sql = fs.readFileSync(sqlPath, 'utf8');
        await client.query(sql);
        console.log(`✔ ${seedFile} seeded successfully!`);
      } catch (error) {
        console.error(`✘ Error running ${seedFile}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error reading migrations directory:', error.message);
  }

  await client.end();
  console.log('\n=== SETUP COMPLETED SUCCESSFULLY ===');
}

setup();