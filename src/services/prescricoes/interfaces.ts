export interface Medicamento {
  nomeMedicamento: string
  dosagem: string
  instrucoes: string
  quantidade: number
  controlado: boolean
  validade: string
  nomeMedico: string
  crm: string
  dtaCriacao: string
}

export interface PrescricaoRes {
  idConsulta: number
  dtaConsulta: string
  nomePaciente: string
  nomeMedico: string
  especialidade: string
  cpf: string
  medicamentos: Medicamento[]
}

export interface BuscarPrescricoesReq {
  idPaciente: number
  dataIni?: string
  dataFinal?: string
}