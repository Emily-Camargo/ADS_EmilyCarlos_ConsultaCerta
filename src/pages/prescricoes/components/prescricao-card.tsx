import React from 'react'
import { Card, CardContent, Typography, Box, Chip, IconButton, Tooltip } from '@mui/material'
import { 
  MdAccessTime,
  MdPerson,
  MdLocalHospital,
  MdVisibility,
  MdPrint,
  MdVerified,
  MdLocalPharmacy,
  MdWarning,
  MdCalendarToday
} from 'react-icons/md'
import { PrescricaoCardProps } from '../utils/interface'
import { formatarDataHora, formatarDataCriacao, verificarValidadeMedicamento } from '../utils/constants'

const PrescricaoCard: React.FC<PrescricaoCardProps> = ({ 
  prescricao, 
  onVisualizar,
  onImprimir
}) => {
  const { data, hora } = formatarDataHora(prescricao.dtaConsulta)
  const medicamentosControlados = prescricao.medicamentos.filter(m => m.controlado).length
  
  const menorValidade = prescricao.medicamentos.reduce((menor, med) => {
    const dataAtual = new Date(med.validade)
    const dataMenor = new Date(menor)
    return dataAtual < dataMenor ? med.validade : menor
  }, prescricao.medicamentos[0]?.validade || '')
  
  const statusValidade = verificarValidadeMedicamento(menorValidade)
  const dataCriacao = prescricao.medicamentos[0]?.dtaCriacao

  return (
    <Card 
      sx={{ 
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease-in-out',
        backgroundColor: '#ffffff',
        mb: 2.5,
        '&:hover': {
          boxShadow: '0 4px 12px -1px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Cabeçalho da Prescrição */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <Box sx={{ 
                backgroundColor: '#eff6ff',
                p: 0.75,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <MdLocalPharmacy size={22} color="#3b82f6" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ 
                  fontWeight: '700', 
                  color: '#1e293b',
                  fontSize: '1rem',
                  lineHeight: 1.3
                }}>
                  Consulta do dia {data}
                </Typography>
                <Typography sx={{ 
                  fontSize: '0.75rem', 
                  color: '#64748b',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  mt: 0.25
                }}>
                  <MdAccessTime size={14} />
                  {hora}
                </Typography>
              </Box>
            </Box>

            {/* Chips de informação */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1.5 }}>
              <Chip
                label={`${prescricao.medicamentos.length} ${prescricao.medicamentos.length === 1 ? 'medicamento' : 'medicamentos'}`}
                size="small"
                icon={<MdLocalPharmacy size={14} />}
                sx={{
                  height: '26px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  backgroundColor: '#f0fdf4',
                  color: '#16a34a',
                  border: '1px solid #bbf7d0',
                  '& .MuiChip-icon': {
                    color: '#16a34a'
                  }
                }}
              />
              {medicamentosControlados > 0 && (
                <Chip
                  label={`${medicamentosControlados} controlado${medicamentosControlados > 1 ? 's' : ''}`}
                  size="small"
                  icon={<MdWarning size={14} />}
                  sx={{
                    height: '26px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    border: '1px solid #fecaca',
                    '& .MuiChip-icon': {
                      color: '#dc2626'
                    }
                  }}
                />
              )}
              <Chip
                label={statusValidade.texto}
                size="small"
                icon={statusValidade.icone}
                sx={{
                  height: '26px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  backgroundColor: statusValidade.status === 'valido' ? '#f0fdf4' : 
                                  statusValidade.status === 'proximo-vencer' ? '#fef9c3' : '#fef2f2',
                  color: statusValidade.cor,
                  border: `1px solid ${statusValidade.status === 'valido' ? '#bbf7d0' : 
                                       statusValidade.status === 'proximo-vencer' ? '#fde68a' : '#fecaca'}`,
                  '& .MuiChip-icon': {
                    color: statusValidade.cor
                  }
                }}
              />
              {dataCriacao && (
                <Chip
                  label={`Emitida em ${formatarDataCriacao(dataCriacao)}`}
                  size="small"
                  icon={<MdCalendarToday size={14} />}
                  sx={{
                    height: '26px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: '#f8fafc',
                    color: '#64748b',
                    border: '1px solid #e2e8f0',
                    '& .MuiChip-icon': {
                      color: '#64748b'
                    }
                  }}
                />
              )}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {onVisualizar && (
              <Tooltip title="Visualizar receita" arrow>
                <IconButton 
                  size="small" 
                  onClick={() => onVisualizar(prescricao)}
                  sx={{ 
                    color: '#1e40af',
                    backgroundColor: '#eff6ff',
                    p: 1,
                    '&:hover': { 
                      backgroundColor: '#dbeafe',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <MdVisibility size={18} />
                </IconButton>
              </Tooltip>
            )}
            
            {onImprimir && (
              <Tooltip title="Imprimir receita" arrow>
                <IconButton 
                  size="small" 
                  onClick={() => onImprimir(prescricao)}
                  sx={{ 
                    color: '#059669',
                    backgroundColor: '#f0fdf4',
                    p: 1,
                    '&:hover': { 
                      backgroundColor: '#dcfce7',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <MdPrint size={18} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        {/* Informações da Consulta */}
        <Box sx={{ 
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5
        }}>
          {/* Médico */}
          {prescricao.nomeMedico && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                <MdPerson size={16} color="#1e40af" />
                <Typography sx={{ 
                  fontWeight: '600', 
                  color: '#1e293b', 
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}>
                  {prescricao.nomeMedico}
                  <MdVerified size={14} color="#0284c7" />
                </Typography>
              </Box>
              {prescricao.especialidade && (
                <Typography sx={{ 
                  color: '#64748b', 
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  ml: 2.5
                }}>
                  <MdLocalHospital size={14} color="#64748b" />
                  {prescricao.especialidade}
                </Typography>
              )}
            </Box>
          )}

          {/* Paciente */}
          {prescricao.nomePaciente && (
            <Box sx={{ 
              pt: 1.5,
              borderTop: '1px solid #e2e8f0'
            }}>
              <Typography sx={{ 
                fontSize: '0.7rem', 
                color: '#64748b',
                mb: 0.25,
                textTransform: 'uppercase',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}>
                Paciente
              </Typography>
              <Typography sx={{ 
                fontWeight: '600', 
                color: '#1e293b', 
                fontSize: '0.85rem'
              }}>
                {prescricao.nomePaciente}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default PrescricaoCard

