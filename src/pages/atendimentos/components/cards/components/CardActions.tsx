import { Box, Typography, Button } from '@mui/material';
import { MdPlayArrow, MdCancel } from 'react-icons/md';
import { CardActionsProps } from '../../../utils/interfaces';

const CardActions = ({ 
  status, 
  onIniciarAtendimento, 
  onNaoCompareceu 
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

  if (status === 'Não Compareceu') {
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
          ✗ Paciente Não Compareceu
        </Typography>
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
            startIcon={<MdPlayArrow size={14} />}
            onClick={onIniciarAtendimento}
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
              transition: 'all 0.2s ease'
            }}
          >
            Iniciar atendimento
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<MdCancel size={14} />}
            onClick={onNaoCompareceu}
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
              transition: 'all 0.2s ease'
            }}
          >
            Não Compareceu
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      mt: 1.5, 
      pt: 1.5, 
      borderTop: '1px solid rgba(255, 255, 255, 0.3)',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Typography variant="caption" sx={{ 
        color: '#64748b',
        fontWeight: '500',
        fontSize: '0.7rem',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        Clique para detalhes
      </Typography>
    </Box>
  );
};

export default CardActions;
