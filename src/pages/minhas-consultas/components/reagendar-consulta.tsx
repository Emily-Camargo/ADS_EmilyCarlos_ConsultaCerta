import React, { useState, useEffect } from 'react'
import Dialog from '../../../components/dialog'
import Button from '../../../components/button'
import Input from '../../../components/input-mui/input'
import InputSelect from '../../../components/input-mui/input-select'
import { Grid } from '@mui/material'
import { ConsultaPaciente } from '../utils/interfaces'
import { toast } from 'react-toastify'
import { reagendarConsulta } from '../../../services/consultas'
import { postHorariosDisponiveis as postHorariosMedico } from '../../../services/medico'
import { HorariosMedicoRes } from '../../../services/medico/interface'
import { useMutation } from 'react-query'

interface ReagendarConsultaProps {
  modal: boolean
  setModal: (modal: boolean) => void
  consulta: ConsultaPaciente | null
  onConfirmar: () => void
}

const ReagendarConsulta: React.FC<ReagendarConsultaProps> = ({
  modal,
  setModal,
  consulta,
  onConfirmar
}) => {
  const [formData, setFormData] = useState({
    data: '',
    horario: '',
    motivo: ''
  })
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([])
  const [carregandoHorarios, setCarregandoHorarios] = useState(false)

  const reagendarConsultaMutation = useMutation({
    mutationFn: reagendarConsulta,
    onSuccess: () => {
      toast.success('Consulta reagendada com sucesso!')
      setModal(false)
      limparFormulario()
      onConfirmar()
    },
    onError: (error: any) => {
      console.error('Erro ao reagendar consulta:', error)
      toast.error(error?.response?.data?.message || 'Erro ao reagendar consulta')
    }
  })

  const carregarHorariosDisponiveis = async (dataInicio: string, idMedico: number) => {
    try {
      setCarregandoHorarios(true)
      const response = await postHorariosMedico({ dataInicio, idMedico })
    
      if (Array.isArray(response.data)) {
        const horariosDoDia = response.data.find((item: HorariosMedicoRes) => {
          return item.data === dataInicio
        })
        
        if (horariosDoDia && horariosDoDia.horarios && horariosDoDia.horarios.length > 0) {
          setHorariosDisponiveis(horariosDoDia.horarios)
        } else {
          setHorariosDisponiveis([])
          const mensagem = horariosDoDia?.mensagem || 'Não há horários disponíveis para esta data'
          toast.info(mensagem)
        }
      } else {
        const dadosHorario = response.data as HorariosMedicoRes
        if (dadosHorario.horarios && dadosHorario.horarios.length > 0) {
          setHorariosDisponiveis(dadosHorario.horarios)
          toast.success(`${dadosHorario.horarios.length} horários disponíveis`)
        } else {
          setHorariosDisponiveis([])
          const mensagem = dadosHorario?.mensagem || 'Não há horários disponíveis para esta data'
          toast.info(mensagem)
        }
      }
    } catch (error: any) {
      toast.error('Erro ao carregar horários disponíveis')
      console.error('Erro completo:', error)
      setHorariosDisponiveis([])
    } finally {
      setCarregandoHorarios(false)
    }
  }

  const limparFormulario = () => {
    setFormData({
      data: '',
      horario: '',
      motivo: ''
    })
    setHorariosDisponiveis([])
  }

  useEffect(() => {
    if (!modal) {
      limparFormulario()
    }
  }, [modal])

  useEffect(() => {
    if (formData.data && consulta) {
      carregarHorariosDisponiveis(formData.data, consulta.id_medico)
      setFormData(prev => ({ ...prev, horario: '' }))
    } else {
      setHorariosDisponiveis([])
      setFormData(prev => ({ ...prev, horario: '' }))
    }
  }, [formData.data, consulta])

  const handleInputChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleHorarioSelect = (
    _event: React.SyntheticEvent,
    value: string | null
  ) => {
    setFormData(prev => ({
      ...prev,
      horario: value || ''
    }))
  }

  const handleReagendar = () => {
    if (!consulta) return

    if (!formData.data) {
      toast.warn('Selecione uma nova data!')
      return
    }

    if (!formData.horario) {
      toast.warn('Selecione um novo horário!')
      return
    }

    if (!formData.motivo.trim()) {
      toast.warn('Informe o motivo do reagendamento!')
      return
    }

    reagendarConsultaMutation.mutate({
      id: consulta.id_consulta,
      novaDataConsulta: formData.data,
      novoHorarioConsulta: formData.horario,
      motivoReagendamento: formData.motivo.trim()
    })
  }

  const fechar = () => {
    setModal(false)
    limparFormulario()
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

  return (
    <Dialog
      maxWidth="md"
      title="Reagendar Consulta"
      open={modal}
      onClose={fechar}
      actions={
        <>
          <Button color="error" onClick={fechar}>
            Cancelar
          </Button>
          <Button 
            color="primary" 
            onClick={handleReagendar}
            disabled={reagendarConsultaMutation.isLoading}
          >
            {reagendarConsultaMutation.isLoading ? 'Reagendando...' : 'Confirmar Reagendamento'}
          </Button>
        </>
      }
    >
      <div className="text-sm">
        <p className="mb-4">
          Selecione uma nova data e horário para reagendar sua consulta.
        </p>
        
        {consulta && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p><strong>Médico:</strong> {consulta.medico.nome_medico}</p>
            <p><strong>Especialidade:</strong> {consulta.medico.especialidade}</p>
            <p><strong>Data Atual:</strong> {new Date(consulta.data_hora).toLocaleDateString('pt-BR')}</p>
            <p><strong>Horário Atual:</strong> {new Date(consulta.data_hora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        )}
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Input
              label="Nova Data *"
              value={formData.data}
              onChange={handleInputChange('data')}
              type="date"
              fullWidth
              shrink
              inputProps={{
                min: getMinDate(),
                max: getMaxDate()
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={formData.horario || null}
              options={horariosDisponiveis}
              textFieldProps={{ 
                label: 'Novo Horário *',
                disabled: horariosDisponiveis.length === 0 || carregandoHorarios
              }}
              multiple={false}
              onChange={handleHorarioSelect}
              optionLabel={(v) => v}
              disabled={horariosDisponiveis.length === 0 || carregandoHorarios}
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              label="Motivo do Reagendamento *"
              value={formData.motivo}
              onChange={handleInputChange('motivo')}
              multiline
              rows={3}
              fullWidth
              placeholder="Informe o motivo do reagendamento..."
            />
          </Grid>
        </Grid>
      </div>
    </Dialog>
  )
}

export default ReagendarConsulta
