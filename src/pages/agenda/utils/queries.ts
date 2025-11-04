import { getInfoAgenda, getHorariosMedico } from '../../../services/medico'
import { GetInfoAgendaParams } from '../../../services/medico/interface'
import { mapearAgendaResParaHorarioAtendimento } from './interfaces'

// Query Keys
export const agendaKeys = {
  all: ['agenda'] as const,
  horarios: (params?: GetInfoAgendaParams) => [...agendaKeys.all, 'horarios', params] as const,
  horariosMedico: (idMedico: number) => [...agendaKeys.all, 'horarios', 'medico', idMedico] as const,
}

// Query Functions
export const fetchHorarios = async (params?: GetInfoAgendaParams) => {
  const response = await getInfoAgenda(params)
  return response.data.map(mapearAgendaResParaHorarioAtendimento)
}

export const fetchHorariosMedico = async (idMedico: number) => {
  const response = await getHorariosMedico(idMedico)
  return response.data.map(mapearAgendaResParaHorarioAtendimento)
}
