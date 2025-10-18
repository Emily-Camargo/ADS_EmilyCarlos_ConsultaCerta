import { Updater } from "use-immer"
import { Medicamento, PrescricaoRes } from "../../../services/prescricoes/interfaces"
import { InfoUsuarioRes } from "../../../services/usuario/interface"


export interface PrescricaoCardProps {
  prescricao: PrescricaoRes
  onVisualizar?: (prescricao: PrescricaoRes) => void
  onImprimir?: (prescricao: PrescricaoRes) => void
}

export interface MedicamentoCardProps {
  medicamento: Medicamento
  index: number
}

export interface VisualizarPrescricaoProps {
  modal: boolean
  setModal: (modal: boolean) => void
  prescricao: PrescricaoRes | null
}

export interface DataReq {
  dtaIni: string
  dtaFinal: string
  pacientes: InfoUsuarioRes | null
}
export interface InputsProps {
  data: DataReq
  setData: Updater<DataReq>
}

export interface InputsSmProps extends InputsProps {
  pacientes?: InfoUsuarioRes[]
}