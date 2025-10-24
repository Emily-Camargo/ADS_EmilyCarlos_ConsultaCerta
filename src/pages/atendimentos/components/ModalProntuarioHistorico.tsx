import React from 'react';
import Dialog from '../../../components/dialog';
import Button from '../../../components/button';
import { Box, Typography, Divider, Chip, CircularProgress, Alert } from '@mui/material';
import { MdPerson, MdCalendarToday, MdLocalHospital, MdMedication, MdPrint } from 'react-icons/md';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { calcularIdade, getStatusColor } from '../../prontuarios/utils/constants';

interface ModalProntuarioHistoricoProps {
  aberta: boolean;
  onFechar: () => void;
  consulta: any;
  prontuario: any;
  carregando: boolean;
}

const ModalProntuarioHistorico: React.FC<ModalProntuarioHistoricoProps> = ({
  aberta,
  onFechar,
  consulta,
  prontuario,
  carregando
}) => {
  if (!consulta) return null;

  const title = `Prontuário da Consulta - ${format(new Date(consulta.dataHora), 'dd/MM/yyyy', { locale: ptBR })}`;

  const actions = (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button color="info" onClick={() => window.print()}>
        Imprimir Prontuário
        <MdPrint size={18} className='ml-3' />
      </Button>
      <Button onClick={onFechar}>
        Fechar
      </Button>
    </div>
  );

  return (
    <Dialog
      open={aberta}
      onClose={onFechar}
      title={title}
      maxWidth="lg"
      actions={actions}
    >
      <div>
        {carregando ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Carregando prontuário...</Typography>
          </Box>
        ) : prontuario ? (
          <Box sx={{ p: 3 }}>
            {/* Dados do Paciente */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: '600', 
                color: '#1e293b',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <MdPerson size={20} />
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
                      {prontuario.paciente?.nome || 'Nome não disponível'}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                      Data de Nascimento
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1e293b' }}>
                      {prontuario.paciente?.data_nascimento 
                        ? `${format(new Date(prontuario.paciente.data_nascimento), 'dd/MM/yyyy', { locale: ptBR })} (${calcularIdade(prontuario.paciente.data_nascimento)} anos)`
                        : 'Data não disponível'
                      }
                    </Typography>
                  </Box>
                </Box>

                {(prontuario.paciente?.alergias || prontuario.paciente?.condicoes_cronicas || prontuario.paciente?.medicamentos_uso_continuo) && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: '600', 
                      color: '#1e293b',
                      mb: 2
                    }}>
                      Informações Médicas Importantes
                    </Typography>
                    
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
                      {prontuario.paciente?.alergias && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: '#dc2626', mb: 0.5, fontWeight: '600' }}>
                            Alergias
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#1e293b' }}>
                            {prontuario.paciente.alergias}
                          </Typography>
                        </Box>
                      )}
                      
                      {prontuario.paciente?.condicoes_cronicas && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: '#dc2626', mb: 0.5, fontWeight: '600' }}>
                            Condições Crônicas
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#1e293b' }}>
                            {prontuario.paciente.condicoes_cronicas}
                          </Typography>
                        </Box>
                      )}
                      
                      {prontuario.paciente?.medicamentos_uso_continuo && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: '#dc2626', mb: 0.5, fontWeight: '600' }}>
                            Medicamentos em Uso Contínuo
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#1e293b' }}>
                            {prontuario.paciente.medicamentos_uso_continuo}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </>
                )}
              </Box>
            </Box>

            {/* Dados do Prontuário */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: '600', 
                color: '#1e293b',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <MdLocalHospital size={20} />
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
                      Data de Criação
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1e293b' }}>
                      {format(new Date(prontuario.prontuario?.data_criacao), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                    Descrição
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#1e293b' }}>
                    {prontuario.prontuario?.descricao || 'Descrição não disponível'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Dados da Consulta */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: '600', 
                color: '#1e293b',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <MdCalendarToday size={20} />
                Dados da Consulta
              </Typography>
              
              <Box sx={{ 
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                p: 3,
                border: '1px solid #e2e8f0'
              }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                  {/* Informações Básicas */}
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontWeight: '600' }}>
                      Informações Básicas
                    </Typography>
                    <Box sx={{ space: 1 }}>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Data:</strong> {format(new Date(prontuario.consulta?.data_hora), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Status:</strong> 
                        <Chip
                          label={prontuario.consulta?.status}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(prontuario.consulta?.status),
                            color: 'white',
                            fontWeight: '500',
                            ml: 1
                          }}
                        />
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Médico:</strong> {prontuario.consulta?.medico?.nome}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>CRM:</strong> {prontuario.consulta?.medico?.crm}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Especialidade:</strong> {prontuario.consulta?.medico?.especialidade}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Motivo:</strong> {prontuario.consulta?.motivo}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Sinais Vitais */}
                  {prontuario.prontuario?.sinais_vitais && (
                    <Box>
                      <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontWeight: '600' }}>
                        Sinais Vitais
                      </Typography>
                      <Box sx={{ space: 1 }}>
                        {prontuario.prontuario.sinais_vitais.peso && (
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Peso:</strong> {prontuario.prontuario.sinais_vitais.peso} kg
                          </Typography>
                        )}
                        {prontuario.prontuario.sinais_vitais.altura && (
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Altura:</strong> {prontuario.prontuario.sinais_vitais.altura} cm
                          </Typography>
                        )}
                        {prontuario.prontuario.sinais_vitais.pressao_arterial && (
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Pressão Arterial:</strong> {prontuario.prontuario.sinais_vitais.pressao_arterial}
                          </Typography>
                        )}
                        {prontuario.prontuario.sinais_vitais.temperatura && (
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Temperatura:</strong> {prontuario.prontuario.sinais_vitais.temperatura}°C
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* Anamnese */}
                {prontuario.prontuario?.anamnese && (
                  <Box sx={{ gridColumn: '1 / -1', mt: 2 }}>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontWeight: '600' }}>
                      Anamnese
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1e293b', mb: 2 }}>
                      {prontuario.prontuario.anamnese}
                    </Typography>
                  </Box>
                )}

                {/* Hipótese Diagnóstica */}
                {prontuario.prontuario?.hipotese_diagnostica && (
                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontWeight: '600' }}>
                      Hipótese Diagnóstica
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1e293b', mb: 2 }}>
                      {prontuario.prontuario.hipotese_diagnostica}
                    </Typography>
                  </Box>
                )}

                {/* Conduta Médica */}
                {prontuario.prontuario?.conduta_medica && (
                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontWeight: '600' }}>
                      Conduta Médica
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1e293b', mb: 2 }}>
                      {prontuario.prontuario.conduta_medica}
                    </Typography>
                  </Box>
                )}

                {/* Observações */}
                {prontuario.prontuario?.observacoes && (
                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontWeight: '600' }}>
                      Observações
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1e293b', mb: 2 }}>
                      {prontuario.prontuario.observacoes}
                    </Typography>
                  </Box>
                )}

                {/* Prescrições */}
                {prontuario.prontuario?.prescricoes && prontuario.prontuario.prescricoes.length > 0 && (
                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <Typography variant="body2" sx={{ 
                      color: '#64748b', 
                      mb: 2, 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <MdMedication size={16} />
                      Prescrições ({prontuario.prontuario.prescricoes.length})
                    </Typography>
                    
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
                      {prontuario.prontuario.prescricoes.map((prescricao: any, prescIndex: number) => (
                        <Box key={prescIndex} sx={{ 
                          p: 2, 
                          backgroundColor: '#f0f9ff',
                          borderRadius: '8px',
                          border: '1px solid #bae6fd'
                        }}>
                          <Typography variant="body2" sx={{ 
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
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 3 }}>
            <Alert severity="info">
              Nenhum prontuário encontrado para esta consulta.
            </Alert>
          </Box>
        )}
      </div>
    </Dialog>
  );
};

export default ModalProntuarioHistorico;
