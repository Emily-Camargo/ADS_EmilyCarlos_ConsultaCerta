import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// URL base da API - você pode alterar esta constante conforme necessário
const API_BASE_URL = 'http://localhost:3000';

// Lista de rotas públicas que não precisam de autenticação
const PUBLIC_ROUTES = [
  '/usuarios/registrar',
  '/usuarios/login',
  '/auth/login',
  '/auth/register',
];

// Cria instância do Axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição - adiciona o token JWT automaticamente
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Verifica se a rota é pública
    const isPublicRoute = PUBLIC_ROUTES.some(route => 
      config.url?.includes(route)
    );
    
    // Se não for rota pública, adiciona o token
    if (!isPublicRoute) {
      // Recupera o token do localStorage
      const token = localStorage.getItem('access_token');
      
      // Se o token existir, adiciona ao header Authorization
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

// Interceptor de resposta - trata erros de autenticação
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

