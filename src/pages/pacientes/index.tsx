import { memo, useState, useEffect } from "react"
import { inputsPacientes, pacientesFil } from "./utils/filtro"
import Filtro from "../../components/filtro"
import { useImmer } from "use-immer"
import { Button } from "@mantine/core"
import { TabelaPacientes } from "./components/tabela/tabela"
import { CadastrarPaciente } from "./components/modal/cadastrar-paciente"
import { PacienteData } from "./utils/interfaces"
import { getBuscarPacientes } from "../../services/usuario"
import { InfoUsuarioRes } from "../../services/usuario/interface"

function Pacientes() {
  const [data, setData] = useImmer(pacientesFil)
  const [modalCadastro, setModalCadastro] = useState(false)
  const [pacientes, setPacientes] = useState<PacienteData[]>([])
  const [pacienteParaEditar, setPacienteParaEditar] = useState<PacienteData | null>(null)
  const [modoVisualizacao, setModoVisualizacao] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Converter dados da API para o formato PacienteData
  const converterParaPacienteData = (usuarios: InfoUsuarioRes[]): PacienteData[] => {
    return usuarios
      .filter(usuario => usuario.paciente) // Filtrar apenas usuários que são pacientes
      .map(usuario => ({
        id_paciente: usuario.paciente!.idPaciente,
        nome_paciente: usuario.nome,
        cpf: usuario.cpf,
        celular: usuario.telefone,
        id_usuario: usuario.idUsuario,
        data_nascimento: usuario.paciente!.dataNascimento,
        genero: usuario.paciente!.genero,
        tipo_sanguineo: usuario.paciente!.tipoSanguineo,
        convenio: usuario.paciente!.convenio,
        numero_carteirinha: usuario.paciente!.numeroCarteirinha,
        contato_emergencia_nome: usuario.paciente!.contatoEmergenciaNome,
        contato_emergencia_telefone: usuario.paciente!.contatoEmergenciaTelefone,
        observacoes: usuario.paciente!.observacoes,
      }))
  }

  // Buscar pacientes da API
  const buscarPacientes = async () => {
    setIsLoading(true)
    try {
      const response = await getBuscarPacientes()
      const pacientesConvertidos = converterParaPacienteData(response.data)
      setPacientes(pacientesConvertidos)
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Carregar pacientes ao montar o componente
  useEffect(() => {
    buscarPacientes()
  }, [])

  const searchClick = () => {
    // Lógica de busca
  }

  const redefinir = () => {
    setData(pacientesFil)
  }

  const handleCadastrarPaciente = async () => {
    // Recarregar a lista de pacientes da API
    await buscarPacientes()
    setPacienteParaEditar(null)
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
        isLoading={isLoading}
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