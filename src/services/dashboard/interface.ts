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
  periodo: string
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
  horario: string
  quantidade: number
  percentualOcupacao: number
}

// Interface para estatísticas de pacientes
export interface EstatisticasPacientes {
  totalPacientes: number
  pacientesAtivos: number
  novosPacientes: number
  pacientesRecorrentes: number
  mediaConsultasPorPaciente: number
}

// Interface para tempo médio
export interface TempoMedio {
  tempoMedioAtendimento: number
  tempoMedioEspera: number
  tempoMedioConfirmacao: number
}

// Interface para tendências
export interface Tendencia {
  mes: string
  valor: number
  variacao: number
}

// Interface para resposta do dashboard
export interface DashboardRes {
  estatisticasGerais: EstatisticasGerais
  consultasPorPeriodo: ConsultasPorPeriodo[]
  estatisticasMedicos: EstatisticasMedico[]
  consultasPorStatus: ConsultasPorStatus[]
  horariosOcupacao: HorarioOcupacao[]
  estatisticasPacientes: EstatisticasPacientes
  tempoMedio: TempoMedio
  tendencias: Tendencia[]
}

// Interface para filtros do dashboard (requisição)
export interface DashboardReq {
  dataInicio?: string
  dataFim?: string
  idMedico?: number
  especialidade?: string
  status?: string
}

