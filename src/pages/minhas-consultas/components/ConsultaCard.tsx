import React from 'react'
import { Card, CardContent, Typography, Box, Chip, IconButton, Tooltip } from '@mui/material'
import { 
  MdCalendarToday, 
  MdAccessTime, 
  MdPerson, 
  MdLocalHospital,
  MdVisibility,
  MdCancel,
  MdSchedule,
  MdVerified,
  MdInfo
} from 'react-icons/md'
import { ConsultaCardProps } from '../utils/interfaces'
import { getStatusColor } from '../../home/utils/constants'
import { formatarDataHora, getStatusIcon, getStatusText } from '../utils/constants'

const ConsultaCard: React.FC<ConsultaCardProps> = ({ 
  consulta, 
  onVisualizar, 
  onCancelar, 
  onReagendar 
}) => {

  const { data, hora } = formatarDataHora(consulta.data_hora)
  const statusColor = getStatusColor(getStatusText(consulta.status))

  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease-in-out',
        backgroundColor: '#ffffff',
        '&:hover': {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Cabeçalho do Card */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              backgroundColor: consulta.status === 'concluida' ? '#dcfce7' : 
                            consulta.status === 'agendada' ? '#fef9c3' : 
                            consulta.status === 'cancelada' ? '#fee2e2' : '#f0f9ff',
              p: 0.75,
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center'
            }}>
              {getStatusIcon(consulta.status)}
            </Box>
            <Chip 
              label={getStatusText(consulta.status)}
              color={statusColor}
              size="small"
              sx={{ 
                fontWeight: '600', 
                fontSize: '0.75rem',
                height: '24px'
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {onVisualizar && (
              <Tooltip title="Visualizar detalhes" arrow>
                <IconButton 
                  size="small" 
                  onClick={() => onVisualizar(consulta)}
                  sx={{ 
                    color: '#1e40af',
                    backgroundColor: '#eff6ff',
                    p: 0.5,
                    '&:hover': { backgroundColor: '#dbeafe' }
                  }}
                >
                  <MdVisibility size={16} />
                </IconButton>
              </Tooltip>
            )}
            
            {consulta.status === 'agendada' && onCancelar && (
              <Tooltip title="Cancelar consulta" arrow>
                <IconButton 
                  size="small" 
                  onClick={() => onCancelar(consulta)}
                  sx={{ 
                    color: '#dc2626',
                    backgroundColor: '#fef2f2',
                    p: 0.5,
                    '&:hover': { backgroundColor: '#fee2e2' }
                  }}
                >
                  <MdCancel size={16} />
                </IconButton>
              </Tooltip>
            )}
            
            {consulta.status === 'agendada' && onReagendar && (
              <Tooltip title="Reagendar consulta" arrow>
                <IconButton 
                  size="small" 
                  onClick={() => onReagendar(consulta)}
                  sx={{ 
                    color: '#d97706',
                    backgroundColor: '#fefce8',
                    p: 0.5,
                    '&:hover': { backgroundColor: '#fef9c3' }
                  }}
                >
                  <MdSchedule size={16} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        {/* Informações do Médico */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            <MdPerson size={16} color="#1e40af" />
            <Typography variant="subtitle1" sx={{ 
              fontWeight: '600', 
              color: '#1e293b', 
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}>
              {consulta.medico.nome_medico}
              <Tooltip title="Médico verificado" arrow>
                <Box component="span">
                  <MdVerified size={14} color="#0284c7" />
                </Box>
              </Tooltip>
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ 
            color: '#64748b', 
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            ml: 0.25
          }}>
            <MdLocalHospital size={14} color="#64748b" />
            {consulta.medico.especialidade} • CRM {consulta.medico.crm}
          </Typography>
        </Box>

        {/* Data e Hora */}
        <Box sx={{ 
          backgroundColor: '#f8fafc',
          borderRadius: '6px',
          p: 1.5,
          mb: 2,
          display: 'flex',
          gap: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <MdCalendarToday size={16} color="#0284c7" />
            <Typography sx={{ color: '#334155', fontSize: '0.75rem', fontWeight: '500' }}>
              {data}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <MdAccessTime size={16} color="#0284c7" />
            <Typography sx={{ color: '#334155', fontSize: '0.75rem', fontWeight: '500' }}>
              {hora}
            </Typography>
          </Box>
        </Box>

        {/* Observações */}
        {consulta.observacoes && (
          <Box sx={{ 
            display: 'flex',
            gap: 0.5,
            mb: 2
          }}>
            <MdInfo size={16} color="#64748b" style={{ marginTop: '2px' }} />
            <Typography variant="body2" sx={{ 
              color: '#64748b', 
              fontSize: '0.75rem',
              fontStyle: 'italic'
            }}>
              {consulta.observacoes}
            </Typography>
          </Box>
        )}

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end',
          mt: 'auto',
          pt: 1.5,
          borderTop: '1px solid #e2e8f0'
        }}>
          <Box>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
              Valor da Consulta
            </Typography>
            <Typography sx={{ color: '#0f172a', fontWeight: '600', fontSize: '0.875rem' }}>
              R$ {consulta.valor_consulta.toFixed(2).replace('.', ',')}
            </Typography>
          </Box>
          
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>
            {new Date(consulta.criado_em).toLocaleDateString('pt-BR')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ConsultaCard
