import React, { useState, useEffect } from 'react'
import Dialog from '../../../components/dialog'
import Button from '../../../components/button'
import { Grid, Typography, Box } from '@mui/material'
import InputSelect from '../../../components/input-mui/input-select'
import Input from '../../../components/input-mui/input'
import { AgendarConsultaProps, AgendamentoForm } from '../utils/interfaces'
import { toast } from 'react-toastify'
import { getEspecialidades, postEspecialidadesMedico, postHorariosDisponiveis } from '../../../services/medico'
import { EspecialidadeRes, EspecialidadeMedicoRes, HorariosMedicoRes } from '../../../services/medico/interface'
import { postAgendarConsulta } from '../../../services/consultas'
import { useMutation, useQuery } from 'react-query'
import { useAuth } from '../../../contexts/AuthContext'

const AgendarConsulta: React.FC<AgendarConsultaProps> = ({
  modal,
  setModal,
  onConfirmar
}) => {
  const { getIdPaciente } = useAuth()
  const [formData, setFormData] = useState<AgendamentoForm>({
    especialidade: 0,
    medico: 0,
    data: '',
    horario: '',
    observacoes: ''
  })

  const [especialidades, setEspecialidades] = useState<EspecialidadeRes[]>([])
  const [medicosDisponiveis, setMedicosDisponiveis] = useState<EspecialidadeMedicoRes[]>([])
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([])
  const [carregandoMedicos, setCarregandoMedicos] = useState(false)
  const [carregandoHorarios, setCarregandoHorarios] = useState(false)

  // Query para carregar especialidades
  const { isLoading: carregandoEspecialidades } = useQuery({
    queryKey: ['especialidades'],
    queryFn: getEspecialidades,
    enabled: modal,
    onSuccess: (response) => {
      setEspecialidades(response.data)
    },
    onError: (error) => {
      toast.error('Erro ao carregar especialidades')
      console.error(error)
    }
  })

  // Mutation para agendar consulta
  const agendarConsultaMutation = useMutation({
    mutationFn: postAgendarConsulta,
    onSuccess: async () => {
      toast.success('Consulta agendada com sucesso!')
      setModal(false)
      limparFormulario()
      // Chama o callback para recarregar os dados
      await onConfirmar({
        especialidade: formData.especialidade,
        medico: formData.medico,
        data: formData.data,
        horario: formData.horario,
        observacoes: formData.observacoes,
        data_hora: `${formData.data}T${formData.horario}:00`
      })
    },
    onError: (error: any) => {
      console.error('Erro ao agendar consulta:', error)
      toast.error(error?.response?.data?.message || 'Erro ao agendar consulta')
    }
  })

  const limparFormulario = () => {
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

  const carregarMedicosPorEspecialidade = async (idEspecialidade: number) => {
    try {
      setCarregandoMedicos(true)
      const response = await postEspecialidadesMedico({ idEspecialidade })
      setMedicosDisponiveis(response.data)
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

  useEffect(() => {
    if (!modal) {
      limparFormulario()
    }
  }, [modal])

  useEffect(() => {
    if (formData.especialidade > 0) {
      carregarMedicosPorEspecialidade(formData.especialidade)
      setFormData(prev => ({ ...prev, medico: 0, data: '', horario: '' }))
    } else {
      setMedicosDisponiveis([])
      setFormData(prev => ({ ...prev, medico: 0, data: '', horario: '' }))
    }
  }, [formData.especialidade])

  useEffect(() => {
    if (formData.medico > 0 && formData.data) {
      carregarHorariosDisponiveis(formData.data, formData.medico)
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
    value: EspecialidadeRes | null
  ) => {
    setFormData(prev => ({
      ...prev,
      especialidade: value?.idEspecialidade || 0
    }))
  }

  const handleMedicoSelect = (
    _event: React.SyntheticEvent,
    value: EspecialidadeMedicoRes | null
  ) => {
    setFormData(prev => ({
      ...prev,
      medico: value?.idMedico || 0
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

    const idPaciente = getIdPaciente()
    if (!idPaciente) {
      toast.error('ID do paciente não encontrado!')
      return
    }

    const dataHoraConsulta = new Date(`${formData.data}T${formData.horario}:00`)
    
    // Calcular prazo de confirmação (12 horas antes da consulta)
    const prazoConfirmacaoDate = new Date(dataHoraConsulta.getTime() - (12 * 60 * 60 * 1000))
    const prazoConfirmacao = prazoConfirmacaoDate.toISOString()

    // Preparar dados para envio
    const dadosConsulta = {
      idPaciente: idPaciente,
      idMedico: formData.medico,
      dataConsulta: formData.data,
      horarioConsulta: formData.horario,
      motivo: formData.observacoes || 'Consulta agendada pelo paciente',
      observacoes: formData.observacoes || '',
      valorConsulta: 150.00, // Valor padrão
      confirmada: false,
      prazoConfirmacao
    }

    agendarConsultaMutation.mutate(dadosConsulta)
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

  const especialidadeSelecionada = especialidades.find(e => e.idEspecialidade === formData.especialidade)
  const medicoSelecionado = medicosDisponiveis.find(m => m.idMedico === formData.medico)

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
          <Button 
            color="primary" 
            onClick={confirmar}
            disabled={agendarConsultaMutation.isLoading}
          >
            {agendarConsultaMutation.isLoading ? 'Agendando...' : 'Agendar Consulta'}
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
              options={especialidades.filter(e => e.ativo)}
              textFieldProps={{ 
                label: 'Especialidade *',
                disabled: carregandoEspecialidades
              }}
              multiple={false}
              onChange={handleEspecialidadeSelect}
              optionLabel={(v) => v.nome}
              disabled={carregandoEspecialidades}
            />
          </Grid>

          <Grid item xs={12}>
            <InputSelect
              value={medicoSelecionado || null}
              options={medicosDisponiveis.filter(m => m.ativo)}
              textFieldProps={{ 
                label: 'Médico *',
                disabled: medicosDisponiveis.length === 0 || carregandoMedicos
              }}
              multiple={false}
              onChange={handleMedicoSelect}
              optionLabel={(v) => `${v.nome} - CRM: ${v.crm}`}
              disabled={medicosDisponiveis.length === 0 || carregandoMedicos}
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
              options={horariosDisponiveis}
              textFieldProps={{ 
                label: 'Horário *',
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
