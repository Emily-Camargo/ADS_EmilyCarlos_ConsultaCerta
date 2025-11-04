import { ConsultaRes } from '../../../services/consultas/interface'
import {
  EstatisticasGerais,
  ConsultasPorPeriodo,
  EstatisticasMedico,
  ConsultasPorStatus,
  HorarioOcupacao,
  EstatisticasPacientes,
} from './interfaces'

// Formata valores monetários
export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

// Formata percentuais
export const formatarPercentual = (valor: number): string => {
  return `${valor.toFixed(1)}%`
}

// Calcula estatísticas gerais a partir das consultas
export const calcularEstatisticasGerais = (
  consultas: ConsultaRes[],
): EstatisticasGerais => {
  const totalConsultas = consultas.length
  const consultasAgendadas = consultas.filter(
    (c) => c.status.toLowerCase() === 'agendada',
  ).length
  const consultasConfirmadas = consultas.filter(
    (c) => c.status.toLowerCase() === 'confirmada',
  ).length
  const consultasConcluidas = consultas.filter(
    (c) => c.status.toLowerCase() === 'concluída' || c.status.toLowerCase() === 'concluida',
  ).length
  const consultasCanceladas = consultas.filter(
    (c) => c.status.toLowerCase() === 'cancelada',
  ).length

  const taxaCancelamento =
    totalConsultas > 0 ? (consultasCanceladas / totalConsultas) * 100 : 0
  const taxaConclusao =
    totalConsultas > 0 ? (consultasConcluidas / totalConsultas) * 100 : 0

  const receitaTotal = consultas
    .filter((c) => c.status.toLowerCase() === 'concluída' || c.status.toLowerCase() === 'concluida')
    .reduce((acc, c) => acc + (c.valorConsulta || 0), 0)

  const dataAtual = new Date()
  const primeiroDiaMes = new Date(
    dataAtual.getFullYear(),
    dataAtual.getMonth(),
    1,
  )
  const receitaMes = consultas
    .filter((c) => {
      const dataConsulta = new Date(c.dataHora)
      return (
        (c.status.toLowerCase() === 'concluída' || c.status.toLowerCase() === 'concluida') &&
        dataConsulta >= primeiroDiaMes
      )
    })
    .reduce((acc, c) => acc + (c.valorConsulta || 0), 0)

  return {
    totalConsultas,
    consultasAgendadas,
    consultasConfirmadas,
    consultasConcluidas,
    consultasCanceladas,
    taxaCancelamento,
    taxaConclusao,
    receitaTotal,
    receitaMes,
  }
}

