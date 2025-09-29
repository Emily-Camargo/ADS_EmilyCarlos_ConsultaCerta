import React from 'react'
import { Card, CardContent, Typography, Box, Chip, IconButton } from '@mui/material'
import { 
  MdCalendarToday, 
  MdAccessTime, 
  MdPerson, 
  MdLocalHospital,
  MdVisibility,
  MdCancel,
  MdSchedule
} from 'react-icons/md'
import { ConsultaCardProps } from '../utils/interfaces'
import { getStatusColor } from '../../home/utils/constants'

const ConsultaCard: React.FC<ConsultaCardProps> = ({ 
  consulta, 
  onVisualizar, 
  onCancelar, 
  onReagendar 
}) => {
  const formatarDataHora = (dataHora: string) => {
    const data = new Date(dataHora)
    return {
      data: data.toLocaleDateString('pt-BR'),
      hora: data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'agendada':
        return 'Agendada'
      case 'confirmada':
        return 'Confirmada'
      case 'concluida':
        return 'Concluída'
      case 'cancelada':
        return 'Cancelada'
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agendada':
        return <MdSchedule size={16} />
      case 'confirmada':
        return <MdCalendarToday size={16} />
      case 'concluida':
        return <MdLocalHospital size={16} />
      case 'cancelada':
        return <MdCancel size={16} />
      default:
        return <MdCalendarToday size={16} />
    }
  }

  const { data, hora } = formatarDataHora(consulta.data_hora)
  const statusColor = getStatusColor(getStatusText(consulta.status))

  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {getStatusIcon(consulta.status)}
            <Chip 
              label={getStatusText(consulta.status)}
              color={statusColor}
              size="small"
              sx={{ fontWeight: '600', fontSize: '0.75rem' }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {onVisualizar && (
              <IconButton 
                size="small" 
                onClick={() => onVisualizar(consulta)}
                sx={{ 
                  color: '#64748b',
                  '&:hover': { color: '#1e40af' },
                  p: 0.5
                }}
              >
                <MdVisibility size={16} />
              </IconButton>
            )}
            
            {consulta.status === 'agendada' && onCancelar && (
              <IconButton 
                size="small" 
                onClick={() => onCancelar(consulta)}
                sx={{ 
                  color: '#64748b',
                  '&:hover': { color: '#dc2626' },
                  p: 0.5
                }}
              >
                <MdCancel size={16} />
              </IconButton>
            )}
            
            {consulta.status === 'agendada' && onReagendar && (
              <IconButton 
                size="small" 
                onClick={() => onReagendar(consulta)}
                sx={{ 
                  color: '#64748b',
                  '&:hover': { color: '#d97706' },
                  p: 0.5
                }}
              >
                <MdSchedule size={16} />
              </IconButton>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <MdPerson size={16} color="#64748b" />
          <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>
            {consulta.medico.nome_medico}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <MdLocalHospital size={16} color="#64748b" />
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.8rem' }}>
            {consulta.medico.especialidade}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <MdCalendarToday size={16} color="#64748b" />
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.8rem' }}>
            {data}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
          <MdAccessTime size={16} color="#64748b" />
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.8rem' }}>
            {hora}
          </Typography>
        </Box>

        {consulta.observacoes && (
          <Box sx={{ 
            backgroundColor: '#f8fafc', 
            p: 1.5, 
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
            mb: 1.5
          }}>
            <Typography variant="body2" sx={{ color: '#64748b', fontStyle: 'italic', fontSize: '0.75rem' }}>
              "{consulta.observacoes}"
            </Typography>
          </Box>
        )}

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mt: 'auto',
          pt: 1.5,
          borderTop: '1px solid #e2e8f0'
        }}>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '600' }}>
            R$ {consulta.valor_consulta.toFixed(2).replace('.', ',')}
          </Typography>
          
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>
            {new Date(consulta.criado_em).toLocaleDateString('pt-BR')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ConsultaCard
