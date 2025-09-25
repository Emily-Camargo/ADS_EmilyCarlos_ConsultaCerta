import { PacienteForm } from "./interfaces"

export const initialForm: PacienteForm = {
    data_nascimento: '',
    genero: '',
    tipo_sanguineo: '',
    convenio: '',
    numero_carteirinha: '',
    contato_emergencia_nome: '',
    contato_emergencia_telefone: '',
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