import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const apiEndpoints = {
  // Auth
  login: '/auth/login',
  signup: '/auth/signup',
  logout: '/auth/logout',

  // Users
  getUsers: '/users',
  getUser: (id) => `/users/${id}`,
  updateUser: (id) => `/users/${id}`,
  followUser: (id) => `/users/${id}/follow`,
  unfollowUser: (id) => `/users/${id}/unfollow`,

  // Posts
  getPosts: '/posts',
  createPost: '/posts',
  getPost: (id) => `/posts/${id}`,
  updatePost: (id) => `/posts/${id}`,
  deletePost: (id) => `/posts/${id}`,
  likePost: (id) => `/posts/${id}/like`,
  unlikePost: (id) => `/posts/${id}/unlike`,

  // Comments
  getComments: (postId) => `/posts/${postId}/comments`,
  createComment: (postId) => `/posts/${postId}/comments`,
  deleteComment: (postId, commentId) => `/posts/${postId}/comments/${commentId}`,

  // Notifications
  getNotifications: '/notifications',
  markNotificationRead: (id) => `/notifications/${id}/read`,
  markAllNotificationsRead: '/notifications/read-all',
}

export default api