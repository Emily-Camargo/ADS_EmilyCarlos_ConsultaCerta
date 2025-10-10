import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  idUsuario: number;
  nome: string;
  email: string;
  idPerfil: number; // ID do perfil: 1: Secretária, 2: Paciente, 3: Médico
  perfil?: {
    idPerfil: number;
    nome: string;
    descricao: string;
  };
  medico?: {
    idMedico: number;
    idClinica: number;
    idEspecialidade: number;
    crm: string;
    valorConsulta: string;
    tempoConsulta: number;
    ativo: boolean;
    especialidade: string;
    clinica: string;
  };
  paciente?: {
    idPaciente: number;
    dataNascimento: string;
    genero: string;
    tipoSanguineo: string;
    convenio: string;
    numeroCarteirinha: string;
    contatoEmergenciaNome: string;
    contatoEmergenciaTelefone: string;
    observacoes: string;
  };
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
  getIdUsuario: () => number | null;
  getIdPerfil: () => number | null;
  getIdMedico: () => number | null;
  getIdPaciente: () => number | null;
  getEmail: () => string | null;
  getNome: () => string | null;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se há dados do usuário no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('access_token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  };

  const getIdUsuario = (): number | null => {
    if (user) return user.idUsuario;
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        return userData.idUsuario || null;
      } catch {
        return null;
      }
    }
    return null;
  };

  const getIdPerfil = (): number | null => {
    if (user) return user.idPerfil;
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        return userData.idPerfil || null;
      } catch {
        return null;
      }
    }
    return null;
  };

  const getIdMedico = (): number | null => {
    if (user?.medico) return user.medico.idMedico;
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        return userData.medico?.idMedico || null;
      } catch {
        return null;
      }
    }
    return null;
  };

  const getIdPaciente = (): number | null => {
    if (user?.paciente) return user.paciente.idPaciente;
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        return userData.paciente?.idPaciente || null;
      } catch {
        return null;
      }
    }
    return null;
  };

  const getEmail = (): string | null => {
    if (user) return user.email;
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        return userData.email || null;
      } catch {
        return null;
      }
    }
    return null;
  };

  const getNome = (): string | null => {
    if (user) return user.nome;
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        return userData.nome || null;
      } catch {
        return null;
      }
    }
    return null;
  };

  const getToken = (): string | null => {
    return localStorage.getItem('access_token');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    getIdUsuario,
    getIdPerfil,
    getIdMedico,
    getIdPaciente,
    getEmail,
    getNome,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
