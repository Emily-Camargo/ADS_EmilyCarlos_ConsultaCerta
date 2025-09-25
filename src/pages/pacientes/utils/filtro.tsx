import { DataReq, InputsProps } from './interfaces'
import { handleChange } from './functions'
import { InputsTypeFiltro } from '../../../components/filtro/utils/interface'
import { mascaradorCPFCNPJ } from '../../../functions/mascaras'

export const pacientesFil: DataReq = { nomePaciente: '', cpf: '', dataNascimento: '', sexo: '' }

export const inputsPacientes = ({
  data,
  setData,
}: InputsProps): InputsTypeFiltro[] => {
  return [
    {
      order: 1,
      value: data.nomePaciente,
      label: 'Nome do paciente',
      onChange: (e) => handleChange('nomePaciente', e.target.value, setData),
    },
    {
      order: 2,
      value: data.cpf,
      label: 'CPF',
      onChange: (e) => handleChange('cpf', mascaradorCPFCNPJ({ v: e.target.value }), setData),
      inputProps: { maxLength: 14 },
    },
    {
      order: 3,
      type: 'date',
      value: data.dataNascimento,
      label: 'Data de nascimento',
      shrink: true,
      onChange: (e) => handleChange('dataNascimento', e.target.value, setData),
    },
    {
      order: 4,
      value: data.sexo,
      label: 'Gênero',
      onChange: (e) => handleChange('sexo', e.target.value, setData),
    },
  ]
}
