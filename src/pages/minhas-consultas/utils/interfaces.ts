export interface ConsultaPaciente {
  id_consulta: number
  id_paciente: number
  id_medico: number
  data_hora: string
  observacoes?: string
  valor_consulta: number
  status: 'agendada' | 'confirmada' | 'concluida' | 'cancelada'
  criado_em: string
  atualizado_em?: string
  data_cancelamento?: string | null
  motivo_cancelamento?: string | null
  prazo_confirmacao?: string | null
  medico: {
    id_medico: number
    nome_medico: string
    especialidade: string
    crm: string
    ativo: boolean
  }
}

export interface Especialidade {
  id_especialidade: number
  nome: string
  descricao?: string
  ativa: boolean
}

export interface AgendamentoForm {
  especialidade: number
  medico: number
  data: string
  horario: string
  observacoes?: string
}

export interface AgendamentoCompleto extends AgendamentoForm {
  data_hora: string
}

export interface HorarioDisponivel {
  horario: string
  disponivel: boolean
}

export interface ConsultaCardProps {
  consulta: ConsultaPaciente
  onVisualizar?: (consulta: ConsultaPaciente) => void
  onCancelar?: (consulta: ConsultaPaciente) => void
  onReagendar?: (consulta: ConsultaPaciente) => void
  onConfirmar?: (consulta: ConsultaPaciente) => void
}

export interface AgendarConsultaProps {
  modal: boolean
  setModal: (modal: boolean) => void
  onConfirmar: (agendamento: AgendamentoCompleto) => void
}
