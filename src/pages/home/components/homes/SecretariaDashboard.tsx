import { useNavigate } from 'react-router-dom';
import CurvedHeader from '../../../../components/curved-header';
import { Box, Typography, Grid, Tabs, Tab } from '@mui/material';
import { useDimension } from '../../../../hooks';
import { 
  consultasDoDia,
  consultasEmAndamento,
  consultasConfirmada,
  consultasConcluida,
  consultasAguardandoConfirmacao,
  consultasNaoCompareceu
} from '../../mocks/mocks';
import ConsultaCardEnhanced from '../cards/secretaria/card-secretaria';
import { useState } from 'react';

const SecretariaDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useDimension(800);
  const [tabValue, setTabValue] = useState(0);

  const statusTabs = [
    { label: 'Todas', data: consultasDoDia, count: consultasDoDia.length },
    { label: 'Em Andamento', data: consultasEmAndamento, count: consultasEmAndamento.length },
    { label: 'Confirmada', data: consultasConfirmada, count: consultasConfirmada.length },
    { label: 'Aguardando', data: consultasAguardandoConfirmacao, count: consultasAguardandoConfirmacao.length },
    { label: 'Concluída', data: consultasConcluida, count: consultasConcluida.length },
    { label: 'Não Compareceu', data: consultasNaoCompareceu, count: consultasNaoCompareceu.length },
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };


  return (
    <div className="bg-gradient-to-br from-medical-gray-50 to-medical-primary-50">
      <CurvedHeader
        userName="Maria"
        userRole=""
        nextAppointment="Tenha um bom dia'"
        primaryColor="#3B82F6"
        secondaryColor="#1E40AF"
      />
      <div className={`mx-auto ${isMobile ? 'px-3' : 'px-6'}`}>

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
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Consultas de Hoje
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#6b7280',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {statusTabs[tabValue].count} consultas na aba selecionada
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
            {statusTabs[tabValue].data.map((consulta) => (
              <Grid item xs={12} sm={6} md={3} key={consulta.id}>
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
