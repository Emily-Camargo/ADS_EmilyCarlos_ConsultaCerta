import Dialog from '../../../../components/dialog'
import Button from '../../../../components/button'
import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import InputSelect from '../../../../components/input-mui/input-select'
import Input from '../../../../components/input-mui/input'
import { CadastrarHorarioProps, HorarioForm } from '../../utils/interfaces'
import { 
  initialHorarioForm, 
  diasSemanaOptions, 
  intervalosOptions 
} from '../../utils/constants'
import { 
  validarHorario, 
  validarIntervaloAlmoco, 
  validarDatasVigencia 
} from '../../utils/functions'
import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { postHorariosMedico, putHorariosMedico, getMedicos } from '../../../../services/medico'
import { MedicoAgendaReq, MedicoAgendaPutReq } from '../../../../services/medico/interface'
import { InfoUsuarioRes } from '../../../../services/usuario/interface'
import { agendaKeys } from '../../utils/queries'

export function CadastrarHorario({
  modal,
  setModal,
  horarioParaEditar = null,
  modoVisualizacao = false,
  isLoadingDetalhes = false,
}: Readonly<CadastrarHorarioProps>) {
  const [formData, setFormData] = useState<HorarioForm>(initialHorarioForm)
  const queryClient = useQueryClient()

  const isEdicao = !!horarioParaEditar
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

  // Mutation para cadastrar horário
  const mutationCadastrar = useMutation({
    mutationFn: async (data: MedicoAgendaReq) => {
      const response = await postHorariosMedico(data)
      return response.data
    },
    onSuccess: () => {
      toast.success('Horário cadastrado com sucesso!')
      queryClient.invalidateQueries(agendaKeys.horarios())
      setFormData(initialHorarioForm)
      setModal(false)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao cadastrar horário')
    },
  })

  // Mutation para editar horário
  const mutationEditar = useMutation({
    mutationFn: async ({ idHorario, data }: { idHorario: number, data: MedicoAgendaPutReq }) => {
      const response = await putHorariosMedico(idHorario, data)
      return response.data
    },
    onSuccess: () => {
      toast.success('Horário atualizado com sucesso!')
      queryClient.invalidateQueries(agendaKeys.horarios())
      setFormData(initialHorarioForm)
      setModal(false)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao atualizar horário')
    },
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
    if (horarioParaEditar && modal) {
      setFormData({
        id_medico: horarioParaEditar.id_medico,
        dia_semana: horarioParaEditar.dia_semana,
        hora_inicio: horarioParaEditar.hora_inicio,
        hora_fim: horarioParaEditar.hora_fim,
        intervalo_minutos: 30,
        almoco_inicio: horarioParaEditar.almoco_inicio,
        almoco_fim: horarioParaEditar.almoco_fim,
        data_vigencia_inicio: horarioParaEditar.data_vigencia_inicio,
        data_vigencia_fim: horarioParaEditar.data_vigencia_fim,
        ativo: horarioParaEditar.ativo,
      })
    } else if (!modal) {
      setFormData(initialHorarioForm)
    }
  }, [horarioParaEditar, modal])

  const cancelar = () => {
    setModal(false)
    setFormData(initialHorarioForm)
  }

  const confirmar = () => {
    if (formData.id_medico === 0) {
      toast.warn('Selecione um médico!')
      return
    }

    if (formData.dia_semana === 0) {
      toast.warn('Selecione um dia da semana!')
      return
    }

    if (!formData.hora_inicio || !formData.hora_fim) {
      toast.warn('Preencha os horários de início e fim!')
      return
    }

    if (!validarHorario(formData.hora_inicio, formData.hora_fim)) {
      toast.warn('Horário de início deve ser anterior ao horário de fim!')
      return
    }

    if (formData.almoco_inicio && formData.almoco_fim) {
      if (!validarIntervaloAlmoco(
        formData.hora_inicio,
        formData.hora_fim,
        formData.almoco_inicio,
        formData.almoco_fim
      )) {
        toast.warn('Horário de almoço deve estar dentro do expediente!')
        return
      }
    }

    if (formData.data_vigencia_inicio && formData.data_vigencia_fim) {
      if (!validarDatasVigencia(formData.data_vigencia_inicio, formData.data_vigencia_fim)) {
        toast.warn('Data de início da vigência deve ser anterior à data de fim!')
        return
      }
    }

    if (isEdicao && horarioParaEditar) {
      // Modo edição - usa PUT e envia apenas os campos editáveis
      const dataParaAPI: MedicoAgendaPutReq = {
        horaInicio: formData.hora_inicio,
        horaFim: formData.hora_fim,
        intervaloMinutos: formData.intervalo_minutos,
        almocoInicio: formData.almoco_inicio || '',
        almocoFim: formData.almoco_fim || '',
        ativo: formData.ativo,
      }

      mutationEditar.mutate({
        idHorario: horarioParaEditar.id_horario,
        data: dataParaAPI
      })
    } else {
      // Modo cadastro - usa POST e envia todos os campos
      const dataParaAPI: MedicoAgendaReq = {
        idMedico: formData.id_medico,
        diaSemana: formData.dia_semana,
        horaInicio: formData.hora_inicio,
        horaFim: formData.hora_fim,
        intervaloMinutos: formData.intervalo_minutos,
        almocoInicio: formData.almoco_inicio || '',
        almocoFim: formData.almoco_fim || '',
        dataVigenciaInicio: formData.data_vigencia_inicio || '',
        dataVigenciaFim: formData.data_vigencia_fim || '',
        ativo: formData.ativo,
      }

      mutationCadastrar.mutate(dataParaAPI)
    }
  }

  const handleInputChange = (field: keyof HorarioForm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.type === 'checkbox' 
      ? event.target.checked 
      : event.target.value

    setFormData(prev => ({
      ...prev,
      [field]: value
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

  const handleDiaSemanaSelect = (
    _event: React.SyntheticEvent,
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      dia_semana: (typeof value?.value === 'number' ? value.value : 0)
    }))
  }

  const handleIntervaloSelect = (
    _event: React.SyntheticEvent,
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      intervalo_minutos: (typeof value?.value === 'number' ? value.value : 0)
    }))
  }

  const getTitulo = () => {
    if (isVisualizacao) return 'Detalhes do Horário'
    if (isEdicao) return 'Editar Horário'
    return 'Cadastrar Horário'
  }

  const getTextoBotao = () => {
    if (isEdicao) return 'Salvar'
    return 'Cadastrar'
  }

  const medicoSelecionado = medicos.find(m => m.id_medico === formData.id_medico)
  const diaSelecionado = diasSemanaOptions.find(d => d.value === formData.dia_semana)
  const intervaloSelecionado = intervalosOptions.find(i => i.value === formData.intervalo_minutos) || intervalosOptions.find(i => i.value === 30)

  const isLoading = mutationCadastrar.isLoading || mutationEditar.isLoading
  
  const dataMinima = new Date().toISOString().split('T')[0]

  return (
    <Dialog
      maxWidth="md"
      title={getTitulo()}
      open={modal}
      onClose={cancelar}
      actions={
        <>
          <Button color="error" onClick={cancelar} disabled={isLoading}>
            {isVisualizacao ? 'Fechar' : 'Cancelar'}
          </Button>
          {!isVisualizacao && (
            <Button color="primary" onClick={confirmar} disabled={isLoading}>
              {isLoading ? 'Salvando...' : getTextoBotao()}
            </Button>
          )}
        </>
      }
    >
      {isLoadingDetalhes ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Carregando detalhes do médico...</p>
          </div>
        </div>
      ) : (
        <div className="text-sm">
        <p>
          {isVisualizacao 
            ? 'Visualize as informações do horário abaixo.' 
            : isEdicao 
              ? 'Edite as informações do horário abaixo.'
              : 'Preencha os campos abaixo para cadastrar um novo horário.'
          }
        </p>
        
        <Grid container spacing={2} className="pt-4">
          <Grid item xs={12} md={6}>
            <InputSelect
              value={medicoSelecionado || null}
              options={medicos.filter(m => m.ativo)}
              textFieldProps={{ 
                label: isLoadingMedicos ? 'Carregando médicos...' : 'Médico *', 
                disabled: isVisualizacao || isLoadingMedicos || isEdicao
              }}
              multiple={false}
              onChange={handleMedicoSelect}
              optionLabel={(v) => `${v.nome_medico} - ${v.especialidade}`}
              disabled={isVisualizacao || isLoadingMedicos || isEdicao}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={diaSelecionado || null}
              options={diasSemanaOptions}
              textFieldProps={{ 
                label: 'Dia da Semana *', 
                disabled: isVisualizacao || isEdicao
              }}
              multiple={false}
              onChange={handleDiaSemanaSelect}
              optionLabel={(v) => v.label}
              disabled={isVisualizacao || isEdicao}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="Hora Início *"
              value={formData.hora_inicio}
              onChange={handleInputChange('hora_inicio')}
              type="time"
              fullWidth
              disabled={isVisualizacao}
              shrink
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="Hora Fim *"
              value={formData.hora_fim}
              onChange={handleInputChange('hora_fim')}
              type="time"
              fullWidth
              disabled={isVisualizacao}
              shrink
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputSelect
              value={intervaloSelecionado || null}
              options={intervalosOptions}
              textFieldProps={{ 
                label: 'Intervalo entre Consultas *', 
                disabled: true
              }}
              multiple={false}
              onChange={handleIntervaloSelect}
              optionLabel={(v) => v.label}
              disabled={true}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="Almoço Início"
              value={formData.almoco_inicio}
              onChange={handleInputChange('almoco_inicio')}
              type="time"
              fullWidth
              disabled={isVisualizacao}
              shrink
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="Almoço Fim"
              value={formData.almoco_fim}
              onChange={handleInputChange('almoco_fim')}
              type="time"
              fullWidth
              disabled={isVisualizacao}
              shrink
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Data Início Vigência"
              value={formData.data_vigencia_inicio}
              onChange={handleInputChange('data_vigencia_inicio')}
              type="date"
              fullWidth
              disabled={isVisualizacao}
              shrink
              inputProps={{ min: dataMinima }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Data Fim Vigência"
              value={formData.data_vigencia_fim}
              onChange={handleInputChange('data_vigencia_fim')}
              type="date"
              fullWidth
              disabled={isVisualizacao}
              shrink
              inputProps={{ min: formData.data_vigencia_inicio || dataMinima }}
            />
          </Grid>

          <Grid item xs={12}>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ativo"
                checked={formData.ativo}
                onChange={handleInputChange('ativo')}
                disabled={isVisualizacao}
                className="mr-2"
              />
              <label htmlFor="ativo" className="text-sm">
                Horário ativo
              </label>
            </div>
          </Grid>
        </Grid>
        </div>
      )}
    </Dialog>
  )
}
