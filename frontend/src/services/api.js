import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Bypass-Tunnel-Reminder': 'true',
  },
});

// Request interceptor to add authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Do not intercept 401 on login, register, or refresh endpoints
    const isAuthEndpoint = originalRequest.url.includes('/api/auth/login') || 
                           originalRequest.url.includes('/api/auth/register') ||
                           originalRequest.url.includes('/api/auth/refresh');

    if (error.response && error.response.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;
      try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (!storedRefreshToken) {
          throw new Error('No refresh token available');
        }

        // Call express endpoint directly without interceptors to avoid loops
        const response = await axios.post(`${API_URL}/api/auth/refresh`, {
          refreshToken: storedRefreshToken,
        });

        if (response.data && response.data.success) {
          const { accessToken, refreshToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          // Retry the original request
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Clear tokens and redirect to login if refresh fails
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  register: (username, email, password, full_name, jenjang) =>
    api.post('/api/auth/register', { username, email, password, full_name, jenjang }),
  me: () => api.get('/api/auth/me'),
  updateProfile: (profileData) => api.put('/api/auth/profile', profileData),
  deleteAccount: () => api.delete('/api/auth/profile'),
  logout: (refreshToken) => api.post('/api/auth/logout', { refreshToken }),
};

export const topicsAPI = {
  getAll: () => api.get('/api/topics'),
  getById: (id) => api.get(`/api/topics/${id}`),
};

export const materialsAPI = {
  getByTopic: (topicId) => api.get(`/api/topics/${topicId}/materials`),
  getById: (topicId, materialId) => api.get(`/api/topics/${topicId}/materials/${materialId}`),
  getSteps: (topicId, materialId) => api.get(`/api/topics/${topicId}/materials/${materialId}/steps`),
};

export const practiceAPI = {
  getByMaterial: (topicId, materialId) => api.get(`/api/topics/${topicId}/materials/${materialId}/practice`),
};

export const quizzesAPI = {
  getByMaterial: (topicId, materialId) =>
    api.get(`/api/topics/${topicId}/materials/${materialId}/quizzes`),
  getById: (topicId, materialId, quizId) =>
    api.get(`/api/topics/${topicId}/materials/${materialId}/quizzes/${quizId}`),
  submit: (topicId, materialId, quizId, answers, timeTaken) =>
    api.post(`/api/topics/${topicId}/materials/${materialId}/quizzes/${quizId}/submit`, {
      answers,
      time_taken: timeTaken,
    }),
  getResults: (topicId, materialId, quizId) =>
    api.get(`/api/topics/${topicId}/materials/${materialId}/quizzes/${quizId}/results`),
  getDiscussions: (topicId, materialId, quizId) =>
    api.get(`/api/topics/${topicId}/materials/${materialId}/quizzes/${quizId}/discussions`),
};

export const resultsAPI = {
  getMyResults: () => api.get('/api/my-results'),
  getResultDetail: (resultId) => api.get(`/api/my-results/results/${resultId}`), // Wait, result endpoints are mounted in quizRoutes or app.js? 
  // Let's check app.js again: 
  // app.get('/api/my-results', auth, quizController.getMyResults); 
  // and in quizRoutes.js: 
  // router.get('/results/:resultId', allRoles, quizController.getResult); 
  // So a quiz result is fetched via GET /api/topics/:topicId/materials/:materialId/quizzes/:quizId/results/:resultId ? Or is it GET /api/topics/:topicId/materials/:materialId/quizzes/results/:resultId ?
  // Let's see quizRoutes.js: 
  // router.get('/results/:resultId', allRoles, quizController.getResult);
  // and quizRoutes.js is mounted on `/api/topics/:topicId/materials/:materialId/quizzes`
  // So yes! It is `/api/topics/:topicId/materials/:materialId/quizzes/results/:resultId`
  getResult: (topicId, materialId, resultId) => api.get(`/api/topics/${topicId}/materials/${materialId}/quizzes/results/${resultId}`),
};

export const leaderboardAPI = {
  getLeaderboard: () => api.get('/api/leaderboard'),
};

export default api;
