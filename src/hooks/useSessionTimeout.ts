import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UseSessionTimeoutProps {
  timeoutMinutes?: number;
  onTimeout?: () => void;
}

export const useSessionTimeout = ({ 
  timeoutMinutes = 1, 
  onTimeout 
}: UseSessionTimeoutProps = {}) => {
  const { user, logout } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // Função para resetar o timer de inatividade
  const resetTimeout = useCallback(() => {
    lastActivityRef.current = Date.now();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Configura o timeout para 1 minuto (60000ms)
    timeoutRef.current = setTimeout(() => {
      if (user) {
        logout();
        // Força o redirecionamento para a tela de login
        window.location.href = '/acessar';
        if (onTimeout) {
          onTimeout();
        }
      }
    }, timeoutMinutes * 60 * 1000);
  }, [user, logout, onTimeout, timeoutMinutes]);

  // Função para detectar atividade do usuário
  const handleUserActivity = useCallback(() => {
    resetTimeout();
  }, [resetTimeout]);

  useEffect(() => {
    // Só ativa o timeout se o usuário estiver logado
    if (user) {
      // Eventos que indicam atividade do usuário
      const events = [
        'mousedown',
        'mousemove',
        'keypress',
        'scroll',
        'touchstart',
        'click',
        'keydown'
      ];

      // Adiciona listeners para todos os eventos de atividade
      events.forEach(event => {
        document.addEventListener(event, handleUserActivity, true);
      });

      // Inicia o timer
      resetTimeout();

      // Cleanup function
      return () => {
        events.forEach(event => {
          document.removeEventListener(event, handleUserActivity, true);
        });
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else {
      // Se não há usuário logado, limpa o timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [user, handleUserActivity, resetTimeout]);

  // Cleanup quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    resetTimeout,
    lastActivity: lastActivityRef.current
  };
};
