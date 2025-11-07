import { ConsultaRes } from "../../../services/consultas/interface"

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

export interface MedicoData {
  id_medico: number
  nome_medico: string
  especialidade: string
  crm: string
  ativo: boolean
}

export interface ConsultaData {
  id_consulta: number
  id_paciente: number
  id_medico: number
  data_hora: string
  motivo?: string
  observacoes?: string
  valor_consulta: number
  status?: 'agendada' | 'confirmada' | 'concluida' | 'cancelada'
  motivo_cancelamento?: string | null
  numero_reagendamentos?: number
  data_confirmacao?: string | null
  criado_em: string
  atualizado_em?: string
  paciente: PacienteData
  medico: MedicoData
}

export interface ConsultaForm {
  id_paciente: number
  id_medico: number
  data_hora: string
  motivo: string
  observacoes: string
  valor_consulta: string
}

export interface CadastrarConsultaProps {
  modal: boolean
  setModal: (modal: boolean) => void
  onConfirmar: (consulta: any) => void
  consultaParaEditar?: ConsultaData | null
  modoVisualizacao?: boolean
  onConfirmarConsulta?: () => void
  onCancelarConsulta?: () => void
  onReagendarConsulta?: () => void
}

export interface ColunasConsultasProps {
  onEditar: (row: ConsultaData) => void
  onVisualizar: (row: ConsultaData) => void
  onRemover: (row: ConsultaData) => void
}

export interface ConsultaCalendario {
  id: number;
  paciente: string;
  medico: string;
  horario: string;
  status: string;
  dataCompleta: ConsultaRes;
}