import { Box, Avatar, Typography, Chip } from '@mui/material';
import { getStatusIcon, getStatusStyle } from '../../../../home/components/cards/medico/constants';
import { CardHeaderProps } from '../../../utils/interfaces';

const CardHeader = ({ 
  paciente, 
  status, 
  statusColor, 
  pacienteInitials 
}: CardHeaderProps) => {
  return (
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
          bgcolor: statusColor,
          fontSize: '0.875rem',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.8)'
        }}>
          {pacienteInitials}
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
  );
};

export default CardHeader;
