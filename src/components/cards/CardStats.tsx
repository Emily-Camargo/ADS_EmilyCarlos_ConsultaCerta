import React from 'react';
import { CardContent, Box, Typography } from '@mui/material';
import { CardStatsProps } from './utils/interfaces';
import { getColorValue, IconContainer, StyledCard } from './utils/contants';

const CardStats = ({ title, value, icon: Icon, color }: CardStatsProps) => {
  const colorValue = getColorValue(color);

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                fontWeight: 500, 
                fontSize: '0.875rem',
                mb: 1 
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold',
                color: colorValue,
                fontSize: '1.5rem'
              }}
            >
              {value}
            </Typography>
          </Box>
          <IconContainer color={color}>
            <Icon size={24} className={colorValue} />
          </IconContainer>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default CardStats;
