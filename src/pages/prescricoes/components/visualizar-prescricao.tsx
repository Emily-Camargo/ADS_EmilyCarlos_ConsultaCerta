import React from 'react'
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Box, 
  Typography,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { MdClose, MdPrint, MdLocalPharmacy, MdVerified, MdSecurity } from 'react-icons/md'
import { VisualizarPrescricaoProps } from '../utils/interface'
import { formatarDataHora, formatarDataCriacao, verificarValidadeMedicamento } from '../utils/constants'

const VisualizarPrescricao: React.FC<VisualizarPrescricaoProps> = ({ 
  modal, 
  setModal, 
  prescricao 
}) => {
  if (!prescricao) return null

  const { data, hora } = formatarDataHora(prescricao.dtaConsulta)
  const dataCriacao = prescricao.medicamentos[0]?.dtaCriacao

  const handleImprimir = () => {
    window.print()
  }

  const formatarCPF = (cpf?: string) => {
    if (!cpf) return ''
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  return (
    <>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-prescription, #printable-prescription * {
              visibility: visible;
            }
            #printable-prescription {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20mm;
            }
            .no-print {
              display: none !important;
            }
            .print-header {
              border: 2px solid #1e40af;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
            }
            .print-table {
              width: 100%;
              border-collapse: collapse;
            }
            .print-table th, .print-table td {
              border: 1px solid #cbd5e1;
              padding: 12px;
              text-align: left;
            }
            .print-signature {
              margin-top: 60px;
              border-top: 2px solid #000;
              padding-top: 10px;
              text-align: center;
            }
          }
        `}
      </style>
      <Dialog
        open={modal}
        onClose={() => setModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle className="no-print" sx={{ 
          p: 3, 
          pb: 2,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{
              backgroundColor: '#eff6ff',
              p: 1,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <MdLocalPharmacy size={24} color="#3b82f6" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: '700', color: '#1e293b' }}>
                Receita Médica Digital
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#64748b' }}>
                Válida em todo território nacional
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<MdPrint />}
              onClick={handleImprimir}
              sx={{
                backgroundColor: '#10b981',
                textTransform: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                '&:hover': {
                  backgroundColor: '#059669'
                }
              }}
            >
              Imprimir
            </Button>
            <IconButton
              onClick={() => setModal(false)}
              sx={{ 
                color: '#64748b',
                '&:hover': { backgroundColor: '#f1f5f9' }
              }}
            >
              <MdClose size={22} />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }} id="printable-prescription">
          {/* Cabeçalho da Receita */}
          <Box className="print-header" sx={{ 
            border: '2px solid #1e40af',
            borderRadius: '12px',
            p: 3,
            mb: 3,
            backgroundColor: '#f8fafc'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '800',
                  color: '#1e40af',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <MdLocalPharmacy size={32} />
                  RECEITA MÉDICA DIGITAL
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                  <MdSecurity size={18} color="#10b981" />
                  <Typography sx={{ 
                    fontSize: '0.85rem', 
                    color: '#10b981',
                    fontWeight: '600'
                  }}>
                    Documento válido em todo território nacional
                  </Typography>
                </Box>
                <Typography sx={{ 
                  fontSize: '0.75rem', 
                  color: '#64748b',
                  fontWeight: '500'
                }}>
                  Receita nº {prescricao.idConsulta.toString().padStart(8, '0')}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ 
                  fontSize: '0.7rem', 
                  color: '#64748b',
                  fontWeight: '700',
                  mb: 0.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Data de Emissão
                </Typography>
                <Typography sx={{ 
                  fontWeight: '700', 
                  color: '#1e293b', 
                  fontSize: '0.9rem'
                }}>
                  {dataCriacao ? formatarDataCriacao(dataCriacao) : data}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ 
                  fontSize: '0.7rem', 
                  color: '#64748b',
                  fontWeight: '700',
                  mb: 0.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Data da Consulta
                </Typography>
                <Typography sx={{ 
                  fontWeight: '700', 
                  color: '#1e293b', 
                  fontSize: '0.9rem'
                }}>
                  {data} às {hora}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Dados do Médico */}
          <Box sx={{ 
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            p: 2.5,
            mb: 2
          }}>
            <Typography sx={{ 
              fontSize: '0.7rem', 
              color: '#64748b',
              fontWeight: '700',
              mb: 1.5,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #3b82f6',
              pb: 0.5
            }}>
              📋 Dados do Profissional
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
              <Typography sx={{ 
                fontWeight: '700', 
                color: '#1e293b', 
                fontSize: '1.1rem'
              }}>
                {prescricao.nomeMedico}
              </Typography>
              <MdVerified size={20} color="#0284c7" />
            </Box>
            <Typography sx={{ 
              color: '#64748b', 
              fontSize: '0.85rem',
              fontWeight: '500'
            }}>
              {prescricao.especialidade}
            </Typography>
            <Typography sx={{ 
              color: '#1e40af', 
              fontSize: '0.85rem',
              mt: 0.5,
              fontWeight: '600'
            }}>
              CRM: {prescricao.medicamentos[0]?.crm}
            </Typography>
          </Box>

          {/* Dados do Paciente */}
          <Box sx={{ 
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            p: 2.5,
            mb: 3
          }}>
            <Typography sx={{ 
              fontSize: '0.7rem', 
              color: '#64748b',
              fontWeight: '700',
              mb: 1.5,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '2px solid #10b981',
              pb: 0.5
            }}>
              👤 Dados do Paciente
            </Typography>
            <Typography sx={{ 
              fontWeight: '700', 
              color: '#1e293b', 
              fontSize: '1rem',
              mb: 0.5
            }}>
              {prescricao.nomePaciente}
            </Typography>
            {prescricao.cpf && (
              <Typography sx={{ 
                color: '#64748b', 
                fontSize: '0.85rem',
                fontWeight: '500'
              }}>
                CPF: {formatarCPF(prescricao.cpf)}
              </Typography>
            )}
          </Box>

          {/* Medicamentos Prescritos */}
          <Box>
            <Typography sx={{ 
              fontSize: '0.85rem', 
              color: '#1e293b',
              fontWeight: '700',
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              backgroundColor: '#f8fafc',
              p: 1.5,
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              💊 MEDICAMENTOS PRESCRITOS
            </Typography>

            <Table className="print-table" sx={{ mb: 3 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                  <TableCell sx={{ fontWeight: '700', fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase' }}>
                    Medicamento
                  </TableCell>
                  <TableCell sx={{ fontWeight: '700', fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase' }}>
                    Dosagem
                  </TableCell>
                  <TableCell sx={{ fontWeight: '700', fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase' }}>
                    Qtd.
                  </TableCell>
                  <TableCell sx={{ fontWeight: '700', fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase' }}>
                    Validade
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescricao.medicamentos.map((medicamento, index) => {
                  const validadeInfo = verificarValidadeMedicamento(medicamento.validade)
                  return (
                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f8fafc' } }}>
                      <TableCell>
                        <Box>
                          <Typography sx={{ fontWeight: '700', fontSize: '0.85rem', color: '#1e293b', mb: 0.5 }}>
                            {index + 1}. {medicamento.nomeMedicamento}
                          </Typography>
                          {medicamento.controlado && (
                            <Box sx={{ 
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.5,
                              backgroundColor: '#fef2f2',
                              color: '#dc2626',
                              px: 1,
                              py: 0.25,
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: '600'
                            }}>
                              ⚠️ CONTROLADO
                            </Box>
                          )}
                          <Typography sx={{ fontSize: '0.75rem', color: '#64748b', mt: 0.75, fontStyle: 'italic' }}>
                            {medicamento.instrucoes}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>
                        {medicamento.dosagem}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>
                        {medicamento.quantidade} un.
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ 
                          fontSize: '0.75rem', 
                          fontWeight: '600',
                          color: validadeInfo.cor
                        }}>
                          {new Date(medicamento.validade).toLocaleDateString('pt-BR')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Box>

          {/* Observações Importantes */}
          <Box sx={{ 
            backgroundColor: '#fef9c3',
            border: '2px solid #fde047',
            borderRadius: '8px',
            p: 2,
            mb: 3
          }}>
            <Typography sx={{ 
              fontSize: '0.75rem', 
              fontWeight: '700',
              color: '#854d0e',
              mb: 1
            }}>
              ⚠️ INSTRUÇÕES IMPORTANTES
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#713f12', lineHeight: 1.6 }}>
              • Siga rigorosamente as orientações médicas<br/>
              • Não interrompa o tratamento sem orientação profissional<br/>
              • Medicamentos controlados requerem apresentação desta receita<br/>
              • Em caso de dúvidas, consulte o médico prescritor ou farmacêutico<br/>
              • Mantenha este documento guardado durante todo o tratamento
            </Typography>
          </Box>

          {/* Assinatura Digital */}
          <Box className="print-signature" sx={{ 
            mt: 5,
            pt: 3,
            borderTop: '2px solid #000',
            textAlign: 'center'
          }}>
            <Typography sx={{ 
              fontWeight: '700', 
              fontSize: '0.9rem',
              color: '#1e293b',
              mb: 0.5
            }}>
              {prescricao.nomeMedico}
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: '#64748b' }}>
              CRM: {prescricao.medicamentos[0]?.crm} | {prescricao.especialidade}
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8', mt: 1 }}>
              Assinatura Digital Certificada - Receita Válida em Todo Território Nacional
            </Typography>
          </Box>

          {/* Rodapé Legal */}
          <Box sx={{ 
            mt: 3,
            pt: 2,
            borderTop: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <Typography sx={{ 
              fontSize: '0.65rem', 
              color: '#94a3b8',
              lineHeight: 1.5
            }}>
              Documento emitido eletronicamente em conformidade com a Lei nº 13.787/2018<br/>
              e Resoluções CFM nº 1.643/2002 e 2.218/2018<br/>
              Este documento possui validade legal e não necessita de assinatura física
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default VisualizarPrescricao

