import { useNavigate } from 'react-router-dom';
import CurvedHeader from '../../../../components/curved-header';
import { Box, Typography, Grid } from '@mui/material';
import { useDimension } from '../../../../hooks';
import { getQuickActions } from '../../utils/constants';
import QuickActionCard from '../../../../components/cards/QuickActionCard';
const MedicoDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useDimension(800);
  const quickActions = getQuickActions(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-gray-50 to-medical-primary-50">
      <CurvedHeader
        userRole="Dr."
        nextAppointment="Seu próximo atendimento é com Maria Santos às 15:00"
      />
      <div className={`max-w-7xl mx-auto ${isMobile ? 'px-3' : 'px-4'}`} style={{ paddingTop: isMobile ? '200px' : '244px' }}>

        <Box sx={{ mb: isMobile ? 2 : 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: isMobile ? 2 : 3, mt: 3 }}>
          <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}
            >
              Módulos Disponíveis
            </Typography>
          </Box>
         
          <Grid container spacing={isMobile ? 2 : 3}>
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Grid item xs={12} sm={6} md={6} lg={4} key={action.title}>
                  <QuickActionCard
                    title={action.title}
                    description={action.description}
                    icon={IconComponent}
                    onClick={() => navigate(action.path)}
                    colorClass={action.colorClass}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default MedicoDashboard;
