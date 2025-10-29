import React from 'react'
import Dialog from '../../../components/dialog'
import Button from '../../../components/button'
import { Grid, Typography, Box, Chip, Divider } from '@mui/material'
import { 
  MdCalendarToday, 
  MdAccessTime, 
  MdPerson, 
  MdLocalHospital,
  MdVerified,
  MdInfo,
  MdCancel,
  MdCheckCircle,
  MdWarning
} from 'react-icons/md'
import { ConsultaPaciente } from '../utils/interfaces'
import { getStatusColor } from '../../home/utils/constants'
import { getStatusText } from '../utils/constants'

interface VisualizarConsultaProps {
  modal: boolean
  setModal: (modal: boolean) => void
  consulta: ConsultaPaciente | null
}

const VisualizarConsulta: React.FC<VisualizarConsultaProps> = ({
  modal,
  setModal,
  consulta
}) => {
  if (!consulta) return null

  const { data, hora } = {
    data: new Date(consulta.data_hora).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }),
    hora: new Date(consulta.data_hora).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const statusColor = getStatusColor(getStatusText(consulta.status))

  const calcularLimiteReagendamento = () => {
    const dataConsulta = new Date(consulta.data_hora)
    const limiteReagendamento = new Date(dataConsulta.getTime() - 4 * 60 * 60 * 1000) // Subtrai 4 horas
    return limiteReagendamento
  }

  const calcularPrazoConfirmacao = () => {
    const dataConsulta = new Date(consulta.data_hora)
    const prazoConfirmacao = new Date(dataConsulta.getTime() - 2 * 60 * 60 * 1000) // Subtrai 2 horas
    return prazoConfirmacao
  }

  const limiteReagendamento = consulta.status === 'agendada' ? calcularLimiteReagendamento() : null
  const prazoConfirmacao = consulta.status === 'agendada' ? calcularPrazoConfirmacao() : null

  const fechar = () => {
    setModal(false)
  }

  return (
    <Dialog
      maxWidth="sm"
      title="Detalhes da Consulta"
      open={modal}
      onClose={fechar}
      actions={
        <Button color="primary" onClick={fechar}>
          Fechar
        </Button>
      }
    >
      <div className="text-xs">
        <Grid container spacing={2}>
          {/* Status e Informações Básicas */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Chip 
                label={getStatusText(consulta.status)}
                color={statusColor}
                size="small"
                sx={{ 
                  fontWeight: '500', 
                  fontSize: '0.75rem',
                  height: '24px'
                }}
              />
            </Box>
          </Grid>

          {/* Informações do Médico */}
          <Grid item xs={12}>
            <Box sx={{ 
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              p: 1.5,
              border: '1px solid #e2e8f0'
            }}>
              <Typography variant="subtitle2" sx={{ 
                color: '#1e293b', 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                <MdPerson size={16} color="#1e40af" />
                Informações do Médico
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                <Typography sx={{ fontWeight: '500', color: '#1e293b', fontSize: '0.8rem' }}>
                  {consulta.medico.nome_medico}
                </Typography>
                <MdVerified size={14} color="#0284c7" />
              </Box>
              
              <Typography variant="caption" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.75rem' }}>
                <MdLocalHospital size={12} />
                {consulta.medico.especialidade} • CRM {consulta.medico.crm}
              </Typography>
            </Box>
          </Grid>

          {/* Data e Horário */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              backgroundColor: '#f0f9ff',
              borderRadius: '6px',
              p: 1.5,
              border: '1px solid #bae6fd'
            }}>
              <Typography variant="subtitle2" sx={{ 
                color: '#1e293b', 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                <MdCalendarToday size={16} color="#0284c7" />
                Data da Consulta
              </Typography>
              <Typography sx={{ fontWeight: '500', color: '#1e293b', fontSize: '0.9rem' }}>
                {data}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ 
              backgroundColor: '#f0f9ff',
              borderRadius: '6px',
              p: 1.5,
              border: '1px solid #bae6fd'
            }}>
              <Typography variant="subtitle2" sx={{ 
                color: '#1e293b', 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                <MdAccessTime size={16} color="#0284c7" />
                Horário da Consulta
              </Typography>
              <Typography sx={{ fontWeight: '500', color: '#1e293b', fontSize: '0.9rem' }}>
                {hora}
              </Typography>
            </Box>
          </Grid>

          {/* Valor da Consulta */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              backgroundColor: '#f0fdf4',
              borderRadius: '6px',
              p: 1.5,
              border: '1px solid #bbf7d0'
            }}>
              <Typography variant="subtitle2" sx={{ 
                color: '#1e293b', 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                <MdCheckCircle size={16} color="#16a34a" />
                Valor da Consulta
              </Typography>
              <Typography sx={{ fontWeight: '500', color: '#1e293b', fontSize: '1rem' }}>
                R$ {consulta.valor_consulta.toFixed(2).replace('.', ',')}
              </Typography>
            </Box>
          </Grid>

          {/* Status da Consulta */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              backgroundColor: consulta.status === 'cancelada' ? '#fef2f2' : '#f0f9ff',
              borderRadius: '6px',
              p: 1.5,
              border: consulta.status === 'cancelada' ? '1px solid #fecaca' : '1px solid #bae6fd'
            }}>
              <Typography variant="subtitle2" sx={{ 
                color: '#1e293b', 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {consulta.status === 'cancelada' ? <MdCancel size={16} color="#dc2626" /> : <MdInfo size={16} color="#0284c7" />}
                Status Atual
              </Typography>
              <Typography sx={{ fontWeight: '500', color: '#1e293b', fontSize: '0.9rem' }}>
                {getStatusText(consulta.status)}
              </Typography>
            </Box>
          </Grid>

          {/* Observações */}
          {consulta.observacoes && (
            <Grid item xs={12}>
              <Box sx={{ 
                backgroundColor: '#f8fafc',
                borderRadius: '6px',
                p: 1.5,
                border: '1px solid #e2e8f0'
              }}>
                <Typography variant="subtitle2" sx={{ 
                  color: '#1e293b', 
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  <MdInfo size={16} color="#64748b" />
                  Observações
                </Typography>
                <Typography sx={{ color: '#64748b', fontStyle: 'italic', fontSize: '0.8rem' }}>
                  {consulta.observacoes}
                </Typography>
              </Box>
            </Grid>
          )}

          {/* Avisos para consultas agendadas */}
          {consulta.status === 'agendada' && (
            <Grid item xs={12}>
              <Box sx={{
                backgroundColor: '#fef9c3',
                border: '1px solid #fef08a',
                borderRadius: '6px',
                p: 1.5
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                  <MdWarning size={16} color="#d97706" />
                  <Typography sx={{ color: '#92400e', fontWeight: 600, fontSize: '0.8rem' }}>
                    Avisos Importantes
                  </Typography>
                </Box>
                
                {prazoConfirmacao && (
                  <Typography variant="body2" sx={{ color: '#78350f', fontSize: '0.75rem', mb: 0.75 }}>
                    Você tem até o dia {prazoConfirmacao.toLocaleString('pt-BR', { 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric',
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })} para confirmar.
                  </Typography>
                )}
                
                <Typography variant="body2" sx={{ color: '#78350f', fontSize: '0.75rem', mb: 0.75, fontWeight: 500 }}>
                  Caso não confirmada, sua consulta será cancelada automaticamente!
                </Typography>
                
                {limiteReagendamento && (
                  <Typography variant="body2" sx={{ color: '#78350f', fontSize: '0.75rem' }}>
                    Reagendamentos e cancelamentos poderão ser realizados até {limiteReagendamento.toLocaleString('pt-BR', { 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric',
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })} (4 horas antes da consulta).
                  </Typography>
                )}
              </Box>
            </Grid>
          )}

          {/* Consulta cancelada */}
          {consulta.status === 'cancelada' && (consulta.data_cancelamento || consulta.motivo_cancelamento) && (
            <Grid item xs={12}>
              <Box sx={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                p: 1.5
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <MdCancel size={16} color="#dc2626" />
                  <Typography sx={{ color: '#991b1b', fontWeight: 600, fontSize: '0.8rem' }}>
                    Consulta cancelada
                  </Typography>
                </Box>
                {consulta.data_cancelamento && (
                  <Typography variant="body2" sx={{ color: '#7f1d1d', fontSize: '0.75rem' }}>
                    Data do cancelamento: {new Date(consulta.data_cancelamento).toLocaleString('pt-BR', { 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric',
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </Typography>
                )}
                {consulta.motivo_cancelamento && (
                  <Typography variant="body2" sx={{ color: '#7f1d1d', fontSize: '0.75rem' }}>
                    Motivo: {consulta.motivo_cancelamento}
                  </Typography>
                )}
              </Box>
            </Grid>
          )}

          <Divider sx={{ my: 1.5 }} />

          <Grid item xs={12}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>
              Consulta criada em: {new Date(consulta.criado_em).toLocaleString('pt-BR')}
              {consulta.atualizado_em && (
                <> • Última atualização: {new Date(consulta.atualizado_em).toLocaleString('pt-BR')}</>
              )}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  )
}

export default VisualizarConsulta
