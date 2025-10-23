import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Tabs, Tab } from '@mui/material';
import { useDimension } from '../../hooks';
import AtendimentoCard from './components/AtendimentoCard';
import { useState, useEffect } from 'react';
import Filtro from '../../components/filtro';
import { postBuscarConsultas, atualizarConsulta } from '../../services/consultas';
import { ConsultaRes } from '../../services/consultas/interface';
import { useAuth } from '../../contexts/AuthContext';
import CustomLoaders from '../../components/Loader';
import { StatusTab } from './utils/interfaces';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

const AtendimentosPage = () => {
  const navigate = useNavigate();
  const isMobile = useDimension(800);
  const { getIdMedico } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [statusTabs, setStatusTabs] = useState<StatusTab[]>([
    { label: 'Todas', data: [], count: 0 },
    { label: 'Agendada', data: [], count: 0 },
    { label: 'Confirmada', data: [], count: 0 },
    { label: 'Em andamento', data: [], count: 0 },
    { label: 'Concluída', data: [], count: 0 },
    { label: 'Cancelada', data: [], count: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  // Mutation para atualizar status da consulta
  const atualizarConsultaMutation = useMutation({
    mutationKey: ['atualizar-consulta'],
    mutationFn: atualizarConsulta,
    onSuccess: () => {
      toast.success('Status da consulta atualizado com sucesso!');
      // Recarregar os dados após atualização
      buscarConsultas();
    },
    onError: (error: any) => {
      console.error('Erro ao atualizar consulta:', error);
      toast.error('Erro ao atualizar status da consulta. Tente novamente.');
    }
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleIniciarAtendimento = (id: number) => {
    atualizarConsultaMutation.mutate({
      id: id,
      status: 0
    });
  };

  const handleNaoCompareceu = (id: number) => {
    atualizarConsultaMutation.mutate({
      id: id,
      status: 1
    });
  };

  const handleAbrirProntuario = (id: number) => {
    // Encontrar a consulta pelo ID para obter o ID do paciente
    const consulta = statusTabs[tabValue].data.find(c => c.idConsulta === id);
    if (consulta) {
      navigate(`/prontuario-atendimento/${consulta.idPaciente}/${consulta.idConsulta}`);
    }
  };

  const separarPorStatus = (consultas: ConsultaRes[]) => {
    const consultasValidas = consultas.filter(c => c.paciente && c.medico);
    
    const agendadas = consultasValidas.filter(c => c.status.toLowerCase() === 'agendada');
    const confirmadas = consultasValidas.filter(c => c.status.toLowerCase() === 'confirmada');
    const emAndamento = consultasValidas.filter(c => c.status.toLowerCase() === 'em andamento');
    const concluidas = consultasValidas.filter(c => c.status.toLowerCase() === 'concluída' || c.status.toLowerCase() === 'concluida');
    const canceladas = consultasValidas.filter(c => c.status.toLowerCase() === 'cancelada');

    setStatusTabs([
      { label: 'Todas', data: consultasValidas, count: consultasValidas.length },
      { label: 'Agendada', data: agendadas, count: agendadas.length },
      { label: 'Confirmada', data: confirmadas, count: confirmadas.length },
      { label: 'Em andamento', data: emAndamento, count: emAndamento.length },
      { label: 'Concluída', data: concluidas, count: concluidas.length },
      { label: 'Cancelada', data: canceladas, count: canceladas.length },
    ]);
  };

  const buscarConsultas = async () => {
    try {
      setLoading(true);
      const idMedico = getIdMedico();
      
      if (!idMedico) {
        console.error('ID do médico não encontrado');
        setLoading(false);
        return;
      }

      const hoje = new Date();
      const ano = hoje.getFullYear();
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const dia = String(hoje.getDate()).padStart(2, '0');
      const dataFormatada = `${ano}-${mes}-${dia}`;
      
      const response = await postBuscarConsultas({
        dataInicio: dataFormatada,
        dataFim: dataFormatada,
        idMedico: idMedico,
      });

      separarPorStatus(response.data);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarConsultas();
  }, []);


  if (loading) {
    return (
      <CustomLoaders 
        open={true} 
        animation="LoadingDots" 
        msm="Carregando atendimentos..."
      />
    );
  }

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
              Nenhum atendimento encontrado
            </Box>
          ) : (
            <Grid container spacing={isMobile ? 2 : 4}>
              {statusTabs[tabValue].data.map((consulta) => {
                const dataHora = new Date(consulta.dataHora);
                const horario = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                const status = consulta.status.charAt(0).toUpperCase() + consulta.status.slice(1);
                
                return (
                  <Grid item xs={12} sm={6} md={3} key={consulta.idConsulta}>
                    <AtendimentoCard
                      id={consulta.idConsulta}
                      paciente={consulta.paciente.nome}
                      motivo={consulta.motivo}
                      observacoes={consulta.observacoes}
                      horario={horario}
                      status={status}
                      data={consulta.dataHora}
                      onClick={() => navigate('/atendimentos')}
                      onIniciarAtendimento={handleIniciarAtendimento}
                      onNaoCompareceu={handleNaoCompareceu}
                      onAbrirProntuario={handleAbrirProntuario}
                      isLoading={atualizarConsultaMutation.isLoading}
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

export default AtendimentosPage;
