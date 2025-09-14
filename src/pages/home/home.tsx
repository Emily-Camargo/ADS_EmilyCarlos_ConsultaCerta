import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdPeople,
  MdCalendarMonth,
  MdAccessTime,
} from 'react-icons/md';
import { CardStats, QuickActionCard } from '../../components/cards';
import { Box, Typography, Grid } from '@mui/material';
import { dashboardStats, quickActions } from './components/constants';
import { useDimension } from '../../hooks';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useDimension(800);

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-gray-50 to-medical-primary-50">
      <div className={`max-w-7xl mx-auto ${isMobile ? 'px-3 py-4' : 'px-4 py-8'}`}>
        <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: isMobile ? 2 : 4 }}>
          <Grid item xs={12} md={4}>
            <CardStats
              title="Consultas Hoje"
              value={dashboardStats.consultasHoje}
              icon={MdCalendarMonth}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardStats
              title="Esta Semana"
              value={dashboardStats.consultasSemana}
              icon={MdAccessTime}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardStats
              title="Pacientes Ativos"
              value={dashboardStats.pacientesAtivos}
              icon={MdPeople}
              color="accent"
            />
          </Grid>
        </Grid>

        <Box sx={{ mb: isMobile ? 2 : 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: isMobile ? 2 : 3 }}>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 'bold', color: '#1f2937' }}>
              Módulos do Sistema
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

export default Home;