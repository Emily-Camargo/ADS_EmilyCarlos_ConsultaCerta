import { Card, CardContent, Box } from '@mui/material';
import { MdAccessTime, MdCalendarToday, MdDescription, MdInfo } from 'react-icons/md';
import { useState, useMemo, useCallback } from 'react';
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
  motivo,
  observacoes,
  horario, 
  status, 
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
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: `2px solid ${statusColor}20`,
        boxShadow: isHovered 
          ? `0 20px 40px -12px ${statusColor}40, 0 0 0 1px ${statusColor}30` 
          : `0 8px 16px -4px ${statusColor}20, 0 4px 8px -2px ${statusColor}10`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: statusGradient,
          opacity: 0.9,
          transition: 'opacity 0.3s ease'
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 25px 50px -12px ${statusColor}50, 0 0 0 1px ${statusColor}40`
        }
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`Consulta de ${paciente} - ${status}`}
    >
      <CardContent sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <CardHeader 
          paciente={paciente}
          status={status}
          statusColor={statusColor}
          pacienteInitials={pacienteInitials}
        />
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <InfoSection
            icon={<MdDescription size={16} />}
            label="Motivo"
            value={motivo}
            backgroundColor="rgba(59, 130, 246, 0.08)"
            borderColor="rgba(59, 130, 246, 0.2)"
            textColor="#1e40af"
          />
          
          {observacoes && (
            <InfoSection
              icon={<MdInfo size={16} />}
              label="Observações"
              value={observacoes}
              backgroundColor="rgba(16, 185, 129, 0.08)"
              borderColor="rgba(16, 185, 129, 0.2)"
              textColor="#047857"
            />
          )}
          
          <InfoSection
            icon={<MdAccessTime size={16} />}
            label="Horário"
            value={horario}
            backgroundColor={statusBackground}
            borderColor={statusBorder}
            textColor={statusTextColor}
          />
          
          {formattedDate && (
            <InfoSection
              icon={<MdCalendarToday size={16} />}
              label="Data"
              value={formattedDate}
              backgroundColor="rgba(107, 114, 128, 0.08)"
              borderColor="rgba(107, 114, 128, 0.2)"
              textColor="#374151"
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