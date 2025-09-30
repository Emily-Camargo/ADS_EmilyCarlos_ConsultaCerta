import { Card, CardContent, Box } from '@mui/material';
import { MdPerson, MdAccessTime, MdLocalHospital, MdCalendarToday } from 'react-icons/md';
import { useState, useMemo, useCallback } from 'react';
import { getGradientColor } from '../../home/components/cards/medico/constants';
import { 
  getStatusColor, 
  getStatusGradient, 
  getStatusBackground, 
  getStatusBorder, 
  getStatusTextColor 
} from '../utils/constants';
import { AtendimentoCardProps } from '../utils/interfaces';
import CardHeader from './cards/components/CardHeader';
import InfoSection from './cards/components/InfoSection';
import CardActions from './cards/components/CardActions';

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
}: AtendimentoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColor = useMemo(() => getStatusColor(status), [status]);
  const statusGradient = useMemo(() => getStatusGradient(status), [status]);
  const statusBackground = useMemo(() => getStatusBackground(status), [status]);
  const statusBorder = useMemo(() => getStatusBorder(status), [status]);
  const statusTextColor = useMemo(() => getStatusTextColor(status), [status]);

  const pacienteInitials = useMemo(() => 
    paciente.split(' ').map(n => n[0]).join('').slice(0, 2), 
    [paciente]
  );

  const formattedDate = useMemo(() => 
    data ? new Date(data).toLocaleDateString('pt-BR') : null, 
    [data]
  );

  // Callbacks otimizados
  const handleIniciarAtendimento = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onIniciarAtendimento?.(id);
  }, [onIniciarAtendimento, id]);

  const handleNaoCompareceu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onNaoCompareceu?.(id);
  }, [onNaoCompareceu, id]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

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
          background: statusGradient,
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`Consulta de ${paciente} - ${status}`}
    >
      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <CardHeader 
          paciente={paciente}
          status={status}
          statusColor={statusColor}
          pacienteInitials={pacienteInitials}
        />
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          <InfoSection
            icon={<MdPerson size={14} />}
            label="Médico"
            value={medico}
          />
          
          {especialidade && (
            <InfoSection
              icon={<MdLocalHospital size={14} />}
              label="Especialidade"
              value={especialidade}
              backgroundColor="rgba(255, 255, 255, 0.4)"
              borderColor="rgba(255, 255, 255, 0.2)"
            />
          )}
          
          <InfoSection
            icon={<MdAccessTime size={14} />}
            label="Horário"
            value={horario}
            backgroundColor={statusBackground}
            borderColor={statusBorder}
            textColor={statusTextColor}
          />
          
          {formattedDate && (
            <InfoSection
              icon={<MdCalendarToday size={14} />}
              label="Data"
              value={formattedDate}
              backgroundColor="rgba(255, 255, 255, 0.4)"
              borderColor="rgba(255, 255, 255, 0.2)"
            />
          )}
        </Box>

        <CardActions
          status={status}
          onIniciarAtendimento={handleIniciarAtendimento}
          onNaoCompareceu={handleNaoCompareceu}
        />
      </CardContent>
    </Card>
  );
};

export default AtendimentoCard;