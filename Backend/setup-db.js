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

  // 1. Connect to default 'postgres' database to check if PostgreSQL is running and create 'mathify' database
  const pgClient = new Client({
    ...dbConfig,
    database: 'postgres'
  });

  try {
    await pgClient.connect();
    console.log('Successfully connected to PostgreSQL default database.');
  } catch (error) {
    console.error('\nERROR: Cannot connect to PostgreSQL!');
    console.error('Please make sure PostgreSQL is running on your machine and that your credentials in the root .env file are correct.');
    console.error('Error Details:', error.message);
    process.exit(1);
  }

  const dbName = process.env.DB_NAME || 'mathify';
  
  // Check if database exists
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

  // 2. Connect to the 'mathify' database to run migrations
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

  // 4. Custom Seeding with Properly Bcrypt-Hashed Passwords
  try {
    console.log('\nChecking if database needs seeding...');
    const userCheck = await client.query('SELECT COUNT(*) FROM users');
    const userCount = parseInt(userCheck.rows[0].count);

    if (userCount > 0) {
      console.log('Database already has users. Skipping seed to prevent duplicate errors.');
      console.log('You can log in with your registered account or seed again after dropping tables.');
    } else {
      console.log('Seeding database with default users and courses...');
      
      // Hash passwords for seed users
      const pSiswa1 = await bcrypt.hash('siswa1', 10);
      const pSiswa2 = await bcrypt.hash('siswa2', 10);
      const pGuru1 = await bcrypt.hash('guru1', 10);
      const pAdmin1 = await bcrypt.hash('admin1', 10);

      // Insert Users
      await client.query(`
        INSERT INTO users (username, email, password, full_name, role, xp, streak, study_duration, last_active) VALUES
        ('siswa1', 'siswa1@mathify.com', $1, 'Ahmad Rizki', 'student', 2500, 12, 64800, NOW() - INTERVAL '1 day'),
        ('siswa2', 'siswa2@mathify.com', $2, 'Siti Nurhaliza', 'student', 1850, 3, 36000, NOW() - INTERVAL '1 day'),
        ('guru1', 'guru1@mathify.com', $3, 'Budi Santoso', 'teacher', 1600, 2, 21600, NOW() - INTERVAL '1 day'),
        ('admin1', 'admin1@mathify.com', $4, 'Admin Mathify', 'admin', 0, 0, 0, NOW());
      `, [pSiswa1, pSiswa2, pGuru1, pAdmin1]);
      console.log('✔ Users seeded (with secure bcrypt passwords and realistic stats).');

      // Run the rest of the seed sql but skip the users part
      const seedSqlPath = path.join(__dirname, 'migrations', '002_seed_data.sql');
      let seedSql = fs.readFileSync(seedSqlPath, 'utf8');
      
      // Strip the USERS insert block from 002_seed_data.sql since we already did it with hashed passwords
      seedSql = seedSql.replace(/INSERT INTO users[\s\S]*?\([\s\S]*?\);/i, '-- Skipped default user insert');

      await client.query(seedSql);
      console.log('✔ Topics, Materials, Steps, Videos, Quizzes, Questions, and Discussions seeded successfully!');
      
      console.log('\nDefault credentials you can use to log in:');
      console.log('1. Siswa:  siswa1@mathify.com  | Password: siswa1');
      console.log('2. Siswa:  siswa2@mathify.com  | Password: siswa2');
      console.log('3. Guru:   guru1@mathify.com   | Password: guru1');
    }
  } catch (error) {
    console.error('Error during seeding:', error.message);
  } finally {
    await client.end();
    console.log('\n=== SETUP COMPLETED SUCCESSFULLY ===');
  }
}

setup();
