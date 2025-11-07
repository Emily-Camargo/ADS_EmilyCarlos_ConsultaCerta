import Dialog from '../../../../components/dialog'
import Button from '../../../../components/button'
import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import Input from '../../../../components/input-mui/input'
import InputSelect from '../../../../components/input-mui/input-select'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { reagendarConsulta } from '../../../../services/consultas'
import { postHorariosDisponiveis } from '../../../../services/medico'
import { HorariosMedicoRes } from '../../../../services/medico/interface'

interface ReagendarConsultaProps {
  modal: boolean
  setModal: (open: boolean) => void
  consultaId: number | null
  medicoId: number | null
  onConfirmar: () => void
}

export function ReagendarConsulta({
  modal,
  setModal,
  consultaId,
  medicoId,
  onConfirmar
}: Readonly<ReagendarConsultaProps>) {
  const [novaData, setNovaData] = useState('')
  const [novoHorario, setNovoHorario] = useState('')
  const [motivoReagendamento, setMotivoReagendamento] = useState('')
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([])
  const [carregandoHorarios, setCarregandoHorarios] = useState(false)

  const reagendarConsultaMutation = useMutation({
    mutationFn: (data: { 
      id: number; 
      novaDataConsulta: string; 
      novoHorarioConsulta: string; 
      motivoReagendamento: string 
    }) => reagendarConsulta(data),
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

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novaDataValue = event.target.value
    setNovaData(novaDataValue)
    setNovoHorario('')
    setHorariosDisponiveis([])
    
    // Carregar horários disponíveis quando tiver data e médico selecionados
    if (novaDataValue && medicoId) {
      carregarHorariosDisponiveis(novaDataValue, medicoId)
    }
  }

  const handleHorarioSelect = (
    _event: React.SyntheticEvent,
    value: string | null
  ) => {
    setNovoHorario(value || '')
  }

  const limparFormulario = () => {
    setNovaData('')
    setNovoHorario('')
    setMotivoReagendamento('')
    setHorariosDisponiveis([])
  }

  const handleReagendar = () => {
    if (!novaData) {
      toast.warn('Selecione a nova data da consulta!')
      return
    }

    if (!novoHorario) {
      toast.warn('Selecione o novo horário da consulta!')
      return
    }

    if (!motivoReagendamento.trim()) {
      toast.warn('Informe o motivo do reagendamento!')
      return
    }

    if (!consultaId) {
      toast.error('ID da consulta não encontrado!')
      return
    }

    reagendarConsultaMutation.mutate({
      id: consultaId,
      novaDataConsulta: novaData,
      novoHorarioConsulta: novoHorario,
      motivoReagendamento: motivoReagendamento.trim()
    })
  }

  const handleFechar = () => {
    setModal(false)
    limparFormulario()
  }

  // Limpar formulário quando modal fechar
  useEffect(() => {
    if (!modal) {
      limparFormulario()
    }
  }, [modal])

  return (
    <Dialog
      maxWidth="md"
      title="Reagendar Consulta"
      open={modal}
      onClose={handleFechar}
      actions={
        <>
          <Button color="error" onClick={handleFechar}>
            Cancelar
          </Button>
          <Button 
            color="primary" 
            onClick={handleReagendar}
          >
            Confirmar Reagendamento
          </Button>
        </>
      }
    >
      <div className="text-sm">
        <p className="mb-4">
          Selecione a nova data e horário para reagendar a consulta.
        </p>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Input
              label="Nova Data da Consulta *"
              value={novaData}
              onChange={handleDataChange}
              type="date"
              fullWidth
              disabled={!medicoId}
              shrink
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={novoHorario || null}
              options={horariosDisponiveis}
              textFieldProps={{ 
                label: 'Novo Horário *', 
                disabled: !novaData || carregandoHorarios
              }}
              multiple={false}
              onChange={handleHorarioSelect}
              optionLabel={(v) => v}
              disabled={!novaData || carregandoHorarios}
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              label="Motivo do Reagendamento *"
              value={motivoReagendamento}
              onChange={(e) => setMotivoReagendamento(e.target.value)}
              fullWidth
              multiline
              rows={3}
              placeholder="Informe o motivo do reagendamento da consulta..."
              disabled={reagendarConsultaMutation.isLoading}
            />
          </Grid>
        </Grid>
      </div>
    </Dialog>
  )
}
