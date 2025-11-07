import { useNavigate } from 'react-router-dom';
import CurvedHeader from '../../../../components/curved-header';
import { Box, Grid, Tabs, Tab } from '@mui/material';
import { useDimension } from '../../../../hooks';

import ConsultaCardEnhanced from '../cards/secretaria/card-secretaria';
import { useState, useEffect } from 'react';
import { postBuscarConsultas } from '../../../../services/consultas';
import { ConsultaRes } from '../../../../services/consultas/interface';
import CustomLoaders from '../../../../components/Loader';

interface StatusTab {
  label: string;
  data: ConsultaRes[];
  count: number;
}

const SecretariaDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useDimension(800);
  const [tabValue, setTabValue] = useState(0);
  const [statusTabs, setStatusTabs] = useState<StatusTab[]>([
    { label: 'Todas', data: [], count: 0 },
    { label: 'Agendada', data: [], count: 0 },
    { label: 'Confirmada', data: [], count: 0 },
    { label: 'Em andamento', data: [], count: 0 },
    { label: 'Concluída', data: [], count: 0 },
    { label: 'Cancelada', data: [], count: 0 },
    { label: 'Reagendada', data: [], count: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const separarPorStatus = (consultas: ConsultaRes[]) => {
    const consultasValidas = consultas.filter(c => c.paciente && c.medico);
    
    const agendadas = consultasValidas.filter(c => c.status.toLowerCase() === 'agendada');
    const confirmadas = consultasValidas.filter(c => c.status.toLowerCase() === 'confirmada');
    const emAndamento = consultasValidas.filter(c => c.status.toLowerCase() === 'em andamento');
    const concluidas = consultasValidas.filter(c => c.status.toLowerCase() === 'concluída' || c.status.toLowerCase() === 'concluida');
    const canceladas = consultasValidas.filter(c => c.status.toLowerCase() === 'cancelada');
    const reagendadas = consultasValidas.filter(c => c.status.toLowerCase() === 'reagendada');

    setStatusTabs([
      { label: 'Todas', data: consultasValidas, count: consultasValidas.length },
      { label: 'Agendada', data: agendadas, count: agendadas.length },
      { label: 'Confirmada', data: confirmadas, count: confirmadas.length },
      { label: 'Em andamento', data: emAndamento, count: emAndamento.length },
      { label: 'Concluída', data: concluidas, count: concluidas.length },
      { label: 'Cancelada', data: canceladas, count: canceladas.length },
      { label: 'Reagendada', data: reagendadas, count: reagendadas.length },
    ]);
  };

  useEffect(() => {
    const buscarConsultas = async () => {
      try {
        setLoading(true);
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        const dataFormatada = `${ano}-${mes}-${dia}`;
        
        const response = await postBuscarConsultas({
          dataInicio: dataFormatada,
          dataFim: dataFormatada,
        });

        separarPorStatus(response.data);
      } catch (error) {
        console.error('Erro ao buscar consultas:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarConsultas();
  }, []);

  if (loading) {
    return (
      <CustomLoaders 
        open={true} 
        animation="LoadingDots" 
        msm="Carregando consultas..."
      />
    );
  }

  return (
    <div className="bg-gradient-to-br from-medical-gray-50 to-medical-primary-50 min-h-screen">
      <CurvedHeader
        userRole=""
        nextAppointment="Tenha um bom dia! Essas são as consultas de hoje"
      />
      <div className={`mx-auto ${isMobile ? 'px-3' : 'px-6'}`} style={{ paddingTop: isMobile ? '220px' : '250px' }}>
        <Box sx={{ mb: isMobile ? 1 : 2 }}>
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
          
          {statusTabs[tabValue].data.length === 0 ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '200px',
              color: '#6b7280',
              fontSize: '1.125rem',
              fontWeight: '500'
            }}>
              Nenhuma consulta encontrada para este status
            </Box>
          ) : (
            <Grid container spacing={isMobile ? 2 : 4}>
              {statusTabs[tabValue].data.map((consulta) => {
                const dataHora = new Date(consulta.dataHora);
                const horario = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                const status = consulta.status.charAt(0).toUpperCase() + consulta.status.slice(1);
                
                return (
                  <Grid item xs={12} sm={6} md={3} key={consulta.idConsulta}>
                    <ConsultaCardEnhanced
                      id={consulta.idConsulta}
                      paciente={consulta.paciente.nome}
                      medico={consulta.medico.nome}
                      horario={horario}
                      status={status}
                      especialidade={consulta.medico.especialidade}
                      data={consulta.dataHora}
                      onClick={() => navigate('/consultas')}
                      showActions={true}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </div>
    </div>
  );
};

export default SecretariaDashboard;
