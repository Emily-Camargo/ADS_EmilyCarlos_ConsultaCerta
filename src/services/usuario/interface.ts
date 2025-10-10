export interface CriaUsuarioReq {
  nome: string
  cpf: string
  email: string
  telefone: string
  numeroWhatsapp: string
  whatsappAutorizado: boolean
  senha: string
  idPerfil: number
}

export interface PerfilUsuario {
  idPerfil: number;
  nome: string;
  descricao: string;
}

export interface CriaUsuarioRes {
  idUsuario: number;
  idPerfil: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  numeroWhatsapp: string;
  whatsappAutorizado: boolean;
  ativo: boolean;
  dataCriacao: string;
  ultimoAcesso: string | null;
  perfil: PerfilUsuario;
}

export interface LoginReq {
  email: string
  senha: string
}

export interface LoginResUser {
  idUsuario: number;
  nome: string;
  email: string;
  idPerfil: number;
  perfil: PerfilUsuario;
  medico?: MedicoInfo;
}

export interface LoginRes {
  access_token: string;
  user:LoginResUser;
  expiresIn: number;
}

export interface InfoUsuarioReq {
  id: number;
}

export interface BuscarUsuariosReq {
  idPerfil?: number;
}

export interface PacienteInfo {
  idPaciente: number;
  dataNascimento: string;
  genero: string;
  tipoSanguineo: string;
  convenio: string;
  numeroCarteirinha: string;
  contatoEmergenciaNome: string;
  contatoEmergenciaTelefone: string;
  observacoes: string;
}

export interface MedicoInfo {
  idMedico: number;
  idClinica: number;
  idEspecialidade: number;
  crm: string;
  valorConsulta: string;
  tempoConsulta: number;
  ativo: boolean;
  especialidade: string;
  clinica: string;
}

export interface InfoUsuarioRes {
  idUsuario: number;
  idPerfil: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  numeroWhatsapp: string;
  whatsappAutorizado: boolean;
  ativo: boolean;
  dataCriacao: string;
  ultimoAcesso: string | null;
  perfil: PerfilUsuario;
  paciente?: PacienteInfo;
  medico?: MedicoInfo;
}

export interface AtualizarPacienteReq {
  dataNascimento: string;
  genero: string;
  tipoSanguineo: string;
  convenio: string;
  numeroCarteirinha: string;
  contatoEmergenciaNome: string;
  contatoEmergenciaTelefone: string;
  observacoes: string;
}

export interface AtualizarPacienteParams {
  idUsuario: number;
  data: AtualizarPacienteReq;
}

export interface CadastrarPacienteReq {
  idUsuario: number;
  dataNascimento: string;
  genero: string;
  tipoSanguineo: string;
  convenio: string;
  numeroCarteirinha: string;
  contatoEmergenciaNome: string;
  contatoEmergenciaTelefone: string;
  observacoes: string;
}