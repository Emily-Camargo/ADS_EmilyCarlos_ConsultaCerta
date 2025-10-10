import Dialog from '../../../../components/dialog'
import Button from '../../../../components/button'
import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import InputSelect from '../../../../components/input-mui/input-select'
import Input from '../../../../components/input-mui/input'
import type { EditarPacientePerfilProps, PacientePerfilForm } from '../../utils/interfaces'
import { toast } from 'react-toastify'
import { generoOptions, initialFormPerfil, tipoSanguineoOptions } from '../../utils/constants'

export function EditarPacientePerfil({
  modal,
  setModal,
  onConfirmar,
  pacienteData,
  loading = false,
}: Readonly<EditarPacientePerfilProps>) {
  const [formData, setFormData] = useState<PacientePerfilForm>(initialFormPerfil)

  useEffect(() => {
    if (pacienteData && modal) {
      setFormData({
        dataNascimento: pacienteData.dataNascimento || '',
        genero: pacienteData.genero || '',
        tipoSanguineo: pacienteData.tipoSanguineo || '',
        convenio: pacienteData.convenio || '',
        numeroCarteirinha: pacienteData.numeroCarteirinha || '',
        contatoEmergenciaNome: pacienteData.contatoEmergenciaNome || '',
        contatoEmergenciaTelefone: pacienteData.contatoEmergenciaTelefone || '',
        observacoes: pacienteData.observacoes || '',
      })
    } else if (!modal) {
      setFormData(initialFormPerfil)
    }
  }, [pacienteData, modal])

  const cancelar = () => {
    setModal(false)
    setFormData(initialFormPerfil)
  }

  const confirmar = () => {
    if (!formData.dataNascimento) {
      toast.warn('Informe a data de nascimento!')
      return
    }

    if (!formData.genero) {
      toast.warn('Selecione o gênero!')
      return
    }

    if (!formData.tipoSanguineo) {
      toast.warn('Selecione o tipo sanguíneo!')
      return
    }

    if (!formData.contatoEmergenciaNome) {
      toast.warn('Informe o nome do contato de emergência!')
      return
    }

    if (!formData.contatoEmergenciaTelefone) {
      toast.warn('Informe o telefone do contato de emergência!')
      return
    }

    onConfirmar(formData)
    setFormData(initialFormPerfil)
    setModal(false)
  }

  const handleInputChange = (field: keyof PacientePerfilForm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
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
      tipoSanguineo: value?.value || ''
    }))
  }

  return (
    <Dialog
      maxWidth="md"
      title="Editar Informações Médicas"
      open={modal}
      onClose={cancelar}
      actions={
        <>
          <Button color="error" onClick={cancelar} disabled={loading}>
            Cancelar
          </Button>
          <Button color="primary" onClick={confirmar} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </>
      }
    >
      <div className="text-sm">
        <p>
          Edite suas informações médicas abaixo. Campos com * são obrigatórios.
        </p>
        
        <Grid container spacing={2} className="pt-4">
          <Grid item xs={12} md={6}>
            <Input
              label="Data de Nascimento *"
              value={formData.dataNascimento}
              shrink
              onChange={handleInputChange('dataNascimento')}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={generoOptions.find(g => g.value === formData.genero) || null}
              options={generoOptions}
              textFieldProps={{ label: 'Gênero *' }}
              multiple={false}
              onChange={handleGeneroSelect}
              optionLabel={(v) => v.label}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={tipoSanguineoOptions.find(t => t.value === formData.tipoSanguineo) || null}
              options={tipoSanguineoOptions}
              textFieldProps={{ label: 'Tipo Sanguíneo *' }}
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
              value={formData.numeroCarteirinha}
              onChange={handleInputChange('numeroCarteirinha')}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Nome do Contato de Emergência *"
              value={formData.contatoEmergenciaNome}
              onChange={handleInputChange('contatoEmergenciaNome')}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Telefone do Contato de Emergência *"
              value={formData.contatoEmergenciaTelefone}
              onChange={handleInputChange('contatoEmergenciaTelefone')}
              mask="(00) 00000-0000"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              label="Observações Médicas"
              value={formData.observacoes}
              onChange={handleInputChange('observacoes')}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
    </Dialog>
  )
}

