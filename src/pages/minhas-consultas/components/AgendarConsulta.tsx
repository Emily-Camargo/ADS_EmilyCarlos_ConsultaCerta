import React, { useState, useEffect } from 'react'
import Dialog from '../../../components/dialog'
import Button from '../../../components/button'
import { Grid, Typography, Box } from '@mui/material'
import InputSelect from '../../../components/input-mui/input-select'
import Input from '../../../components/input-mui/input'
import { AgendarConsultaProps, AgendamentoForm, AgendamentoCompleto } from '../utils/interfaces'
import { mockEspecialidades, mockMedicosPorEspecialidade, getHorariosDisponiveis } from '../mocks'
import { toast } from 'react-toastify'

const AgendarConsulta: React.FC<AgendarConsultaProps> = ({
  modal,
  setModal,
  onConfirmar
}) => {
  const [formData, setFormData] = useState<AgendamentoForm>({
    especialidade: 0,
    medico: 0,
    data: '',
    horario: '',
    observacoes: ''
  })

  const [medicosDisponiveis, setMedicosDisponiveis] = useState<any[]>([])
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([])

  useEffect(() => {
    if (!modal) {
      setFormData({
        especialidade: 0,
        medico: 0,
        data: '',
        horario: '',
        observacoes: ''
      })
      setMedicosDisponiveis([])
      setHorariosDisponiveis([])
    }
  }, [modal])

  useEffect(() => {
    if (formData.especialidade > 0) {
      const medicos = mockMedicosPorEspecialidade[formData.especialidade] || []
      setMedicosDisponiveis(medicos)
      setFormData(prev => ({ ...prev, medico: 0, data: '', horario: '' }))
    } else {
      setMedicosDisponiveis([])
      setFormData(prev => ({ ...prev, medico: 0, data: '', horario: '' }))
    }
  }, [formData.especialidade])

  useEffect(() => {
    if (formData.medico > 0 && formData.data) {
      const horarios = getHorariosDisponiveis(formData.medico, formData.data)
      setHorariosDisponiveis(horarios)
      setFormData(prev => ({ ...prev, horario: '' }))
    } else {
      setHorariosDisponiveis([])
      setFormData(prev => ({ ...prev, horario: '' }))
    }
  }, [formData.medico, formData.data])

  const handleInputChange = (field: keyof AgendamentoForm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleEspecialidadeSelect = (
    _event: React.SyntheticEvent,
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      especialidade: value?.id_especialidade || 0
    }))
  }

  const handleMedicoSelect = (
    _event: React.SyntheticEvent,
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      medico: value?.id_medico || 0
    }))
  }

  const handleHorarioSelect = (
    _event: React.SyntheticEvent,
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      horario: value || ''
    }))
  }

  const cancelar = () => {
    setModal(false)
  }

  const confirmar = () => {
    if (formData.especialidade === 0) {
      toast.warn('Selecione uma especialidade!')
      return
    }

    if (formData.medico === 0) {
      toast.warn('Selecione um médico!')
      return
    }

    if (!formData.data) {
      toast.warn('Selecione uma data!')
      return
    }

    if (!formData.horario) {
      toast.warn('Selecione um horário!')
      return
    }

    const dataHora = `${formData.data}T${formData.horario}:00`
    
    const agendamentoCompleto: AgendamentoCompleto = {
      ...formData,
      data_hora: dataHora
    }

    onConfirmar(agendamentoCompleto)
    setModal(false)
  }

  const getMinDate = () => {
    const hoje = new Date()
    return hoje.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    return maxDate.toISOString().split('T')[0]
  }

  const especialidadeSelecionada = mockEspecialidades.find(e => e.id_especialidade === formData.especialidade)
  const medicoSelecionado = medicosDisponiveis.find(m => m.id_medico === formData.medico)

  return (
    <Dialog
      maxWidth="md"
      title="Agendar Consulta"
      open={modal}
      onClose={cancelar}
      actions={
        <>
          <Button color="error" onClick={cancelar}>
            Cancelar
          </Button>
          <Button color="primary" onClick={confirmar}>
            Agendar Consulta
          </Button>
        </>
      }
    >
      <div className="text-sm">
        <p>
          Preencha os campos abaixo para agendar uma nova consulta.
        </p>
        
        <Grid container spacing={2} className="pt-4">
          <Grid item xs={12}>
            <InputSelect
              value={especialidadeSelecionada || null}
              options={mockEspecialidades.filter(e => e.ativa)}
              textFieldProps={{ 
                label: 'Especialidade *'
              }}
              multiple={false}
              onChange={handleEspecialidadeSelect}
              optionLabel={(v) => v.nome}
            />
          </Grid>

          <Grid item xs={12}>
            <InputSelect
              value={medicoSelecionado || null}
              options={medicosDisponiveis}
              textFieldProps={{ 
                label: 'Médico *',
                disabled: medicosDisponiveis.length === 0
              }}
              multiple={false}
              onChange={handleMedicoSelect}
              optionLabel={(v) => `${v.nome_medico} - CRM: ${v.crm}`}
              disabled={medicosDisponiveis.length === 0}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Data *"
              value={formData.data}
              onChange={handleInputChange('data')}
              type="date"
              fullWidth
              disabled={formData.medico === 0}
              InputProps={{
                inputProps: {
                  min: getMinDate(),
                  max: getMaxDate()
                }
              }}
              shrink
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={formData.horario || null}
              options={horariosDisponiveis.map(horario => ({ value: horario, label: horario }))}
              textFieldProps={{ 
                label: 'Horário *',
                disabled: horariosDisponiveis.length === 0
              }}
              multiple={false}
              onChange={handleHorarioSelect}
              optionLabel={(v) => v.label}
              disabled={horariosDisponiveis.length === 0}
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
              placeholder="Descreva o motivo da consulta ou informações relevantes..."
            />
          </Grid>
        </Grid>

        {formData.especialidade > 0 && medicosDisponiveis.length === 0 && (
          <Box sx={{ 
            mt: 2, 
            p: 2, 
            backgroundColor: '#fef3c7', 
            borderRadius: '8px',
            border: '1px solid #f59e0b'
          }}>
            <Typography variant="body2" sx={{ color: '#92400e' }}>
              Não há médicos disponíveis para esta especialidade no momento.
            </Typography>
          </Box>
        )}

        {formData.medico > 0 && formData.data && horariosDisponiveis.length === 0 && (
          <Box sx={{ 
            mt: 2, 
            p: 2, 
            backgroundColor: '#fef3c7', 
            borderRadius: '8px',
            border: '1px solid #f59e0b'
          }}>
            <Typography variant="body2" sx={{ color: '#92400e' }}>
              Não há horários disponíveis para este médico na data selecionada.
            </Typography>
          </Box>
        )}
      </div>
    </Dialog>
  )
}

export default AgendarConsulta
