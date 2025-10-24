import React, { ReactNode } from 'react';
import { useSessionTimeout } from '../../hooks/useSessionTimeout';
import { toast } from 'react-toastify';

interface SessionTimeoutProviderProps {
  children: ReactNode;
}

export const SessionTimeoutProvider: React.FC<SessionTimeoutProviderProps> = ({ children }) => {
  // Configura o timeout para 15 minutos e exibe notificação quando expira
  useSessionTimeout({
    timeoutMinutes: 15,
    onTimeout: () => {
      toast.error('Sessão expirada! Faça login novamente.');
    }
  });

  return <>{children}</>;
};
