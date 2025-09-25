import { Updater } from 'use-immer'

// Interface para Horário de Atendimento
export interface HorarioAtendimento {
  id_horario: number
  id_medico: number
  dia_semana: number
  hora_inicio: string
  hora_fim: string
  intervalo_minutos: number
  almoco_inicio: string
  almoco_fim: string
  data_vigencia_inicio: string
  data_vigencia_fim: string
  ativo: boolean
  criado_em: string
  atualizado_em: string
  nome_medico?: string
  especialidade?: string
  crm?: string
}

// Interface para Bloqueio de Agenda
export interface BloqueioAgenda {
  id_bloqueio: number
  id_medico: number
  data_inicio: string
  data_fim: string
  motivo: string
  tipo_bloqueio: string
  criado_por: number
  criado_em: string
  nome_medico?: string
  nome_criado_por?: string
}

// Interface para dados de filtro da agenda
export interface DataReqAgenda {
  nomeMedico: string
  diaSemana: string
  dataInicio: string
  dataFim: string
  ativo: string
}

// Interface para props de inputs de filtro
export interface InputsPropsAgenda {
  data: DataReqAgenda
  setData: Updater<DataReqAgenda>
}

// Interface para props da tabela de horários
export interface TabelaHorariosProps {
  horarios: HorarioAtendimento[]
  isLoading?: boolean
  editarHorario: (horario: HorarioAtendimento) => void
  detalhesHorario: (horario: HorarioAtendimento) => void
  bloquearHorario: (horario: HorarioAtendimento) => void
}

// Interface para props da tabela de bloqueios
export interface TabelaBloqueiosProps {
  bloqueios: BloqueioAgenda[]
  isLoading?: boolean
  editarBloqueio: (bloqueio: BloqueioAgenda) => void
  detalhesBloqueio: (bloqueio: BloqueioAgenda) => void
  removerBloqueio: (bloqueio: BloqueioAgenda) => void
}

// Interface para props do modal de cadastro/edição de horários
export interface CadastrarHorarioProps {
  modal: boolean
  setModal: (open: boolean) => void
  onConfirmar: (horario: Omit<HorarioAtendimento, 'id_horario' | 'criado_em' | 'atualizado_em'>) => void
  horarioParaEditar?: HorarioAtendimento | null
  modoVisualizacao?: boolean
}

// Interface para props do modal de bloqueio
export interface BloqueioAgendaProps {
  modal: boolean
  setModal: (open: boolean) => void
  onConfirmar: (bloqueio: Omit<BloqueioAgenda, 'id_bloqueio' | 'criado_em'>) => void
  bloqueioParaEditar?: BloqueioAgenda | null
  modoVisualizacao?: boolean
}

// Interface para formulário de horário
export interface HorarioForm {
  id_medico: number
  dia_semana: number
  hora_inicio: string
  hora_fim: string
  intervalo_minutos: number
  almoco_inicio: string
  almoco_fim: string
  data_vigencia_inicio: string
  data_vigencia_fim: string
  ativo: boolean
}

// Interface para formulário de bloqueio
export interface BloqueioForm {
  id_medico: number
  data_inicio: string
  data_fim: string
  motivo: string
  tipo_bloqueio: string
  criado_por: number
}

// Interface para props das colunas da tabela de horários
export interface ColunasHorariosProps {
  editarHorario: (row: HorarioAtendimento) => void
  detalhesHorario: (row: HorarioAtendimento) => void
}

export interface ColunasBloqueiosProps {
  editarBloqueio: (row: BloqueioAgenda) => void
  detalhesBloqueio: (row: BloqueioAgenda) => void
  removerBloqueio: (row: BloqueioAgenda) => void
}

// Interface para médico (para seleção)
export interface Medico {
  id_medico: number
  nome_medico: string
  especialidade: string
  crm: string
  ativo: boolean
}

// Opções para selects
export interface SelectOption {
  value: string | number
  label: string
}
