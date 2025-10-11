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
import { useQuery, useQueryClient } from 'react-query'
import { agendaKeys, fetchHorarios } from "./utils/queries"

function Agenda() {
  const [data, setData] = useImmer(agendaFil)
  const [modalCadastro, setModalCadastro] = useState(false)
  const [modalBloqueio, setModalBloqueio] = useState(false)
  const [modalDetalhes, setModalDetalhes] = useState(false)
  const [horarioParaEditar, setHorarioParaEditar] = useState<HorarioAtendimento | null>(null)
  const [horarioParaVisualizar, setHorarioParaVisualizar] = useState<HorarioAtendimento | null>(null)
  const [bloqueioParaEditar, setBloqueioParaEditar] = useState<BloqueioAgenda | null>(null)
  const [bloqueioParaVisualizar, setBloqueioParaVisualizar] = useState<BloqueioAgenda | null>(null)
  const [modoVisualizacao, setModoVisualizacao] = useState(false)
  const [modoVisualizacaoBloqueio, setModoVisualizacaoBloqueio] = useState(false)

  // Query para buscar horários
  const { data: horarios = [], isLoading, error } = useQuery({
    queryKey: agendaKeys.horarios(),
    queryFn: fetchHorarios,
  })

  const queryClient = useQueryClient()

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

  const handleBloquearAgenda = () => {
    toast.success('Agenda bloqueada com sucesso!')
    // Aqui seria implementada a lógica de bloqueio
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
    // TODO: Implementar modal de confirmação e chamada da API de exclusão
    toast.info(`Remover bloqueio ${bloqueio.id_bloqueio} - Implementar API de exclusão`)
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
    </div>
  )
}

export default memo(Agenda)
