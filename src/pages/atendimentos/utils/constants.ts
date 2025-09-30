export const STATUS_COLORS = {
  'Em Andamento': '#f59e0b',
  'Aguardando': '#3b82f6',
  'Confirmada': '#3b82f6',
  'Concluída': '#10b981',
  'Não Compareceu': '#ef4444',
  'default': '#6b7280'
}

export const STATUS_GRADIENTS = {
  'Em Andamento': 'linear-gradient(90deg, #f59e0b, #f97316, #ef4444)',
  'Aguardando': 'linear-gradient(90deg, #3b82f6, #1d4ed8, #1e40af)',
  'Confirmada': 'linear-gradient(90deg, #3b82f6, #1d4ed8, #1e40af)',
  'Concluída': 'linear-gradient(90deg, #10b981, #059669, #047857)',
  'Não Compareceu': 'linear-gradient(90deg, #ef4444, #dc2626, #b91c1c)',
  'default': 'linear-gradient(90deg, #6b7280, #4b5563, #374151)'
}

export const STATUS_BACKGROUNDS = {
  'Em Andamento': 'rgba(245, 158, 11, 0.1)',
  'Aguardando': 'rgba(59, 130, 246, 0.1)',
  'Confirmada': 'rgba(59, 130, 246, 0.1)',
  'Não Compareceu': 'rgba(239, 68, 68, 0.1)',
  'default': 'rgba(107, 114, 128, 0.1)'
}

export const STATUS_BORDERS = {
  'Em Andamento': 'rgba(245, 158, 11, 0.2)',
  'Aguardando': 'rgba(59, 130, 246, 0.2)',
  'Confirmada': 'rgba(59, 130, 246, 0.2)',
  'Não Compareceu': 'rgba(239, 68, 68, 0.2)',
  'default': 'rgba(107, 114, 128, 0.2)'
}

export const STATUS_TEXT_COLORS = {
  'Em Andamento': '#d97706',
  'Aguardando': '#1d4ed8',
  'Confirmada': '#1d4ed8',
  'Não Compareceu': '#dc2626',
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
