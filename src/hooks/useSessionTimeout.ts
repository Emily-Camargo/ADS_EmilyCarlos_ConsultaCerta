import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UseSessionTimeoutProps {
  timeoutMinutes?: number;
  onTimeout?: () => void;
}

export const useSessionTimeout = ({ 
  timeoutMinutes = 30, 
  onTimeout 
}: UseSessionTimeoutProps = {}) => {
  const { user, logout } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimeout = useCallback(() => {
    lastActivityRef.current = Date.now();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (user) {
        logout();
        window.location.href = '/acessar';
        if (onTimeout) {
          onTimeout();
        }
      }
    }, timeoutMinutes * 60 * 1000);
  }, [user, logout, onTimeout, timeoutMinutes]);

  const handleUserActivity = useCallback(() => {
    resetTimeout();
  }, [resetTimeout]);

  useEffect(() => {
    if (user) {
      const events = [
        'mousedown',
        'mousemove',
        'keypress',
        'scroll',
        'touchstart',
        'click',
        'keydown'
      ];

      events.forEach(event => {
        document.addEventListener(event, handleUserActivity, true);
      });

      resetTimeout();

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, handleUserActivity, true);
        });
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [user, handleUserActivity, resetTimeout]);

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
