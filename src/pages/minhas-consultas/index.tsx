import React, { useState, useEffect } from 'react'
import { Box, Typography, Grid, Tabs, Tab, CircularProgress } from '@mui/material'
import { 
  MdEventNote, 
  MdAdd, 
  MdHistory
} from 'react-icons/md'
import { Button } from '@mantine/core'
import { toast } from 'react-toastify'
import ConsultaCard from './components/ConsultaCard'
import AgendarConsulta from './components/AgendarConsulta'
import { ConsultaPaciente, AgendamentoCompleto } from './utils/interfaces'
import Filtro from '../../components/filtro'
import { useDimension } from '../../hooks'
import { postBuscarConsultas } from '../../services/consultas'
import { ConsultaRes } from '../../services/consultas/interface'
import { useAuth } from '../../contexts/AuthContext'

interface StatusTab {
  label: string;
  data: ConsultaRes[];
  count: number;
}

const MinhasConsultasPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [modalAgendar, setModalAgendar] = useState(false)
  const [consultas, setConsultas] = useState<ConsultaPaciente[]>([])
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
    // Filtra apenas consultas válidas com paciente e médico definidos
    const consultasValidas = consultas.filter(c => c.paciente && c.medico);
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Zera as horas para comparação apenas de data

    // Próximas consultas: data igual ou posterior a hoje
    const proximas = consultasValidas.filter(c => {
      const dataConsulta = new Date(c.dataHora);
      dataConsulta.setHours(0, 0, 0, 0);
      return dataConsulta >= hoje;
    });

    // Histórico: data anterior a hoje
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

  const handleAgendarConsulta = (agendamento: AgendamentoCompleto) => {
    const novaConsulta: ConsultaPaciente = {
      id_consulta: Math.max(...consultas.map(c => c.id_consulta)) + 1,
      id_paciente: 1,
      id_medico: agendamento.medico,
      data_hora: agendamento.data_hora,
      observacoes: agendamento.observacoes,
      valor_consulta: 150.00, // Valor padrão
      status: 'agendada',
      criado_em: new Date().toISOString(),
      medico: {
        id_medico: agendamento.medico,
        nome_medico: 'Dr. Médico Selecionado',
        especialidade: 'Especialidade Selecionada',
        crm: '00000-SP',
        ativo: true
      }
    }

    setConsultas(prev => [novaConsulta, ...prev])
    toast.success('Consulta agendada com sucesso!')
  }

  const handleVisualizarConsulta = (_consulta: ConsultaPaciente) => {
    toast.info('Funcionalidade de visualização será implementada em breve')
  }

  const handleCancelarConsulta = (_consulta: ConsultaPaciente) => {
    // setConsultas(prev => 
    //   prev.map(c => 
    //     c.id_consulta === consulta.id_consulta 
    //       ? { ...c, status: 'cancelada' as const, atualizado_em: new Date().toISOString() }
    //       : c
    //   )
    // )
    toast.success('Consulta cancelada com sucesso!')
  }

  const handleReagendarConsulta = (_consulta: ConsultaPaciente) => {
    toast.info('Funcionalidade de reagendamento será implementada em breve')
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
      <div className="min-h-screen bg-gradient-to-br from-medical-gray-50 to-medical-primary-50 flex items-center justify-center">
        <CircularProgress size={60} sx={{ color: '#3b82f6' }} />
      </div>
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
                // Converte dados da API para o formato esperado pelo ConsultaCard
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
    </div>
  )
}

export default MinhasConsultasPage
