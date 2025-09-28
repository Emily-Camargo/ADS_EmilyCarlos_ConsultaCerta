import { useNavigate } from 'react-router-dom';
import {
  MdPeople,
  MdCalendarMonth,
  MdAccessTime,
} from 'react-icons/md';
import { CardStats } from '../../../components/cards';
import { Box, Typography, Grid } from '@mui/material';
import { useDimension } from '../../../hooks';
import { getDashboardStats, consultasDoDia } from '../mocks/mocks';
import ConsultaCardEnhanced from './ConsultaCardEnhanced';

const SecretariaDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useDimension(800);
  const dashboardStats = getDashboardStats(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-gray-50 to-medical-primary-50">
      <div className={`max-w-7xl mx-auto ${isMobile ? 'px-3 py-4' : 'px-4 py-8'}`}>
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

        <Box sx={{ mb: isMobile ? 2 : 4 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 3 
          }}>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ 
              fontWeight: 'bold', 
              color: '#1f2937',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              📅 Consultas de Hoje
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#6b7280',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {consultasDoDia.length} consultas agendadas
            </Typography>
          </Box>
          
          <Grid container spacing={isMobile ? 2 : 3}>
            {consultasDoDia.map((consulta) => (
              <Grid item xs={12} sm={6} md={4} key={consulta.id}>
                <ConsultaCardEnhanced
                  id={consulta.id}
                  paciente={consulta.paciente}
                  medico={consulta.medico}
                  horario={consulta.horario}
                  status={consulta.status}
                  especialidade={consulta.especialidade}
                  onClick={() => navigate('/consultas')}
                  showActions={true}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

      </div>
    </div>
  );
};

export default SecretariaDashboard;
