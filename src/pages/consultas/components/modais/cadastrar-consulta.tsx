import Dialog from '../../../../components/dialog'
import Button from '../../../../components/button'
import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import InputSelect from '../../../../components/input-mui/input-select'
import Input from '../../../../components/input-mui/input'
import { CadastrarConsultaProps, ConsultaForm, PacienteData } from '../../../consultas/utils/interfaces'
import { toast } from 'react-toastify'
import { getEspecialidades, postEspecialidadesMedico, postHorariosDisponiveis } from '../../../../services/medico'
import { EspecialidadeRes, EspecialidadeMedicoRes, HorariosMedicoRes } from '../../../../services/medico/interface'
import { getBuscarPacientes } from '../../../../services/usuario'
import { InfoUsuarioRes } from '../../../../services/usuario/interface'
import { postAgendarConsulta } from '../../../../services/consultas'

export function CadastrarConsulta({
  modal,
  setModal,
  onConfirmar,
  consultaParaEditar = null,
  modoVisualizacao = false,
  onConfirmarConsulta,
  onCancelarConsulta,
  onReagendarConsulta,
}: Readonly<CadastrarConsultaProps>) {
  const [formData, setFormData] = useState<ConsultaForm>({
    id_paciente: 0,
    id_medico: 0,
    data_hora: '',
    motivo: '',
    observacoes: '',
    valor_consulta: '',
  })
  const [dataSelecionada, setDataSelecionada] = useState('')
  const [horaSelecionada, setHoraSelecionada] = useState('')
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([])
  const [pacientes, setPacientes] = useState<PacienteData[]>([])
  const [pacienteSelecionado, setPacienteSelecionado] = useState<PacienteData | null>(null)
  const [medicoSelecionado, setMedicoSelecionado] = useState<EspecialidadeMedicoRes | null>(null)
  const [especialidades, setEspecialidades] = useState<EspecialidadeRes[]>([])
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState<EspecialidadeRes | null>(null)
  const [medicos, setMedicos] = useState<EspecialidadeMedicoRes[]>([])
  const [carregandoPacientes, setCarregandoPacientes] = useState(false)
  const [carregandoEspecialidades, setCarregandoEspecialidades] = useState(false)
  const [carregandoMedicos, setCarregandoMedicos] = useState(false)
  const [carregandoHorarios, setCarregandoHorarios] = useState(false)

  const isEdicao = !!consultaParaEditar
  const isVisualizacao = modoVisualizacao

  // Carregar dados ao abrir o modal
  useEffect(() => {
    if (modal) {
      carregarPacientes()
      carregarEspecialidades()
    }
  }, [modal])

  // Converter dados da API para o formato PacienteData
  const converterParaPacienteData = (usuarios: InfoUsuarioRes[]): PacienteData[] => {
    return usuarios
      .filter(usuario => usuario.paciente)
      .map(usuario => ({
        id_paciente: usuario.paciente!.idPaciente,
        nome_paciente: usuario.nome,
        cpf: usuario.cpf,
        celular: usuario.telefone,
        id_usuario: usuario.idUsuario,
        data_nascimento: usuario.paciente!.dataNascimento,
        genero: usuario.paciente!.genero,
        tipo_sanguineo: usuario.paciente!.tipoSanguineo,
        convenio: usuario.paciente!.convenio,
        numero_carteirinha: usuario.paciente!.numeroCarteirinha,
        contato_emergencia_nome: usuario.paciente!.contatoEmergenciaNome,
        contato_emergencia_telefone: usuario.paciente!.contatoEmergenciaTelefone,
        observacoes: usuario.paciente!.observacoes,
      }))
  }

  const carregarPacientes = async () => {
    try {
      setCarregandoPacientes(true)
      const response = await getBuscarPacientes()
      const pacientesConvertidos = converterParaPacienteData(response.data)
      setPacientes(pacientesConvertidos)
    } catch (error) {
      toast.error('Erro ao carregar pacientes')
      console.error(error)
    } finally {
      setCarregandoPacientes(false)
    }
  }

  const carregarEspecialidades = async () => {
    try {
      setCarregandoEspecialidades(true)
      const response = await getEspecialidades()
      setEspecialidades(response.data)
    } catch (error) {
      toast.error('Erro ao carregar especialidades')
      console.error(error)
    } finally {
      setCarregandoEspecialidades(false)
    }
  }

  const carregarMedicosPorEspecialidade = async (idEspecialidade: number) => {
    try {
      setCarregandoMedicos(true)
      const response = await postEspecialidadesMedico({ idEspecialidade })
      setMedicos(response.data)
    } catch (error) {
      toast.error('Erro ao carregar médicos')
      console.error(error)
    } finally {
      setCarregandoMedicos(false)
    }
  }

  const carregarHorariosDisponiveis = async (dataInicio: string, idMedico: number) => {
    try {
      setCarregandoHorarios(true)
      const response = await postHorariosDisponiveis({ dataInicio, idMedico })
      
      console.log('Resposta da API de horários:', response.data)
      console.log('Data selecionada:', dataInicio)
      
      // Verificar se a resposta é um array
      if (Array.isArray(response.data)) {
        // Filtrar apenas os horários do dia selecionado
        const horariosDoDia = response.data.find((item: HorariosMedicoRes) => {
          console.log('Comparando:', item.data, 'com', dataInicio)
          return item.data === dataInicio
        })
        
        console.log('Horários do dia encontrado:', horariosDoDia)
        
        if (horariosDoDia && horariosDoDia.horarios && horariosDoDia.horarios.length > 0) {
          setHorariosDisponiveis(horariosDoDia.horarios)
          toast.success(`${horariosDoDia.horarios.length} horários disponíveis`)
        } else {
          setHorariosDisponiveis([])
          toast.info('Não há horários disponíveis para esta data')
        }
      } else {
        // Se não for array, assumir que é um único objeto
        console.log('Resposta não é array, processando como objeto único')
        const dadosHorario = response.data as HorariosMedicoRes
        if (dadosHorario.horarios && dadosHorario.horarios.length > 0) {
          setHorariosDisponiveis(dadosHorario.horarios)
          toast.success(`${dadosHorario.horarios.length} horários disponíveis`)
        } else {
          setHorariosDisponiveis([])
          toast.info('Não há horários disponíveis para esta data')
        }
      }
    } catch (error: any) {
      toast.error('Erro ao carregar horários disponíveis')
      console.error('Erro completo:', error)
      console.error('Resposta do erro:', error?.response?.data)
      setHorariosDisponiveis([])
    } finally {
      setCarregandoHorarios(false)
    }
  }

  useEffect(() => {
    if (consultaParaEditar && modal) {
      setPacienteSelecionado(consultaParaEditar.paciente)
      // Converter MedicoData para EspecialidadeMedicoRes
      const medicoConvertido: EspecialidadeMedicoRes = {
        idMedico: consultaParaEditar.medico.id_medico,
        nome: consultaParaEditar.medico.nome_medico,
        crm: consultaParaEditar.medico.crm,
        especialidade: consultaParaEditar.medico.especialidade,
        valorConsulta: consultaParaEditar.valor_consulta,
        tempoConsulta: 0,
        ativo: consultaParaEditar.medico.ativo
      }
      setMedicoSelecionado(medicoConvertido)
      
      // Separar data e hora
      const dataHora = new Date(consultaParaEditar.data_hora)
      const data = dataHora.toISOString().split('T')[0]
      const hora = dataHora.toTimeString().split(' ')[0].substring(0, 5)
      
      setDataSelecionada(data)
      setHoraSelecionada(hora)
      
      setFormData({
        id_paciente: consultaParaEditar.id_paciente,
        id_medico: consultaParaEditar.id_medico,
        data_hora: consultaParaEditar.data_hora,
        motivo: '',
        observacoes: consultaParaEditar.observacoes || '',
        valor_consulta: consultaParaEditar.valor_consulta?.toString() || '',
      })
    } else if (!modal) {
      setFormData({
        id_paciente: 0,
        id_medico: 0,
        data_hora: '',
        motivo: '',
        observacoes: '',
        valor_consulta: '',
      })
      setPacienteSelecionado(null)
      setMedicoSelecionado(null)
      setDataSelecionada('')
      setHoraSelecionada('')
      setHorariosDisponiveis([])
    }
  }, [consultaParaEditar, modal])

  const cancelar = () => {
    setModal(false)
    setFormData({
      id_paciente: 0,
      id_medico: 0,
      data_hora: '',
      motivo: '',
      observacoes: '',
      valor_consulta: '',
    })
    setPacienteSelecionado(null)
    setMedicoSelecionado(null)
    setEspecialidadeSelecionada(null)
    setMedicos([])
    setDataSelecionada('')
    setHoraSelecionada('')
    setHorariosDisponiveis([])
  }

  const confirmar = async () => {
    if (formData.id_paciente === 0) {
      toast.warn('Selecione um paciente!')
      return
    }

    if (!especialidadeSelecionada) {
      toast.warn('Selecione uma especialidade!')
      return
    }

    if (formData.id_medico === 0) {
      toast.warn('Selecione um médico!')
      return
    }

    if (!dataSelecionada) {
      toast.warn('Selecione a data da consulta!')
      return
    }

    if (!horaSelecionada) {
      toast.warn('Selecione o horário da consulta!')
      return
    }

    if (!formData.motivo || formData.motivo.trim() === '') {
      toast.warn('Informe o motivo da consulta!')
      return
    }

    if (!formData.valor_consulta || parseFloat(formData.valor_consulta) <= 0) {
      toast.warn('Informe um valor válido para a consulta!')
      return
    }

    try {
      // Combinar data e hora
      const dataHoraConsulta = new Date(`${dataSelecionada}T${horaSelecionada}:00`)
      
      // Calcular prazo de confirmação (12 horas antes da consulta)
      const prazoConfirmacaoDate = new Date(dataHoraConsulta.getTime() - (12 * 60 * 60 * 1000))
      const prazoConfirmacao = prazoConfirmacaoDate.toISOString()

      // Preparar dados para envio
      const dadosConsulta = {
        idPaciente: formData.id_paciente,
        idMedico: formData.id_medico,
        dataConsulta: dataSelecionada,
        horarioConsulta: horaSelecionada,
        motivo: formData.motivo,
        observacoes: formData.observacoes || '',
        valorConsulta: parseFloat(formData.valor_consulta),
        confirmada: false,
        prazoConfirmacao
      }

      console.log('Enviando dados da consulta:', dadosConsulta)

      // Chamar API de agendar consulta
      const response = await postAgendarConsulta(dadosConsulta)
      
      toast.success('Consulta agendada com sucesso!')
      
      // Limpar formulário
      setFormData({
        id_paciente: 0,
        id_medico: 0,
        data_hora: '',
        motivo: '',
        observacoes: '',
        valor_consulta: '',
      })
      setPacienteSelecionado(null)
      setMedicoSelecionado(null)
      setEspecialidadeSelecionada(null)
      setMedicos([])
      setDataSelecionada('')
      setHoraSelecionada('')
      setHorariosDisponiveis([])
      setModal(false)
      
      // Chamar callback se existir
      if (onConfirmar) {
        onConfirmar(response.data)
      }
    } catch (error: any) {
      console.error('Erro ao agendar consulta:', error)
      toast.error(error?.response?.data?.message || 'Erro ao agendar consulta')
    }
  }

  const handleInputChange = (field: keyof ConsultaForm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handlePacienteSelect = (
    _event: React.SyntheticEvent,
    value: PacienteData | null
  ) => {
    setPacienteSelecionado(value)
    setFormData(prev => ({
      ...prev,
      id_paciente: value?.id_paciente || 0
    }))
  }

  const handleEspecialidadeSelect = (
    _event: React.SyntheticEvent,
    value: EspecialidadeRes | null
  ) => {
    setEspecialidadeSelecionada(value)
    setMedicoSelecionado(null)
    setMedicos([])
    setFormData(prev => ({
      ...prev,
      id_medico: 0
    }))
    
    if (value) {
      carregarMedicosPorEspecialidade(value.idEspecialidade)
    }
  }

  const handleMedicoSelect = (
    _event: React.SyntheticEvent,
    value: EspecialidadeMedicoRes | null
  ) => {
    setMedicoSelecionado(value)
    setFormData(prev => ({
      ...prev,
      id_medico: value?.idMedico || 0,
      valor_consulta: value?.valorConsulta?.toString() || ''
    }))
    
    // Se já houver uma data selecionada, carregar horários disponíveis
    if (value && dataSelecionada) {
      setHoraSelecionada('')
      setHorariosDisponiveis([])
      carregarHorariosDisponiveis(dataSelecionada, value.idMedico)
    }
  }

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novaData = event.target.value
    setDataSelecionada(novaData)
    setHoraSelecionada('')
    setHorariosDisponiveis([])
    
    // Carregar horários disponíveis quando tiver data e médico selecionados
    if (novaData && formData.id_medico > 0) {
      carregarHorariosDisponiveis(novaData, formData.id_medico)
    }
  }

  const handleHoraSelect = (
    _event: React.SyntheticEvent,
    value: string | null
  ) => {
    setHoraSelecionada(value || '')
  }

  const getTitulo = () => {
    if (isVisualizacao) return 'Detalhes da Consulta'
    return 'Cadastrar Consulta'
  }

  const getTextoBotao = () => {
    if (isEdicao) return 'Salvar'
    return 'Cadastrar'
  }

  return (
    <Dialog
      maxWidth="md"
      title={getTitulo()}
      open={modal}
      onClose={cancelar}
      actions={
        <>
          {isVisualizacao ? (
            <>
              <Button color="error" onClick={onCancelarConsulta}>
                Cancelar Consulta
              </Button>
              <Button color="warning" onClick={onReagendarConsulta}>
                Reagendar
              </Button>
              <Button color="success" onClick={onConfirmarConsulta}>
                Confirmar
              </Button>
            </>
          ) : (
            <>
              <Button color="error" onClick={cancelar}>
                Cancelar
              </Button>
              <Button color="primary" onClick={confirmar}>
                {getTextoBotao()}
              </Button>
            </>
          )}
        </>
      }
    >
      <div className="text-sm">
        <p>
          {isVisualizacao 
            ? 'Visualize as informações da consulta abaixo.' 
            : isEdicao 
              ? 'Edite as informações da consulta abaixo.'
              : 'Preencha os campos abaixo para cadastrar uma nova consulta.'
          }
        </p>
        
        <Grid container spacing={2} className="pt-4">
          <Grid item xs={12} md={6}>
            <InputSelect
              value={pacienteSelecionado || null}
              options={pacientes}
              textFieldProps={{ 
                label: 'Paciente *', 
                disabled: isVisualizacao || carregandoPacientes
              }}
              multiple={false}
              onChange={handlePacienteSelect}
              optionLabel={(v) => `${v.nome_paciente} - ${v.cpf}`}
              disabled={isVisualizacao || carregandoPacientes}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={especialidadeSelecionada || null}
              options={especialidades.filter(e => e.ativo)}
              textFieldProps={{ 
                label: 'Especialidade *', 
                disabled: isVisualizacao 
              }}
              multiple={false}
              onChange={handleEspecialidadeSelect}
              optionLabel={(v) => v.nome}
              disabled={isVisualizacao || carregandoEspecialidades}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={medicoSelecionado || null}
              options={medicos.filter(m => m.ativo)}
              textFieldProps={{ 
                label: 'Médico *', 
                disabled: isVisualizacao || !especialidadeSelecionada
              }}
              multiple={false}
              onChange={handleMedicoSelect}
              optionLabel={(v) => `${v.nome} - CRM: ${v.crm}`}
              disabled={isVisualizacao || !especialidadeSelecionada || carregandoMedicos}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Data da Consulta *"
              value={dataSelecionada}
              onChange={handleDataChange}
              type="date"
              fullWidth
              disabled={isVisualizacao || !medicoSelecionado}
              shrink
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={horaSelecionada || null}
              options={horariosDisponiveis}
              textFieldProps={{ 
                label: 'Horário *', 
                disabled: isVisualizacao || !dataSelecionada || carregandoHorarios
              }}
              multiple={false}
              onChange={handleHoraSelect}
              optionLabel={(v) => v}
              disabled={isVisualizacao || !dataSelecionada || carregandoHorarios}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Valor da Consulta *"
              value={formData.valor_consulta}
              onChange={handleInputChange('valor_consulta')}
              type="number"
              fullWidth
              disabled={isVisualizacao}
              InputProps={{
                startAdornment: <span className="mr-2">R$</span>
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              label="Motivo da Consulta *"
              value={formData.motivo}
              onChange={handleInputChange('motivo')}
              fullWidth
              disabled={isVisualizacao}
              placeholder="Ex: Consulta de rotina, dor nas costas, etc."
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              label="Observações"
              value={formData.observacoes}
              onChange={handleInputChange('observacoes')}
              multiline
              rows={3}
              disabled={isVisualizacao}
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
    </Dialog>
  )
}
