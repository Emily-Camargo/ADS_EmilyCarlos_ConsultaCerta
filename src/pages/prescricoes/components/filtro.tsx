
import { InputsProps, InputsSmProps } from '../utils/interface'
import { handleChange } from '../utils/functions'
import { InputSelectMultipleProps } from '../../../components/Inputs/inputSelect'
import { InfoUsuarioRes } from '../../../services/usuario/interface'
import { InputSelectProps } from '../../../components/input-mui/input-select/utils/interface'
import { InputsTypeFiltro } from '../../../components/filtro/utils/interface'

export const inputsPrescricoes = ({ data, setData }: InputsProps): InputsTypeFiltro[] => {
  return [
    {
      type: 'date',
      shrink: true,
      value: data.dtaIni,
      label: 'Data inicial',
      onChange: (e) => handleChange('dtaIni', e.target.value, setData),
    },
    {
      type: 'date',
      shrink: true,
      value: data.dtaFinal,
      label: 'Data final',
      onChange: (e) => handleChange('dtaFinal', e.target.value, setData),
      disabled: !data.dtaIni,
    },
  ]
}

export const inputsSelect = ({
  data,
  setData,
  pacientes,
}: InputsSmProps) => {
  return [
    ...(pacientes
      ? [
          {
            value: data.pacientes,
            multiple: false,
            textFieldProps: {
              label: 'Pacientes',
            },
            required: true,
            onChange: (_e, v) => handleChange('pacientes', v as InfoUsuarioRes, setData),
            options: pacientes ?? [],
            optionLabel: (r) => `${r.nome}`,
          } as InputSelectMultipleProps<InfoUsuarioRes>,
        ]
      : []),
  ] as InputSelectProps<InfoUsuarioRes>[]
}
