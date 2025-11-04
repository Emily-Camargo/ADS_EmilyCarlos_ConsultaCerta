import { InputsTypeFiltro } from '../../../components/filtro/utils/interface'

interface DataReq {
  dataInicio: string
  dataFim: string
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

