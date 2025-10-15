import React, { useState } from 'react'
import Dialog from '../../../components/dialog'
import Button from '../../../components/button'
import Input from '../../../components/input-mui/input'
import { Grid } from '@mui/material'
import { ConsultaPaciente } from '../utils/interfaces'
import { toast } from 'react-toastify'
import { cancelarConsulta } from '../../../services/consultas'
import { useMutation } from 'react-query'

interface CancelarConsultaProps {
  modal: boolean
  setModal: (modal: boolean) => void
  consulta: ConsultaPaciente | null
  onConfirmar: () => void
}

const CancelarConsulta: React.FC<CancelarConsultaProps> = ({
  modal,
  setModal,
  consulta,
  onConfirmar
}) => {
  const [motivo, setMotivo] = useState('')

  const cancelarConsultaMutation = useMutation({
    mutationFn: cancelarConsulta,
    onSuccess: () => {
      toast.success('Consulta cancelada com sucesso!')
      setModal(false)
      setMotivo('')
      onConfirmar()
    },
    onError: (error: any) => {
      console.error('Erro ao cancelar consulta:', error)
      toast.error(error?.response?.data?.message || 'Erro ao cancelar consulta')
    }
  })

  const handleCancelar = () => {
    if (!consulta) return

    if (!motivo.trim()) {
      toast.warn('Por favor, informe o motivo do cancelamento!')
      return
    }

    cancelarConsultaMutation.mutate({
      id: consulta.id_consulta,
      motivoCancelamento: motivo.trim()
    })
  }

  const fechar = () => {
    setModal(false)
    setMotivo('')
  }

  return (
    <Dialog
      maxWidth="sm"
      title="Cancelar Consulta"
      open={modal}
      onClose={fechar}
      actions={
        <>
          <Button color="error" onClick={fechar}>
            Fechar
          </Button>
          <Button 
            color="primary" 
            onClick={handleCancelar}
            disabled={cancelarConsultaMutation.isLoading}
          >
            {cancelarConsultaMutation.isLoading ? 'Cancelando...' : 'Confirmar Cancelamento'}
          </Button>
        </>
      }
    >
      <div className="text-sm">
        <p className="mb-4">
          Tem certeza que deseja cancelar esta consulta?
        </p>
        
        {consulta && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p><strong>Médico:</strong> {consulta.medico.nome_medico}</p>
            <p><strong>Especialidade:</strong> {consulta.medico.especialidade}</p>
            <p><strong>Data:</strong> {new Date(consulta.data_hora).toLocaleDateString('pt-BR')}</p>
            <p><strong>Horário:</strong> {new Date(consulta.data_hora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        )}
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              label="Motivo do Cancelamento *"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              multiline
              rows={3}
              fullWidth
              placeholder="Informe o motivo do cancelamento..."
            />
          </Grid>
        </Grid>
      </div>
    </Dialog>
  )
}

export default CancelarConsulta
