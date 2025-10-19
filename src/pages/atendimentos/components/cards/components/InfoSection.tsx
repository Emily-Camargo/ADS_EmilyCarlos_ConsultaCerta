import { Box, Typography } from '@mui/material';
import { InfoSectionProps } from '../../../utils/interfaces';

const InfoSection = ({ 
  icon, 
  label, 
  value, 
  backgroundColor = 'rgba(248, 250, 252, 0.8)',
  borderColor = 'rgba(226, 232, 240, 0.8)',
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
      border: `1px solid ${borderColor}`,
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: backgroundColor.replace('0.8', '1'),
        transform: 'translateY(-1px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: 20,
        height: 20,
        color: textColor,
        opacity: 0.8
      }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ 
          fontSize: '0.7rem',
          fontWeight: '600',
          color: textColor,
          opacity: 0.7,
          textTransform: 'uppercase',
          letterSpacing: '0.3px',
          mb: 0.25
        }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ 
          fontSize: '0.8rem',
          fontWeight: '500',
          color: textColor,
          lineHeight: 1.2,
          wordBreak: 'break-word'
        }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoSection;
