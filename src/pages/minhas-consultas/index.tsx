import React, { useState } from 'react'
import { Box, Typography, Grid, Tabs, Tab } from '@mui/material'
import { 
  MdEventNote, 
  MdAdd, 
  MdHistory
} from 'react-icons/md'
import { Button } from '@mantine/core'
import { toast } from 'react-toastify'
import ConsultaCard from './components/ConsultaCard'
import AgendarConsulta from './components/AgendarConsulta'
import { mockConsultasPaciente } from './mocks'
import { ConsultaPaciente, AgendamentoCompleto } from './utils/interfaces'
import Filtro from '../../components/filtro'
import { useDimension } from '../../hooks'


const MinhasConsultasPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [modalAgendar, setModalAgendar] = useState(false)
  const [consultas, setConsultas] = useState<ConsultaPaciente[]>(mockConsultasPaciente)
  const isMobile = useDimension(800)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

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

  const handleVisualizarConsulta = (consulta: ConsultaPaciente) => {
    console.log('Visualizar consulta:', consulta)
    toast.info('Funcionalidade de visualização será implementada em breve')
  }

  const handleCancelarConsulta = (consulta: ConsultaPaciente) => {
    setConsultas(prev => 
      prev.map(c => 
        c.id_consulta === consulta.id_consulta 
          ? { ...c, status: 'cancelada' as const, atualizado_em: new Date().toISOString() }
          : c
      )
    )
    toast.success('Consulta cancelada com sucesso!')
  }

  const handleReagendarConsulta = (consulta: ConsultaPaciente) => {
    console.log('Reagendar consulta:', consulta)
    toast.info('Funcionalidade de reagendamento será implementada em breve')
  }


  const statusTabs = [
    { 
      label: 'Próximas Consultas', 
      data: consultas.filter(c => c.status === 'agendada' || c.status === 'confirmada'),
      count: consultas.filter(c => c.status === 'agendada' || c.status === 'confirmada').length 
    },
    { 
      label: 'Histórico', 
      data: consultas.filter(c => c.status === 'concluida' || c.status === 'cancelada'),
      count: consultas.filter(c => c.status === 'concluida' || c.status === 'cancelada').length 
    },
  ]

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
              .sort((a, b) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime())
              .map((consulta) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={consulta.id_consulta}>
                  <ConsultaCard
                    consulta={consulta}
                    onVisualizar={handleVisualizarConsulta}
                    onCancelar={tabValue === 0 ? handleCancelarConsulta : undefined}
                    onReagendar={tabValue === 0 ? handleReagendarConsulta : undefined}
                  />
                </Grid>
              ))}
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
