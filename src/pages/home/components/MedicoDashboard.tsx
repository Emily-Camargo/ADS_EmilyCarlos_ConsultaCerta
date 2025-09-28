import { useNavigate } from 'react-router-dom';
import {
  MdLocalHospital,
  MdEventNote,
  MdDescription,
} from 'react-icons/md';
import { CardStats } from '../../../components/cards';
import { Box, Typography, Grid } from '@mui/material';
import { useDimension } from '../../../hooks';
import { getDashboardStats, atendimentosMedico } from '../mocks/mocks';
import ConsultaCardMedico from './ConsultaCardMedico';

const MedicoDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useDimension(800);
  const dashboardStats = getDashboardStats(3);

  const handleIniciarAtendimento = (id: number) => {
    console.log(`Iniciando atendimento para consulta ID: ${id}`);
    // Aqui você pode implementar a lógica para iniciar o atendimento
    // Por exemplo, navegar para uma página de atendimento ou abrir um modal
  };

  const handleNaoCompareceu = (id: number) => {
    console.log(`Marcando como não compareceu para consulta ID: ${id}`);
    // Aqui você pode implementar a lógica para marcar como não compareceu
    // Por exemplo, atualizar o status da consulta
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-gray-50 to-medical-primary-50">
      <div className={`max-w-7xl mx-auto ${isMobile ? 'px-3 py-4' : 'px-4 py-8'}`}>
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
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🏥 Atendimentos de Hoje
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#6b7280',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {atendimentosMedico.length} atendimentos agendados
            </Typography>
          </Box>
          
          <Grid container spacing={isMobile ? 2 : 3}>
            {atendimentosMedico.map((atendimento) => (
              <Grid item xs={12} sm={6} md={4} key={atendimento.id}>
                <ConsultaCardMedico
                  id={atendimento.id}
                  paciente={atendimento.paciente}
                  medico="Dr. Carlos Oliveira"
                  horario={atendimento.horario}
                  status={atendimento.status}
                  especialidade={atendimento.especialidade}
                  onClick={() => navigate('/atendimentos')}
                  onIniciarAtendimento={handleIniciarAtendimento}
                  onNaoCompareceu={handleNaoCompareceu}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

      </div>
    </div>
  );
};

export default MedicoDashboard;
