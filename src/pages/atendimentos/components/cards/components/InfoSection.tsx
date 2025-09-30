import { Box, Typography } from '@mui/material';
import { InfoSectionProps } from '../../../utils/interfaces';

const InfoSection = ({ 
  icon, 
  label, 
  value, 
  backgroundColor = 'rgba(255, 255, 255, 0.6)',
  borderColor = 'rgba(255, 255, 255, 0.3)',
  textColor = '#475569'
}: InfoSectionProps) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      p: 1,
      borderRadius: '8px',
      backgroundColor,
      backdropFilter: 'blur(10px)',
      border: `1px solid ${borderColor}`
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 0.75,
        color: textColor
      }}>
        {icon}
        <Typography variant="body2" sx={{ 
          fontSize: '0.8rem',
          fontWeight: '500'
        }}>
          <strong>{label}:</strong> {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoSection;
