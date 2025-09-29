import { MdCalendarToday, MdCancel, MdLocalHospital, MdSchedule, MdVerified } from "react-icons/md"

export const formatarDataHora = (dataHora: string) => {
    const data = new Date(dataHora)
    return {
      data: data.toLocaleDateString('pt-BR'),
      hora: data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
}

export const getStatusText = (status: string) => {
    switch (status) {
      case 'agendada':
        return 'Agendada'
      case 'confirmada':
        return 'Confirmada'
      case 'concluida':
        return 'Concluída'
      case 'cancelada':
        return 'Cancelada'
      default:
        return status
    }
}

export  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agendada':
        return <MdSchedule size={16} />
      case 'confirmada':
        return <MdVerified size={16} />
      case 'concluida':
        return <MdLocalHospital size={16} />
      case 'cancelada':
        return <MdCancel size={16} />
      default:
        return <MdCalendarToday size={16} />
    }
  }