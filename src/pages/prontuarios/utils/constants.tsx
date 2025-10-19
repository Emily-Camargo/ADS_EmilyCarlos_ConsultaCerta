import { DataReq } from "./interfaces";

export const prontuariosFil: DataReq = { 
  pacientes: null 
}


export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'realizada':
      return '#10b981'
    case 'agendada':
      return '#3b82f6'
    case 'cancelada':
      return '#ef4444'
    case 'reagendada':
      return '#f59e0b'
    default:
      return '#6b7280'
  }
}

export const calcularIdade = (dataNascimento: string) => {
  const hoje = new Date()
  const nascimento = new Date(dataNascimento)
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mesAtual = hoje.getMonth()
  const mesNascimento = nascimento.getMonth()
  
  if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
    idade--
  }
  
  return idade
}