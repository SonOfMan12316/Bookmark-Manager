import axios from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

// Create axios instance
const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor - Add auth token to requests
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and token refresh
client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const isAuthEndpoint = originalRequest.url?.includes('/auth/login') || 
                            originalRequest.url?.includes('/auth/signup');
      
      if (!isAuthEndpoint) {
        // Only redirect if it's a protected endpoint (not auth endpoints)
        clearAuthToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/sign-in';
        }
      }
      
      return Promise.reject(error);
    }

    // Transform error to a consistent format
    const transformedError = transformError(error);
    return Promise.reject(transformedError);
  }
);

/**
 * Get auth token from localStorage
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

/**
 * Clear auth token from localStorage
 */
function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

/**
 * Transform axios error to app error format
 */
function transformError(error: AxiosError): Error {
  if (error.response) {
    // Server responded with error
    const status = error.response.status;
    const data = error.response.data as any;
    
    const message = data?.message || data?.error || `Request failed with status ${status}`;
    const appError = new Error(message);
    (appError as any).status = status;
    (appError as any).data = data;
    return appError;
  } else if (error.request) {
    // Request made but no response
    return new Error('Network error: Please check your connection');
  } else {
    // Something else happened
    return new Error(error.message || 'An unexpected error occurred');
  }
}

export default client;
