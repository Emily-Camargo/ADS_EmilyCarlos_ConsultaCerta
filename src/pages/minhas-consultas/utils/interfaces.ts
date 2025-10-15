// Interface para consulta do paciente
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
  medico: {
    id_medico: number
    nome_medico: string
    especialidade: string
    crm: string
    ativo: boolean
  }
}

// Interface para especialidades
export interface Especialidade {
  id_especialidade: number
  nome: string
  descricao?: string
  ativa: boolean
}

// Interface para formulário de agendamento
export interface AgendamentoForm {
  especialidade: number
  medico: number
  data: string
  horario: string
  observacoes?: string
}

// Interface para agendamento completo (com data_hora combinada)
export interface AgendamentoCompleto extends AgendamentoForm {
  data_hora: string
}

// Interface para horários disponíveis
export interface HorarioDisponivel {
  horario: string
  disponivel: boolean
}

// Interface para props do card de consulta
export interface ConsultaCardProps {
  consulta: ConsultaPaciente
  onVisualizar?: (consulta: ConsultaPaciente) => void
  onCancelar?: (consulta: ConsultaPaciente) => void
  onReagendar?: (consulta: ConsultaPaciente) => void
  onConfirmar?: (consulta: ConsultaPaciente) => void
}

// Interface para props da modal de agendamento
export interface AgendarConsultaProps {
  modal: boolean
  setModal: (modal: boolean) => void
  onConfirmar: (agendamento: AgendamentoCompleto) => void
}
