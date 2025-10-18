// Interface para medicamento
export interface Medicamento {
  nomeMedicamento: string
  dosagem: string
  instrucoes: string
  quantidade: number
  controlado: boolean
  validade: string
  nomeMedico: string
  crm: string
  dtaCriacao: string
}

// Interface para prescrição (consulta com medicamentos)
export interface Prescricao {
  idConsulta: number
  dtaConsulta: string
  medicamentos: Medicamento[]
  nomePaciente: string
  nomeMedico: string
  especialidade: string
  cpf: string
}

// Interface para props do card de prescrição
export interface PrescricaoCardProps {
  prescricao: Prescricao
  onVisualizar?: (prescricao: Prescricao) => void
  onImprimir?: (prescricao: Prescricao) => void
}

// Interface para props do card de medicamento
export interface MedicamentoCardProps {
  medicamento: Medicamento
  index: number
}

// Interface para modal de visualização
export interface VisualizarPrescricaoProps {
  modal: boolean
  setModal: (modal: boolean) => void
  prescricao: Prescricao | null
}

