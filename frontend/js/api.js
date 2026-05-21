// =============================================
//  api.js — Helper untuk semua request ke backend
//  Mathify Frontend
//  Cara pakai: <script src="js/api.js"></script>
// =============================================

const BASE_URL = 'http://localhost:3000/api';

/**
 * Fungsi utama untuk fetch ke backend.
 * Otomatis: pasang token, handle 401, parse JSON.
 */
async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(BASE_URL + endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  // Token expired atau tidak valid → paksa login ulang
  if (response.status === 401) {
    localStorage.clear();
    window.location.href = 'login.html';
    return null;
  }

  return response.json();
}

// =============================================
//  AUTH
// =============================================

/** Ambil profil user yang sedang login */
async function getProfile() {
  return apiFetch('/auth/me');
}

/** Logout: hapus token lokal */
function logout() {
  const refreshToken = localStorage.getItem('refreshToken');
  // Beritahu backend untuk revoke token
  apiFetch('/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ refreshToken })
  });
  localStorage.clear();
  window.location.href = 'login.html';
}

// =============================================
//  TOPICS
// =============================================

/** Ambil semua topik */
async function getTopics() {
  return apiFetch('/topics');
}

/** Ambil detail 1 topik */
async function getTopic(topicId) {
  return apiFetch(`/topics/${topicId}`);
}

// =============================================
//  MATERIALS
// =============================================

/** Ambil semua materi dalam 1 topik */
async function getMaterials(topicId) {
  return apiFetch(`/topics/${topicId}/materials`);
}

/** Ambil detail 1 materi */
async function getMaterial(topicId, materialId) {
  return apiFetch(`/topics/${topicId}/materials/${materialId}`);
}

// =============================================
//  VIDEOS
// =============================================

/** Ambil semua video dalam 1 materi */
async function getVideos(topicId, materialId) {
  return apiFetch(`/topics/${topicId}/materials/${materialId}/videos`);
}

// =============================================
//  QUIZ
// =============================================

/** Ambil semua quiz dalam 1 materi */
async function getQuizzes(topicId, materialId) {
  return apiFetch(`/topics/${topicId}/materials/${materialId}/quizzes`);
}

/** Ambil detail 1 quiz (soal-soalnya) */
async function getQuiz(topicId, materialId, quizId) {
  return apiFetch(`/topics/${topicId}/materials/${materialId}/quizzes/${quizId}`);
}

/**
 * Submit jawaban quiz
 * @param {number} topicId
 * @param {number} materialId
 * @param {number} quizId
 * @param {number} timeTaken - waktu pengerjaan dalam detik
 * @param {Array} answers - [{ question_id, selected_answer }, ...]
 */
async function submitQuiz(topicId, materialId, quizId, timeTaken, answers) {
  return apiFetch(`/topics/${topicId}/materials/${materialId}/quizzes/${quizId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ time_taken: timeTaken, answers })
  });
}

/** Ambil hasil quiz user */
async function getQuizResults(topicId, materialId, quizId) {
  return apiFetch(`/topics/${topicId}/materials/${materialId}/quizzes/${quizId}/results`);
}

/** Ambil pembahasan quiz */
async function getQuizDiscussions(topicId, materialId, quizId) {
  return apiFetch(`/topics/${topicId}/materials/${materialId}/quizzes/${quizId}/discussions`);
}

// =============================================
//  HELPER: Cek apakah user sudah login
//  Panggil di awal setiap halaman yang butuh auth
// =============================================

function requireAuth() {
  if (!localStorage.getItem('accessToken')) {
    window.location.href = 'login.html';
  }
}

/** Ambil data user dari localStorage */
function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}