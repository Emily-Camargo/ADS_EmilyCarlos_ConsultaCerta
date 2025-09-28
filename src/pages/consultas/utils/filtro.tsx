import { InputSelectProps } from '../../../components/input-mui/input-select/utils/interface'

interface MedicoOption {
  value: string;
  label: string;
}

export const opcoesMedicos: MedicoOption[] = [
  { value: '', label: 'Todos os médicos' },
  { value: 'Dra. Carla', label: 'Dra. Carla' },
  { value: 'Dr. João Oliveira', label: 'Dr. João Oliveira' },
  { value: 'Dra. Ana Paula', label: 'Dra. Ana Paula' },
  { value: 'Dr. Roberto Silva', label: 'Dr. Roberto Silva' },
  { value: 'Dr. Carlos Eduardo', label: 'Dr. Carlos Eduardo' },
  { value: 'Dra. Patricia Lima', label: 'Dra. Patricia Lima' }
]

export const filtroMedico: Omit<InputSelectProps<MedicoOption, false>, 'sx'> = {
  options: opcoesMedicos,
  optionLabel: (medico: MedicoOption) => medico.label,
  placeholder: 'Selecione um médico',
  textFieldProps: {
    label: 'Médico',
  },
}