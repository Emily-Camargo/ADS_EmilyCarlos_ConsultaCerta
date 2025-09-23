import { DataReq, InputsProps } from './interfaces'
import { handleChange } from './functions'
import { InputsTypeFiltro } from '../../../components/filtro/utils/interface'

export const pacientesFil: DataReq = { nomePaciente: '', cpf: '', dataNascimento: '', sexo: '', cidade: '', estado: '' }

export const inputsPacientes = ({
  data,
  setData,
}: InputsProps): InputsTypeFiltro[] => {
  return [
    {
      order: 1,
      type: 'date',
      required: true,
      value: data.nomePaciente,
      label: 'Nome do paciente',
      InputLabelProps: { shrink: true },
      inputProps: { min: '2023-01-01' },
      onChange: (e) => handleChange('nomePaciente', e.target.value, setData),
    },
    {
      order: 2,
      value: data.cpf,
      label: 'CPF',
      onChange: (e) => handleChange('cpf', e.target.value, setData),
    },
    {
      order: 3,
      value: data.dataNascimento,
      label: 'Data de nascimento',
      onChange: (e) => handleChange('dataNascimento', e.target.value, setData),
    },
    {
      order: 4,
      value: data.sexo,
      label: 'Sexo',
      onChange: (e) => handleChange('sexo', e.target.value, setData),
    },
    {
      order: 5,
      value: data.cidade,
      label: 'Cidade',
      onChange: (e) => handleChange('cidade', e.target.value, setData),
    },
    {
      order: 6,
      value: data.estado,
      label: 'Estado',
      onChange: (e) => handleChange('estado', e.target.value, setData),
    },
  ]
}
