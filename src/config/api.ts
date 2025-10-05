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
      
      // Se o token existir e não for o mock, adiciona ao header Authorization
      if (token && token !== 'mock_access_token' && config.headers) {
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
    // Se receber erro 401 (Não autorizado), limpa o token e redireciona para login
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      // Redireciona para a página de login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;

