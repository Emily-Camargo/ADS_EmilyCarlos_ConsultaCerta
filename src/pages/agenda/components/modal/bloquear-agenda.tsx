import Dialog from '../../../../components/dialog'
import Button from '../../../../components/button'
import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import InputSelect from '../../../../components/input-mui/input-select'
import Input from '../../../../components/input-mui/input'
import { BloqueioAgendaProps, BloqueioForm } from '../../utils/interfaces'
import { 
  initialBloqueioForm, 
  tiposBloqueioOptions 
} from '../../utils/constants'
import { validarPeriodoBloqueio } from '../../utils/functions'
import { toast } from 'react-toastify'
import { postBloquearAgenda, getMedicos } from '../../../../services/medico'
import { useQuery } from 'react-query'
import { InfoUsuarioRes } from '../../../../services/usuario/interface'

export function BloquearAgenda({
  modal,
  setModal,
  onConfirmar,
  bloqueioParaEditar = null,
  modoVisualizacao = false,
}: Readonly<BloqueioAgendaProps>) {
  const [formData, setFormData] = useState<BloqueioForm>(initialBloqueioForm)
  const [loading, setLoading] = useState(false)

  const isEdicao = !!bloqueioParaEditar
  const isVisualizacao = modoVisualizacao

  // Query para buscar médicos
  const { data: medicosData, isLoading: isLoadingMedicos } = useQuery({
    queryKey: ['medicos'],
    queryFn: async () => {
      const response = await getMedicos()
      return response
    },
    enabled: modal, // Só busca quando o modal está aberto
  })

  // Mapear médicos para o formato esperado
  const medicos = medicosData?.map((usuario: InfoUsuarioRes) => ({
    id_medico: usuario.medico?.idMedico || 0,
    nome_medico: usuario.nome,
    especialidade: usuario.medico?.especialidade || '',
    crm: usuario.medico?.crm || '',
    ativo: usuario.ativo && (usuario.medico?.ativo ?? true),
  })) || []

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

  const confirmar = async () => {
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

    setLoading(true)

    try {
      if (!isEdicao) {
        // Criar novo bloqueio via API
        const payload = {
          idMedico: formData.id_medico,
          dataInicio: new Date(formData.data_inicio).toISOString(),
          dataFim: new Date(formData.data_fim).toISOString(),
          motivo: formData.motivo,
          tipoBloqueio: formData.tipo_bloqueio,
        }

        const response = await postBloquearAgenda(payload)
        
        if (response.data) {
          toast.success('Agenda bloqueada com sucesso!')
          
          // Converter resposta da API para o formato esperado pelo componente pai
          const bloqueioCompleto = {
            id_bloqueio: response.data.idBloqueio,
            id_medico: response.data.idMedico,
            data_inicio: response.data.dataInicio,
            data_fim: response.data.dataFim,
            motivo: response.data.motivo,
            tipo_bloqueio: response.data.tipoBloqueio,
            criado_por: response.data.criadoPor,
            criado_em: response.data.criadoEm,
          }
          
          onConfirmar(bloqueioCompleto)
          setFormData(initialBloqueioForm)
          setModal(false)
        }
      } else {
        // Edição - passa os dados para o componente pai processar via API
        const bloqueioCompleto = {
          ...formData,
          data_inicio: new Date(formData.data_inicio).toISOString(),
          data_fim: new Date(formData.data_fim).toISOString(),
          id_bloqueio: bloqueioParaEditar!.id_bloqueio,
          criado_em: bloqueioParaEditar!.criado_em
        }

        onConfirmar(bloqueioCompleto)
        setFormData(initialBloqueioForm)
        setModal(false)
      }
    } catch (error: any) {
      console.error('Erro ao bloquear agenda:', error)
      
      const mensagemErro = error?.response?.data?.message || 
                          error?.message || 
                          'Erro ao processar solicitação'
      
      toast.error(`Erro: ${mensagemErro}`)
    } finally {
      setLoading(false)
    }
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
    value: typeof medicos[0] | null
  ) => {
    setFormData(prev => ({
      ...prev,
      id_medico: value?.id_medico || 0
    }))
  }

  const handleTipoBloqueioSelect = (
    _event: React.SyntheticEvent,
    value: typeof tiposBloqueioOptions[0] | null
  ) => {
    setFormData(prev => ({
      ...prev,
      tipo_bloqueio: String(value?.value || 'OUTROS')
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

  const medicoSelecionado = medicos.find(m => m.id_medico === formData.id_medico)
  const tipoSelecionado = tiposBloqueioOptions.find(t => t.value === formData.tipo_bloqueio)

  const dataMinima = new Date().toISOString().slice(0, 16)

  return (
    <Dialog
      maxWidth="md"
      title={getTitulo()}
      open={modal}
      onClose={cancelar}
      actions={
        <>
          <Button color="error" onClick={cancelar} disabled={loading}>
            {isVisualizacao ? 'Fechar' : 'Cancelar'}
          </Button>
          {!isVisualizacao && (
            <Button color="primary" onClick={confirmar} disabled={loading}>
              {loading ? 'Processando...' : getTextoBotao()}
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
              options={medicos.filter(m => m.ativo)}
              textFieldProps={{ 
                label: 'Médico *', 
                disabled: isVisualizacao || isLoadingMedicos 
              }}
              multiple={false}
              onChange={handleMedicoSelect}
              optionLabel={(v) => `${v.nome_medico} - ${v.especialidade}`}
              disabled={isVisualizacao || isLoadingMedicos}
              loading={isLoadingMedicos}
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
              inputProps={{ min: dataMinima }}
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
              inputProps={{ min: dataMinima }}
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
