import Dialog from '../../../../components/dialog'
import Button from '../../../../components/button'
import { useState } from 'react'
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
}: Readonly<CadastrarPacienteProps>) {
  const [formData, setFormData] = useState<PacienteForm>(initialForm)
  const [pacienteSelecionado, setPacienteSelecionado] = useState<PacienteData | null>(null)

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
      ...formData
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

  return (
    <Dialog
      maxWidth="md"
      title="Cadastrar Paciente"
      open={modal}
      onClose={cancelar}
      actions={
        <>
          <Button color="error" onClick={cancelar}>
            Cancelar
          </Button>
          <Button color="primary" onClick={confirmar}>
            Cadastrar
          </Button>
        </>
      }
    >
      <div className="text-sm">
        <p>Selecione um paciente e preencha os campos adicionais abaixo.</p>
        
        <Grid container spacing={2} className="pt-4">
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

          <Grid item xs={12} md={6}>
            <Input
              label="Data de Nascimento"
              value={formData.data_nascimento}
              shrink
              onChange={handleInputChange('data_nascimento')}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={generoOptions.find(g => g.value === formData.genero) || null}
              options={generoOptions}
              textFieldProps={{ label: 'Gênero' }}
              multiple={false}
              onChange={handleGeneroSelect}
              optionLabel={(v) => v.label}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={tipoSanguineoOptions.find(t => t.value === formData.tipo_sanguineo) || null}
              options={tipoSanguineoOptions}
              textFieldProps={{ label: 'Tipo Sanguíneo' }}
              multiple={false}
              onChange={handleTipoSanguineoSelect}
              optionLabel={(v) => v.label}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Convênio"
              value={formData.convenio}
              onChange={handleInputChange('convenio')}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Número da Carteirinha"
              value={formData.numero_carteirinha}
              onChange={handleInputChange('numero_carteirinha')}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Nome do Contato de Emergência"
              value={formData.contato_emergencia_nome}
              onChange={handleInputChange('contato_emergencia_nome')}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Telefone do Contato de Emergência"
              value={formData.contato_emergencia_telefone}
              onChange={handleInputChange('contato_emergencia_telefone')}
              mask="(00) 00000-0000"
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
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
    </Dialog>
  )
}
