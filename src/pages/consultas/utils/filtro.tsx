import { InputSelectProps } from '../../../components/input-mui/input-select/utils/interface'
import { InfoUsuarioRes } from '../../../services/usuario/interface'

export const selectMedicosConsultas = (
  filtroMedicoSelecionado: number | null,
  handleMedicoChange: (_event: React.SyntheticEvent, value: InfoUsuarioRes | null) => void,
  medicos: InfoUsuarioRes[]
): InputSelectProps<InfoUsuarioRes, false> => ({
  options: medicos,
  optionLabel: (medico: InfoUsuarioRes) => medico.nome,
  placeholder: 'Selecione um médico',
  textFieldProps: {
    label: 'Médico',
  },
  value: medicos.find(m => m.medico?.idMedico === filtroMedicoSelecionado) || null,
  onChange: handleMedicoChange,
})

