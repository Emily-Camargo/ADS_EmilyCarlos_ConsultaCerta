import { useNavigate } from 'react-router-dom';
import {
  MdLocalHospital,
  MdEventNote,
  MdDescription,
} from 'react-icons/md';
import { CardStats } from '../../../components/cards';
import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { useDimension } from '../../../hooks';
import { getDashboardStats, atendimentosMedico } from './userConstants';

const MedicoDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useDimension(800);
  const dashboardStats = getDashboardStats(3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aguardando':
        return 'default';
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
              title="Atendimentos Hoje"
              value={dashboardStats.atendimentosHoje || 0}
              icon={MdLocalHospital}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardStats
              title="Consultas Agendadas"
              value={dashboardStats.consultasAgendadas || 0}
              icon={MdEventNote}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardStats
              title="Prontuários Pendentes"
              value={dashboardStats.prontuariosPendentes || 0}
              icon={MdDescription}
              color="accent"
            />
          </Grid>
        </Grid>

        {/* Atendimentos de Hoje */}
        <Box sx={{ mb: isMobile ? 2 : 4 }}>
          <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 'bold', color: '#1f2937', mb: 2 }}>
            Atendimentos de Hoje
          </Typography>
          <Grid container spacing={isMobile ? 1 : 2}>
            {atendimentosMedico.map((atendimento) => (
              <Grid item xs={12} sm={6} md={4} key={atendimento.id}>
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
                  onClick={() => navigate('/atendimentos')}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        {atendimento.paciente}
                      </Typography>
                      <Chip 
                        label={atendimento.status} 
                        color={getStatusColor(atendimento.status)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      <strong>Especialidade:</strong> {atendimento.especialidade}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                      <strong>Horário:</strong> {atendimento.horario}
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

export default MedicoDashboard;
