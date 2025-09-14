import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';
import { Button } from '@mui/material';
import { Box, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon, GetApp as InstallIcon } from '@mui/icons-material';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallModal: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  useEffect(() => {
    // Verificar se o app já está instalado
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        return;
      }
      
      // Verificar se está rodando como PWA no iOS
      if ((window.navigator as any).standalone === true) {
        setIsInstalled(true);
        return;
      }
    };

    checkIfInstalled();

    // Verificar se já mostrou o modal antes
    // Usar sessionStorage em vez de localStorage para resetar a cada sessão
    const modalShown = sessionStorage.getItem('pwa-modal-shown');
    if (modalShown === 'true') {
      setHasShownModal(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      

      if (!hasShownModal && !isInstalled) {
        setShowInstallModal(true);
      }
    };

    // Listener para quando o app é instalado
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallModal(false);
      setDeferredPrompt(null);
    };

    // Listener para detectar mudanças no display mode (desinstalação)
    const handleDisplayModeChange = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (!isStandalone && isInstalled) {
        // App foi desinstalado, resetar flags
        setIsInstalled(false);
        setHasShownModal(false);
        sessionStorage.removeItem('pwa-modal-shown');
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, [hasShownModal, isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      handleClose();
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Usuário aceitou a instalação');
    } else {
      console.log('Usuário rejeitou a instalação');
    }
    
    setDeferredPrompt(null);
    setShowInstallModal(false);
    setHasShownModal(true);
    sessionStorage.setItem('pwa-modal-shown', 'true');
  };

  const handleClose = () => {
    setShowInstallModal(false);
    setHasShownModal(true);
    sessionStorage.setItem('pwa-modal-shown', 'true');
  };

  const resetModal = () => {
    setHasShownModal(false);
    setShowInstallModal(false);
    sessionStorage.removeItem('pwa-modal-shown');
    sessionStorage.removeItem('was-standalone');
  };

  (window as any).resetPWAModal = resetModal;


  if (isInstalled || hasShownModal || !deferredPrompt) {
    return null;
  }

  return (
    <Dialog
      open={showInstallModal}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 3,
          textAlign: 'center'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: -10,
            top: -10,
            bgcolor: 'grey.100',
            '&:hover': {
              bgcolor: 'grey.200'
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ mb: 3 }}>
          <img 
            src="/assets/logoConsulta.png" 
            alt="ConsultaCerta" 
            style={{ 
              width: 180, 
              height: 50, 
              borderRadius: '50%',
              marginBottom: 16
            }}
          />
        </Box>

        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Instalar ConsultaCerta
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
          Instale o ConsultaCerta no seu dispositivo para ter acesso rápido e uma experiência otimizada. 
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ px: 3 }}
          >
            Agora não
          </Button>
          <Button
            variant="contained"
            onClick={handleInstallClick}
            startIcon={<InstallIcon />}
            sx={{ 
              px: 3,
              bgcolor: '#3b82f6',
              '&:hover': {
                bgcolor: '#2563eb'
              }
            }}
          >
            Instalar App
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PWAInstallModal;
