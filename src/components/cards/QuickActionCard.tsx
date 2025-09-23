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
          ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)'
          : colorClass.includes('medical-secondary')
          ? 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)'
          : colorClass.includes('medical-gray')
          ? 'linear-gradient(135deg, #6b7280 0%, #4b5563 50%, #374151 100%)'
          : undefined,
      }}
    >
      <CardContent sx={{ p: 3, textAlign: 'left', position: 'relative', zIndex: 3 }}>
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
    </StyledCardGradient>
  );
};

export default QuickActionCard;
