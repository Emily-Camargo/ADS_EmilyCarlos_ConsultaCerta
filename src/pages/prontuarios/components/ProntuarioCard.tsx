import React from 'react'
import { Card, CardContent, Typography, Box, Chip, Divider } from '@mui/material'
import { MdPerson, MdCalendarToday, MdLocalHospital, MdVisibility } from 'react-icons/md'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { calcularIdade, getStatusColor } from '../utils/constants'
import { ProntuarioCardProps } from '../utils/interfaces'
import { Button } from '@mantine/core'

const ProntuarioCard: React.FC<ProntuarioCardProps> = ({ prontuario, onVisualizar }) => {
  const { paciente, prontuario: prontuarioData, consultas } = prontuario

  return (
    <Card 
      sx={{ 
        mb: 3, 
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transform: 'translateY(-1px)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{ 
            p: 2, 
            backgroundColor: '#f1f5f9', 
            borderRadius: '50%',
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MdPerson size={24} color="#475569" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: '600', 
              color: '#1e293b',
              mb: 0.5
            }}>
              {paciente.nome}
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <MdCalendarToday size={16} />
              {calcularIdade(paciente.data_nascimento)} anos
            </Typography>
          </Box>
          <MdVisibility size={21} className='text-medical-primary cursor-pointer' onClick={() => onVisualizar(prontuario)}/>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ 
            fontWeight: '600', 
            color: '#374151',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <MdLocalHospital size={18} />
            Prontuário
          </Typography>
          <Typography variant="body2" sx={{ 
            color: '#6b7280',
            mb: 1
          }}>
            <strong>Descrição:</strong> {prontuarioData.descricao}
          </Typography>
          <Typography variant="body2" sx={{ 
            color: '#6b7280'
          }}>
            <strong>Criado em:</strong> {format(new Date(prontuarioData.data_criacao), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
          </Typography>
        </Box>

        {(paciente.alergias || paciente.condicoes_cronicas || paciente.medicamentos_uso_continuo) && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: '600', 
              color: '#374151',
              mb: 1
            }}>
              Informações Médicas
            </Typography>
            {paciente.alergias && (
              <Typography variant="body2" sx={{ 
                color: '#6b7280',
                mb: 0.5
              }}>
                <strong>Alergias:</strong> {paciente.alergias}
              </Typography>
            )}
            {paciente.condicoes_cronicas && (
              <Typography variant="body2" sx={{ 
                color: '#6b7280',
                mb: 0.5
              }}>
                <strong>Condições Crônicas:</strong> {paciente.condicoes_cronicas}
              </Typography>
            )}
            {paciente.medicamentos_uso_continuo && (
              <Typography variant="body2" sx={{ 
                color: '#6b7280'
              }}>
                <strong>Medicamentos em Uso:</strong> {paciente.medicamentos_uso_continuo}
              </Typography>
            )}
          </Box>
        )}

        <Box>
          <Typography variant="subtitle2" sx={{ 
            fontWeight: '600', 
            color: '#374151',
            mb: 2
          }}>
            Consultas ({consultas.length})
          </Typography>
          
          {consultas.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {consultas.slice(0, 3).map((consulta) => (
                <Box key={consulta.id_consulta} sx={{ 
                  p: 2, 
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  minWidth: '200px',
                  flex: '1 1 200px'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ 
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      {format(new Date(consulta.data_hora), 'dd/MM/yyyy', { locale: ptBR })}
                    </Typography>
                    <Chip
                      label={consulta.status}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(consulta.status),
                        color: 'white',
                        fontWeight: '500',
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ 
                    color: '#6b7280',
                    mb: 0.5
                  }}>
                    <strong>Médico:</strong> {consulta.medico.nome}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#6b7280',
                    mb: 0.5
                  }}>
                    <strong>Especialidade:</strong> {consulta.medico.especialidade}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#6b7280',
                    mb: 0.5
                  }}>
                    <strong>Motivo:</strong> {consulta.motivo}
                  </Typography>
                  {consulta.prescricoes.length > 0 && (
                    <Typography variant="body2" sx={{ 
                      color: '#059669',
                      fontWeight: '500'
                    }}>
                      {consulta.prescricoes.length} prescrição(ões)
                    </Typography>
                  )}
                </Box>
              ))}
              {consultas.length > 3 && (
                <Box sx={{ 
                  p: 2, 
                  backgroundColor: '#f1f5f9',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '200px',
                  flex: '1 1 200px'
                }}>
                  <Typography variant="body2" sx={{ 
                    color: '#475569',
                    fontWeight: '500'
                  }}>
                    +{consultas.length - 3} consultas
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ 
              color: '#9ca3af',
              fontStyle: 'italic'
            }}>
              Nenhuma consulta registrada
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProntuarioCard
