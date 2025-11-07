import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const getApiBaseUrl = (): string => {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3000';
  }
  
  return `http://${hostname}:3000`;
};

const API_BASE_URL = getApiBaseUrl();

console.log('🌐 API Base URL:', API_BASE_URL);

const PUBLIC_ROUTES = [
  '/usuarios/registrar',
  '/usuarios/login',
  '/auth/login',
  '/auth/register',
];

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const isPublicRoute = PUBLIC_ROUTES.some(route => 
      config.url?.includes(route)
    );
    
    if (!isPublicRoute) {
      const token = localStorage.getItem('access_token');
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const isPublicRoute = PUBLIC_ROUTES.some(route => 
      error.config?.url?.includes(route)
    );
    
    if (error.response?.status === 401 && !isPublicRoute) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;

