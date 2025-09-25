import { DataReqAgenda, InputsPropsAgenda } from './interfaces'
import { handleChange } from './functions'
import { InputsTypeFiltro } from '../../../components/filtro/utils/interface'
import { statusOptions, diasSemanaOptions } from './constants'

export const agendaFil: DataReqAgenda = { 
  nomeMedico: '', 
  diaSemana: '', 
  dataInicio: '', 
  dataFim: '', 
  ativo: '' 
}

export const inputsAgenda = ({
  data,
  setData,
}: InputsPropsAgenda): InputsTypeFiltro[] => {
  return [
    {
      order: 1,
      value: data.nomeMedico,
      label: 'Nome do médico',
      onChange: (e) => handleChange('nomeMedico', e.target.value, setData),
    },
    {
      order: 2,
      value: data.diaSemana,
      label: 'Dia da semana',
      type: 'select',
      options: [{ value: '', label: 'Todos' }, ...diasSemanaOptions],
      onChange: (e) => handleChange('diaSemana', e.target.value, setData),
    },
    {
      order: 3,
      type: 'date',
      value: data.dataInicio,
      label: 'Data início vigência',
      shrink: true,
      onChange: (e) => handleChange('dataInicio', e.target.value, setData),
    },
    {
      order: 4,
      type: 'date',
      value: data.dataFim,
      label: 'Data fim vigência',
      shrink: true,
      onChange: (e) => handleChange('dataFim', e.target.value, setData),
    },
    {
      order: 5,
      value: data.ativo,
      label: 'Status',
      type: 'select',
      options: statusOptions,
      onChange: (e) => handleChange('ativo', e.target.value, setData),
    },
  ]
}
