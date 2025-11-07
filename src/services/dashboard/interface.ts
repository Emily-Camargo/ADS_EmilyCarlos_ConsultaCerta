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

export interface ConsultasPorPeriodo {
  periodo: string
  total: number
  agendadas: number
  concluidas: number
  canceladas: number
}

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

export interface ConsultasPorStatus {
  status: string
  quantidade: number
  percentual: number
  cor: string
}

export interface HorarioOcupacao {
  horario: string
  quantidade: number
  percentualOcupacao: number
}

export interface EstatisticasPacientes {
  totalPacientes: number
  pacientesAtivos: number
  novosPacientes: number
  pacientesRecorrentes: number
  mediaConsultasPorPaciente: number
}

export interface TempoMedio {
  tempoMedioAtendimento: number
  tempoMedioEspera: number
  tempoMedioConfirmacao: number
}

export interface Tendencia {
  mes: string
  valor: number
  variacao: number
}

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

export interface DashboardReq {
  dataInicio?: string
  dataFim?: string
  idMedico?: number
  especialidade?: string
  status?: string
}

