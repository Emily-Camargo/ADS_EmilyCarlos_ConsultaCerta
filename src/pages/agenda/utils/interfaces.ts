import { Updater } from 'use-immer'
import { AgendaRes } from '../../../services/medico/interface'

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

export const mapearAgendaResParaHorarioAtendimento = (agendaRes: AgendaRes): HorarioAtendimento => {
  return {
    id_horario: agendaRes.idHorario,
    id_medico: agendaRes.idMedico,
    dia_semana: agendaRes.diaSemana,
    hora_inicio: agendaRes.horaInicio,
    hora_fim: agendaRes.horaFim,
    intervalo_minutos: agendaRes.intervaloMinutos,
    almoco_inicio: agendaRes.almocoInicio,
    almoco_fim: agendaRes.almocoFim,
    data_vigencia_inicio: agendaRes.dataVigenciaInicio,
    data_vigencia_fim: agendaRes.dataVigenciaFim,
    ativo: agendaRes.ativo,
    criado_em: agendaRes.criadoEm,
    atualizado_em: agendaRes.atualizadoEm,
    nome_medico: agendaRes.nomeMedico,
    especialidade: agendaRes.nomeEspecialidade,
    crm: '',
  }
}

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

export interface DataReqAgenda {
  idMedico: number | null
  dataInicio: string
  dataFim: string
}

export interface InputsPropsAgenda {
  data: DataReqAgenda
  setData: Updater<DataReqAgenda>
}

export interface TabelaHorariosProps {
  horarios: HorarioAtendimento[]
  isLoading?: boolean
  editarHorario: (horario: HorarioAtendimento) => void
  detalhesHorario: (horario: HorarioAtendimento) => void
}

export interface TabelaBloqueiosProps {
  bloqueios: BloqueioAgenda[]
  isLoading?: boolean
  editarBloqueio: (bloqueio: BloqueioAgenda) => void
  detalhesBloqueio?: (bloqueio: BloqueioAgenda) => void
  removerBloqueio: (bloqueio: BloqueioAgenda) => void
}

export interface CadastrarHorarioProps {
  modal: boolean
  setModal: (open: boolean) => void
  onConfirmar?: (horario: Omit<HorarioAtendimento, 'id_horario' | 'criado_em' | 'atualizado_em'>) => void
  horarioParaEditar?: HorarioAtendimento | null
  modoVisualizacao?: boolean
  isLoadingDetalhes?: boolean
}

export interface BloqueioAgendaProps {
  modal: boolean
  setModal: (open: boolean) => void
  onConfirmar: (bloqueio: Omit<BloqueioAgenda, 'id_bloqueio' | 'criado_em'>) => void
  bloqueioParaEditar?: BloqueioAgenda | null
  modoVisualizacao?: boolean
}

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

export interface BloqueioForm {
  id_medico: number
  data_inicio: string
  data_fim: string
  motivo: string
  tipo_bloqueio: string
  criado_por: number
}

export interface ColunasHorariosProps {
  editarHorario: (row: HorarioAtendimento) => void
  detalhesHorario: (row: HorarioAtendimento) => void
}

export interface ColunasBloqueiosProps {
  editarBloqueio: (row: BloqueioAgenda) => void
  detalhesBloqueio?: (row: BloqueioAgenda) => void
  removerBloqueio: (row: BloqueioAgenda) => void
}

export interface Medico {
  id_medico: number
  nome_medico: string
  especialidade: string
  crm: string
  ativo: boolean
}

export interface SelectOption {
  value: string | number
  label: string
}


export interface LinhaExpandidaProps {
  data: HorarioAtendimento
  editarBloqueio?: (bloqueio: BloqueioAgenda) => void
  detalhesBloqueio?: (bloqueio: BloqueioAgenda) => void
  removerBloqueio?: (bloqueio: BloqueioAgenda) => void
}