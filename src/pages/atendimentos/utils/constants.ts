// Removido imports de mocks - agora usando dados da API

export const STATUS_COLORS = {
  'Agendada': '#3b82f6',
  'Confirmada': '#8b5cf6',
  'Em andamento': '#f59e0b',
  'Em atendimento': '#f59e0b',
  'Concluída': '#10b981',
  'Concluida': '#10b981',
  'Não compareceu': '#ef4444',
  'Cancelada': '#ef4444',
  'default': '#6b7280'
}

export const STATUS_GRADIENTS = {
  'Agendada': 'linear-gradient(90deg, #3b82f6, #1d4ed8, #1e40af)',
  'Confirmada': 'linear-gradient(90deg, #8b5cf6, #7c3aed, #6d28d9)',
  'Em andamento': 'linear-gradient(90deg, #f59e0b, #f97316, #ea580c)',
  'Em atendimento': 'linear-gradient(90deg, #f59e0b, #f97316, #ea580c)',
  'Concluída': 'linear-gradient(90deg, #10b981, #059669, #047857)',
  'Concluida': 'linear-gradient(90deg, #10b981, #059669, #047857)',
  'Não compareceu': 'linear-gradient(90deg, #ef4444, #dc2626, #b91c1c)',
  'Cancelada': 'linear-gradient(90deg, #ef4444, #dc2626, #b91c1c)',
  'default': 'linear-gradient(90deg, #6b7280, #4b5563, #374151)'
}

export const STATUS_BACKGROUNDS = {
  'Agendada': 'rgba(59, 130, 246, 0.1)',
  'Confirmada': 'rgba(139, 92, 246, 0.1)',
  'Em andamento': 'rgba(245, 158, 11, 0.1)',
  'Em atendimento': 'rgba(245, 158, 11, 0.1)',
  'Concluída': 'rgba(16, 185, 129, 0.1)',
  'Concluida': 'rgba(16, 185, 129, 0.1)',
  'Não compareceu': 'rgba(239, 68, 68, 0.1)',
  'Cancelada': 'rgba(239, 68, 68, 0.1)',
  'default': 'rgba(107, 114, 128, 0.1)'
}

export const STATUS_BORDERS = {
  'Agendada': 'rgba(59, 130, 246, 0.2)',
  'Confirmada': 'rgba(139, 92, 246, 0.2)',
  'Em andamento': 'rgba(245, 158, 11, 0.2)',
  'Em atendimento': 'rgba(245, 158, 11, 0.2)',
  'Concluída': 'rgba(16, 185, 129, 0.2)',
  'Concluida': 'rgba(16, 185, 129, 0.2)',
  'Não compareceu': 'rgba(239, 68, 68, 0.2)',
  'Cancelada': 'rgba(239, 68, 68, 0.2)',
  'default': 'rgba(107, 114, 128, 0.2)'
}

export const STATUS_TEXT_COLORS = {
  'Agendada': '#1d4ed8',
  'Confirmada': '#7c3aed',
  'Em andamento': '#d97706',
  'Em atendimento': '#d97706',
  'Concluída': '#047857',
  'Concluida': '#047857',
  'Não compareceu': '#dc2626',
  'Cancelada': '#dc2626',
  'default': '#374151'
}

export type StatusType = keyof typeof STATUS_COLORS;

export const getStatusColor = (status: string): string => 
  STATUS_COLORS[status as StatusType] || STATUS_COLORS.default;

export const getStatusGradient = (status: string): string => 
  STATUS_GRADIENTS[status as StatusType] || STATUS_GRADIENTS.default;

export const getStatusBackground = (status: string): string => 
  STATUS_BACKGROUNDS[status as StatusType] || STATUS_BACKGROUNDS.default;

export const getStatusBorder = (status: string): string => 
  STATUS_BORDERS[status as StatusType] || STATUS_BORDERS.default;

export const getStatusTextColor = (status: string): string => 
  STATUS_TEXT_COLORS[status as StatusType] || STATUS_TEXT_COLORS.default;

