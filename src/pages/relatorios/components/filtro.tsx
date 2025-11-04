import { InputsTypeFiltro } from '../../../components/filtro/utils/interface'
import { InputSelectProps } from '../../../components/input-mui/input-select/utils/interface'
import { InfoUsuarioRes } from '../../../services/usuario/interface'

interface DataReq {
  dataInicio: string
  dataFim: string
  idMedico: number | null
}

interface InputsProps {
  data: DataReq
  setData: (fn: (draft: DataReq) => void) => void
}

export const handleChange = <T extends keyof DataReq>(
  campo: T,
  valor: DataReq[T],
  setData: (fn: (draft: DataReq) => void) => void,
) => {
  setData((draft) => {
    draft[campo] = valor
  })
}

export const inputsRelatorios = ({
  data,
  setData,
}: InputsProps): InputsTypeFiltro[] => {
  return [
    {
      order: 1,
      type: 'date',
      shrink: true,
      value: data.dataInicio,
      label: 'Data inicial',
      onChange: (e) => handleChange('dataInicio', e.target.value, setData),
    },
    {
      order: 2,
      type: 'date',
      shrink: true,
      value: data.dataFim,
      label: 'Data final',
      onChange: (e) => handleChange('dataFim', e.target.value, setData),
      disabled: !data.dataInicio,
    },
  ]
}

export const selectMedicosRelatorios = (
  data: DataReq,
  setData: (fn: (draft: DataReq) => void) => void,
  medicos: InfoUsuarioRes[]
): InputSelectProps<InfoUsuarioRes, false> => ({
  options: medicos,
  optionLabel: (medico: InfoUsuarioRes) => medico.nome,
  placeholder: 'Selecione um médico',
  textFieldProps: {
    label: 'Médico',
  },
  value: medicos.find(m => m.medico?.idMedico === data.idMedico) || null,
  onChange: (_: any, value: InfoUsuarioRes | null) => {
    setData((draft) => {
      draft.idMedico = value?.medico?.idMedico || null
    })
  },
})

