import { Updater } from "use-immer"
import { InfoUsuarioRes } from "../../../services/usuario/interface"

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