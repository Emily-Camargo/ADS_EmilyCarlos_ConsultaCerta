export interface PacientePerfilForm {
  dataNascimento: string
  genero: string
  tipoSanguineo: string
  convenio: string
  numeroCarteirinha: string
  contatoEmergenciaNome: string
  contatoEmergenciaTelefone: string
  observacoes: string
}

export interface EditarPacientePerfilProps {
  modal: boolean
  setModal: (open: boolean) => void
  onConfirmar: (paciente: PacientePerfilForm) => void
  pacienteData?: PacientePerfilForm | null
}

