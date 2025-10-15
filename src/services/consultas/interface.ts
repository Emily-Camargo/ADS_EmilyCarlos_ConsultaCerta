export interface BuscarConsultasReq {
  dataInicio?: string;
  dataFim?: string;
  idMedico?: number;
  idPaciente?: number;
}

export interface MedicoConsulta {
  idMedico: number;
  nome: string;
  crm: string;
  especialidade: string;
}

export interface PacienteConsulta {
  idPaciente: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export interface ConsultaRes {
  idConsulta: number;
  idPaciente: number;
  idMedico: number;
  dataHora: string;
  status: string;
  motivo: string;
  observacoes: string;
  valorConsulta: number;
  confirmada: boolean;
  prazoConfirmacao: string;
  dataConfirmacao: string | null;
  dataCancelamento: string | null;
  motivoCancelamento: string | null;
  numeroReagendamentos: number;
  criadoEm: string;
  atualizadoEm: string;
  criadoPor: number;
  medico: MedicoConsulta;
  paciente: PacienteConsulta;
}

export interface AgendarConsultaReq {
  idPaciente: number;
  idMedico: number;
  dataConsulta: string;      
  horarioConsulta: string;    
  motivo: string;
  observacoes: string;
  valorConsulta: number;
  confirmada: boolean;
  prazoConfirmacao: string;
}

export interface ReagendarConsultaReq {
  id: number;
  novaDataConsulta: string;
  novoHorarioConsulta: string;
  motivoReagendamento: string;
}

export interface CancelarConsultaReq {
  id: number;
  motivoCancelamento: string;
}

export interface ConfirmarConsultaReq {
  id: number;
}