import { CardContent, Box, Typography } from '@mui/material';
import { QuickActionCardProps } from './utils/interfaces';
import { IconContainerCard, StyledCardGradient } from './utils/contants';

const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  colorClass 
}: QuickActionCardProps) => {
  return (
    <StyledCardGradient 
      onClick={onClick}
      className={colorClass}
      sx={{
        cursor: 'pointer',
        background: colorClass.includes('medical-primary') 
          ? 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 30%, #81d4fa 60%, #4fc3f7 100%)'
          : colorClass.includes('medical-secondary')
          ? 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 30%, #a5d6a7 60%, #81c784 100%)'
          : colorClass.includes('medical-gray')
          ? 'linear-gradient(135deg, #f5f5f5 0%, #eeeeee 30%, #e0e0e0 60%, #bdbdbd 100%)'
          : undefined,
      }}
    >
      <CardContent sx={{ p: 3, textAlign: 'left', position: 'relative', zIndex: 3 }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
          <IconContainerCard>
            <Icon 
              size={24} 
              className={colorClass.includes('medical-primary') ? 'text-blue-600' : colorClass.includes('medical-secondary') ? 'text-green-600' : 'text-gray-600'} 
            />
          </IconContainerCard>
        </Box>
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 1,
              color: colorClass.includes('medical-primary') ? '#1976d2' : colorClass.includes('medical-secondary') ? '#388e3c' : '#424242',
              fontSize: '1.125rem'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.8,
              color: colorClass.includes('medical-primary') ? '#1565c0' : colorClass.includes('medical-secondary') ? '#2e7d32' : '#616161',
              fontSize: '0.875rem',
              lineHeight: 1.5
            }}
          >
            {description}
          </Typography>
        </Box>
      </CardContent>
    </StyledCardGradient>
  );
};

export default QuickActionCard;
