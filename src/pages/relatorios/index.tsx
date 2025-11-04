import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material'
import {
  MdEventNote,
  MdCheckCircle,
  MdCancel,
  MdPeople,
  MdAttachMoney,
} from 'react-icons/md'
import { useDimension } from '../../hooks'
import { useAuth } from '../../contexts/AuthContext'
import { postBuscarConsultas } from '../../services/consultas'
import { ConsultaRes } from '../../services/consultas/interface'
import { toast } from 'react-toastify'
import Filtro from '../../components/filtro'
import { useImmer } from 'use-immer'
import { inputsRelatorios } from './components/filtro'
import { relatoriosFil } from './utils/constants'

// Componentes
import StatCard from './components/StatCard'
import ConsultasBarChart from './components/ConsultasBarChart'
import StatusPieChart from './components/StatusPieChart'
import MedicosTable from './components/MedicosTable'
import HorariosBarChart from './components/HorariosBarChart'

// Utils
import {
  calcularEstatisticasGerais,
  agruparConsultasPorPeriodo,
  calcularEstatisticasMedicos,
  agruparConsultasPorStatus,
  calcularOcupacaoPorHorario,
  calcularEstatisticasPacientes,
  formatarMoeda,
} from './utils/functions'

const Relatorios: React.FC = () => {
  const isMobile = useDimension(800)
  const { user } = useAuth()
  const [consultas, setConsultas] = useState<ConsultaRes[]>([])
  const [loading, setLoading] = useState(true)
  const [data, setData] = useImmer(relatoriosFil)

  const buscarDadosIniciais = async () => {
    try {
      setLoading(true)
      // Últimos 30 dias por padrão
      const dataFim = new Date()
      const dataInicio = new Date()
      dataInicio.setDate(dataInicio.getDate() - 30)

      const response = await postBuscarConsultas({
        dataInicio: dataInicio.toISOString().split('T')[0],
        dataFim: dataFim.toISOString().split('T')[0],
      })

      setConsultas(response.data)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      toast.error('Erro ao carregar dados dos relatórios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    buscarDadosIniciais()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!data.dataInicio || !data.dataFim) {
      toast.error('Preencha as datas inicial e final')
      return
    }

    try {
      setLoading(true)
      const response = await postBuscarConsultas({
        dataInicio: data.dataInicio,
        dataFim: data.dataFim,
      })

      setConsultas(response.data)
      toast.success('Relatório atualizado com sucesso')
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      toast.error('Erro ao carregar dados dos relatórios')
    } finally {
      setLoading(false)
    }
  }

  const limpar = () => {
    setData(() => relatoriosFil)
    buscarDadosIniciais()
  }

  // Cálculo de estatísticas
  const estatisticasGerais = calcularEstatisticasGerais(consultas)
  const consultasPorPeriodo = agruparConsultasPorPeriodo(consultas)
  const estatisticasMedicos = calcularEstatisticasMedicos(consultas)
  const consultasPorStatus = agruparConsultasPorStatus(consultas)
  const horariosOcupacao = calcularOcupacaoPorHorario(consultas)
  const estatisticasPacientes = calcularEstatisticasPacientes(consultas)

  return (
    <Box
      sx={{
        width: '100%',
        padding: isMobile ? 2 : 4,
        minHeight: '100vh',
        backgroundColor: '#F9FAFB',
      }}
    >
      {/* Filtro */}
      <Box sx={{ mb: 3 }}>
        <Filtro
          inputs={inputsRelatorios({ data, setData })}
          onSubmit={enviar}
          onClear={limpar}
        />
      </Box>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Total de Consultas"
            value={estatisticasGerais.totalConsultas}
            icon={MdEventNote}
            iconColor="#3B82F6"
            iconBgColor="#DBEAFE"
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Concluídas"
            value={estatisticasGerais.consultasConcluidas}
            subtitle={`${estatisticasGerais.taxaConclusao.toFixed(1)}% do total`}
            icon={MdCheckCircle}
            iconColor="#10B981"
            iconBgColor="#D1FAE5"
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Canceladas"
            value={estatisticasGerais.consultasCanceladas}
            subtitle={`${estatisticasGerais.taxaCancelamento.toFixed(1)}% do total`}
            icon={MdCancel}
            iconColor="#EF4444"
            iconBgColor="#FEE2E2"
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Total de Pacientes"
            value={estatisticasPacientes.totalPacientes}
            subtitle={`${estatisticasPacientes.pacientesAtivos} ativos`}
            icon={MdPeople}
            iconColor="#8B5CF6"
            iconBgColor="#EDE9FE"
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Receita Total"
            value={formatarMoeda(estatisticasGerais.receitaTotal)}
            subtitle={`${formatarMoeda(estatisticasGerais.receitaMes)} este mês`}
            icon={MdAttachMoney}
            iconColor="#059669"
            iconBgColor="#D1FAE5"
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Gráficos principais */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={8}>
          <ConsultasBarChart
            data={consultasPorPeriodo}
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <StatusPieChart data={consultasPorStatus} loading={loading} />
        </Grid>
      </Grid>

      {/* Estatísticas detalhadas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={6}>
          <HorariosBarChart data={horariosOcupacao} loading={loading} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              height: '100%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: '#1F2937',
                }}
              >
                Estatísticas de Pacientes
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: '#F3F4F6',
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: '#1F2937' }}
                    >
                      {estatisticasPacientes.totalPacientes}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total de Pacientes
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: '#F3F4F6',
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: '#10B981' }}
                    >
                      {estatisticasPacientes.pacientesAtivos}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pacientes Ativos
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: '#F3F4F6',
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: '#3B82F6' }}
                    >
                      {estatisticasPacientes.novosPacientes}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Novos este Mês
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: '#F3F4F6',
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: '#8B5CF6' }}
                    >
                      {estatisticasPacientes.mediaConsultasPorPaciente.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Média Consultas/Paciente
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabela de Médicos */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MedicosTable data={estatisticasMedicos} loading={loading} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Relatorios
