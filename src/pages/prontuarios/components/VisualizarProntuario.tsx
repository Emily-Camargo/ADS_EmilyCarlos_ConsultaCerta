import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Divider, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { MdClose, MdPerson, MdCalendarToday, MdLocalHospital, MdExpandMore, MdMedication, MdAssignment } from 'react-icons/md'
import { ProntuarioPacienteRes } from '../../../services/consultas/interface'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface VisualizarProntuarioProps {
  modal: boolean
  setModal: (open: boolean) => void
  prontuario: ProntuarioPacienteRes | null
}

const VisualizarProntuario: React.FC<VisualizarProntuarioProps> = ({ modal, setModal, prontuario }) => {
  if (!prontuario) return null

  const { paciente, prontuario: prontuarioData, consultas } = prontuario

  const calcularIdade = (dataNascimento: string) => {
    const hoje = new Date()
    const nascimento = new Date(dataNascimento)
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mesAtual = hoje.getMonth()
    const mesNascimento = nascimento.getMonth()
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--
    }
    
    return idade
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'realizada':
        return '#10b981'
      case 'agendada':
        return '#3b82f6'
      case 'cancelada':
        return '#ef4444'
      case 'reagendada':
        return '#f59e0b'
      default:
        return '#6b7280'
    }
  }

  return (
    <Dialog
      open={modal}
      onClose={() => setModal(false)}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2,
        borderBottom: '1px solid #e2e8f0'
      }}>
        <Typography variant="h6" sx={{ fontWeight: '600', color: '#1e293b' }}>
          Prontuário Médico
        </Typography>
        <Button
          onClick={() => setModal(false)}
          sx={{ 
            minWidth: 'auto', 
            p: 1,
            color: '#64748b',
            '&:hover': {
              backgroundColor: '#f1f5f9'
            }
          }}
        >
          <MdClose size={24} />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          {/* Informações do Paciente */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: '600', 
              color: '#1e293b',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <MdPerson size={24} />
              Dados do Paciente
            </Typography>
            
            <Box sx={{ 
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              p: 3,
              border: '1px solid #e2e8f0'
            }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                    Nome Completo
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: '500', color: '#1e293b' }}>
                    {paciente.nome}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                    Data de Nascimento
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#1e293b' }}>
                    {format(new Date(paciente.data_nascimento), 'dd/MM/yyyy', { locale: ptBR })} ({calcularIdade(paciente.data_nascimento)} anos)
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                    ID do Paciente
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#1e293b' }}>
                    #{paciente.id_paciente}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                    Última Atualização
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#1e293b' }}>
                    {format(new Date(paciente.ultima_atualizacao), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </Typography>
                </Box>
              </Box>

              {/* Informações Médicas */}
              {(paciente.alergias || paciente.condicoes_cronicas || paciente.medicamentos_uso_continuo) && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: '600', 
                    color: '#1e293b',
                    mb: 2
                  }}>
                    Informações Médicas Importantes
                  </Typography>
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
                    {paciente.alergias && (
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: '#dc2626', mb: 0.5, fontWeight: '600' }}>
                          Alergias
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1e293b' }}>
                          {paciente.alergias}
                        </Typography>
                      </Box>
                    )}
                    
                    {paciente.condicoes_cronicas && (
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: '#dc2626', mb: 0.5, fontWeight: '600' }}>
                          Condições Crônicas
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1e293b' }}>
                          {paciente.condicoes_cronicas}
                        </Typography>
                      </Box>
                    )}
                    
                    {paciente.medicamentos_uso_continuo && (
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: '#dc2626', mb: 0.5, fontWeight: '600' }}>
                          Medicamentos em Uso Contínuo
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1e293b' }}>
                          {paciente.medicamentos_uso_continuo}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </>
              )}
            </Box>
          </Box>

          {/* Informações do Prontuário */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: '600', 
              color: '#1e293b',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <MdLocalHospital size={24} />
              Dados do Prontuário
            </Typography>
            
            <Box sx={{ 
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              p: 3,
              border: '1px solid #e2e8f0'
            }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                    ID do Prontuário
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: '500', color: '#1e293b' }}>
                    #{prontuarioData.id_prontuario}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                    Data de Criação
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#1e293b' }}>
                    {format(new Date(prontuarioData.data_criacao), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                  Descrição
                </Typography>
                <Typography variant="body1" sx={{ color: '#1e293b' }}>
                  {prontuarioData.descricao}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Histórico de Consultas */}
          <Box>
            <Typography variant="h6" sx={{ 
              fontWeight: '600', 
              color: '#1e293b',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <MdCalendarToday size={24} />
              Histórico de Consultas ({consultas.length})
            </Typography>

            {consultas.length > 0 ? (
              <Box>
                {consultas.map((consulta, index) => (
                  <Accordion key={consulta.id_consulta} sx={{ 
                    mb: 2,
                    borderRadius: '8px !important',
                    border: '1px solid #e2e8f0',
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': {
                      margin: '0 0 16px 0'
                    }
                  }}>
                    <AccordionSummary
                      expandIcon={<MdExpandMore />}
                      sx={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px 8px 0 0',
                        '&.Mui-expanded': {
                          borderRadius: '8px 8px 0 0'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#1e293b' }}>
                          Consulta #{index + 1}
                        </Typography>
                        <Chip
                          label={consulta.status}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(consulta.status),
                            color: 'white',
                            fontWeight: '500'
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#64748b', ml: 'auto' }}>
                          {format(new Date(consulta.data_hora), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    
                    <AccordionDetails sx={{ p: 3 }}>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                        {/* Informações Básicas */}
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1, fontWeight: '600' }}>
                            Informações Básicas
                          </Typography>
                          <Box sx={{ space: 1 }}>
                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                              <strong>Médico:</strong> {consulta.medico.nome}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                              <strong>CRM:</strong> {consulta.medico.crm}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                              <strong>Especialidade:</strong> {consulta.medico.especialidade}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                              <strong>Motivo:</strong> {consulta.motivo}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Sinais Vitais */}
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1, fontWeight: '600' }}>
                            Sinais Vitais
                          </Typography>
                          <Box sx={{ space: 1 }}>
                            {consulta.peso && (
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                <strong>Peso:</strong> {consulta.peso} kg
                              </Typography>
                            )}
                            {consulta.altura && (
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                <strong>Altura:</strong> {consulta.altura} cm
                              </Typography>
                            )}
                            {consulta.pressao_arterial && (
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                <strong>Pressão Arterial:</strong> {consulta.pressao_arterial}
                              </Typography>
                            )}
                            {consulta.temperatura && (
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                <strong>Temperatura:</strong> {consulta.temperatura}°C
                              </Typography>
                            )}
                          </Box>
                        </Box>

                        {/* Anamnese */}
                        <Box sx={{ gridColumn: '1 / -1' }}>
                          <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1, fontWeight: '600' }}>
                            Anamnese
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#1e293b', mb: 2 }}>
                            {consulta.anamnese}
                          </Typography>
                        </Box>

                        {/* Exame Físico */}
                        <Box sx={{ gridColumn: '1 / -1' }}>
                          <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1, fontWeight: '600' }}>
                            Exame Físico
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#1e293b', mb: 2 }}>
                            {consulta.exame_fisico}
                          </Typography>
                        </Box>

                        {/* Hipótese Diagnóstica */}
                        <Box sx={{ gridColumn: '1 / -1' }}>
                          <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1, fontWeight: '600' }}>
                            Hipótese Diagnóstica
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#1e293b', mb: 2 }}>
                            {consulta.hipotese_diagnostica}
                          </Typography>
                        </Box>

                        {/* Conduta Médica */}
                        <Box sx={{ gridColumn: '1 / -1' }}>
                          <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1, fontWeight: '600' }}>
                            Conduta Médica
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#1e293b', mb: 2 }}>
                            {consulta.conduta_medica}
                          </Typography>
                        </Box>

                        {/* Prescrições */}
                        {consulta.prescricoes.length > 0 && (
                          <Box sx={{ gridColumn: '1 / -1' }}>
                            <Typography variant="subtitle2" sx={{ 
                              color: '#64748b', 
                              mb: 2, 
                              fontWeight: '600',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1
                            }}>
                              <MdMedication size={18} />
                              Prescrições ({consulta.prescricoes.length})
                            </Typography>
                            
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
                              {consulta.prescricoes.map((prescricao, prescIndex) => (
                                <Box key={prescIndex} sx={{ 
                                  p: 2, 
                                  backgroundColor: '#f0f9ff',
                                  borderRadius: '8px',
                                  border: '1px solid #bae6fd'
                                }}>
                                  <Typography variant="subtitle2" sx={{ 
                                    color: '#0369a1', 
                                    mb: 1, 
                                    fontWeight: '600'
                                  }}>
                                    {prescricao.nome_medicamento}
                                  </Typography>
                                  
                                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    <strong>Dosagem:</strong> {prescricao.dosagem}
                                  </Typography>
                                  
                                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    <strong>Instruções:</strong> {prescricao.instrucoes}
                                  </Typography>
                                  
                                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    <strong>Quantidade:</strong> {prescricao.quantidade} unidades
                                  </Typography>
                                  
                                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    <strong>Validade:</strong> {format(new Date(prescricao.validade), 'dd/MM/yyyy', { locale: ptBR })}
                                  </Typography>
                                  
                                  {prescricao.controlado && (
                                    <Chip
                                      label="Medicamento Controlado"
                                      size="small"
                                      sx={{
                                        backgroundColor: '#fef3c7',
                                        color: '#92400e',
                                        fontWeight: '500',
                                        mt: 1
                                      }}
                                    />
                                  )}
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            ) : (
              <Box sx={{ 
                textAlign: 'center', 
                py: 4,
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <Typography variant="body1" sx={{ color: '#64748b' }}>
                  Nenhuma consulta registrada neste prontuário
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid #e2e8f0' }}>
        <Button
          onClick={() => setModal(false)}
          variant="outlined"
          sx={{
            borderColor: '#d1d5db',
            color: '#374151',
            '&:hover': {
              borderColor: '#9ca3af',
              backgroundColor: '#f9fafb'
            }
          }}
        >
          Fechar
        </Button>
        <Button
          onClick={() => window.print()}
          variant="contained"
          sx={{
            backgroundColor: '#3b82f6',
            '&:hover': {
              backgroundColor: '#2563eb'
            }
          }}
        >
          Imprimir Prontuário
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default VisualizarProntuario
