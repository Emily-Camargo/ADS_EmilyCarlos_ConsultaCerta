// Interface para estatísticas gerais
export interface EstatisticasGerais {
  totalConsultas: number
  consultasAgendadas: number
  consultasConfirmadas: number
  consultasConcluidas: number
  consultasCanceladas: number
  taxaCancelamento: number
  taxaConclusao: number
  receitaTotal: number
  receitaMes: number
}

// Interface para estatísticas por período
export interface ConsultasPorPeriodo {
  periodo: string // "2024-01", "Semana 1", etc
  total: number
  agendadas: number
  concluidas: number
  canceladas: number
}

// Interface para estatísticas por médico
export interface EstatisticasMedico {
  idMedico: number
  nomeMedico: string
  especialidade: string
  totalConsultas: number
  consultasConcluidas: number
  consultasCanceladas: number
  taxaConclusao: number
  receitaGerada: number
  avaliacaoMedia?: number
}

// Interface para estatísticas por status
export interface ConsultasPorStatus {
  status: string
  quantidade: number
  percentual: number
  cor: string
}

// Interface para horários mais ocupados
export interface HorarioOcupacao {
  horario: string // "08:00", "09:00", etc
  quantidade: number
  percentualOcupacao: number
}

// Interface para estatísticas de pacientes
export interface EstatisticasPacientes {
  totalPacientes: number
  pacientesAtivos: number // Pacientes com consultas nos últimos 3 meses
  novosPacientes: number // Pacientes cadastrados no mês
  pacientesRecorrentes: number // Pacientes com mais de 1 consulta
  mediaConsultasPorPaciente: number
}

// Interface para tempo médio
export interface TempoMedio {
  tempoMedioAtendimento: number // em minutos
  tempoMedioEspera: number // em minutos
  tempoMedioConfirmacao: number // em horas
}

// Interface para dashboard de desempenho
export interface DashboardDesempenho {
  periodo: string
  metaCumprida: boolean
  metaConsultas: number
  consultasRealizadas: number
  percentualMeta: number
}

// Interface para tendências
export interface Tendencia {
  mes: string
  valor: number
  variacao: number // percentual em relação ao mês anterior
}

// Interface para dados consolidados do dashboard
export interface DadosDashboard {
  estatisticasGerais: EstatisticasGerais
  consultasPorPeriodo: ConsultasPorPeriodo[]
  estatisticasMedicos: EstatisticasMedico[]
  consultasPorStatus: ConsultasPorStatus[]
  horariosOcupacao: HorarioOcupacao[]
  estatisticasPacientes: EstatisticasPacientes
  tempoMedio: TempoMedio
  tendencias: Tendencia[]
}

// Interface para filtros do dashboard
export interface FiltrosDashboard {
  dataInicio?: string
  dataFim?: string
  idMedico?: number
  especialidade?: string
  status?: string
}

