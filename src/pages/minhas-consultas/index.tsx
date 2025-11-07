import React, { useState, useEffect } from 'react'
import { Box, Typography, Grid, Tabs, Tab } from '@mui/material'
import { 
  MdEventNote, 
  MdAdd, 
  MdHistory
} from 'react-icons/md'
import { Button } from '@mantine/core'
import { toast } from 'react-toastify'
import ConsultaCard from './components/consulta-card'
import AgendarConsulta from './components/agendar-consulta'
import CancelarConsulta from './components/cancelar-consulta'
import ReagendarConsulta from './components/reagendar-consulta'
import VisualizarConsulta from './components/visualizar-consulta'
import { ConsultaPaciente, AgendamentoCompleto } from './utils/interfaces'
import Filtro from '../../components/filtro'
import { useDimension } from '../../hooks'
import { postBuscarConsultas, confirmarConsulta } from '../../services/consultas'
import { ConsultaRes } from '../../services/consultas/interface'
import { useAuth } from '../../contexts/AuthContext'
import CustomLoaders from '../../components/Loader'

interface StatusTab {
  label: string;
  data: ConsultaRes[];
  count: number;
}

const MinhasConsultasPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [modalAgendar, setModalAgendar] = useState(false)
  const [modalCancelar, setModalCancelar] = useState(false)
  const [modalReagendar, setModalReagendar] = useState(false)
  const [modalVisualizar, setModalVisualizar] = useState(false)
  const [consultaSelecionada, setConsultaSelecionada] = useState<ConsultaPaciente | null>(null)
  const [statusTabs, setStatusTabs] = useState<StatusTab[]>([
    { label: 'Próximas Consultas', data: [], count: 0 },
    { label: 'Histórico', data: [], count: 0 },
  ]);
  const [loading, setLoading] = useState(true)
  const isMobile = useDimension(800)
  const { getIdPaciente } = useAuth()

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const separarPorData = (consultas: ConsultaRes[]) => {
    const consultasValidas = consultas.filter(c => c.paciente && c.medico);
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const proximas = consultasValidas.filter(c => {
      const dataConsulta = new Date(c.dataHora);
      dataConsulta.setHours(0, 0, 0, 0);
      return dataConsulta >= hoje;
    });

    const historico = consultasValidas.filter(c => {
      const dataConsulta = new Date(c.dataHora);
      dataConsulta.setHours(0, 0, 0, 0);
      return dataConsulta < hoje;
    });

    setStatusTabs([
      { label: 'Próximas Consultas', data: proximas, count: proximas.length },
      { label: 'Histórico', data: historico, count: historico.length },
    ]);
  };

  useEffect(() => {
    const buscarConsultas = async () => {
      try {
        setLoading(true);
        const idPaciente = getIdPaciente();
        
        if (!idPaciente) {
          console.error('ID do paciente não encontrado');
          setLoading(false);
          return;
        }

        const response = await postBuscarConsultas({
          idPaciente: idPaciente,
        });

        separarPorData(response.data);
      } catch (error) {
        console.error('Erro ao buscar consultas:', error);
        toast.error('Erro ao carregar consultas');
      } finally {
        setLoading(false);
      }
    };

    buscarConsultas();
  }, []);

  const handleAgendarConsulta = async (_agendamento: AgendamentoCompleto) => {
    try {
      setLoading(true);
      const idPaciente = getIdPaciente();
      
      if (!idPaciente) {
        console.error('ID do paciente não encontrado');
        setLoading(false);
        return;
      }

      const response = await postBuscarConsultas({
        idPaciente: idPaciente,
      });

      separarPorData(response.data);
    } catch (error) {
      console.error('Erro ao recarregar consultas:', error);
      toast.error('Erro ao recarregar consultas');
    } finally {
      setLoading(false);
    }
  }

  const handleVisualizarConsulta = (consulta: ConsultaPaciente) => {
    setConsultaSelecionada(consulta)
    setModalVisualizar(true)
  }

  const handleCancelarConsulta = (consulta: ConsultaPaciente) => {
    setConsultaSelecionada(consulta)
    setModalCancelar(true)
  }

  const handleReagendarConsulta = (consulta: ConsultaPaciente) => {
    setConsultaSelecionada(consulta)
    setModalReagendar(true)
  }

  const handleConfirmarConsulta = async (consulta: ConsultaPaciente) => {
    try {
      await confirmarConsulta({ id: consulta.id_consulta })
      toast.success('Consulta confirmada com sucesso!')
      await recarregarConsultas()
    } catch (error: any) {
      console.error('Erro ao confirmar consulta:', error)
      toast.error(error?.response?.data?.message || 'Erro ao confirmar consulta')
    }
  }

  const recarregarConsultas = async () => {
    try {
      setLoading(true);
      const idPaciente = getIdPaciente();
      
      if (!idPaciente) {
        console.error('ID do paciente não encontrado');
        setLoading(false);
        return;
      }

      const response = await postBuscarConsultas({
        idPaciente: idPaciente,
      });

      separarPorData(response.data);
    } catch (error) {
      console.error('Erro ao recarregar consultas:', error);
      toast.error('Erro ao recarregar consultas');
    } finally {
      setLoading(false);
    }
  }

  const renderEmptyState = (icon: React.ReactNode, title: string, description: string) => (
    <Box sx={{ 
      textAlign: 'center', 
      py: 8,
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '1px solid #e2e8f0'
    }}>
      {icon}
      <Typography variant="h6" sx={{ color: '#64748b', mt: 2, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
        {description}
      </Typography>
    </Box>
  )

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
    <div className={`${isMobile ? 'p-4' : 'p-6'} bg-white`}>
      <Box sx={{ mb: 3 }}>
        <Filtro />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Button 
          variant="gradient" 
          gradient={{ from: '#1D4ED8', to: '#1E3A8A' }}
          leftSection={<MdAdd size={20} />}
          onClick={() => setModalAgendar(true)}
          size="xs"
        >
          Agendar Consulta
        </Button>
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
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              minHeight: isMobile ? '40px' : '48px',
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

      <Box>
        {statusTabs[tabValue].data.length === 0 ? (
          renderEmptyState(
            tabValue === 0 ? 
              <MdEventNote size={isMobile ? 48 : 64} color="#94a3b8" /> :
              <MdHistory size={isMobile ? 48 : 64} color="#94a3b8" />,
            tabValue === 0 ? 'Nenhuma consulta agendada' : 'Nenhuma consulta no histórico',
            tabValue === 0 ? 
              'Você não possui consultas agendadas no momento.' :
              'Suas consultas concluídas e canceladas aparecerão aqui.'
          )
        ) : (
          <Grid container spacing={isMobile ? 1.5 : 2}>
            {statusTabs[tabValue].data
              .sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime())
              .map((consultaApi) => {
                const valorConsulta = consultaApi.valorConsulta 
                  ? (typeof consultaApi.valorConsulta === 'string' 
                      ? parseFloat(consultaApi.valorConsulta) 
                      : consultaApi.valorConsulta)
                  : 0;

                const consultaFormatada: ConsultaPaciente = {
                  id_consulta: consultaApi.idConsulta,
                  id_paciente: consultaApi.idPaciente,
                  id_medico: consultaApi.idMedico,
                  data_hora: consultaApi.dataHora,
                  observacoes: consultaApi.observacoes || '',
                  valor_consulta: valorConsulta,
                  status: consultaApi.status.toLowerCase() as any,
                  criado_em: consultaApi.criadoEm,
                  atualizado_em: consultaApi.atualizadoEm,
                  data_cancelamento: consultaApi.dataCancelamento ?? null,
                  motivo_cancelamento: consultaApi.motivoCancelamento ?? null,
                  prazo_confirmacao: consultaApi.prazoConfirmacao ?? null,
                  medico: {
                    id_medico: consultaApi.medico.idMedico,
                    nome_medico: consultaApi.medico.nome,
                    especialidade: consultaApi.medico.especialidade,
                    crm: consultaApi.medico.crm,
                    ativo: true
                  }
                };

                return (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={consultaApi.idConsulta}>
                    <ConsultaCard
                      consulta={consultaFormatada}
                      onVisualizar={handleVisualizarConsulta}
                      onCancelar={tabValue === 0 ? handleCancelarConsulta : undefined}
                      onReagendar={tabValue === 0 ? handleReagendarConsulta : undefined}
                      onConfirmar={tabValue === 0 ? handleConfirmarConsulta : undefined}
                    />
                  </Grid>
                );
              })}
          </Grid>
        )}
      </Box>

      <AgendarConsulta
        modal={modalAgendar}
        setModal={setModalAgendar}
        onConfirmar={handleAgendarConsulta}
      />

      <CancelarConsulta
        modal={modalCancelar}
        setModal={setModalCancelar}
        consulta={consultaSelecionada}
        onConfirmar={recarregarConsultas}
      />

      <ReagendarConsulta
        modal={modalReagendar}
        setModal={setModalReagendar}
        consulta={consultaSelecionada}
        onConfirmar={recarregarConsultas}
      />

      <VisualizarConsulta
        modal={modalVisualizar}
        setModal={setModalVisualizar}
        consulta={consultaSelecionada}
      />
    </div>
  )
}

export default MinhasConsultasPage
