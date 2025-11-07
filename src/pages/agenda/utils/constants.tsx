import { BloquearAgendaRes } from '../../../services/medico/interface'
import { HorarioForm, BloqueioForm, SelectOption, BloqueioAgenda } from './interfaces'

export const initialHorarioForm: HorarioForm = {
  id_medico: 0,
  dia_semana: 0,
  hora_inicio: '',
  hora_fim: '',
  intervalo_minutos: 30,
  almoco_inicio: '',
  almoco_fim: '',
  data_vigencia_inicio: '',
  data_vigencia_fim: '',
  ativo: true,
}

export const initialBloqueioForm: BloqueioForm = {
  id_medico: 0,
  data_inicio: '',
  data_fim: '',
  motivo: '',
  tipo_bloqueio: 'FERIAS',
  criado_por: 1,
}

export const diasSemanaOptions: SelectOption[] = [
  { value: 1, label: 'Segunda-feira' },
  { value: 2, label: 'Terça-feira' },
  { value: 3, label: 'Quarta-feira' },
  { value: 4, label: 'Quinta-feira' },
  { value: 5, label: 'Sexta-feira' },
]

export const intervalosOptions: SelectOption[] = [
  { value: 15, label: '15 minutos' },
  { value: 20, label: '20 minutos' },
  { value: 30, label: '30 minutos' },
  { value: 45, label: '45 minutos' },
  { value: 60, label: '1 hora' },
]

export const tiposBloqueioOptions: SelectOption[] = [
  { value: 'FERIAS', label: 'Férias' },
  { value: 'LICENCA', label: 'Licença' },
  { value: 'CONGRESSO', label: 'Congresso' },
  { value: 'EMERGENCIA', label: 'Emergência' },
  { value: 'MANUTENCAO', label: 'Manutenção' },
  { value: 'OUTROS', label: 'Outros' },
]

export const statusOptions: SelectOption[] = [
  { value: '', label: 'Todos' },
  { value: 'true', label: 'Ativo' },
  { value: 'false', label: 'Inativo' },
]

export const getNomeDiaSemana = (dia: number): string => {
  const diasMap: { [key: number]: string } = {
    0: 'Domingo',
    1: 'Segunda-feira',
    2: 'Terça-feira',
    3: 'Quarta-feira',
    4: 'Quinta-feira',
    5: 'Sexta-feira',
    6: 'Sábado',
  }
  return diasMap[dia] || 'Desconhecido'
}

export const formatarHorario = (horario: string): string => {
  if (!horario) return '--'
  return horario.substring(0, 5)
}

export const formatarData = (data: string): string => {
  if (!data) return '--'
  return new Date(data).toLocaleDateString('pt-BR')
}

export const formatarDataHora = (dataHora: string): string => {
  if (!dataHora) return '--'
  return new Date(dataHora).toLocaleString('pt-BR')
}

export const mapearBloqueioRes = (bloqueioRes: BloquearAgendaRes): BloqueioAgenda => {
  return {
    id_bloqueio: bloqueioRes.idBloqueio,
    id_medico: bloqueioRes.idMedico,
    data_inicio: bloqueioRes.dataInicio,
    data_fim: bloqueioRes.dataFim,
    motivo: bloqueioRes.motivo,
    tipo_bloqueio: bloqueioRes.tipoBloqueio,
    criado_por: bloqueioRes.criadoPor,
    criado_em: bloqueioRes.criadoEm,
    nome_medico: bloqueioRes.nomeMedico,
    nome_criado_por: bloqueioRes.nomeCriadoPor,
  }
}