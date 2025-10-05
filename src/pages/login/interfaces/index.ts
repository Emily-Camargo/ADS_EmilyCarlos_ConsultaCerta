export interface CadastroDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export interface FormData {
  idPerfil: number
  nome: string
  cpf: string
  email: string
  telefone: string
  numeroWhatsapp: string
  whatsappAutorizado: boolean
  senha: string
}

export interface EsqueceuSenhaModalProps {
  isOpen: boolean
  onClose: () => void
}
