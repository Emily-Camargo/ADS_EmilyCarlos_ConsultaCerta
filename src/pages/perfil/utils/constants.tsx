import { PacientePerfilForm } from "./interfaces"

export const initialFormPerfil: PacientePerfilForm = {
  dataNascimento: '',
  genero: '',
  tipoSanguineo: '',
  convenio: '',
  numeroCarteirinha: '',
  contatoEmergenciaNome: '',
  contatoEmergenciaTelefone: '',
  observacoes: '',
}

export const generoOptions = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Feminino' },
]

export const tipoSanguineoOptions = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
]

