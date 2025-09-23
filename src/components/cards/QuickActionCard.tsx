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
        background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.8) 0%, rgba(59, 130, 246, 0.9) 100%)',
      };
    } else if (colorClass.includes('emerald')) {
      return {
        background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.8) 0%, rgba(16, 185, 129, 0.9) 100%)',
      };
    } else if (colorClass.includes('slate')) {
      return {
        background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.8) 0%, rgba(100, 116, 139, 0.9) 100%)',
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
