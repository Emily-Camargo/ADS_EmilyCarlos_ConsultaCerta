import { DataReqAgenda, InputsPropsAgenda } from './interfaces'
import { handleChange } from './functions'
import { InputsTypeFiltro } from '../../../components/filtro/utils/interface'

export const agendaFil: DataReqAgenda = { 
  nomeMedico: '', 
  crm: '',
  dataInicio: '', 
  dataFim: '', 
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
      value: data.crm,
      label: 'CRM',
      onChange: (e) => handleChange('crm', e.target.value, setData),
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
  ]
}
