// Dados iniciais para o filtro de relatórios
export interface RelatoriosFiltro {
  dataInicio: string
  dataFim: string
}

export const relatoriosFil: RelatoriosFiltro = {
  dataInicio: '',
  dataFim: '',
}

// Cores para os diferentes status de consultas
export const CORES_STATUS = {
  agendada: '#3B82F6',
  confirmada: '#8B5CF6',
  concluída: '#10B981',
  concluida: '#10B981',
  cancelada: '#EF4444',
  reagendada: '#F59E0B',
} as const

// Opções de período para filtros
export const OPCOES_PERIODO = [
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '60', label: 'Últimos 60 dias' },
  { value: '90', label: 'Últimos 90 dias' },
  { value: '180', label: 'Últimos 6 meses' },
  { value: '365', label: 'Último ano' },
] as const

// Configurações de cores para os cards de estatísticas
export const CORES_CARDS = {
  consultas: {
    icon: '#3B82F6',
    bg: '#DBEAFE',
  },
  concluidas: {
    icon: '#10B981',
    bg: '#D1FAE5',
  },
  canceladas: {
    icon: '#EF4444',
    bg: '#FEE2E2',
  },
  pacientes: {
    icon: '#8B5CF6',
    bg: '#EDE9FE',
  },
  receita: {
    icon: '#059669',
    bg: '#D1FAE5',
  },
} as const

// Meses do ano para formatação
export const MESES = [
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
] as const

// Configurações de taxa de conclusão (para cores no gráfico)
export const TAXA_CONFIG = {
  excelente: 80, // >= 80% = verde
  boa: 60, // >= 60% = amarelo
  // < 60% = vermelho
} as const

