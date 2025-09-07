import React from 'react';
import { CardContent, Box, Typography } from '@mui/material';
import { QuickActionCardProps } from './utils/interfaces';
import { IconContainerCard, StyledCard } from './utils/contants';

const QuickActionCard: React.FC<QuickActionCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  colorClass 
}) => {
  return (
    <StyledCard 
      onClick={onClick}
      className={colorClass}
      sx={{
        background: colorClass.includes('gradient') 
          ? colorClass.replace('bg-gradient-to-br ', '') 
          : undefined,
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
