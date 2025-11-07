import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { MdPlayArrow, MdCancel, MdDescription } from 'react-icons/md';
import { CardActionsProps } from '../../../utils/interfaces';

const CardActions = ({ 
  status, 
  onIniciarAtendimento, 
  onNaoCompareceu,
  onAbrirProntuario,
  isLoading = false
}: CardActionsProps) => {
  if (status === 'Concluída') {
    return (
      <Box sx={{ 
        mt: 1.5, 
        pt: 1.5, 
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Typography variant="caption" sx={{ 
          color: '#10b981',
          fontWeight: '600',
          fontSize: '0.75rem',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}>
          ✓ Atendimento Concluído
        </Typography>
      </Box>
    );
  }

  if (status === 'Não compareceu') {
    return (
      <Box sx={{ 
        mt: 1.5, 
        pt: 1.5, 
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Typography variant="caption" sx={{ 
          color: '#ef4444',
          fontWeight: '600',
          fontSize: '0.75rem',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}>
        Paciente não compareceu ao atendimento
        </Typography>
      </Box>
    );
  }

  if (status === 'Em atendimento') {
    return (
      <Box sx={{ 
        mt: 1.5, 
        pt: 1.5, 
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Button
          variant="contained"
          startIcon={<MdDescription size={14} />}
          onClick={onAbrirProntuario}
          disabled={isLoading}
          sx={{
            backgroundColor: '#3b82f6',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.7rem',
            py: 0.75,
            px: 2,
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
            '&:hover': {
              backgroundColor: '#2563eb',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            },
            '&:disabled': {
              backgroundColor: '#9ca3af',
              color: 'white',
              transform: 'none',
              boxShadow: 'none'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Abrir Prontuário
        </Button>
      </Box>
    );
  }

  if (status === 'Confirmada') {
    return (
      <Box sx={{ 
        mt: 1.5, 
        pt: 1.5, 
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={isLoading ? <CircularProgress size={12} color="inherit" /> : <MdPlayArrow size={14} />}
            onClick={onIniciarAtendimento}
            disabled={isLoading}
            sx={{
              flex: 1,
              backgroundColor: '#10b981',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.7rem',
              py: 0.75,
              px: 1,
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
              '&:hover': {
                backgroundColor: '#059669',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
              },
              '&:disabled': {
                backgroundColor: '#9ca3af',
                color: 'white',
                transform: 'none',
                boxShadow: 'none'
              },
              transition: 'all 0.2s ease'
            }}
          >
            {isLoading ? 'Atualizando...' : 'Iniciar atendimento'}
          </Button>
          
          <Button
            variant="outlined"
            startIcon={isLoading ? <CircularProgress size={12} color="inherit" /> : <MdCancel size={14} />}
            onClick={onNaoCompareceu}
            disabled={isLoading}
            sx={{
              flex: 1,
              color: '#ef4444',
              borderColor: '#ef4444',
              fontWeight: '600',
              fontSize: '0.7rem',
              py: 0.75,
              px: 1,
              borderRadius: '8px',
              textTransform: 'none',
              backgroundColor: 'rgba(239, 68, 68, 0.05)',
              '&:hover': {
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderColor: '#dc2626',
                color: '#dc2626',
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                backgroundColor: 'rgba(156, 163, 175, 0.1)',
                borderColor: '#9ca3af',
                color: '#9ca3af',
                transform: 'none'
              },
              transition: 'all 0.2s ease'
            }}
          >
            {isLoading ? 'Atualizando...' : 'Não Compareceu'}
          </Button>
        </Box>
      </Box>
    );
  }
  return null;
};

export default CardActions;
