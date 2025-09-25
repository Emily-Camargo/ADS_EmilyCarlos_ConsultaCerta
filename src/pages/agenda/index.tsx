import { memo, useState } from "react"
import { inputsAgenda, agendaFil } from "./utils/filtro"
import Filtro from "../../components/filtro"
import { useImmer } from "use-immer"
import { Button } from "@mantine/core"
import { TabelaHorarios } from "./components/tabela/tabela"
import { mockHorarios } from "./mock"
import { CadastrarHorario } from "./components/modal/cadastrar-horario"
import { BloquearAgenda } from "./components/modal/bloquear-agenda"
import { HorarioAtendimento } from "./utils/interfaces"
import { toast } from 'react-toastify'

function Agenda() {
  const [data, setData] = useImmer(agendaFil)
  const [modalCadastro, setModalCadastro] = useState(false)
  const [modalBloqueio, setModalBloqueio] = useState(false)
  const [horarios, setHorarios] = useState<HorarioAtendimento[]>(mockHorarios)
  const [horarioParaEditar, setHorarioParaEditar] = useState<HorarioAtendimento | null>(null)
  const [modoVisualizacao, setModoVisualizacao] = useState(false)

  const searchClick = () => {
    console.log('Filtrar horários:', data)
    // Aqui seria implementada a lógica de filtro
    toast.info('Filtros aplicados com sucesso!')
  }

  const redefinir = () => {
    setData(agendaFil)
    toast.info('Filtros redefinidos!')
  }

  const handleCadastrarHorario = (novoHorario: any) => {
    if (horarioParaEditar) {
      setHorarios(prev => 
        prev.map(h => 
          h.id_horario === horarioParaEditar.id_horario 
            ? { 
                ...novoHorario,
                id_horario: horarioParaEditar.id_horario,
                nome_medico: getMedicoNome(novoHorario.id_medico),
                especialidade: getMedicoEspecialidade(novoHorario.id_medico),
                criado_em: horarioParaEditar.criado_em,
                atualizado_em: new Date().toISOString()
              }
            : h
        )
      )
      toast.success('Horário atualizado com sucesso!')
      setHorarioParaEditar(null)
    } else {
      const horarioCompleto: HorarioAtendimento = {
        ...novoHorario,
        id_horario: Math.max(...horarios.map(h => h.id_horario)) + 1,
        nome_medico: getMedicoNome(novoHorario.id_medico),
        especialidade: getMedicoEspecialidade(novoHorario.id_medico),
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString()
      }
      
      setHorarios(prev => [...prev, horarioCompleto])
      toast.success('Horário cadastrado com sucesso!')
    }
  }

  const handleBloquearAgenda = (dadosBloqueio: any) => {
    console.log('Bloqueio criado:', dadosBloqueio)
    toast.success('Agenda bloqueada com sucesso!')
    // Aqui seria implementada a lógica de bloqueio
  }

  const editarHorario = (horario: HorarioAtendimento) => {
    setHorarioParaEditar(horario)
    setModoVisualizacao(false)
    setModalCadastro(true)
  }

  const detalhesHorario = (horario: HorarioAtendimento) => {
    setHorarioParaEditar(horario)
    setModoVisualizacao(true)
    setModalCadastro(true)
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
    setHorarioParaEditar(null)
    setModalBloqueio(true)
  }

  // Funções auxiliares para buscar dados do médico
  const getMedicoNome = (idMedico: number): string => {
    const medicos = [
      { id: 1, nome: 'Dr. João Silva', especialidade: 'Cardiologia' },
      { id: 2, nome: 'Dra. Maria Santos', especialidade: 'Pediatria' },
      { id: 3, nome: 'Dr. Carlos Oliveira', especialidade: 'Ortopedia' },
      { id: 4, nome: 'Dra. Ana Costa', especialidade: 'Ginecologia' },
      { id: 5, nome: 'Dr. Pedro Almeida', especialidade: 'Neurologia' },
    ]
    return medicos.find(m => m.id === idMedico)?.nome || 'Médico não encontrado'
  }

  const getMedicoEspecialidade = (idMedico: number): string => {
    const medicos = [
      { id: 1, nome: 'Dr. João Silva', especialidade: 'Cardiologia' },
      { id: 2, nome: 'Dra. Maria Santos', especialidade: 'Pediatria' },
      { id: 3, nome: 'Dr. Carlos Oliveira', especialidade: 'Ortopedia' },
      { id: 4, nome: 'Dra. Ana Costa', especialidade: 'Ginecologia' },
      { id: 5, nome: 'Dr. Pedro Almeida', especialidade: 'Neurologia' },
    ]
    return medicos.find(m => m.id === idMedico)?.especialidade || 'Especialidade não encontrada'
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
        isLoading={false}
        editarHorario={editarHorario}
        detalhesHorario={detalhesHorario}
        bloquearHorario={bloquearHorario}
      />
      
      <CadastrarHorario
        modal={modalCadastro}
        setModal={setModalCadastro}
        onConfirmar={handleCadastrarHorario}
        horarioParaEditar={horarioParaEditar}
        modoVisualizacao={modoVisualizacao}
      />

      <BloquearAgenda
        modal={modalBloqueio}
        setModal={setModalBloqueio}
        onConfirmar={handleBloquearAgenda}
        bloqueioParaEditar={null}
        modoVisualizacao={false}
      />
    </div>
  )
}

export default memo(Agenda)
