import { 
  MdLocalPharmacy, 
  MdWarning, 
  MdCheckCircle,
  MdAccessTime,
  MdCalendarToday
} from 'react-icons/md'
import { DataReq } from './interface'

export const formatarDataHora = (dataHora: string) => {
  const partes = dataHora.split(' ')
  return {
    data: partes[0],
    hora: partes[1]
  }
}

export const formatarDataCriacao = (dataCriacao: string) => {
  const data = new Date(dataCriacao)
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export const verificarValidadeMedicamento = (validade: string) => {
  const dataValidade = new Date(validade)
  const hoje = new Date()
  const diasRestantes = Math.floor((dataValidade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diasRestantes < 0) {
    return {
      status: 'vencido',
      cor: '#ef4444',
      icone: <MdWarning size={16} />,
      texto: 'Vencido'
    }
  } else if (diasRestantes <= 30) {
    return {
      status: 'proximo-vencer',
      cor: '#f59e0b',
      icone: <MdAccessTime size={16} />,
      texto: `Vence em ${diasRestantes} dias`
    }
  } else {
    return {
      status: 'valido',
      cor: '#10b981',
      icone: <MdCheckCircle size={16} />,
      texto: `Válido até ${new Date(validade).toLocaleDateString('pt-BR')}`
    }
  }
}

export const getMedicamentoIcon = (controlado: boolean) => {
  if (controlado) {
    return <MdWarning size={18} color="#ef4444" />
  }
  return <MdLocalPharmacy size={18} color="#10b981" />
}

export const getConsultaIcon = () => {
  return <MdCalendarToday size={18} color="#3b82f6" />
}

export const prescricoesFil: DataReq = { dtaIni: '', dtaFinal: '', pacientes: null }
