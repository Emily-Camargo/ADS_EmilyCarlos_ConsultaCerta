export interface CadastroDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export interface FormData {
  id_perfil: number
  nome: string
  cpf: string
  email: string
  telefone: string
  numero_whatsapp: string
  whatsapp_autorizado: boolean
  senha_hash: string
  ativo: boolean
}

export interface EsqueceuSenhaModalProps {
  isOpen: boolean
  onClose: () => void
}
