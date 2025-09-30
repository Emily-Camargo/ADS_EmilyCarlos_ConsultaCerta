import React from 'react';
import { CardContent, Box, Typography } from '@mui/material';
import { QuickActionCardProps } from './utils/interfaces';
import { IconContainerCard, StyledCard } from './utils/contants';

const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  colorClass 
}: QuickActionCardProps) => {
  const getGradientStyle = (colorClass: string) => {
    if (colorClass.includes('blue')) {
      return {
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.95) 50%, rgba(30, 64, 175, 1) 100%)',
        backgroundSize: '200% 200%',
      };
    } else if (colorClass.includes('emerald')) {
      return {
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.95) 50%, rgba(4, 120, 87, 1) 100%)',
        backgroundSize: '200% 200%',
      };
    } else if (colorClass.includes('red')) {
      return {
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.95) 50%, rgba(185, 28, 28, 1) 100%)',
        backgroundSize: '200% 200%',
      };
    } else if (colorClass.includes('purple')) {
      return {
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.9) 0%, rgba(147, 51, 234, 0.95) 50%, rgba(126, 34, 206, 1) 100%)',
        backgroundSize: '200% 200%',
      };
    } else if (colorClass.includes('slate')) {
      return {
        background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.9) 0%, rgba(71, 85, 105, 0.95) 50%, rgba(51, 65, 85, 1) 100%)',
        backgroundSize: '200% 200%',
      };
    }
    return {};
  };

  return (
    <StyledCard 
      onClick={onClick}
      sx={{
        ...getGradientStyle(colorClass),
        '& .MuiCardContent-root': {
          position: 'relative',
          zIndex: 2,
        }
      }}
    >
      <CardContent sx={{ p: 3, textAlign: 'left' }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
          <IconContainerCard>
            <Icon size={24} className="text-white" />
          </IconContainerCard>
        </Box>
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 1,
              color: 'white',
              fontSize: '1.125rem'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.9,
              color: 'white',
              fontSize: '0.875rem',
              lineHeight: 1.5
            }}
          >
            {description}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default QuickActionCard;
