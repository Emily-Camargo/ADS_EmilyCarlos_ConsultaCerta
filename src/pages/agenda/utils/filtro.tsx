import { DataReqAgenda, InputsPropsAgenda } from './interfaces'
import { handleChange } from './functions'
import { InputsTypeFiltro } from '../../../components/filtro/utils/interface'
import { InputSelectProps } from '../../../components/input-mui/input-select/utils/interface'
import { InfoUsuarioRes } from '../../../services/usuario/interface'

export const agendaFil: DataReqAgenda = { 
  idMedico: null,
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
      type: 'date',
      value: data.dataInicio,
      label: 'Data início vigência',
      shrink: true,
      onChange: (e) => handleChange('dataInicio', e.target.value, setData),
    },
    {
      order: 2,
      type: 'date',
      value: data.dataFim,
      label: 'Data fim vigência',
      shrink: true,
      onChange: (e) => handleChange('dataFim', e.target.value, setData),
    },
  ]
}

export const selectMedicosAgenda = (
  data: DataReqAgenda,
  handleMedicoChange: (_event: React.SyntheticEvent, value: InfoUsuarioRes | null) => void,
  medicos: InfoUsuarioRes[]
): InputSelectProps<InfoUsuarioRes, false> => ({
  options: medicos,
  optionLabel: (medico: InfoUsuarioRes) => medico.nome,
  placeholder: 'Selecione um médico',
  textFieldProps: {
    label: 'Médico',
  },
  value: medicos.find(m => m.medico?.idMedico === data.idMedico) || null,
  onChange: handleMedicoChange,
})
