import { Card, CardContent, Typography, Box, Chip, Avatar, IconButton } from '@mui/material';
import { MdPerson, MdAccessTime, MdLocalHospital, MdCalendarToday, MdMoreVert, MdPhone, MdMessage } from 'react-icons/md';
import { useState } from 'react';
import { ConsultaCardSecretariaProps } from '../../../utils/interfaces';
import { getGradientColor, getStatusIcon, getStatusStyle } from './constants';

const ConsultaCardSecretaria = ({ 
  id, 
  paciente, 
  medico, 
  horario, 
  status, 
  especialidade, 
  data, 
  onClick,
  showActions = true
}: ConsultaCardSecretariaProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
            : status === 'Confirmada' || status === 'Aguardando confirmação'
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
              bgcolor: status === 'Em Andamento' ? '#f59e0b' : status === 'Confirmada' || status === 'Aguardando confirmação' ? '#3b82f6' : status === 'Concluída' ? '#10b981' : status === 'Reagendada' ? '#8b5cf6' : status === 'Cancelada' || status === 'Não Compareceu' ? '#ef4444' : '#6b7280',
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
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
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
            {showActions && (
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#64748b',
                  padding: '4px',
                  '&:hover': { 
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    color: '#3b82f6'
                  }
                }}
              >
                <MdMoreVert size={16} />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Informações da Consulta */}
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
              : status === 'Confirmada' || status === 'Aguardando confirmação'
              ? 'rgba(59, 130, 246, 0.1)'
              : status === 'Reagendada'
              ? 'rgba(139, 92, 246, 0.1)'
              : status === 'Cancelada' || status === 'Não Compareceu'
              ? 'rgba(239, 68, 68, 0.1)'
              : 'rgba(107, 114, 128, 0.1)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${status === 'Em Andamento' 
              ? 'rgba(245, 158, 11, 0.2)' 
              : status === 'Confirmada' || status === 'Aguardando confirmação'
              ? 'rgba(59, 130, 246, 0.2)'
              : status === 'Reagendada'
              ? 'rgba(139, 92, 246, 0.2)'
              : status === 'Cancelada' || status === 'Não Compareceu'
              ? 'rgba(239, 68, 68, 0.2)'
              : 'rgba(107, 114, 128, 0.2)'}`
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.75,
              color: status === 'Em Andamento' ? '#d97706' : status === 'Confirmada' || status === 'Aguardando confirmação' ? '#1d4ed8' : status === 'Reagendada' ? '#7c3aed' : status === 'Cancelada' || status === 'Não Compareceu' ? '#dc2626' : '#374151',
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

        {showActions && (
          <Box sx={{ 
            mt: 2.5, 
            pt: 2, 
            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#10b981',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  '&:hover': { 
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <MdPhone size={16} />
              </IconButton>
            </Box>
            
            <Typography variant="caption" sx={{ 
              color: '#64748b',
              fontWeight: '500',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Ver detalhes →
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ConsultaCardSecretaria;
