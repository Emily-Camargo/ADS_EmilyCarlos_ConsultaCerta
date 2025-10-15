import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Função para detectar automaticamente a URL base da API
const getApiBaseUrl = (): string => {
  // Detecta automaticamente se está rodando em localhost ou em rede
  const hostname = window.location.hostname;
  
  // Se estiver rodando em localhost, usa localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3000';
  }
  
  // Se estiver rodando em rede (celular), usa o IP da máquina
  // O hostname será o IP da máquina quando acessado pelo celular
  return `http://${hostname}:3000`;
};

// URL base da API - detectada automaticamente
const API_BASE_URL = getApiBaseUrl();

// Log para debug - você pode remover depois
console.log('🌐 API Base URL:', API_BASE_URL);

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

