import { useNavigate } from 'react-router-dom';
import QuickActionCard from '../../../../components/cards/QuickActionCard';
import CurvedHeader from '../../../../components/curved-header';
import { Box, Typography, Grid } from '@mui/material';
import { useDimension, useProximaConsulta } from '../../../../hooks';
import { getQuickActions } from '../../utils/constants';

const PacienteDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useDimension(800);
  const quickActions = getQuickActions(4);
  const { mensagem, loading, error } = useProximaConsulta();

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-gray-50 to-medical-primary-50">
      <CurvedHeader
        userRole=""
        nextAppointment={loading ? "Carregando..." : error ? "Erro ao carregar consultas" : mensagem || "Nenhuma consulta agendada"}
      />
      <div className={`max-w-7xl mx-auto ${isMobile ? 'px-3' : 'px-4'}`} style={{ paddingTop: isMobile ? '244px' : '264px' }}>

        <Box sx={{ mb: isMobile ? 2 : 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: isMobile ? 2 : 3 }}>
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
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
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

export default PacienteDashboard;