// Agrupa consultas por período (mês)
export const agruparConsultasPorPeriodo = (
  consultas: ConsultaRes[],
): ConsultasPorPeriodo[] => {
  const consultasPorMes: { [key: string]: ConsultaRes[] } = {}

  consultas.forEach((consulta) => {
    const data = new Date(consulta.dataHora)
    const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`

    if (!consultasPorMes[mesAno]) {
      consultasPorMes[mesAno] = []
    }
    consultasPorMes[mesAno].push(consulta)
  })

  return Object.entries(consultasPorMes)
    .map(([periodo, consultasPeriodo]) => ({
      periodo,
      total: consultasPeriodo.length,
      agendadas: consultasPeriodo.filter(
        (c) => c.status.toLowerCase() === 'agendada',
      ).length,
      concluidas: consultasPeriodo.filter(
        (c) => c.status.toLowerCase() === 'concluída' || c.status.toLowerCase() === 'concluida',
      ).length,
      canceladas: consultasPeriodo.filter(
        (c) => c.status.toLowerCase() === 'cancelada',
      ).length,
    }))
    .sort((a, b) => a.periodo.localeCompare(b.periodo))
}

// Calcula estatísticas por médico
export const calcularEstatisticasMedicos = (
  consultas: ConsultaRes[],
): EstatisticasMedico[] => {
  const consultasPorMedico: { [key: number]: ConsultaRes[] } = {}

  consultas.forEach((consulta) => {
    const idMedico = consulta.idMedico
    if (!consultasPorMedico[idMedico]) {
      consultasPorMedico[idMedico] = []
    }
    consultasPorMedico[idMedico].push(consulta)
  })

  return Object.entries(consultasPorMedico).map(
    ([idMedico, consultasMedico]) => {
      const totalConsultas = consultasMedico.length
      const consultasConcluidas = consultasMedico.filter(
        (c) => c.status.toLowerCase() === 'concluída' || c.status.toLowerCase() === 'concluida',
      ).length
      const consultasCanceladas = consultasMedico.filter(
        (c) => c.status.toLowerCase() === 'cancelada',
      ).length
      const taxaConclusao =
        totalConsultas > 0 ? (consultasConcluidas / totalConsultas) * 100 : 0
      const receitaGerada = consultasMedico
        .filter((c) => c.status.toLowerCase() === 'concluída' || c.status.toLowerCase() === 'concluida')
        .reduce((acc, c) => acc + (c.valorConsulta || 0), 0)

      // Pega os dados do primeiro registro do médico
      const primeiraConsulta = consultasMedico[0]

      return {
        idMedico: parseInt(idMedico),
        nomeMedico: primeiraConsulta.medico.nome,
        especialidade: primeiraConsulta.medico.especialidade || 'Não especificada',
        totalConsultas,
        consultasConcluidas,
        consultasCanceladas,
        taxaConclusao,
        receitaGerada,
      }
    },
  ).sort((a, b) => b.totalConsultas - a.totalConsultas)
}

// Agrupa consultas por status
export const agruparConsultasPorStatus = (
  consultas: ConsultaRes[],
): ConsultasPorStatus[] => {
  const statusMap: { [key: string]: { quantidade: number; cor: string } } = {}
  const totalConsultas = consultas.length

  const coresStatus: { [key: string]: string } = {
    agendada: '#3B82F6',
    confirmada: '#8B5CF6',
    concluída: '#10B981',
    concluida: '#10B981',
    cancelada: '#EF4444',
    reagendada: '#F59E0B',
  }

  consultas.forEach((consulta) => {
    const status = consulta.status.toLowerCase()
    if (!statusMap[status]) {
      statusMap[status] = {
        quantidade: 0,
        cor: coresStatus[status] || '#6B7280',
      }
    }
    statusMap[status].quantidade++
  })

  return Object.entries(statusMap).map(([status, data]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    quantidade: data.quantidade,
    percentual: totalConsultas > 0 ? (data.quantidade / totalConsultas) * 100 : 0,
    cor: data.cor,
  }))
}

// Calcula ocupação por horário
export const calcularOcupacaoPorHorario = (
  consultas: ConsultaRes[],
): HorarioOcupacao[] => {
  const horarios: { [key: string]: number } = {}
  const totalDias = new Set<string>()

  consultas.forEach((consulta) => {
    const data = new Date(consulta.dataHora)
    const horario = `${String(data.getHours()).padStart(2, '0')}:00`
    const dia = data.toISOString().split('T')[0]

    totalDias.add(dia)

    if (!horarios[horario]) {
      horarios[horario] = 0
    }
    horarios[horario]++
  })

  const diasUnicos = totalDias.size || 1

  return Object.entries(horarios)
    .map(([horario, quantidade]) => ({
      horario,
      quantidade,
      percentualOcupacao: (quantidade / diasUnicos) * 10, // Assumindo 10 slots por hora
    }))
    .sort((a, b) => a.horario.localeCompare(b.horario))
}

// Calcula estatísticas de pacientes
export const calcularEstatisticasPacientes = (
  consultas: ConsultaRes[],
): EstatisticasPacientes => {
  const pacientesUnicos = new Set<number>()
  const consultasPorPaciente: { [key: number]: number } = {}
  const dataAtual = new Date()
  const tresMesesAtras = new Date(
    dataAtual.getFullYear(),
    dataAtual.getMonth() - 3,
    dataAtual.getDate(),
  )
  const primeiroDiaMes = new Date(
    dataAtual.getFullYear(),
    dataAtual.getMonth(),
    1,
  )

  const pacientesAtivosSet = new Set<number>()
  const novosPacientesSet = new Set<number>()

  consultas.forEach((consulta) => {
    const idPaciente = consulta.idPaciente
    pacientesUnicos.add(idPaciente)

    // Conta consultas por paciente
    if (!consultasPorPaciente[idPaciente]) {
      consultasPorPaciente[idPaciente] = 0
    }
    consultasPorPaciente[idPaciente]++

    // Pacientes ativos (últimos 3 meses)
    const dataConsulta = new Date(consulta.dataHora)
    if (dataConsulta >= tresMesesAtras) {
      pacientesAtivosSet.add(idPaciente)
    }

    // Novos pacientes (cadastrados neste mês - primeira consulta neste mês)
    if (dataConsulta >= primeiroDiaMes) {
      const consultasAnteriores = consultas.filter(
        (c) =>
          c.idPaciente === idPaciente &&
          new Date(c.dataHora) < primeiroDiaMes,
      )
      if (consultasAnteriores.length === 0) {
        novosPacientesSet.add(idPaciente)
      }
    }
  })

  const totalPacientes = pacientesUnicos.size
  const pacientesRecorrentes = Object.values(consultasPorPaciente).filter(
    (count) => count > 1,
  ).length
  const mediaConsultasPorPaciente =
    totalPacientes > 0
      ? consultas.length / totalPacientes
      : 0

  return {
    totalPacientes,
    pacientesAtivos: pacientesAtivosSet.size,
    novosPacientes: novosPacientesSet.size,
    pacientesRecorrentes,
    mediaConsultasPorPaciente,
  }
}

// Formata nome do mês
export const formatarNomeMes = (mesAno: string): string => {
  const [ano, mes] = mesAno.split('-')
  const meses = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ]
  return `${meses[parseInt(mes) - 1]}/${ano}`
}

// Calcula variação percentual
export const calcularVariacao = (valorAtual: number, valorAnterior: number): number => {
  if (valorAnterior === 0) return valorAtual > 0 ? 100 : 0
  return ((valorAtual - valorAnterior) / valorAnterior) * 100
}

