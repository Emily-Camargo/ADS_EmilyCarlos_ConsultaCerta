import Dialog from '../../../../components/dialog'
import Button from '../../../../components/button'
import { useState, useEffect } from 'react'
import { Grid, CircularProgress } from '@mui/material'
import InputSelect from '../../../../components/input-mui/input-select'
import Input from '../../../../components/input-mui/input'
import { CadastrarPacienteProps, PacienteData, PacienteForm } from '../../utils/interfaces'
import { generoOptions, initialForm, tipoSanguineoOptions } from '../../utils/constants'
import { toast } from 'react-toastify'
import { getBuscarPaciente, putAtualizarPaciente, getBuscarPacientes, postCadastrarPaciente } from '../../../../services/usuario'
import { InfoUsuarioRes, AtualizarPacienteParams, CadastrarPacienteReq } from '../../../../services/usuario/interface'
import { useMutation, useQuery } from 'react-query'

export function CadastrarPaciente({
  modal,
  setModal,
  onConfirmar,
  pacienteParaEditar = null,
  modoVisualizacao = false,
}: Readonly<CadastrarPacienteProps>) {
  const [formData, setFormData] = useState<PacienteForm>(initialForm)
  const [pacienteSelecionado, setPacienteSelecionado] = useState<PacienteData | null>(null)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<InfoUsuarioRes | null>(null)

  const isEdicao = !!pacienteParaEditar
  const isVisualizacao = modoVisualizacao

  // Converter InfoUsuarioRes para PacienteData
  const converterParaPacienteData = (usuario: InfoUsuarioRes): PacienteData => {
    return {
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
    }
  }

  // useQuery para buscar todos os usuários (para modo cadastro)
  const { data: usuariosSemPaciente, isLoading: isLoadingUsuarios } = useQuery(
    ['usuariosSemPaciente'],
    () => getBuscarPacientes(),
    {
      enabled: modal && !isEdicao && !isVisualizacao,
      select: (response) => {
        // Filtrar apenas usuários SEM dados de paciente
        return response.data.filter(usuario => !usuario.paciente)
      },
      onError: (error: any) => {
        console.error('Erro ao buscar usuários:', error)
        toast.error(
          error?.response?.data?.message || 
          'Erro ao carregar usuários'
        )
      }
    }
  )

  // useQuery para buscar dados do paciente
  const { isLoading } = useQuery(
    ['paciente', pacienteParaEditar?.id_usuario],
    () => getBuscarPaciente(pacienteParaEditar!.id_usuario),
    {
      enabled: !!pacienteParaEditar && modal && (isEdicao || isVisualizacao),
      onSuccess: (response) => {
        const pacienteData = converterParaPacienteData(response.data)
        setPacienteSelecionado(pacienteData)
        setFormData({
          data_nascimento: pacienteData.data_nascimento,
          genero: pacienteData.genero,
          tipo_sanguineo: pacienteData.tipo_sanguineo,
          convenio: pacienteData.convenio,
          numero_carteirinha: pacienteData.numero_carteirinha,
          contato_emergencia_nome: pacienteData.contato_emergencia_nome,
          contato_emergencia_telefone: pacienteData.contato_emergencia_telefone,
          observacoes: pacienteData.observacoes,
        })
      },
      onError: (error: any) => {
        console.error('Erro ao buscar dados do paciente:', error)
        toast.error(
          error?.response?.data?.message || 
          'Erro ao carregar dados do paciente'
        )
      }
    }
  )

  // useMutation para cadastrar paciente
  const cadastrarPacienteMutation = useMutation({
    mutationKey: ['cadastrarPaciente'],
    mutationFn: (data: CadastrarPacienteReq) => postCadastrarPaciente(data),
    onSuccess: () => {
      toast.success('Paciente cadastrado com sucesso!')
      onConfirmar() // Callback para recarregar a lista
      setFormData(initialForm)
      setUsuarioSelecionado(null)
      setModal(false)
    },
    onError: (error: any) => {
      console.error('Erro ao cadastrar paciente:', error)
      toast.error(
        error?.response?.data?.message || 
        'Erro ao cadastrar paciente. Tente novamente.'
      )
    }
  })

  // useMutation para atualizar paciente
  const atualizarPacienteMutation = useMutation({
    mutationKey: ['atualizarPaciente'],
    mutationFn: (params: AtualizarPacienteParams) => putAtualizarPaciente(params),
    onSuccess: () => {
      toast.success('Paciente atualizado com sucesso!')
      onConfirmar() // Callback para recarregar a lista
      setFormData(initialForm)
      setPacienteSelecionado(null)
      setModal(false)
    },
    onError: (error: any) => {
      console.error('Erro ao atualizar paciente:', error)
      toast.error(
        error?.response?.data?.message || 
        'Erro ao atualizar paciente. Tente novamente.'
      )
    }
  })

  useEffect(() => {
    if (!modal) {
      setFormData(initialForm)
      setPacienteSelecionado(null)
      setUsuarioSelecionado(null)
    }
  }, [modal])

  const cancelar = () => {
    setModal(false)
    setFormData(initialForm)
    setPacienteSelecionado(null)
    setUsuarioSelecionado(null)
  }

  const confirmar = () => {
    if (!isEdicao && !usuarioSelecionado) {
      toast.warn('Selecione um usuário!')
      return
    }

    if (isEdicao && !pacienteSelecionado) {
      toast.warn('Erro ao carregar dados do paciente!')
      return
    }

    // Validar campos obrigatórios
    if (!formData.data_nascimento || !formData.genero || !formData.tipo_sanguineo) {
      toast.warn('Preencha todos os campos obrigatórios!')
      return
    }

    if (isEdicao) {
      // Usar mutation para atualizar
      atualizarPacienteMutation.mutate({
        idUsuario: pacienteSelecionado!.id_usuario,
        data: {
          dataNascimento: formData.data_nascimento,
          genero: formData.genero,
          tipoSanguineo: formData.tipo_sanguineo,
          convenio: formData.convenio,
          numeroCarteirinha: formData.numero_carteirinha,
          contatoEmergenciaNome: formData.contato_emergencia_nome,
          contatoEmergenciaTelefone: formData.contato_emergencia_telefone,
          observacoes: formData.observacoes,
        }
      })
    } else {
      // Modo cadastro - usar mutation de cadastrar
      cadastrarPacienteMutation.mutate({
        idUsuario: usuarioSelecionado!.idUsuario,
        dataNascimento: formData.data_nascimento,
        genero: formData.genero,
        tipoSanguineo: formData.tipo_sanguineo,
        convenio: formData.convenio,
        numeroCarteirinha: formData.numero_carteirinha,
        contatoEmergenciaNome: formData.contato_emergencia_nome,
        contatoEmergenciaTelefone: formData.contato_emergencia_telefone,
        observacoes: formData.observacoes,
      })
    }
  }

  const handleInputChange = (field: keyof PacienteForm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleUsuarioSelect = (
    _event: React.SyntheticEvent,
    value: InfoUsuarioRes | null
  ) => {
    if (value && value.paciente) {
      toast.error('Paciente com dados já cadastrados')
      setUsuarioSelecionado(null)
      return
    }
    setUsuarioSelecionado(value)
  }

  const handleGeneroSelect = (
    _event: React.SyntheticEvent,
    value: { value: string; label: string } | null
  ) => {
    setFormData(prev => ({
      ...prev,
      genero: value?.value || ''
    }))
  }

  const handleTipoSanguineoSelect = (
    _event: React.SyntheticEvent,
    value: { value: string; label: string } | null
  ) => {
    setFormData(prev => ({
      ...prev,
      tipo_sanguineo: value?.value || ''
    }))
  }

  const getTitulo = () => {
    if (isVisualizacao) return 'Detalhes do Paciente'
    if (isEdicao) return 'Editar Paciente'
    return 'Cadastrar Paciente'
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
          <Button 
            color="error" 
            onClick={cancelar}
            disabled={cadastrarPacienteMutation.isLoading || atualizarPacienteMutation.isLoading}
          >
            {isVisualizacao ? 'Fechar' : 'Cancelar'}
          </Button>
          {!isVisualizacao && (
            <Button 
              color="primary" 
              onClick={confirmar}
              disabled={isLoading || cadastrarPacienteMutation.isLoading || atualizarPacienteMutation.isLoading}
            >
              {(cadastrarPacienteMutation.isLoading || atualizarPacienteMutation.isLoading) ? 'Salvando...' : getTextoBotao()}
            </Button>
          )}
        </>
      }
    >
      <div className="text-sm">
        <p>
          {isVisualizacao 
            ? 'Visualize as informações do paciente abaixo.' 
            : isEdicao 
              ? 'Edite as informações do paciente abaixo.'
              : 'Selecione um paciente e preencha os campos adicionais abaixo.'
          }
        </p>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={2} className="pt-4">
            {!isEdicao && !isVisualizacao && (
              <Grid item xs={12}>
                {isLoadingUsuarios ? (
                  <div className="flex justify-center py-4">
                    <CircularProgress size={24} />
                  </div>
                ) : (
                  <InputSelect
                    value={usuarioSelecionado}
                    options={usuariosSemPaciente || []}
                    textFieldProps={{ label: 'Selecionar Usuário *' }}
                    multiple={false}
                    onChange={handleUsuarioSelect}
                    optionLabel={(v) => `${v.nome} - ${v.cpf}`}
                  />
                )}
              </Grid>
            )}

            {(isEdicao || isVisualizacao) && (
              <Grid item xs={12}>
                <Input
                  label="Paciente"
                  value={pacienteSelecionado ? `${pacienteSelecionado.nome_paciente} - ${pacienteSelecionado.cpf}` : ''}
                  disabled
                  fullWidth
                />
              </Grid>
            )}

          <Grid item xs={12} md={6}>
            <Input
              label="Data de Nascimento"
              value={formData.data_nascimento}
              shrink
              onChange={handleInputChange('data_nascimento')}
              type="date"
              fullWidth
              disabled={isVisualizacao}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={generoOptions.find(g => g.value === formData.genero) || null}
              options={generoOptions}
              textFieldProps={{ label: 'Gênero', disabled: isVisualizacao }}
              multiple={false}
              onChange={handleGeneroSelect}
              optionLabel={(v) => v.label}
              disabled={isVisualizacao}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={tipoSanguineoOptions.find(t => t.value === formData.tipo_sanguineo) || null}
              options={tipoSanguineoOptions}
              textFieldProps={{ label: 'Tipo Sanguíneo', disabled: isVisualizacao }}
              multiple={false}
              onChange={handleTipoSanguineoSelect}
              optionLabel={(v) => v.label}
              disabled={isVisualizacao}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Convênio"
              value={formData.convenio}
              onChange={handleInputChange('convenio')}
              disabled={isVisualizacao}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Número da Carteirinha"
              value={formData.numero_carteirinha}
              onChange={handleInputChange('numero_carteirinha')}
              disabled={isVisualizacao}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Nome do Contato de Emergência"
              value={formData.contato_emergencia_nome}
              onChange={handleInputChange('contato_emergencia_nome')}
              disabled={isVisualizacao}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Telefone do Contato de Emergência"
              value={formData.contato_emergencia_telefone}
              onChange={handleInputChange('contato_emergencia_telefone')}
              mask="(00) 00000-0000"
              disabled={isVisualizacao}
              fullWidth
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
        )}
      </div>
    </Dialog>
  )
}
