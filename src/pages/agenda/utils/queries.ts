import { getInfoAgenda, getHorariosMedico } from '../../../services/medico'
import { mapearAgendaResParaHorarioAtendimento } from './interfaces'

// Query Keys
export const agendaKeys = {
  all: ['agenda'] as const,
  horarios: () => [...agendaKeys.all, 'horarios'] as const,
  horariosMedico: (idMedico: number) => [...agendaKeys.all, 'horarios', 'medico', idMedico] as const,
}

// Query Functions
export const fetchHorarios = async () => {
  const response = await getInfoAgenda()
  return response.data.map(mapearAgendaResParaHorarioAtendimento)
}

export const fetchHorariosMedico = async (idMedico: number) => {
  const response = await getHorariosMedico(idMedico)
  return response.data.map(mapearAgendaResParaHorarioAtendimento)
}
