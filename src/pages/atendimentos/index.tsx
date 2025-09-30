import { useNavigate } from 'react-router-dom';
import {
  MdLocalHospital,
  MdEventNote,
  MdDescription,
} from 'react-icons/md';
import { CardStats } from '../../components/cards';
import { Box, Typography, Grid, Tabs, Tab } from '@mui/material';
import { useDimension } from '../../hooks';
import { 
  getDashboardStats, 
  atendimentosMedico,
  atendimentosEmAndamento,
  atendimentosConfirmada,
  atendimentosConcluida,
  atendimentosNaoCompareceu
} from '../home/mocks/mocks';
import AtendimentoCard from './components/AtendimentoCard';
import { useState } from 'react';

const AtendimentosPage = () => {
  const navigate = useNavigate();
  const isMobile = useDimension(800);
  const dashboardStats = getDashboardStats(3);
  const [tabValue, setTabValue] = useState(0);

  const statusTabs = [
    { label: 'Todas', data: atendimentosMedico, count: atendimentosMedico.length },
    { label: 'Em Andamento', data: atendimentosEmAndamento, count: atendimentosEmAndamento.length },
    { label: 'Confirmada', data: atendimentosConfirmada, count: atendimentosConfirmada.length },
    { label: 'Concluída', data: atendimentosConcluida, count: atendimentosConcluida.length },
    { label: 'Não Compareceu', data: atendimentosNaoCompareceu, count: atendimentosNaoCompareceu.length },
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleIniciarAtendimento = (id: number) => {
    console.log(`Iniciando atendimento para consulta ID: ${id}`);
  };

  const handleNaoCompareceu = (id: number) => {
    console.log(`Marcando como não compareceu para consulta ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-gray-50 to-medical-primary-50">
      <div className={`max-w-full mx-auto ${isMobile ? 'px-3 py-4' : 'px-6 py-8'}`}>
        <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: isMobile ? 2 : 4 }} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <CardStats
              title="Atendimentos Hoje"
              value={dashboardStats.atendimentosHoje || 0}
              icon={MdLocalHospital}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStats
              title="Consultas Agendadas"
              value={dashboardStats.consultasAgendadas || 0}
              icon={MdEventNote}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
            <Typography variant={isMobile ? "h5" : "h5"} sx={{ 
              fontWeight: 'bold', 
              color: '#1f2937',
              background: 'linear-gradient(135deg, #3B82F6, #1E40AF)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Meus atendimentos de Hoje
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#6b7280',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {statusTabs[tabValue].count} atendimentos na aba selecionada
            </Typography>
          </Box>

          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            mb: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  minHeight: '48px',
                  color: '#6b7280',
                  '&.Mui-selected': {
                    color: '#3b82f6',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#3b82f6',
                  height: '3px',
                  borderRadius: '2px'
                }
              }}
            >
              {statusTabs.map((tab, index) => (
                <Tab 
                  key={index}
                  label={`${tab.label} (${tab.count})`}
                  sx={{ px: isMobile ? 1 : 2 }}
                />
              ))}
            </Tabs>
          </Box>
          
          <Grid container spacing={isMobile ? 2 : 4}>
            {statusTabs[tabValue].data.map((atendimento) => (
              <Grid item xs={12} sm={6} md={3} key={atendimento.id}>
                <AtendimentoCard
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

export default AtendimentosPage;
