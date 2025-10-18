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

export interface PacienteProntuario {
  id_paciente: number;
  nome: string;
  data_nascimento: string;
  alergias: string;
  condicoes_cronicas: string;
  medicamentos_uso_continuo: string;
  ultima_atualizacao: string;
}

export interface Prontuario {
  id_prontuario: number;
  data_criacao: string;
  descricao: string;
}

export interface MedicoProntuario {
  nome: string;
  crm: string;
  especialidade: string;
}

export interface PrescricaoProntuario {
  nome_medicamento: string;
  dosagem: string;
  instrucoes: string;
  quantidade: number;
  controlado: boolean;
  validade: string;
}

export interface ConsultaProntuario {
  id_consulta: number;
  data_hora: string;
  motivo: string;
  status: string;
  peso: number | null;
  altura: number | null;
  pressao_arterial: string | null;
  temperatura: number | null;
  anamnese: string;
  exame_fisico: string;
  hipotese_diagnostica: string;
  conduta_medica: string;
  medico: MedicoProntuario;
  prescricoes: PrescricaoProntuario[];
}

export interface ProntuarioPacienteRes {
  paciente: PacienteProntuario;
  prontuario: Prontuario;
  consultas: ConsultaProntuario[];
}