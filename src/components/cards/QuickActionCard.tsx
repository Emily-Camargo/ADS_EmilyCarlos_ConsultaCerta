import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick: () => void;
  colorClass: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  transform: 'scale(1)',
  '&:hover': {
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transform: 'scale(1.02)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
}));

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
          <IconContainer>
            <Icon size={24} className="text-white" />
          </IconContainer>
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
