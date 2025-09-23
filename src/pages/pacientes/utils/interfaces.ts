import { Updater } from 'use-immer'


export interface DataReq {
  nomePaciente: string
  cpf: string
  dataNascimento: string
  sexo: string
  cidade: string
  estado: string
}

export interface InputsProps {
  data: DataReq
  setData: Updater<DataReq>
}