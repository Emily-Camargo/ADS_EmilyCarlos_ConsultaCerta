import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Divider,
  Chip,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { 
  MdPerson, 
  MdSave, 
  MdSend,
  MdHistory,
  MdPrint,
  MdArrowBack,
  MdChat,
  MdSend as MdSendMessage
} from 'react-icons/md';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarProntuarioPaciente, postBuscarConsultas, atualizarProntuario, atualizarConsulta } from '../../services/consultas';
import { AtualizarProntuarioReq, AtualizarConsultaReq, PrescricaoAtualizacao } from '../../services/consultas/interface';
import { calcularIdade, getStatusColor } from '../prontuarios/utils/constants';
import { useAssistente } from '../../hooks';
import { AssistenteRequest } from '../../services/assistente/interface';
import ModalProntuarioHistorico from './components/ModalProntuarioHistorico';

const ProntuarioAtendimento: React.FC = () => {
  const { idPaciente, idConsulta } = useParams<{ idPaciente: string; idConsulta: string }>();
  const navigate = useNavigate();
  const idPacienteNumber = idPaciente ? parseInt(idPaciente, 10) : 0;
  const idConsultaNumber = idConsulta ? parseInt(idConsulta, 10) : 0;
  
  const [formulario, setFormulario] = useState({
    anamnese: '',
    hipoteseDiagnostica: '',
    condutaMedica: '',
    observacoes: '',
    sinaisVitais: {
      peso: '',
      altura: '',
      pressaoArterial: '',
      temperatura: '',
      alergias: '',
      condicoesCronicas: '',
      medicamentosUsoContinuo: ''
    }
  });

  const [prescricoes, setPrescricoes] = useState<PrescricaoAtualizacao[]>([]);
  const [formularioSalvo, setFormularioSalvo] = useState(false);

  // Estados para edição dos campos médicos
  const [editandoCamposMedicos, setEditandoCamposMedicos] = useState(false);
  const [camposMedicosEditaveis, setCamposMedicosEditaveis] = useState({
    alergias: '',
    condicoes_cronicas: '',
    medicamentos_uso_continuo: ''
  });
  
  const [mensagensChat, setMensagensChat] = useState<Array<{
    id: string;
    tipo: 'usuario' | 'ia';
    mensagem: string;
    timestamp: Date;
    sugestaoAceita?: boolean;
    sugestaoNegada?: boolean;
    dadosEstruturados?: any;
  }>>([]);
  const [mensagemAtual, setMensagemAtual] = useState('');
  
  // Estados para modal de histórico
  const [modalHistoricoAberta, setModalHistoricoAberta] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState<any>(null);
  const [prontuarioHistorico, setProntuarioHistorico] = useState<any>(null);
  const [carregandoProntuarioHistorico, setCarregandoProntuarioHistorico] = useState(false);
  
  const { sendMessage, data: respostaAssistente, isLoading: enviandoMensagem, error: erroAssistente } = useAssistente();

  const { data: prontuario, isLoading: carregandoProntuario, error } = useQuery({
    queryKey: ['prontuario-atendimento', idPacienteNumber],
    queryFn: async () => {
      const response = await buscarProntuarioPaciente(idPacienteNumber);
      return response.data;
    },
    enabled: !!idPacienteNumber,
    onError: () => {
      toast.error('Erro ao carregar prontuário');
    },
    onSuccess: (data) => {
      if (data?.paciente) {
        setCamposMedicosEditaveis({
          alergias: data.paciente.alergias || '',
          condicoes_cronicas: data.paciente.condicoes_cronicas || '',
          medicamentos_uso_continuo: data.paciente.medicamentos_uso_continuo || ''
        });
      }
    }
  });

  const { data: historicoConsultas = [], isLoading: carregandoHistorico } = useQuery({
    queryKey: ['historico-consultas-atendimento', idPacienteNumber],
    queryFn: async () => {
      const response = await postBuscarConsultas({ idPaciente: idPacienteNumber });
      return response.data;
    },
    enabled: !!idPacienteNumber,
    onError: () => {
      toast.error('Erro ao carregar histórico de consultas');
    }
  });

  const atualizarProntuarioMutation = useMutation({
    mutationKey: ['atualizar-prontuario'],
    mutationFn: atualizarProntuario,
    onSuccess: () => {
      toast.success('Prontuário atualizado com sucesso!');
    },
    onError: (error: any) => {
      console.error('Erro ao atualizar prontuário:', error);
      toast.error('Erro ao atualizar prontuário. Tente novamente.');
    }
  });

  const finalizarConsultaMutation = useMutation({
    mutationKey: ['finalizar-consulta'],
    mutationFn: atualizarConsulta,
    onSuccess: () => {
      toast.success('Consulta finalizada com sucesso!');
      navigate('/atendimentos');
    },
    onError: (error: any) => {
      console.error('Erro ao finalizar consulta:', error);
      toast.error('Erro ao finalizar consulta. Tente novamente.');
    }
  });


  const handleInputChange = (campo: string, valor: string) => {
    setFormulario(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleSinaisVitaisChange = (campo: string, valor: string) => {
    setFormulario(prev => ({
      ...prev,
      sinaisVitais: {
        ...prev.sinaisVitais,
        [campo]: valor
      }
    }));
  };

  const adicionarPrescricao = () => {
    if (!prontuario) {
      toast.error('Prontuário não carregado. Tente novamente.');
      return;
    }

    const novaPrescricao: PrescricaoAtualizacao = {
      id_prontuario: prontuario.prontuario.id_prontuario,
      id_consulta: idConsultaNumber,
      medicamento: '',
      dosagem: '',
      instrucoes: '',
      controlado: false,
      ativo: true
    };
    
    setPrescricoes(prev => [...prev, novaPrescricao]);
  };

  const removerPrescricao = (index: number) => {
    setPrescricoes(prev => prev.filter((_, i) => i !== index));
  };

  const atualizarPrescricao = (index: number, campo: keyof PrescricaoAtualizacao, valor: string | boolean) => {
    setPrescricoes(prev => 
      prev.map((prescricao, i) =>
        i === index ? { ...prescricao, [campo]: valor } : prescricao
      )
    );
  };


  const salvarProntuario = async () => {
    if (!prontuario) {
      toast.error('Dados do prontuário não encontrados');
      return;
    }

    const dtoProntuario: AtualizarProntuarioReq = {
      id_prontuario: prontuario.prontuario.id_prontuario,
      id_consulta: idConsultaNumber,
      anamnese: formulario.anamnese || '',
      descricao: `Prontuário da consulta do dia ${format(new Date(), 'dd/MM/yyyy', { locale: ptBR })}`,
      hipoteseDiagnostica: formulario.hipoteseDiagnostica || '',
      condutaMedica: formulario.condutaMedica || '',
      observacoes: formulario.observacoes || '',
      sinaisVitais: {
        peso: formulario.sinaisVitais?.peso || '',
        altura: formulario.sinaisVitais?.altura || '',
        pressaoArterial: formulario.sinaisVitais?.pressaoArterial || '',
        temperatura: formulario.sinaisVitais?.temperatura || '',
        alergias: camposMedicosEditaveis.alergias,
        condicoesCronicas: camposMedicosEditaveis.condicoes_cronicas,
        medicamentosUsoContinuo: camposMedicosEditaveis.medicamentos_uso_continuo
      },
      prescricoes: prescricoes
    };

    atualizarProntuarioMutation.mutate(dtoProntuario, {
      onSuccess: () => {
        setFormularioSalvo(true);
        // Atualizar os dados do paciente localmente
        if (prontuario) {
          prontuario.paciente.alergias = camposMedicosEditaveis.alergias;
          prontuario.paciente.condicoes_cronicas = camposMedicosEditaveis.condicoes_cronicas;
          prontuario.paciente.medicamentos_uso_continuo = camposMedicosEditaveis.medicamentos_uso_continuo;
          prontuario.paciente.ultima_atualizacao = new Date().toISOString();
        }
      }
    });
  };

  const finalizarConsulta = () => {
    const dadosAtualizacao: AtualizarConsultaReq = {
      id: idConsultaNumber,
      status: 2
    };
    
    finalizarConsultaMutation.mutate(dadosAtualizacao);
  };

  // Funções para o chat com IA
  const enviarMensagem = async () => {
    if (!mensagemAtual.trim()) return;

    const novaMensagem = {
      id: Date.now().toString(),
      tipo: 'usuario' as const,
      mensagem: mensagemAtual,
      timestamp: new Date()
    };

    setMensagensChat(prev => [...prev, novaMensagem]);
    const mensagemParaEnviar = mensagemAtual;
    setMensagemAtual('');

    try {
      const request: AssistenteRequest = {
        content: mensagemParaEnviar
      };
      
      sendMessage(request);
    } catch (error) {
      toast.error('Erro ao enviar mensagem');
    }
  };

  // Effect para processar resposta da assistente
  React.useEffect(() => {
    if (respostaAssistente && respostaAssistente.content) {
      const content = respostaAssistente.content;
      const respostaIA = {
        id: (Date.now() + 1).toString(),
        tipo: 'ia' as const,
        mensagem: `Diagnóstico: ${content.diagnostico || 'Não especificado'}\n\nConduta: ${content.conduta || 'Não especificada'}\n\nObservações: ${content.observacoes || 'Nenhuma observação'}`,
        timestamp: new Date(),
        dadosEstruturados: content
      };

      setMensagensChat(prev => [...prev, respostaIA]);
    }
  }, [respostaAssistente]);

  // Effect para tratar erros da assistente
  React.useEffect(() => {
    if (erroAssistente) {
      toast.error('Erro ao processar mensagem com a assistente');
    }
  }, [erroAssistente]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  // Função para formatar queixas principais em formato médico formal
  // Exemplo: ["vermelhidão", "coceira na pele"] -> "Paciente relata vermelhidão e coceira na pele."
  const formatarQueixasPrincipais = (queixas: string[]) => {
    if (!queixas || queixas.length === 0) return '';
    
    // Apenas capitalizar primeira letra de cada queixa, mantendo as palavras originais
    const queixasFormatadas = queixas.map(queixa => 
      queixa.charAt(0).toUpperCase() + queixa.slice(1).toLowerCase()
    );
    
    // Formatar como texto médico formal
    if (queixasFormatadas.length === 1) {
      return `Paciente relata ${queixasFormatadas[0]}.`;
    } else if (queixasFormatadas.length === 2) {
      return `Paciente relata ${queixasFormatadas[0]} e ${queixasFormatadas[1]}.`;
    } else {
      const ultimaQueixa = queixasFormatadas.pop();
      return `Paciente relata ${queixasFormatadas.join(', ')} e ${ultimaQueixa}.`;
    }
  };

  // Função para formatar conduta médica com estrutura formal
  const formatarCondutaMedica = (conduta: string) => {
    if (!conduta) return '';
    
    // Adicionar estrutura formal se não começar com verbo de recomendação
    const condutaLower = conduta.toLowerCase().trim();
    const verbosRecomendacao = ['recomenda-se', 'sugere-se', 'orienta-se', 'prescreve-se', 'indica-se'];
    
    if (verbosRecomendacao.some(verbo => condutaLower.startsWith(verbo))) {
      return conduta.charAt(0).toUpperCase() + conduta.slice(1);
    }
    
    return `Recomenda-se ${conduta.toLowerCase()}`;
  };

  // Função para formatar observações com estrutura formal
  const formatarObservacoes = (observacoes: string) => {
    if (!observacoes) return '';
    
    // Adicionar estrutura formal se não começar com verbo de observação
    const observacoesLower = observacoes.toLowerCase().trim();
    const verbosObservacao = ['observa-se', 'nota-se', 'verifica-se', 'constata-se', 'recomenda-se'];
    
    if (verbosObservacao.some(verbo => observacoesLower.startsWith(verbo))) {
      return observacoes.charAt(0).toUpperCase() + observacoes.slice(1);
    }
    
    return `Observa-se ${observacoes.toLowerCase()}`;
  };

  const aceitarSugestao = (mensagemId: string) => {
    const mensagem = mensagensChat.find(m => m.id === mensagemId);
    
    if (mensagem?.dadosEstruturados) {
      const dados = mensagem.dadosEstruturados;
      
      // Formatar queixas principais para anamnese
      const anamneseFormatada = formatarQueixasPrincipais(dados.queixaPrincipal || []);
      
      // Formatar conduta médica com estrutura formal
      const condutaFormatada = formatarCondutaMedica(dados.conduta || '');
      
      // Formatar observações com estrutura formal
      const observacoesFormatadas = formatarObservacoes(dados.observacoes || '');
      
      // Aplicar automaticamente os dados da assistente nos campos do prontuário
      setFormulario(prev => ({
        ...prev,
        anamnese: anamneseFormatada || prev.anamnese,
        hipoteseDiagnostica: dados.diagnostico || prev.hipoteseDiagnostica,
        condutaMedica: condutaFormatada || prev.condutaMedica,
        observacoes: observacoesFormatadas || prev.observacoes
      }));

      // Adicionar prescrições sugeridas
      if (dados.prescricao && Array.isArray(dados.prescricao) && dados.prescricao.length > 0) {
        const novasPrescricoes = dados.prescricao.map((med: any) => ({
          id_prontuario: prontuario?.prontuario.id_prontuario || 0,
          id_consulta: idConsultaNumber,
          medicamento: med.nome || '',
          dosagem: med.dose || '',
          instrucoes: med.frequencia || '',
          controlado: false,
          ativo: true
        }));
        
        setPrescricoes(prev => [...prev, ...novasPrescricoes]);
      }
    }

    setMensagensChat(prev => 
      prev.map(mensagem => 
        mensagem.id === mensagemId 
          ? { ...mensagem, sugestaoAceita: true, sugestaoNegada: false }
          : mensagem
      )
    );
    toast.success('Sugestão aceita e aplicada automaticamente!');
  };

  const negarSugestao = (mensagemId: string) => {
    setMensagensChat(prev => 
      prev.map(mensagem => 
        mensagem.id === mensagemId 
          ? { ...mensagem, sugestaoAceita: false, sugestaoNegada: true }
          : mensagem
      )
    );
    toast.info('Sugestão negada');
  };

  // Funções para edição dos campos médicos
  const iniciarEdicaoCamposMedicos = () => {
    setEditandoCamposMedicos(true);
  };

  const handleCampoMedicoChange = (campo: keyof typeof camposMedicosEditaveis, valor: string) => {
    setCamposMedicosEditaveis(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  // Função para abrir modal do histórico
  const abrirModalHistorico = async (consulta: any) => {
    setConsultaSelecionada(consulta);
    setModalHistoricoAberta(true);
    setCarregandoProntuarioHistorico(true);
    
    try {
      const idConsultaNumber = parseInt(consulta.idConsulta, 10);
      
      // Validar se os IDs são números válidos
      if (isNaN(idPacienteNumber) || isNaN(idConsultaNumber)) {
        throw new Error('IDs inválidos');
      }
      
      console.log('Buscando prontuário:', { 
        idPacienteNumber, 
        idConsultaNumber, 
        idPacienteType: typeof idPacienteNumber,
        idConsultaType: typeof idConsultaNumber,
        consulta 
      });
      
      const response = await buscarProntuarioPaciente(idPacienteNumber, idConsultaNumber);
      setProntuarioHistorico(response.data);
    } catch (error) {
      console.error('Erro ao carregar prontuário do histórico:', error);
      toast.error('Erro ao carregar prontuário da consulta');
    } finally {
      setCarregandoProntuarioHistorico(false);
    }
  };

  // Função para fechar modal do histórico
  const fecharModalHistorico = () => {
    setModalHistoricoAberta(false);
    setConsultaSelecionada(null);
    setProntuarioHistorico(null);
  };

  if (carregandoProntuario) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Carregando prontuário...</Typography>
      </Box>
    );
  }

  if (error || !prontuario) {
    return (
      <Alert severity="error">
        Erro ao carregar prontuário. Tente novamente.
      </Alert>
    );
  }

  const { paciente } = prontuario;

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', p: 3 }}>
      {/* Cabeçalho com botão de voltar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/atendimentos')} sx={{ color: '#64748b' }}>
            <MdArrowBack size={24} />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: '600', color: '#1e293b' }}>
            Prontuário de Atendimento
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ mb: 3, borderRadius: '12px' }}>
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
                  <Typography variant="h6" sx={{ fontWeight: '600', color: '#1e293b', mb: 0.5 }}>
                    {paciente.nome}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    {calcularIdade(paciente.data_nascimento)} anos • {format(new Date(paciente.data_nascimento), 'dd/MM/yyyy', { locale: ptBR })}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Imprimir">
                    <IconButton onClick={() => window.print()}>
                      <MdPrint />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Dados do Prontuário */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#1e293b', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  📋 Dados do Prontuário
                </Typography>
                <Box sx={{ 
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  p: 3,
                  border: '1px solid #e2e8f0'
                }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                        Data de Criação
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#1e293b' }}>
                        {format(new Date(prontuario.prontuario.data_criacao), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                        Última Atualização
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#1e293b' }}>
                        {format(new Date(), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                        Descrição do Prontuário
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#1e293b' }}>
                        Prontuário da consulta do dia {format(new Date(), 'dd/MM/yyyy', { locale: ptBR })}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              {/* Informações médicas importantes */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#dc2626' }}>
                    ⚠️ Informações Médicas Importantes
                  </Typography>
                  {!editandoCamposMedicos && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={iniciarEdicaoCamposMedicos}
                      sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                        fontWeight: '500',
                        borderColor: '#dc2626',
                        color: '#dc2626',
                        '&:hover': {
                          borderColor: '#b91c1c',
                          backgroundColor: '#fef2f2'
                        }
                      }}
                    >
                      ✏️ Editar
                    </Button>
                  )}
                </Box>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
                  {/* Alergias */}
                  <Box sx={{ 
                    p: 2, 
                    backgroundColor: camposMedicosEditaveis.alergias ? '#fef2f2' : '#f8fafc', 
                    borderRadius: '8px', 
                    border: camposMedicosEditaveis.alergias ? '1px solid #fecaca' : '1px solid #e2e8f0'
                  }}>
                    <Typography variant="subtitle2" sx={{ 
                      color: camposMedicosEditaveis.alergias ? '#dc2626' : '#64748b', 
                      fontWeight: '600', 
                      mb: 0.5 
                    }}>
                      Alergias
                    </Typography>
                    {editandoCamposMedicos ? (
                      <TextField
                        multiline
                        rows={2}
                        fullWidth
                        value={camposMedicosEditaveis.alergias}
                        onChange={(e) => handleCampoMedicoChange('alergias', e.target.value)}
                        placeholder="Digite as alergias do paciente..."
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white'
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body2" sx={{ 
                        color: camposMedicosEditaveis.alergias ? '#991b1b' : '#9ca3af',
                        fontStyle: camposMedicosEditaveis.alergias ? 'normal' : 'italic'
                      }}>
                        {camposMedicosEditaveis.alergias || 'Nenhuma alergia registrada'}
                      </Typography>
                    )}
                  </Box>
                  
                  {/* Condições Crônicas */}
                  <Box sx={{ 
                    p: 2, 
                    backgroundColor: camposMedicosEditaveis.condicoes_cronicas ? '#fef2f2' : '#f8fafc', 
                    borderRadius: '8px', 
                    border: camposMedicosEditaveis.condicoes_cronicas ? '1px solid #fecaca' : '1px solid #e2e8f0'
                  }}>
                    <Typography variant="subtitle2" sx={{ 
                      color: camposMedicosEditaveis.condicoes_cronicas ? '#dc2626' : '#64748b', 
                      fontWeight: '600', 
                      mb: 0.5 
                    }}>
                      Condições Crônicas
                    </Typography>
                    {editandoCamposMedicos ? (
                      <TextField
                        multiline
                        rows={2}
                        fullWidth
                        value={camposMedicosEditaveis.condicoes_cronicas}
                        onChange={(e) => handleCampoMedicoChange('condicoes_cronicas', e.target.value)}
                        placeholder="Digite as condições crônicas do paciente..."
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white'
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body2" sx={{ 
                        color: camposMedicosEditaveis.condicoes_cronicas ? '#991b1b' : '#9ca3af',
                        fontStyle: camposMedicosEditaveis.condicoes_cronicas ? 'normal' : 'italic'
                      }}>
                        {camposMedicosEditaveis.condicoes_cronicas || 'Nenhuma condição crônica registrada'}
                      </Typography>
                    )}
                  </Box>
                  
                  {/* Medicamentos em Uso Contínuo */}
                  <Box sx={{ 
                    p: 2, 
                    backgroundColor: camposMedicosEditaveis.medicamentos_uso_continuo ? '#fef2f2' : '#f8fafc', 
                    borderRadius: '8px', 
                    border: camposMedicosEditaveis.medicamentos_uso_continuo ? '1px solid #fecaca' : '1px solid #e2e8f0'
                  }}>
                    <Typography variant="subtitle2" sx={{ 
                      color: camposMedicosEditaveis.medicamentos_uso_continuo ? '#dc2626' : '#64748b', 
                      fontWeight: '600', 
                      mb: 0.5 
                    }}>
                      Medicamentos em Uso Contínuo
                    </Typography>
                    {editandoCamposMedicos ? (
                      <TextField
                        multiline
                        rows={2}
                        fullWidth
                        value={camposMedicosEditaveis.medicamentos_uso_continuo}
                        onChange={(e) => handleCampoMedicoChange('medicamentos_uso_continuo', e.target.value)}
                        placeholder="Digite os medicamentos em uso contínuo..."
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white'
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body2" sx={{ 
                        color: camposMedicosEditaveis.medicamentos_uso_continuo ? '#991b1b' : '#9ca3af',
                        fontStyle: camposMedicosEditaveis.medicamentos_uso_continuo ? 'normal' : 'italic'
                      }}>
                        {camposMedicosEditaveis.medicamentos_uso_continuo || 'Nenhum medicamento em uso contínuo registrado'}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Sinais Vitais */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#1e293b', mb: 2 }}>
                  Sinais Vitais
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Peso (kg)"
                      value={formulario.sinaisVitais?.peso || ''}
                      onChange={(e) => handleSinaisVitaisChange('peso', e.target.value)}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Altura (cm)"
                      value={formulario.sinaisVitais?.altura || ''}
                      onChange={(e) => handleSinaisVitaisChange('altura', e.target.value)}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Pressão Arterial"
                      value={formulario.sinaisVitais?.pressaoArterial || ''}
                      onChange={(e) => handleSinaisVitaisChange('pressaoArterial', e.target.value)}
                      fullWidth
                      size="small"
                      placeholder="120/80"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Temperatura (°C)"
                      value={formulario.sinaisVitais?.temperatura || ''}
                      onChange={(e) => handleSinaisVitaisChange('temperatura', e.target.value)}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Anamnese */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#1e293b', mb: 2 }}>
                  Anamnese
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  value={formulario.anamnese}
                  onChange={(e) => handleInputChange('anamnese', e.target.value)}
                  placeholder="Descreva a história da doença atual, queixas principais, sintomas..."
                  data-campo="anamnese"
                />
              </Box>

              {/* Prescrições */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#1e293b' }}>
                    Prescrições
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<span style={{ fontSize: '18px' }}>+</span>}
                    onClick={adicionarPrescricao}
                    sx={{
                      borderRadius: '20px',
                      textTransform: 'none',
                      fontWeight: '500'
                    }}
                  >
                    Adicionar Medicamento
                  </Button>
                </Box>
                
                {prescricoes.length === 0 ? (
                  <Box sx={{
                    p: 3,
                    textAlign: 'center',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '2px dashed #e2e8f0'
                  }}>
                    <Typography variant="body2" sx={{ color: '#9ca3af', mb: 1 }}>
                      Nenhuma prescrição adicionada
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                      Clique em "Adicionar Medicamento" para começar
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {prescricoes.map((prescricao, index) => (
                      <Card key={index} sx={{ p: 2, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: '600' }}>
                            Medicamento {index + 1}
                          </Typography>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => removerPrescricao(index)}
                            sx={{ minWidth: 'auto', p: 0.5 }}
                          >
                            ✕
                          </Button>
                        </Box>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Nome do Medicamento"
                              value={prescricao.medicamento}
                              onChange={(e) => atualizarPrescricao(index, 'medicamento', e.target.value)}
                              fullWidth
                              size="small"
                              placeholder="Ex: Paracetamol"
                            />
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <TextField
                              label="Dose"
                              value={prescricao.dosagem}
                              onChange={(e) => atualizarPrescricao(index, 'dosagem', e.target.value)}
                              fullWidth
                              size="small"
                              placeholder="Ex: 500mg"
                            />
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <TextField
                              label="Frequência"
                              value={prescricao.instrucoes}
                              onChange={(e) => atualizarPrescricao(index, 'instrucoes', e.target.value)}
                              fullWidth
                              size="small"
                              placeholder="Ex: 8/8h"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={prescricao.controlado === true}
                                  onChange={(e) => atualizarPrescricao(index, 'controlado', e.target.checked)}
                                  color="primary"
                                />
                              }
                              label="Medicamento Controlado"
                              sx={{ 
                                '& .MuiFormControlLabel-label': { 
                                  fontSize: '0.875rem',
                                  color: '#64748b'
                                }
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                  </Box>
                )}
              </Box>

              {/* Hipótese Diagnóstica */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#1e293b', mb: 2 }}>
                  Hipótese Diagnóstica
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  value={formulario.hipoteseDiagnostica}
                  onChange={(e) => handleInputChange('hipoteseDiagnostica', e.target.value)}
                  placeholder="Descreva as hipóteses diagnósticas..."
                  data-campo="hipoteseDiagnostica"
                />
              </Box>

              {/* Conduta Médica */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#1e293b', mb: 2 }}>
                  Conduta Médica
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  value={formulario.condutaMedica}
                  onChange={(e) => handleInputChange('condutaMedica', e.target.value)}
                  placeholder="Descreva o plano de tratamento, prescrições, orientações..."
                  data-campo="condutaMedica"
                />
              </Box>

              {/* Observações */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#1e293b', mb: 2 }}>
                  Observações
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  value={formulario.observacoes}
                  onChange={(e) => handleInputChange('observacoes', e.target.value)}
                  placeholder="Observações adicionais..."
                  data-campo="observacoes"
                />
              </Box>

              {/* Botões de ação */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={salvarProntuario}
                  disabled={atualizarProntuarioMutation.isLoading}
                  startIcon={<MdSave />}
                >
                  {atualizarProntuarioMutation.isLoading ? 'Salvando...' : 'Salvar'}
                </Button>
                <Button
                  variant="contained"
                  onClick={finalizarConsulta}
                  disabled={!formularioSalvo || atualizarProntuarioMutation.isLoading || finalizarConsultaMutation.isLoading}
                  startIcon={<MdSend />}
                  sx={{ backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' } }}
                >
                  {finalizarConsultaMutation.isLoading ? 'Finalizando...' : 'Finalizar Consulta'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar com chat e histórico */}
        <Grid item xs={12} lg={4}>
          {/* Chat com IA */}
          <Card sx={{ borderRadius: '12px', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#1e293b', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MdChat size={20} />
                Dra. Certa - Assistente IA
              </Typography>
              
              {/* Área de mensagens */}
              <Box sx={{ 
                height: '450px', 
                overflowY: 'auto', 
                mb: 2, 
                p: 2, 
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                {mensagensChat.length === 0 ? (
                  <Typography variant="body2" sx={{ color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', py: 4 }}>
                    Inicie uma conversa com a Dra. Certa
                  </Typography>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {mensagensChat.map((mensagem) => (
                      <Box
                        key={mensagem.id}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: mensagem.tipo === 'usuario' ? 'flex-end' : 'flex-start',
                          mb: 2
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: '80%',
                            p: 2,
                            borderRadius: '12px',
                            backgroundColor: mensagem.tipo === 'usuario' ? '#3b82f6' : '#f1f5f9',
                            color: mensagem.tipo === 'usuario' ? 'white' : '#1e293b',
                            border: mensagem.tipo === 'ia' ? '1px solid #e2e8f0' : 'none'
                          }}
                        >
                          {mensagem.tipo === 'ia' && mensagem.dadosEstruturados ? (
                            <Box>
                              {/* Queixa Principal */}
                              {mensagem.dadosEstruturados.queixaPrincipal && mensagem.dadosEstruturados.queixaPrincipal.length > 0 && (
                                <Box sx={{ mb: 2 }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: '600', mb: 0.5 }}>
                                    Queixa Principal:
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {mensagem.dadosEstruturados.queixaPrincipal.map((queixa: string, index: number) => (
                                      <Chip 
                                        key={index} 
                                        label={queixa} 
                                        size="small"
                                        sx={{ 
                                          backgroundColor: '#dbeafe', 
                                          color: '#1e40af',
                                          fontSize: '0.7rem'
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </Box>
                              )}

                              {/* Diagnóstico */}
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: '600', mb: 0.5 }}>
                                  Diagnóstico:
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  p: 1, 
                                  backgroundColor: '#fef2f2', 
                                  borderRadius: '4px',
                                  color: '#dc2626',
                                  fontWeight: '500'
                                }}>
                                  {mensagem.dadosEstruturados.diagnostico || 'Não especificado'}
                                </Typography>
                              </Box>

                              {/* Conduta */}
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: '600', mb: 0.5 }}>
                                  Conduta:
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  p: 1, 
                                  backgroundColor: '#f0f9ff', 
                                  borderRadius: '4px',
                                  color: '#0369a1'
                                }}>
                                  {mensagem.dadosEstruturados.conduta || 'Não especificada'}
                                </Typography>
                              </Box>

                              {/* Prescrições */}
                              {mensagem.dadosEstruturados.prescricao && Array.isArray(mensagem.dadosEstruturados.prescricao) && mensagem.dadosEstruturados.prescricao.length > 0 && (
                                <Box sx={{ mb: 2 }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: '600', mb: 0.5 }}>
                                    Prescrições Sugeridas:
                                  </Typography>
                                  {mensagem.dadosEstruturados.prescricao.map((med: any, index: number) => (
                                    <Box key={index} sx={{ 
                                      p: 1, 
                                      backgroundColor: '#f0fdf4', 
                                      borderRadius: '4px', 
                                      mb: 0.5,
                                      border: '1px solid #bbf7d0'
                                    }}>
                                      <Typography variant="body2" sx={{ fontWeight: '500', color: '#166534' }}>
                                        {med.nome || 'Medicamento'} - {med.dose || 'Dose não especificada'} - {med.frequencia || 'Frequência não especificada'}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              )}

                              {/* Observações */}
                              <Box sx={{ mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: '600', mb: 0.5 }}>
                                  Observações:
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  p: 1, 
                                  backgroundColor: '#fffbeb', 
                                  borderRadius: '4px',
                                  color: '#d97706'
                                }}>
                                  {mensagem.dadosEstruturados.observacoes || 'Nenhuma observação'}
                                </Typography>
                              </Box>
                            </Box>
                          ) : (
                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                              {mensagem.mensagem}
                            </Typography>
                          )}
                          
                          <Typography variant="caption" sx={{ 
                            opacity: 0.7,
                            fontSize: '0.7rem'
                          }}>
                            {format(mensagem.timestamp, 'HH:mm', { locale: ptBR })}
                          </Typography>
                        </Box>
                        
                        {/* Botões para mensagens da IA */}
                        {mensagem.tipo === 'ia' && (
                          <Box sx={{ 
                            display: 'flex', 
                            gap: 1, 
                            mt: 1,
                            opacity: mensagem.sugestaoAceita || mensagem.sugestaoNegada ? 0.5 : 1
                          }}>
                            <Button
                              size="small"
                              variant={mensagem.sugestaoAceita ? "contained" : "outlined"}
                              color={mensagem.sugestaoAceita ? "success" : "primary"}
                              onClick={() => aceitarSugestao(mensagem.id)}
                              disabled={mensagem.sugestaoAceita || mensagem.sugestaoNegada}
                              sx={{
                                fontSize: '0.75rem',
                                py: 0.5,
                                px: 1.5,
                                borderRadius: '16px',
                                textTransform: 'none',
                                minWidth: 'auto'
                              }}
                            >
                              {mensagem.sugestaoAceita ? '✓ Aceita' : 'Aceitar Sugestão'}
                            </Button>
                            <Button
                              size="small"
                              variant={mensagem.sugestaoNegada ? "contained" : "outlined"}
                              color={mensagem.sugestaoNegada ? "error" : "primary"}
                              onClick={() => negarSugestao(mensagem.id)}
                              disabled={mensagem.sugestaoAceita || mensagem.sugestaoNegada}
                              sx={{
                                fontSize: '0.75rem',
                                py: 0.5,
                                px: 1.5,
                                borderRadius: '16px',
                                textTransform: 'none',
                                minWidth: 'auto'
                              }}
                            >
                              {mensagem.sugestaoNegada ? '✗ Negada' : 'Negar Sugestão'}
                            </Button>
                          </Box>
                        )}
                      </Box>
                    ))}
                    {enviandoMensagem && (
                      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Box sx={{
                          p: 2,
                          borderRadius: '12px',
                          backgroundColor: '#f1f5f9',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}>
                          <CircularProgress size={12} />
                          <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Dra. Certa está digitando...
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>

              {/* Campo de entrada */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  value={mensagemAtual}
                  onChange={(e) => setMensagemAtual(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite o que o paciente está relatando..."
                  size="small"
                  disabled={enviandoMensagem}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                      backgroundColor: '#f8fafc'
                    }
                  }}
                />
                
                  <MdSendMessage size={24} onClick={enviarMensagem} className={'text-medical-secondary cursor-pointer mt-2'} />
              </Box>
            </CardContent>
          </Card>


          {/* Histórico de Consultas */}
          <Card sx={{ borderRadius: '12px' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#1e293b', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MdHistory size={20} />
                Histórico de Consultas ({historicoConsultas.length})
              </Typography>
              
              {carregandoHistorico ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={16} />
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Carregando histórico...
                  </Typography>
                </Box>
              ) : historicoConsultas.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '300px', overflowY: 'auto' }}>
                  {historicoConsultas.map((consulta) => (
                    <Paper
                      key={consulta.idConsulta}
                      onClick={() => abrirModalHistorico(consulta)}
                      sx={{
                        p: 2,
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#f1f5f9',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: '500', color: '#374151' }}>
                          {format(new Date(consulta.dataHora), 'dd/MM/yyyy', { locale: ptBR })}
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
                      <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>
                        <strong>Médico:</strong> {consulta.medico.nome}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>
                        <strong>Especialidade:</strong> {consulta.medico.especialidade}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>
                        <strong>Motivo:</strong> {consulta.motivo}
                      </Typography>
                      {consulta.observacoes && (
                        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.8rem', mt: 1 }}>
                          {consulta.observacoes.length > 100 
                            ? `${consulta.observacoes.substring(0, 100)}...` 
                            : consulta.observacoes
                          }
                        </Typography>
                      )}
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', py: 2 }}>
                  Nenhuma consulta anterior encontrada
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal do Histórico */}
      <ModalProntuarioHistorico
        aberta={modalHistoricoAberta}
        onFechar={fecharModalHistorico}
        consulta={consultaSelecionada}
        prontuario={prontuarioHistorico}
        carregando={carregandoProntuarioHistorico}
      />
    </Box>
  );
};

export default ProntuarioAtendimento;
