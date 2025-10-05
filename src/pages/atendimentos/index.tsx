import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Tabs, Tab } from '@mui/material';
import { useDimension } from '../../hooks';
import AtendimentoCard from './components/AtendimentoCard';
import { useState } from 'react';
import Filtro from '../../components/filtro';
import { statusTabs } from './utils/constants';

const AtendimentosPage = () => {
  const navigate = useNavigate();
  const isMobile = useDimension(800);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleIniciarAtendimento = (id: number) => {
    // Lógica para iniciar atendimento
  };

  const handleNaoCompareceu = (id: number) => {
    // Lógica para marcar como não compareceu
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-gray-50 to-medical-primary-50">
      <div className={`max-w-full mx-auto ${isMobile ? 'px-3 py-4' : 'px-6 py-6'}`}>
        <Box sx={{ mb: isMobile ? 2 : 4 }}>
          <Filtro />
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'right', 
            justifyContent: 'right', 
            mb: 3,
            mt: 3
          }}>
            <Typography variant="body2" sx={{ 
              color: '#6b7280',
              fontSize: '0.875rem',
              fontWeight: '500',
              textAlign: 'right'
            }}>
              {statusTabs[tabValue].count} atendimentos na aba selecionada
            </Typography>
          </Box>

          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            mb: 3,
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
