import { useNavigate } from 'react-router-dom';
import {
  MdPeople,
  MdCalendarMonth,
  MdAccessTime,
} from 'react-icons/md';
import { CardStats } from '../../../components/cards';
import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { useDimension } from '../../../hooks';
import { getDashboardStats, consultasDoDia } from './userConstants';

const SecretariaDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useDimension(800);
  const dashboardStats = getDashboardStats(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendada':
        return 'default';
      case 'Confirmada':
        return 'primary';
      case 'Em Andamento':
        return 'warning';
      case 'Concluída':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-gray-50 to-medical-primary-50">
      <div className={`max-w-7xl mx-auto ${isMobile ? 'px-3 py-4' : 'px-4 py-8'}`}>
        {/* Cards de Estatísticas */}
        <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: isMobile ? 2 : 4 }}>
          <Grid item xs={12} md={4}>
            <CardStats
              title="Consultas Hoje"
              value={dashboardStats.consultasHoje || 0}
              icon={MdCalendarMonth}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardStats
              title="Esta Semana"
              value={dashboardStats.consultasSemana || 0}
              icon={MdAccessTime}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardStats
              title="Pacientes Ativos"
              value={dashboardStats.pacientesAtivos || 0}
              icon={MdPeople}
              color="accent"
            />
          </Grid>
        </Grid>

        {/* Consultas do Dia */}
        <Box sx={{ mb: isMobile ? 2 : 4 }}>
          <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 'bold', color: '#1f2937', mb: 2 }}>
            Consultas de Hoje
          </Typography>
          <Grid container spacing={isMobile ? 1 : 2}>
            {consultasDoDia.map((consulta) => (
              <Grid item xs={12} sm={6} md={4} key={consulta.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    }
                  }}
                  onClick={() => navigate('/consultas')}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        {consulta.paciente}
                      </Typography>
                      <Chip 
                        label={consulta.status} 
                        color={getStatusColor(consulta.status)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      <strong>Médico:</strong> {consulta.medico}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      <strong>Especialidade:</strong> {consulta.especialidade}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                      <strong>Horário:</strong> {consulta.horario}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

      </div>
    </div>
  );
};

export default SecretariaDashboard;
