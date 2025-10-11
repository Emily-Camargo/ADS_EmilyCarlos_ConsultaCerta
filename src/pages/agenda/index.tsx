import { memo, useState } from "react"
import { inputsAgenda, agendaFil } from "./utils/filtro"
import Filtro from "../../components/filtro"
import { useImmer } from "use-immer"
import { Button } from "@mantine/core"
import { TabelaHorarios } from "./components/tabela/tabela"
import { CadastrarHorario } from "./components/modal/cadastrar-horario"
import { BloquearAgenda } from "./components/modal/bloquear-agenda"
import { DetalhesMedico } from "./components/modal/detalhes-medico"
import { HorarioAtendimento, BloqueioAgenda } from "./utils/interfaces"
import { toast } from 'react-toastify'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { agendaKeys, fetchHorarios } from "./utils/queries"
import { putBloqueiosMedico, deleteBloqueiosMedico } from "../../services/medico"
import { BloquearAgendaPutReq } from "../../services/medico/interface"
import Confirmar from "../../components/dialog/confirmar"

function Agenda() {
  const [data, setData] = useImmer(agendaFil)
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

  // Query para buscar horários
  const { data: horarios = [], isLoading, error } = useQuery({
    queryKey: agendaKeys.horarios(),
    queryFn: fetchHorarios,
  })

  const queryClient = useQueryClient()

  // Mutation para editar bloqueio
  const mutationEditarBloqueio = useMutation({
    mutationFn: async ({ idBloqueio, data }: { idBloqueio: number, data: BloquearAgendaPutReq }) => {
      const response = await putBloqueiosMedico(idBloqueio, data)
      return response.data
    },
    onSuccess: () => {
      toast.success('Bloqueio atualizado com sucesso!')
      // Invalidar a query de bloqueios do médico específico
      queryClient.invalidateQueries(['bloqueios-medico'])
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao atualizar bloqueio')
    },
  })

  // Mutation para deletar bloqueio
  const mutationDeletarBloqueio = useMutation({
    mutationFn: async (idBloqueio: number) => {
      const response = await deleteBloqueiosMedico(idBloqueio)
      return response.data
    },
    onSuccess: () => {
      toast.success('Bloqueio removido com sucesso!')
      // Invalidar a query de bloqueios do médico específico
      queryClient.invalidateQueries(['bloqueios-medico'])
      setModalConfirmarExclusao(false)
      setBloqueioParaRemover(null)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao remover bloqueio')
    },
  })

  if (error) {
    toast.error('Erro ao carregar horários de atendimento')
  }

  const searchClick = () => {
    // Aqui seria implementada a lógica de filtro
    toast.info('Filtros aplicados com sucesso!')
  }

  const redefinir = () => {
    setData(agendaFil)
    toast.info('Filtros redefinidos!')
  }

  const handleCadastrarHorario = (novoHorario: any) => {
    if (horarioParaEditar) {
      // Atualizar dados localmente e invalidar query para refetch
      queryClient.setQueryData(agendaKeys.horarios(), (oldData: HorarioAtendimento[] = []) => 
        oldData.map(h => 
          h.id_horario === horarioParaEditar.id_horario 
            ? { 
                ...novoHorario,
                id_horario: horarioParaEditar.id_horario,
                criado_em: horarioParaEditar.criado_em,
                atualizado_em: new Date().toISOString()
              }
            : h
        )
      )
      toast.success('Horário atualizado com sucesso!')
      setHorarioParaEditar(null)
    } else {
      // Adicionar novo horário localmente e invalidar query para refetch
      queryClient.setQueryData(agendaKeys.horarios(), (oldData: HorarioAtendimento[] = []) => {
        const horarioCompleto: HorarioAtendimento = {
          ...novoHorario,
          id_horario: Math.max(...oldData.map(h => h.id_horario), 0) + 1,
          criado_em: new Date().toISOString(),
          atualizado_em: new Date().toISOString()
        }
        return [...oldData, horarioCompleto]
      })
      toast.success('Horário cadastrado com sucesso!')
    }
  }

  const handleBloquearAgenda = (bloqueio: any) => {
    if (bloqueioParaEditar) {
      // Editar bloqueio existente
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
    }
    // A criação de novo bloqueio já é tratada no componente BloquearAgenda
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

  const bloquearHorario = (horario: HorarioAtendimento) => {
    setHorarioParaEditar(horario)
    setModalBloqueio(true)
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

  return (
    <div className="p-6 max-sm:p-4 bg-white">
      <Filtro
        onSubmit={searchClick}
        onClear={redefinir}
        inputs={inputsAgenda({ data, setData })}
      />
      
      <div className="flex gap-2 mb-4">
        <Button 
          variant="gradient" 
          gradient={{ from: '#1D4ED8', to: '#1E3A8A' }} 
          size="xs"
          onClick={abrirModalCadastro}
        >
          Cadastrar Horário
        </Button>
        
        <Button 
          variant="gradient" 
          gradient={{ from: '#DC2626', to: '#B91C1C' }} 
          size="xs"
          onClick={abrirModalBloqueio}
        >
          Bloquear Agenda
        </Button>
      </div>

      <TabelaHorarios 
        horarios={horarios} 
        isLoading={isLoading}
        editarHorario={editarHorario}
        detalhesHorario={detalhesHorario}
        bloquearHorario={bloquearHorario}
        editarBloqueio={editarBloqueio}
        detalhesBloqueio={detalhesBloqueio}
        removerBloqueio={removerBloqueio}
      />
      
      <CadastrarHorario
        modal={modalCadastro}
        setModal={setModalCadastro}
        onConfirmar={handleCadastrarHorario}
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
