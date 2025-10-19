import { Updater } from "use-immer"
import { InfoUsuarioRes } from "../../../services/usuario/interface"
import { ProntuarioPacienteRes } from "../../../services/consultas/interface"

export interface DataReq {
    pacientes: InfoUsuarioRes | null
  }
  
  export interface InputsProps {
    data: DataReq
    setData: Updater<DataReq>
  }
  
  export interface InputsSmProps extends InputsProps {
    pacientes?: InfoUsuarioRes[]
  }

export interface VisualizarProntuarioProps {
    modal: boolean
    setModal: (open: boolean) => void
    prontuario: ProntuarioPacienteRes | null
}

export interface ProntuarioCardProps {
  prontuario: ProntuarioPacienteRes
  onVisualizar: (prontuario: ProntuarioPacienteRes) => void
}