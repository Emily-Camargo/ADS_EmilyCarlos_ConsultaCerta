import { InputsSmProps } from '../utils/interfaces'
import { handleChange } from '../utils/functions'
import { InputSelectMultipleProps } from '../../../components/Inputs/inputSelect'
import { InfoUsuarioRes } from '../../../services/usuario/interface'
import { InputSelectProps } from '../../../components/input-mui/input-select/utils/interface'


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
