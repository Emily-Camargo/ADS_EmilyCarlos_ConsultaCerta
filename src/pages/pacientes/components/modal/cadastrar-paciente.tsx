import Dialog from '../../../../components/dialog'
import Button from '../../../../components/button'
import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import InputSelect from '../../../../components/input-mui/input-select'
import Input from '../../../../components/input-mui/input'
import { CadastrarPacienteProps, PacienteData, PacienteForm } from '../../utils/interfaces'
import { mockPacientes } from '../../mock'
import { generoOptions, initialForm, tipoSanguineoOptions } from '../../utils/constants'
import { toast } from 'react-toastify'

export function CadastrarPaciente({
  modal,
  setModal,
  onConfirmar,
  pacienteParaEditar = null,
  modoVisualizacao = false,
}: Readonly<CadastrarPacienteProps>) {
  const [formData, setFormData] = useState<PacienteForm>(initialForm)
  const [pacienteSelecionado, setPacienteSelecionado] = useState<PacienteData | null>(null)

  const isEdicao = !!pacienteParaEditar
  const isVisualizacao = modoVisualizacao

  useEffect(() => {
    if (pacienteParaEditar && modal) {
      setPacienteSelecionado(pacienteParaEditar)
      setFormData({
        data_nascimento: pacienteParaEditar.data_nascimento,
        genero: pacienteParaEditar.genero,
        tipo_sanguineo: pacienteParaEditar.tipo_sanguineo,
        convenio: pacienteParaEditar.convenio,
        numero_carteirinha: pacienteParaEditar.numero_carteirinha,
        contato_emergencia_nome: pacienteParaEditar.contato_emergencia_nome,
        contato_emergencia_telefone: pacienteParaEditar.contato_emergencia_telefone,
        observacoes: pacienteParaEditar.observacoes,
      })
    } else if (!modal) {
      setFormData(initialForm)
      setPacienteSelecionado(null)
    }
  }, [pacienteParaEditar, modal])

  const cancelar = () => {
    setModal(false)
    setFormData(initialForm)
    setPacienteSelecionado(null)
  }

  const confirmar = () => {
    if (!pacienteSelecionado) {
      toast.warn('Selecione um paciente!')
      return
    }

    const pacienteCompleto = {
      nome_paciente: pacienteSelecionado.nome_paciente,
      cpf: pacienteSelecionado.cpf,
      celular: pacienteSelecionado.celular,
      ...formData,
      ...(isEdicao && { 
        id_paciente: pacienteParaEditar!.id_paciente,
        id_usuario: pacienteParaEditar!.id_usuario 
      })
    }

    onConfirmar(pacienteCompleto)
    setFormData(initialForm)
    setPacienteSelecionado(null)
    setModal(false)
  }

  const handleInputChange = (field: keyof PacienteForm) => (
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
          <Button color="error" onClick={cancelar}>
            {isVisualizacao ? 'Fechar' : 'Cancelar'}
          </Button>
          {!isVisualizacao && (
            <Button color="primary" onClick={confirmar}>
              {getTextoBotao()}
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
        
        <Grid container spacing={2} className="pt-4">
          {!isEdicao && !isVisualizacao && (
            <Grid item xs={12}>
              <InputSelect
                value={pacienteSelecionado}
                options={mockPacientes}
                textFieldProps={{ label: 'Selecionar Paciente *' }}
                multiple={false}
                onChange={handlePacienteSelect}
                optionLabel={(v) => `${v.nome_paciente} - ${v.cpf}`}
              />
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
      </div>
    </Dialog>
  )
}
