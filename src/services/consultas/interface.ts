export interface BuscarConsultasReq {
  dataInicio: string;
  dataFim: string;
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

