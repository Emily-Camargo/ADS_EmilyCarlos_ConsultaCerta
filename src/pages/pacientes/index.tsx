import { memo, useState } from "react"
import { inputsPacientes, pacientesFil } from "./utils/filtro"
import Filtro from "../../components/filtro"
import { useImmer } from "use-immer"
import { Button } from "@mantine/core"
import { TabelaPacientes } from "./components/tabela/tabela"
import { mockPacientes } from "./mock"
import { CadastrarPaciente } from "./components/modal/cadastrar-paciente"
import { PacienteData } from "./utils/interfaces"

function Pacientes() {
  const [data, setData] = useImmer(pacientesFil)
  const [modalCadastro, setModalCadastro] = useState(false)
  const [pacientes, setPacientes] = useState<PacienteData[]>(mockPacientes)
  const [pacienteParaEditar, setPacienteParaEditar] = useState<PacienteData | null>(null)
  const [modoVisualizacao, setModoVisualizacao] = useState(false)

  const searchClick = () => {
    console.log('searchClick')
  }

  const redefinir = () => {
    setData(pacientesFil)
  }

  const handleCadastrarPaciente = (novoPaciente: any) => {
    if (pacienteParaEditar) {
      setPacientes(prev => 
        prev.map(p => 
          p.id_paciente === pacienteParaEditar.id_paciente 
            ? { ...novoPaciente }
            : p
        )
      )
      console.log('Paciente editado:', novoPaciente)
      setPacienteParaEditar(null)
    } else {
      const pacienteCompleto: PacienteData = {
        ...novoPaciente,
        id_paciente: Math.max(...pacientes.map(p => p.id_paciente)) + 1,
        id_usuario: 1000 + Math.floor(Math.random() * 1000), // Simula um ID de usuário
      }
      
      setPacientes(prev => [...prev, pacienteCompleto])
      console.log('Paciente cadastrado:', pacienteCompleto)
    }
  }

  const editarPaciente = (paciente: PacienteData) => {
    setPacienteParaEditar(paciente)
    setModoVisualizacao(false)
    setModalCadastro(true)
  }

  const detalhesPaciente = (paciente: PacienteData) => {
    setPacienteParaEditar(paciente)
    setModoVisualizacao(true)
    setModalCadastro(true)
  }

  const abrirModalCadastro = () => {
    setPacienteParaEditar(null)
    setModoVisualizacao(false)
    setModalCadastro(true)
  }

  return (
    <div className="p-6 max-sm:p-4 bg-white">
      <Filtro
        onSubmit={searchClick}
        onClear={redefinir}
        inputs={inputsPacientes({ data, setData })}
      />
      <Button 
        variant="gradient" 
        gradient={{ from: '#1D4ED8', to: '#1E3A8A' }} 
        size="xs"
        onClick={abrirModalCadastro}
      >
        Cadastrar Paciente
      </Button>
      <TabelaPacientes 
        pacientes={pacientes} 
        isLoading={false}
        editarPaciente={editarPaciente}
        detalhesPaciente={detalhesPaciente}
      />
      
      <CadastrarPaciente
        modal={modalCadastro}
        setModal={setModalCadastro}
        onConfirmar={handleCadastrarPaciente}
        pacienteParaEditar={pacienteParaEditar}
        modoVisualizacao={modoVisualizacao}
      />
    </div>
  )
}
export default memo(Pacientes)