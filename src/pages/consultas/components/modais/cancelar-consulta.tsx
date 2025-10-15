import Dialog from '../../../../components/dialog'
import Button from '../../../../components/button'
import { useState } from 'react'
import { Grid } from '@mui/material'
import Input from '../../../../components/input-mui/input'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { cancelarConsulta } from '../../../../services/consultas'

interface CancelarConsultaProps {
  modal: boolean
  setModal: (open: boolean) => void
  consultaId: number | null
  onConfirmar: () => void
}

export function CancelarConsulta({
  modal,
  setModal,
  consultaId,
  onConfirmar
}: Readonly<CancelarConsultaProps>) {
  const [motivoCancelamento, setMotivoCancelamento] = useState('')

  const cancelarConsultaMutation = useMutation({
    mutationFn: (data: { id: number; motivoCancelamento: string }) => 
      cancelarConsulta(data),
    onSuccess: () => {
      toast.success('Consulta cancelada com sucesso!')
      setModal(false)
      setMotivoCancelamento('')
      onConfirmar()
    },
    onError: (error: any) => {
      console.error('Erro ao cancelar consulta:', error)
      toast.error(error?.response?.data?.message || 'Erro ao cancelar consulta')
    }
  })

  const handleCancelar = () => {
    if (!motivoCancelamento.trim()) {
      toast.warn('Informe o motivo do cancelamento!')
      return
    }

    if (!consultaId) {
      toast.error('ID da consulta não encontrado!')
      return
    }

    cancelarConsultaMutation.mutate({
      id: consultaId,
      motivoCancelamento: motivoCancelamento.trim()
    })
  }

  const handleFechar = () => {
    setModal(false)
    setMotivoCancelamento('')
  }

  return (
    <Dialog
      maxWidth="sm"
      title="Cancelar Consulta"
      open={modal}
      onClose={handleFechar}
      actions={
        <>
          <Button color="error" onClick={handleFechar}>
            Fechar
          </Button>
          <Button 
            color="error" 
            onClick={handleCancelar}
          >
            Confirmar Cancelamento
          </Button>
        </>
      }
    >
      <div className="text-sm">
        <p className="mb-4">
          Tem certeza que deseja cancelar esta consulta? Esta ação não pode ser desfeita.
        </p>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              label="Motivo do Cancelamento *"
              value={motivoCancelamento}
              onChange={(e) => setMotivoCancelamento(e.target.value)}
              fullWidth
              multiline
              rows={3}
              placeholder="Informe o motivo do cancelamento da consulta..."
            />
          </Grid>
        </Grid>
      </div>
    </Dialog>
  )
}
