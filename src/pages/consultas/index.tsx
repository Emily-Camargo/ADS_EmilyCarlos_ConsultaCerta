import { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { 
  MdCalendarToday,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md';
import Filtro from '../../components/filtro';
import { Button } from '@mantine/core';
import { getStatusColor, getStatusIcon, getTimeSlots, getWeekDays } from './utils/constants';
import { CadastrarConsulta } from './components/modais/cadastrar-consulta';
import { toast } from 'react-toastify';
import { ConsultaCalendario, ConsultaData } from './utils/interfaces';
import { filtroMedico } from './utils/filtro';
import { useAuth } from '../../contexts/AuthContext';
import { postBuscarConsultas } from '../../services/consultas';
import { ConsultaRes } from '../../services/consultas/interface';

const ConsultasPage = () => {
  const { user } = useAuth();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [modalCadastrar, setModalCadastrar] = useState(false);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState<ConsultaData | null>(null);
  const [filtroMedicoSelecionado, setFiltroMedicoSelecionado] = useState<string>('');
  const [consultas, setConsultas] = useState<ConsultaRes[]>([]);
  const [loading, setLoading] = useState(false);
  const weekDays = getWeekDays(currentWeek);
  const timeSlots = getTimeSlots();

  const alturaMinima = 80;
  const alturaPorConsulta = 75;

  // Função para buscar consultas da API
  useEffect(() => {
    buscarConsultas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeek, filtroMedicoSelecionado]);

  const buscarConsultas = async () => {
    try {
      setLoading(true);
      const dataInicio = weekDays[0].toISOString().split('T')[0];
      const dataFim = weekDays[4].toISOString().split('T')[0];
      
      // Se o usuário for médico (idPerfil === 3), envia o idMedico dele
      let idMedicoParam: number | undefined = undefined;
      
      if (user?.idPerfil === 3 && user?.medico?.idMedico) {
        idMedicoParam = user.medico.idMedico;
      } else if (filtroMedicoSelecionado) {
        idMedicoParam = parseInt(filtroMedicoSelecionado);
      }
  
      
      const response = await postBuscarConsultas({
        dataInicio,
        dataFim,
        idMedico: idMedicoParam,
      });
      
      setConsultas(response.data);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      toast.error('Erro ao carregar consultas');
    } finally {
      setLoading(false);
    }
  };

  // Função para extrair horário formatado (HH:mm) de uma data ISO
  const extrairHorario = (dataHora: string): string => {
    const data = new Date(dataHora);
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  };

  // Função para converter ConsultaRes para ConsultaCalendario
  const converterParaCalendario = (consulta: ConsultaRes): ConsultaCalendario => {
    return {
      id: consulta.idConsulta,
      paciente: consulta.paciente.nome,
      medico: consulta.medico.nome,
      horario: extrairHorario(consulta.dataHora),
      status: consulta.status.toLowerCase(), // Normalizar para minúsculo
      dataCompleta: consulta,
    };
  };

  // Função para obter consultas de um dia específico
  const getConsultasForDay = (dayIndex: number): ConsultaCalendario[] => {
    const dia = weekDays[dayIndex];
    
    const consultasFiltradas = consultas.filter(consulta => {
      const dataConsulta = new Date(consulta.dataHora);
      const match = (
        dataConsulta.getDate() === dia.getDate() &&
        dataConsulta.getMonth() === dia.getMonth() &&
        dataConsulta.getFullYear() === dia.getFullYear()
      );
      
      if (dayIndex === 0 && consultas.length > 0) {
        console.log(`Comparando consulta ${consulta.idConsulta}:`, {
          dataConsulta: dataConsulta.toISOString(),
          dia: dia.toISOString(),
          dataConsultaDate: dataConsulta.getDate(),
          diaDate: dia.getDate(),
          match
        });
      }
      
      return match;
    });
    
    return consultasFiltradas.map(converterParaCalendario);
  };

  const calcularAlturaHorario = (time: string) => {
    let maxConsultas = 0;
    weekDays.forEach((_, dayIndex) => {
      const consultasDoDia = getConsultasForDay(dayIndex);
      
      const consultasDoHorario = consultasDoDia.filter(c => c?.horario === time);
      maxConsultas = Math.max(maxConsultas, consultasDoHorario.length);
    });
    
    return Math.max(alturaMinima, maxConsultas * alturaPorConsulta);
  };

  const handleCadastrarConsulta = () => {
    toast.success('Consulta cadastrada com sucesso!');
    setModalCadastrar(false);
    buscarConsultas();
  };

  const handleVisualizarConsulta = (consulta: ConsultaData) => {
    console.log('Consulta selecionada:', consulta);
    toast.info('Modal de visualização será implementado em breve');
  };

  const handleConfirmarConsulta = () => {
    toast.success('Consulta confirmada com sucesso!');
    setModalVisualizar(false);
    setConsultaSelecionada(null);
  };

  const handleCancelarConsulta = () => {
    toast.success('Consulta cancelada com sucesso!');
    setModalVisualizar(false);
    setConsultaSelecionada(null);
  };

  const handleReagendarConsulta = () => {
    setModalVisualizar(false);
    // Aqui você pode implementar a lógica de reagendamento
    toast.info('Funcionalidade de reagendamento será implementada em breve');
  };

  const handleFiltroSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const medico = formData.get('medico') as string;
    setFiltroMedicoSelecionado(medico);
  };

  const handleMedicoChange = (_event: React.SyntheticEvent, value: any) => {
    if (value && typeof value === 'object' && 'value' in value) {
      setFiltroMedicoSelecionado(value.value);
    } else {
      setFiltroMedicoSelecionado('');
    }
  };

  const handleLimparFiltros = () => {
    setFiltroMedicoSelecionado('');
  };

  // Função para converter dados da API para ConsultaData
  const converterParaConsultaData = (consultaCalendario: ConsultaCalendario): ConsultaData => {
    const consulta = consultaCalendario.dataCompleta;
    return {
      id_consulta: consulta.idConsulta,
      id_paciente: consulta.idPaciente,
      id_medico: consulta.idMedico,
      data_hora: consulta.dataHora,
      observacoes: consulta.observacoes,
      valor_consulta: consulta.valorConsulta,
      status: consulta.status as 'agendada' | 'confirmada' | 'concluida' | 'cancelada',
      criado_em: consulta.criadoEm,
      atualizado_em: consulta.atualizadoEm,
      paciente: {
        id_paciente: consulta.paciente.idPaciente,
        nome_paciente: consulta.paciente.nome,
        cpf: consulta.paciente.cpf,
        celular: consulta.paciente.telefone,
        id_usuario: consulta.criadoPor,
        data_nascimento: '',
        genero: '',
        tipo_sanguineo: '',
        convenio: '',
        numero_carteirinha: '',
        contato_emergencia_nome: '',
        contato_emergencia_telefone: '',
        observacoes: ''
      },
      medico: {
        id_medico: consulta.medico.idMedico,
        nome_medico: consulta.medico.nome,
        especialidade: consulta.medico.especialidade,
        crm: consulta.medico.crm,
        ativo: true
      }
    };
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh', 
      backgroundColor: '#f8fafc',
    }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Mostrar filtro apenas se NÃO for médico (idPerfil !== 3) */}
        {user?.idPerfil !== 3 && (
          <Box sx={{ p: 3, pb: 0 }}>
            <Filtro 
              inputSelect={[{
                ...filtroMedico,
                onChange: handleMedicoChange
              }]}
              onSubmit={handleFiltroSubmit}
              onClear={handleLimparFiltros}
            />
          </Box>
        )}

        {user?.idPerfil === 2 && (
          <Box sx={{ p: 3, pt: 0, display: 'flex', justifyContent: 'flex-start' }}>
            <Button 
              variant="gradient" 
              gradient={{ from: '#1D4ED8', to: '#1E3A8A' }} 
              size="xs"
              onClick={() => setModalCadastrar(true)}
            >
              Cadastrar Consulta
            </Button>
          </Box>
        )}

        <Box sx={{ flex: 1, px: 3, pb: 3, pt: user?.idPerfil === 3 ? 3 : 0 }}>
          {loading && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              py: 2
            }}>
              <Typography variant="body2" color="textSecondary">
                Carregando consultas...
              </Typography>
            </Box>
          )}
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MdCalendarToday color="#64748b" />
                <Typography variant="body2" sx={{ 
                  color: '#64748b', // cor mais suave
                  fontWeight: 500
                }}>
                  Semana de {weekDays[0].toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })} a {weekDays[4].toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </Typography>
              </Box>
              
            </Box>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentWeek(new Date(currentWeek.getTime() - 5 * 24 * 60 * 60 * 1000))}
                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                <MdChevronLeft size={20} />
              </button>
              
              <button
                onClick={() => setCurrentWeek(new Date())}
                className="px-2 py-1 text-xs font-medium text-gray-500 border border-gray-300 rounded hover:border-gray-400 hover:text-gray-600 transition-colors"
              >
                HOJE
              </button>
              
              <button
                onClick={() => setCurrentWeek(new Date(currentWeek.getTime() + 5 * 24 * 60 * 60 * 1000))}
                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                <MdChevronRight size={20} />
              </button>
            </div>
          </Box>

          <Paper sx={{ 
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <Box sx={{ display: 'flex' }}>
              {/* Coluna de Horários */}
              <Box sx={{ 
                width: 80, 
                borderRight: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc'
              }}>
                <Box sx={{ 
                  height: 80, 
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f1f5f9'
                }}>
                  <Typography variant="caption" sx={{ 
                    fontWeight: '600', 
                    color: '#64748b',
                    textTransform: 'uppercase'
                  }}>
                    Horário
                  </Typography>
                </Box>
                {timeSlots.map((time) => (
                  <Box key={time} sx={{ 
                    height: calcularAlturaHorario(time), 
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white'
                  }}>
                    <Typography variant="body2" sx={{ 
                      fontWeight: '500', 
                      color: '#374151'
                    }}>
                      {time}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Colunas dos Dias */}
              {weekDays.map((day, dayIndex) => {
                const consultasDoDia = getConsultasForDay(dayIndex);
                
                return (
                  <Box key={dayIndex} sx={{ 
                    flex: 1, 
                    borderRight: dayIndex < 4 ? '1px solid #e2e8f0' : 'none',
                    backgroundColor: 'white'
                  }}>
                    {/* Cabeçalho do Dia */}
                    <Box sx={{ 
                      height: 80, 
                      borderBottom: '1px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f8fafc'
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: '600', 
                        color: '#64748b',
                        textTransform: 'capitalize'
                      }}>
                        {day.toLocaleDateString('pt-BR', { weekday: 'long' })}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: '#64748b'
                      }}>
                        {day.getDate()}/{day.getMonth() + 1}/{day.getFullYear()}
                      </Typography>
                    </Box>

                    {/* Slots de Horário - Todos os horários */}
                    {timeSlots.map((time, timeIndex) => {
                      const consultasDoHorario = consultasDoDia.filter(c => c?.horario === time);
                      const alturaHorario = calcularAlturaHorario(time);
                      
                      return (
                        <Box key={timeIndex} sx={{ 
                          height: alturaHorario, 
                          borderBottom: '1px solid #e2e8f0',
                          position: 'relative',
                          backgroundColor: 'white',
                          cursor: consultasDoHorario.length > 0 ? 'pointer' : 'default',
                          '&:hover': {
                            backgroundColor: consultasDoHorario.length > 0 ? '#f8fafc' : 'white'
                          }
                        }}>
                          {consultasDoHorario.map((consulta, consultaIndex) => {
                            const topPosition = consultaIndex * alturaPorConsulta + 4;
                            
                            return (
                              <Box key={consulta.id} sx={{
                                position: 'absolute',
                                top: topPosition,
                                left: 4,
                                right: 4,
                                height: alturaPorConsulta - 8,
                                backgroundColor: consulta.status === 'concluida' ? '#dcfce7' : 
                                             consulta.status === 'cancelada' ? '#fee2e2' : 
                                             consulta.status === 'confirmada' ? '#dbeafe' : 
                                             consulta.status === 'agendada' ? '#fef3c7' : '#fef3c7',
                                borderRadius: '6px',
                                border: `1px solid ${getStatusColor(consulta.status)}`,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                p: 1,
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: consulta.status === 'concluida' ? '#bbf7d0' : 
                                               consulta.status === 'cancelada' ? '#fecaca' : 
                                               consulta.status === 'confirmada' ? '#bfdbfe' : 
                                               consulta.status === 'agendada' ? '#fde68a' : '#fde68a',
                                }
                              }}
                              onClick={() => handleVisualizarConsulta(converterParaConsultaData(consulta))}
                              >
                                <Typography variant="caption" sx={{ 
                                  fontWeight: '600',
                                  color: '#1e293b',
                                  textAlign: 'center',
                                  lineHeight: 1.2,
                                  fontSize: '10px',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  width: '100%'
                                }}>
                                  Paciente: {consulta.paciente}
                                </Typography>
                                <Typography variant="caption" sx={{ 
                                  color: '#64748b',
                                  textAlign: 'center',
                                  lineHeight: 1.2,
                                  fontSize: '9px',
                                  fontWeight: '500',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  width: '100%'
                                }}>
                                  Médico: {consulta.medico}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                  {getStatusIcon(consulta.status)}
                                  <Typography variant="caption" sx={{ 
                                    color: getStatusColor(consulta.status),
                                    fontWeight: '500',
                                    fontSize: '9px'
                                  }}>
                                    {consulta.status === 'concluida' ? 'Concluída' : 
                                     consulta.status === 'cancelada' ? 'Cancelada' : 
                                     consulta.status === 'confirmada' ? 'Confirmada' : 
                                     consulta.status === 'agendada' ? 'Agendada' : 'Aguardando'}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Box>
      </Box>

       <CadastrarConsulta
        modal={modalCadastrar}
        setModal={setModalCadastrar}
        onConfirmar={handleCadastrarConsulta}
      />

      <CadastrarConsulta
        modal={modalVisualizar}
        setModal={setModalVisualizar}
        onConfirmar={() => {}}
        consultaParaEditar={consultaSelecionada}
        modoVisualizacao={true}
        onConfirmarConsulta={handleConfirmarConsulta}
        onCancelarConsulta={handleCancelarConsulta}
        onReagendarConsulta={handleReagendarConsulta}
      /> 
    </Box>
  );
};

export default ConsultasPage;
