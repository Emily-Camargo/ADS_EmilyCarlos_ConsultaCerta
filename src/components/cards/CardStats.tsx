import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CardStatsProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: 'primary' | 'secondary' | 'accent';
}

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  border: '1px solid #e5e7eb',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
}));

const IconContainer = styled(Box)<{ color: string }>(({ theme, color }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color === 'primary' ? '#dbeafe' : color === 'secondary' ? '#fef3c7' : '#e0e7ff',
}));

const getColorValue = (color: string) => {
  switch (color) {
    case 'primary':
      return '#3b82f6';
    case 'secondary':
      return '#f59e0b';
    case 'accent':
      return '#8b5cf6';
    default:
      return '#3b82f6';
  }
};

const CardStats: React.FC<CardStatsProps> = ({ title, value, icon: Icon, color }) => {
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
