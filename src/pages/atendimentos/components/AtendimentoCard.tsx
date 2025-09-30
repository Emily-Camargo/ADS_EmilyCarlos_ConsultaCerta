import { Card, CardContent, Typography, Box, Chip, Avatar, Button } from '@mui/material';
import { MdPerson, MdAccessTime, MdLocalHospital, MdCalendarToday, MdPlayArrow, MdCancel } from 'react-icons/md';
import { useState } from 'react';
import { ConsultaCardMedicoProps } from '../../home/utils/interfaces';
import { getGradientColor, getStatusIcon, getStatusStyle } from '../../home/components/cards/medico/constants';

const AtendimentoCard = ({ 
  id, 
  paciente, 
  medico, 
  horario, 
  status, 
  especialidade, 
  data, 
  onClick,
  onIniciarAtendimento,
  onNaoCompareceu
}: ConsultaCardMedicoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleIniciarAtendimento = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onIniciarAtendimento) {
      onIniciarAtendimento(id);
    }
  };

  const handleNaoCompareceu = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNaoCompareceu) {
      onNaoCompareceu(id);
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: '20px',
        background: getGradientColor(status),
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: status === 'Em Andamento'
            ? 'linear-gradient(90deg, #f59e0b, #f97316, #ef4444)'
            : status === 'Aguardando' || status === 'Confirmada'
            ? 'linear-gradient(90deg, #3b82f6, #1d4ed8, #1e40af)'
            : status === 'Concluída'
            ? 'linear-gradient(90deg, #10b981, #059669, #047857)'
            : status === 'Não Compareceu'
            ? 'linear-gradient(90deg, #ef4444, #dc2626, #b91c1c)'
            : 'linear-gradient(90deg, #6b7280, #4b5563, #374151)',
          opacity: isHovered ? 1 : 0.8,
          transition: 'opacity 0.3s ease'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none'
        },
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          '&::after': {
            opacity: 1
          }
        }
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          mb: 1.5 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ 
              width: 32, 
              height: 32, 
              bgcolor: status === 'Em Andamento' ? '#f59e0b' : status === 'Aguardando' || status === 'Confirmada' ? '#3b82f6' : status === 'Concluída' ? '#10b981' : status === 'Não Compareceu' ? '#ef4444' : '#6b7280',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.8)'
            }}>
              {paciente.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold', 
                fontSize: '0.95rem',
                color: '#1e293b',
                lineHeight: 1.2,
                mb: 0.25
              }}>
                {paciente}
              </Typography>
            </Box>
          </Box>
          
          <Chip
            icon={getStatusIcon(status)}
            label={status}
            size="small"
            sx={{
              ...getStatusStyle(status),
              fontWeight: '600',
              fontSize: '0.7rem',
              height: '24px',
              px: 0.75,
              '& .MuiChip-icon': {
                fontSize: '14px'
              }
            }}
          />
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            p: 1,
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.75,
              color: '#475569'
            }}>
              <MdPerson size={14} />
              <Typography variant="body2" sx={{ 
                fontSize: '0.8rem',
                fontWeight: '500'
              }}>
                <strong>Médico:</strong> {medico}
              </Typography>
            </Box>
          </Box>

          {especialidade && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              p: 1,
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.75,
                color: '#475569'
              }}>
                <MdLocalHospital size={14} />
                <Typography variant="body2" sx={{ 
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  <strong>Especialidade:</strong> {especialidade}
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            p: 1,
            borderRadius: '8px',
            backgroundColor: status === 'Em Andamento'
              ? 'rgba(245, 158, 11, 0.1)' 
              : status === 'Aguardando' || status === 'Confirmada'
              ? 'rgba(59, 130, 246, 0.1)'
              : status === 'Não Compareceu'
              ? 'rgba(239, 68, 68, 0.1)'
              : 'rgba(107, 114, 128, 0.1)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${status === 'Em Andamento'
              ? 'rgba(245, 158, 11, 0.2)' 
              : status === 'Aguardando' || status === 'Confirmada'
              ? 'rgba(59, 130, 246, 0.2)'
              : status === 'Não Compareceu'
              ? 'rgba(239, 68, 68, 0.2)'
              : 'rgba(107, 114, 128, 0.2)'}`
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.75,
              color: status === 'Em Andamento' ? '#d97706' : status === 'Aguardando' || status === 'Confirmada' ? '#1d4ed8' : status === 'Não Compareceu' ? '#dc2626' : '#374151',
              fontWeight: '600'
            }}>
              <MdAccessTime size={14} />
              <Typography variant="body2" sx={{ 
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                <strong>Horário:</strong> {horario}
              </Typography>
            </Box>
          </Box>

          {data && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              p: 1,
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.75,
                color: '#475569'
              }}>
                <MdCalendarToday size={14} />
                <Typography variant="body2" sx={{ 
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  <strong>Data:</strong> {new Date(data).toLocaleDateString('pt-BR')}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {status === 'Concluída' ? (
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
        ) : status === 'Não Compareceu' ? (
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
        ) : status === 'Confirmada' ? (
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
                onClick={handleIniciarAtendimento}
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
                Iniciar
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<MdCancel size={14} />}
                onClick={handleNaoCompareceu}
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
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default AtendimentoCard;
