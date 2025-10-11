import Dialog from '../../../../components/dialog'
import Button from '../../../../components/button'
import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import InputSelect from '../../../../components/input-mui/input-select'
import Input from '../../../../components/input-mui/input'
import { CadastrarConsultaProps, ConsultaData, ConsultaForm, PacienteData } from '../../../consultas/utils/interfaces'
import { toast } from 'react-toastify'
import { getEspecialidades, postEspecialidadesMedico } from '../../../../services/medico'
import { EspecialidadeRes, EspecialidadeMedicoRes } from '../../../../services/medico/interface'
import { getBuscarPacientes } from '../../../../services/usuario'
import { InfoUsuarioRes } from '../../../../services/usuario/interface'

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
    observacoes: '',
    valor_consulta: '',
  })
  const [pacientes, setPacientes] = useState<PacienteData[]>([])
  const [pacienteSelecionado, setPacienteSelecionado] = useState<PacienteData | null>(null)
  const [medicoSelecionado, setMedicoSelecionado] = useState<EspecialidadeMedicoRes | null>(null)
  const [especialidades, setEspecialidades] = useState<EspecialidadeRes[]>([])
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState<EspecialidadeRes | null>(null)
  const [medicos, setMedicos] = useState<EspecialidadeMedicoRes[]>([])
  const [carregandoPacientes, setCarregandoPacientes] = useState(false)
  const [carregandoEspecialidades, setCarregandoEspecialidades] = useState(false)
  const [carregandoMedicos, setCarregandoMedicos] = useState(false)

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
      setFormData({
        id_paciente: consultaParaEditar.id_paciente,
        id_medico: consultaParaEditar.id_medico,
        data_hora: consultaParaEditar.data_hora,
        observacoes: consultaParaEditar.observacoes || '',
        valor_consulta: consultaParaEditar.valor_consulta?.toString() || '',
      })
    } else if (!modal) {
      setFormData({
        id_paciente: 0,
        id_medico: 0,
        data_hora: '',
        observacoes: '',
        valor_consulta: '',
      })
      setPacienteSelecionado(null)
      setMedicoSelecionado(null)
    }
  }, [consultaParaEditar, modal])

  const cancelar = () => {
    setModal(false)
    setFormData({
      id_paciente: 0,
      id_medico: 0,
      data_hora: '',
      observacoes: '',
      valor_consulta: '',
    })
    setPacienteSelecionado(null)
    setMedicoSelecionado(null)
    setEspecialidadeSelecionada(null)
    setMedicos([])
  }

  const confirmar = () => {
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

    if (!formData.data_hora) {
      toast.warn('Selecione a data e hora da consulta!')
      return
    }

    if (!formData.valor_consulta || parseFloat(formData.valor_consulta) <= 0) {
      toast.warn('Informe um valor válido para a consulta!')
      return
    }

    const consultaCompleta = {
      ...formData,
      ...(isEdicao && { 
        id_consulta: consultaParaEditar!.id_consulta,
        criado_em: consultaParaEditar!.criado_em,
        atualizado_em: new Date().toISOString()
      })
    }

    onConfirmar(consultaCompleta)
    setFormData({
      id_paciente: 0,
      id_medico: 0,
      data_hora: '',
      observacoes: '',
      valor_consulta: '',
    })
    setPacienteSelecionado(null)
    setMedicoSelecionado(null)
    setEspecialidadeSelecionada(null)
    setMedicos([])
    setModal(false)
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
  }

  const getTitulo = () => {
    if (isVisualizacao) return 'Detalhes da Consulta'
    return 'Cadastrar Consulta'
  }

  const getTextoBotao = () => {
    if (isEdicao) return 'Salvar'
    return 'Cadastrar'
  }

  const formatarDataHora = (dataHora: string) => {
    if (!dataHora) return ''
    const data = new Date(dataHora)
    const dataFormatada = data.toISOString().split('T')[0]
    const horaFormatada = data.toTimeString().split(' ')[0].substring(0, 5)
    return `${dataFormatada}T${horaFormatada}`
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
              label="Data e Hora *"
              value={formatarDataHora(formData.data_hora)}
              onChange={handleInputChange('data_hora')}
              type="datetime-local"
              fullWidth
              disabled={isVisualizacao}
              shrink
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
