export interface CriaUsuarioReq {
  id?: number
  nome_usuario?: string
  email?: string
  senha?: string
}

export interface RetornaUsuarioRes {
  id: number
  nome_usuario: string
  email: string
  senha: string
  criado_em: string
}

export interface LoginReq {
  email: string
  senha: string
}

export interface LoginRes {
  access_token: string
}

export interface StatusRes {
  status: string
}