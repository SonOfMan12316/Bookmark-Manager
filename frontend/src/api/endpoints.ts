/**
 * Centralized API endpoint definitions
 */
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/auth/signup',
    LOGIN: '/api/auth/login',
    GOOGLE: '/api/auth/google',
    CURRENT_USER: '/api/auth/current-user',
  },
  BOOKMARKS: {
    LIST: '/api/bookmarks',
    CREATE: '/api/bookmarks',
    UPDATE: (id: string) => `/api/bookmarks/${id}`,
    DELETE: (id: string) => `/api/bookmarks/${id}`,
    GET: (id: string) => `/api/bookmarks/${id}`,
  },
} as const;
