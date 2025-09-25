import { HorarioForm, BloqueioForm, SelectOption } from './interfaces'

// Formulário inicial para horários
export const initialHorarioForm: HorarioForm = {
  id_medico: 0,
  dia_semana: 1,
  hora_inicio: '08:00',
  hora_fim: '17:00',
  intervalo_minutos: 30,
  almoco_inicio: '12:00',
  almoco_fim: '13:00',
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

// Opções para dias da semana
export const diasSemanaOptions: SelectOption[] = [
  { value: 1, label: 'Segunda-feira' },
  { value: 2, label: 'Terça-feira' },
  { value: 3, label: 'Quarta-feira' },
  { value: 4, label: 'Quinta-feira' },
  { value: 5, label: 'Sexta-feira' },
]

// Opções para intervalos de consulta
export const intervalosOptions: SelectOption[] = [
  { value: 15, label: '15 minutos' },
  { value: 20, label: '20 minutos' },
  { value: 30, label: '30 minutos' },
  { value: 45, label: '45 minutos' },
  { value: 60, label: '1 hora' },
]

// Opções para tipos de bloqueio
export const tiposBloqueioOptions: SelectOption[] = [
  { value: 'FERIAS', label: 'Férias' },
  { value: 'LICENCA', label: 'Licença' },
  { value: 'CONGRESSO', label: 'Congresso' },
  { value: 'EMERGENCIA', label: 'Emergência' },
  { value: 'MANUTENCAO', label: 'Manutenção' },
  { value: 'OUTROS', label: 'Outros' },
]

// Opções para status ativo/inativo
export const statusOptions: SelectOption[] = [
  { value: '', label: 'Todos' },
  { value: 'true', label: 'Ativo' },
  { value: 'false', label: 'Inativo' },
]

// Função para obter o nome do dia da semana
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

// Função para formatar horário
export const formatarHorario = (horario: string): string => {
  if (!horario) return '--'
  return horario.substring(0, 5)
}

// Função para formatar data
export const formatarData = (data: string): string => {
  if (!data) return '--'
  return new Date(data).toLocaleDateString('pt-BR')
}

// Função para formatar data e hora
export const formatarDataHora = (dataHora: string): string => {
  if (!dataHora) return '--'
  return new Date(dataHora).toLocaleString('pt-BR')
}
