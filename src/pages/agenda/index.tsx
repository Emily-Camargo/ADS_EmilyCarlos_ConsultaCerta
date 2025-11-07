import { memo, useState, useEffect } from "react"
import { inputsAgenda, agendaFil, selectMedicosAgenda } from "./utils/filtro"
import Filtro from "../../components/filtro"
import { useImmer } from "use-immer"
import { Button, Tabs } from "@mantine/core"
import { TabelaHorarios } from "./components/tabela/tabela"
import { CadastrarHorario } from "./components/modal/cadastrar-horario"
import { BloquearAgenda } from "./components/modal/bloquear-agenda"
import { DetalhesMedico } from "./components/modal/detalhes-medico"
import { HorarioAtendimento, BloqueioAgenda } from "./utils/interfaces"
import { toast } from 'react-toastify'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { agendaKeys, fetchHorarios, fetchTodosBloqueios } from "./utils/queries"
import { putBloqueiosMedico, deleteBloqueiosMedico } from "../../services/medico"
import { BloquearAgendaPutReq } from "../../services/medico/interface"
import Confirmar from "../../components/dialog/confirmar"
import CustomLoaders from "../../components/Loader"
import { getBuscarMedicos } from "../../services/usuario"
import { InfoUsuarioRes } from "../../services/usuario/interface"
import { TabelaBloqueiosGeral } from "./components/tabela/tabela-bloqueios-geral"

