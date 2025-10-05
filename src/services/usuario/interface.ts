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

// export interface LoginReq {
//   email: string
//   senha: string
// }

// export interface LoginRes {
//   access_token: string
// }

export interface StatusRes {
  status: string
}