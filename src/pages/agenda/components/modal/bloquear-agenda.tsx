import Dialog from '../../../../components/dialog'
import Button from '../../../../components/button'
import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import InputSelect from '../../../../components/input-mui/input-select'
import Input from '../../../../components/input-mui/input'
import { BloqueioAgendaProps, BloqueioForm } from '../../utils/interfaces'
import { mockMedicos } from '../../mock'
import { 
  initialBloqueioForm, 
  tiposBloqueioOptions 
} from '../../utils/constants'
import { validarPeriodoBloqueio } from '../../utils/functions'
import { toast } from 'react-toastify'

export function BloquearAgenda({
  modal,
  setModal,
  onConfirmar,
  bloqueioParaEditar = null,
  modoVisualizacao = false,
}: Readonly<BloqueioAgendaProps>) {
  const [formData, setFormData] = useState<BloqueioForm>(initialBloqueioForm)

  const isEdicao = !!bloqueioParaEditar
  const isVisualizacao = modoVisualizacao

  useEffect(() => {
    if (bloqueioParaEditar && modal) {
      setFormData({
        id_medico: bloqueioParaEditar.id_medico,
        data_inicio: bloqueioParaEditar.data_inicio.substring(0, 16), // Para datetime-local
        data_fim: bloqueioParaEditar.data_fim.substring(0, 16),
        motivo: bloqueioParaEditar.motivo,
        tipo_bloqueio: bloqueioParaEditar.tipo_bloqueio,
        criado_por: bloqueioParaEditar.criado_por,
      })
    } else if (!modal) {
      setFormData(initialBloqueioForm)
    }
  }, [bloqueioParaEditar, modal])

  const cancelar = () => {
    setModal(false)
    setFormData(initialBloqueioForm)
  }

  const confirmar = () => {
    if (formData.id_medico === 0) {
      toast.warn('Selecione um médico!')
      return
    }

    if (!formData.data_inicio || !formData.data_fim) {
      toast.warn('Preencha as datas de início e fim!')
      return
    }

    if (!validarPeriodoBloqueio(formData.data_inicio, formData.data_fim)) {
      toast.warn('Data de início deve ser anterior à data de fim!')
      return
    }

    if (!formData.motivo.trim()) {
      toast.warn('Informe o motivo do bloqueio!')
      return
    }

    const bloqueioCompleto = {
      ...formData,
      data_inicio: new Date(formData.data_inicio).toISOString(),
      data_fim: new Date(formData.data_fim).toISOString(),
      ...(isEdicao && { 
        id_bloqueio: bloqueioParaEditar!.id_bloqueio,
        criado_em: bloqueioParaEditar!.criado_em
      }),
      ...(!isEdicao && {
        criado_em: new Date().toISOString()
      })
    }

    onConfirmar(bloqueioCompleto)
    setFormData(initialBloqueioForm)
    setModal(false)
  }

  const handleInputChange = (field: keyof BloqueioForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleMedicoSelect = (
    _event: React.SyntheticEvent,
    value: typeof mockMedicos[0] | null
  ) => {
    setFormData(prev => ({
      ...prev,
      id_medico: value?.id_medico || 0
    }))
  }

  const handleTipoBloqueioSelect = (
    _event: React.SyntheticEvent,
    value: { value: string; label: string } | null
  ) => {
    setFormData(prev => ({
      ...prev,
      tipo_bloqueio: value?.value || 'OUTROS'
    }))
  }

  const getTitulo = () => {
    if (isVisualizacao) return 'Detalhes do Bloqueio'
    if (isEdicao) return 'Editar Bloqueio'
    return 'Bloquear Agenda'
  }

  const getTextoBotao = () => {
    if (isEdicao) return 'Salvar'
    return 'Bloquear'
  }

  const medicoSelecionado = mockMedicos.find(m => m.id_medico === formData.id_medico)
  const tipoSelecionado = tiposBloqueioOptions.find(t => t.value === formData.tipo_bloqueio)

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
            ? 'Visualize as informações do bloqueio abaixo.' 
            : isEdicao 
              ? 'Edite as informações do bloqueio abaixo.'
              : 'Preencha os campos abaixo para bloquear a agenda do médico.'
          }
        </p>
        
        <Grid container spacing={2} className="pt-4">
          <Grid item xs={12}>
            <InputSelect
              value={medicoSelecionado || null}
              options={mockMedicos.filter(m => m.ativo)}
              textFieldProps={{ 
                label: 'Médico *', 
                disabled: isVisualizacao 
              }}
              multiple={false}
              onChange={handleMedicoSelect}
              optionLabel={(v) => `${v.nome_medico} - ${v.especialidade}`}
              disabled={isVisualizacao}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Data e Hora Início *"
              value={formData.data_inicio}
              onChange={handleInputChange('data_inicio')}
              type="datetime-local"
              fullWidth
              disabled={isVisualizacao}
              shrink
           />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Data e Hora Fim *"
              value={formData.data_fim}
              onChange={handleInputChange('data_fim')}
              type="datetime-local"
              fullWidth
              disabled={isVisualizacao}
              shrink
            />
          </Grid>

          <Grid item xs={12}>
            <InputSelect
              value={tipoSelecionado || null}
              options={tiposBloqueioOptions}
              textFieldProps={{ 
                label: 'Tipo de Bloqueio *', 
                disabled: isVisualizacao 
              }}
              multiple={false}
              onChange={handleTipoBloqueioSelect}
              optionLabel={(v) => v.label}
              disabled={isVisualizacao}
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              label="Motivo *"
              value={formData.motivo}
              onChange={handleInputChange('motivo')}
              multiline
              rows={3}
              disabled={isVisualizacao}
              fullWidth
              inputProps={{ maxLength: 200 }}
              helperText={`${formData.motivo.length}/200 caracteres`}
            />
          </Grid>
        </Grid>
      </div>
    </Dialog>
  )
}