function Agenda() {
  const [data, setData] = useImmer(agendaFil)
  const [filtrosAplicados, setFiltrosAplicados] = useState(agendaFil)
  const [medicos, setMedicos] = useState<InfoUsuarioRes[]>([])
  const [modalCadastro, setModalCadastro] = useState(false)
  const [modalBloqueio, setModalBloqueio] = useState(false)
  const [modalDetalhes, setModalDetalhes] = useState(false)
  const [modalConfirmarExclusao, setModalConfirmarExclusao] = useState(false)
  const [horarioParaEditar, setHorarioParaEditar] = useState<HorarioAtendimento | null>(null)
  const [horarioParaVisualizar, setHorarioParaVisualizar] = useState<HorarioAtendimento | null>(null)
  const [bloqueioParaEditar, setBloqueioParaEditar] = useState<BloqueioAgenda | null>(null)
  const [bloqueioParaVisualizar, setBloqueioParaVisualizar] = useState<BloqueioAgenda | null>(null)
  const [bloqueioParaRemover, setBloqueioParaRemover] = useState<BloqueioAgenda | null>(null)
  const [modoVisualizacao, setModoVisualizacao] = useState(false)
  const [modoVisualizacaoBloqueio, setModoVisualizacaoBloqueio] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState<string | null>('horarios')

  const { data: horarios = [], isLoading, error } = useQuery({
    queryKey: agendaKeys.horarios({
      idMedico: filtrosAplicados.idMedico || undefined,
      dataVigenciaInicio: filtrosAplicados.dataInicio || undefined,
      dataVigenciaFim: filtrosAplicados.dataFim || undefined,
    }),
    queryFn: () => fetchHorarios({
      idMedico: filtrosAplicados.idMedico || undefined,
      dataVigenciaInicio: filtrosAplicados.dataInicio || undefined,
      dataVigenciaFim: filtrosAplicados.dataFim || undefined,
    }),
  })

  const { data: bloqueios = [], isLoading: isLoadingBloqueios } = useQuery({
    queryKey: ['todos-bloqueios', filtrosAplicados.idMedico],
    queryFn: () => fetchTodosBloqueios(medicos, filtrosAplicados.idMedico),
    enabled: abaAtiva === 'bloqueios' && medicos.length > 0,
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    const buscarMedicos = async () => {
      try {
        const response = await getBuscarMedicos()
        setMedicos(response.data)
      } catch (error) {
        console.error('Erro ao buscar médicos:', error)
        toast.error('Erro ao carregar lista de médicos')
      }
    }
    
    buscarMedicos()
  }, [])

  const mutationEditarBloqueio = useMutation({
    mutationFn: async ({ idBloqueio, data }: { idBloqueio: number, data: BloquearAgendaPutReq }) => {
      const response = await putBloqueiosMedico(idBloqueio, data)
      return response.data
    },
    onSuccess: () => {
      toast.success('Bloqueio atualizado com sucesso!')
      queryClient.invalidateQueries(['bloqueios-medico'])
      queryClient.invalidateQueries(['todos-bloqueios'])
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao atualizar bloqueio')
    },
  })

  const mutationDeletarBloqueio = useMutation({
    mutationFn: async (idBloqueio: number) => {
      const response = await deleteBloqueiosMedico(idBloqueio)
      return response.data
    },
    onSuccess: () => {
      toast.success('Bloqueio removido com sucesso!')
      queryClient.invalidateQueries(['bloqueios-medico'])
      queryClient.invalidateQueries(['todos-bloqueios'])
      setModalConfirmarExclusao(false)
      setBloqueioParaRemover(null)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao remover bloqueio')
    },
  })

  if (error) {
    return (
      <CustomLoaders 
        open={true} 
        animation="errorPage" 
        msm="Erro ao carregar horários de atendimento"
      />
    );
  }

  const searchClick = () => {
    setFiltrosAplicados(data)
  }

  const redefinir = () => {
    setData(agendaFil)
    setFiltrosAplicados(agendaFil)
  }

  const handleBloquearAgenda = (bloqueio: any) => {
    if (bloqueioParaEditar) {
      const payload: BloquearAgendaPutReq = {
        dataInicio: bloqueio.data_inicio,
        dataFim: bloqueio.data_fim,
        motivo: bloqueio.motivo,
        tipoBloqueio: bloqueio.tipo_bloqueio,
      }
      mutationEditarBloqueio.mutate({ 
        idBloqueio: bloqueioParaEditar.id_bloqueio, 
        data: payload 
      })
    } else {
      queryClient.invalidateQueries(['bloqueios-medico'])
      queryClient.invalidateQueries(['todos-bloqueios'])
    }
  }

  const editarHorario = (horario: HorarioAtendimento) => {
    setHorarioParaEditar(horario)
    setModoVisualizacao(false)
    setModalCadastro(true)
  }

  const detalhesHorario = (horario: HorarioAtendimento) => {
    setHorarioParaVisualizar(horario)
    setModalDetalhes(true)
  }

  const abrirModalCadastro = () => {
    setHorarioParaEditar(null)
    setModoVisualizacao(false)
    setModalCadastro(true)
  }

  const abrirModalBloqueio = () => {
    setBloqueioParaEditar(null)
    setBloqueioParaVisualizar(null)
    setModoVisualizacaoBloqueio(false)
    setModalBloqueio(true)
  }

  const editarBloqueio = (bloqueio: BloqueioAgenda) => {
    setBloqueioParaEditar(bloqueio)
    setBloqueioParaVisualizar(null)
    setModoVisualizacaoBloqueio(false)
    setModalBloqueio(true)
  }

  const detalhesBloqueio = (bloqueio: BloqueioAgenda) => {
    setBloqueioParaVisualizar(bloqueio)
    setBloqueioParaEditar(null)
    setModoVisualizacaoBloqueio(true)
    setModalBloqueio(true)
  }

  const removerBloqueio = (bloqueio: BloqueioAgenda) => {
    setBloqueioParaRemover(bloqueio)
    setModalConfirmarExclusao(true)
  }

  const confirmarExclusaoBloqueio = () => {
    if (bloqueioParaRemover) {
      mutationDeletarBloqueio.mutate(bloqueioParaRemover.id_bloqueio)
    }
  }

  const cancelarExclusaoBloqueio = () => {
    setModalConfirmarExclusao(false)
    setBloqueioParaRemover(null)
  }

  const fecharModalBloqueio = (aberto: boolean) => {
    setModalBloqueio(aberto)
    if (!aberto) {
      setBloqueioParaEditar(null)
      setBloqueioParaVisualizar(null)
      setModoVisualizacaoBloqueio(false)
    }
  }

  const handleMedicoChange = (_event: React.SyntheticEvent, value: InfoUsuarioRes | null) => {
    setData((draft) => {
      draft.idMedico = value?.medico?.idMedico || null
    })
  }

  return (
    <div className="p-6 max-sm:p-4 bg-white">
      <Filtro
        onSubmit={searchClick}
        onClear={redefinir}
        inputs={inputsAgenda({ data, setData })}
        inputSelect={[selectMedicosAgenda(data, handleMedicoChange, medicos)]}
      />
      
      <Tabs value={abaAtiva} onChange={setAbaAtiva} className="mt-4">
        <Tabs.List>
          <Tabs.Tab value="horarios">
            Horários de Atendimento
          </Tabs.Tab>
          <Tabs.Tab value="bloqueios">
            Bloqueios de Agenda
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="horarios" pt="md">
          <div className="flex gap-2 mb-4">
            <Button 
              variant="gradient" 
              gradient={{ from: '#1D4ED8', to: '#1E3A8A' }} 
              size="xs"
              onClick={abrirModalCadastro}
            >
              Cadastrar Horário
            </Button>
          </div>

          <TabelaHorarios 
            horarios={horarios} 
            isLoading={isLoading}
            editarHorario={editarHorario}
            detalhesHorario={detalhesHorario}
          />
        </Tabs.Panel>

        <Tabs.Panel value="bloqueios" pt="md">
          <div className="flex gap-2 mb-4">
            <Button 
              variant="gradient" 
              gradient={{ from: '#DC2626', to: '#B91C1C' }} 
              size="xs"
              onClick={abrirModalBloqueio}
            >
              Bloquear Agenda
            </Button>
          </div>

          <TabelaBloqueiosGeral
            bloqueios={bloqueios}
            isLoading={isLoadingBloqueios}
            editarBloqueio={editarBloqueio}
            detalhesBloqueio={detalhesBloqueio}
            removerBloqueio={removerBloqueio}
          />
        </Tabs.Panel>
      </Tabs>
      
      <CadastrarHorario
        modal={modalCadastro}
        setModal={setModalCadastro}
        horarioParaEditar={horarioParaEditar}
        modoVisualizacao={modoVisualizacao}
      />

      <DetalhesMedico
        modal={modalDetalhes}
        setModal={setModalDetalhes}
        horario={horarioParaVisualizar}
      />

      <BloquearAgenda
        modal={modalBloqueio}
        setModal={fecharModalBloqueio}
        onConfirmar={handleBloquearAgenda}
        bloqueioParaEditar={bloqueioParaEditar || bloqueioParaVisualizar}
        modoVisualizacao={modoVisualizacaoBloqueio}
      />

      <Confirmar
        open={modalConfirmarExclusao}
        onClose={cancelarExclusaoBloqueio}
        onConfirm={confirmarExclusaoBloqueio}
        title="Confirmar Exclusão"
        message={`Deseja realmente remover o bloqueio do médico ${bloqueioParaRemover?.nome_medico || 'agenda'} referente a ${bloqueioParaRemover?.tipo_bloqueio || 'agenda'}?`}
        maxWidth="sm"
      />
    </div>
  )
}

export default memo(Agenda)
