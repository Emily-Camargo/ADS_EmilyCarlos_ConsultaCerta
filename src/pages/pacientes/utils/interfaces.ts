import { Updater } from 'use-immer'

export interface PacienteData {
  id_paciente: number
  nome_paciente: string
  cpf: string
  celular: string
  id_usuario: number
  data_nascimento: string
  genero: string
  tipo_sanguineo: string
  convenio: string
  numero_carteirinha: string
  contato_emergencia_nome: string
  contato_emergencia_telefone: string
  observacoes: string
}

export interface DataReq {
  nomePaciente: string
  cpf: string
  dataNascimento: string
  sexo: string
  cidade: string
  estado: string
}

export interface InputsProps {
  data: DataReq
  setData: Updater<DataReq>
}

export interface TabelaPacientesProps {
  pacientes: PacienteData[]
  isLoading?: boolean
  editarPaciente: (paciente: PacienteData) => void
  detalhesPaciente: (paciente: PacienteData) => void
}

export interface CadastrarPacienteProps {
  modal: boolean
  setModal: (open: boolean) => void
  onConfirmar: (paciente: Omit<PacienteData, 'id_paciente' | 'id_usuario'>) => void
  pacienteParaEditar?: PacienteData | null
  modoVisualizacao?: boolean
}

export interface PacienteForm {
  data_nascimento: string
  genero: string
  tipo_sanguineo: string
  convenio: string
  numero_carteirinha: string
  contato_emergencia_nome: string
  contato_emergencia_telefone: string
  observacoes: string
}

export interface ColunasPacientesProps {
  editarPaciente: (row: PacienteData) => void
  detalhesPaciente: (row: PacienteData) => void
}