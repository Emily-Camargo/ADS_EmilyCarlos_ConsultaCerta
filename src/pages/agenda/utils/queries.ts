import { getInfoAgenda, getHorariosMedico, getBloqueiosMedico } from '../../../services/medico'
import { GetInfoAgendaParams } from '../../../services/medico/interface'
import { mapearAgendaResParaHorarioAtendimento } from './interfaces'
import { mapearBloqueioRes } from './constants'
import { InfoUsuarioRes } from '../../../services/usuario/interface'
import { BloqueioAgenda } from './interfaces'

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

export const fetchTodosBloqueios = async (medicos: InfoUsuarioRes[], idMedicoFiltro?: number | null): Promise<BloqueioAgenda[]> => {
  try {
    const medicosAtivos = medicos.filter(m => m.medico?.ativo && m.ativo)
    
    // Se há filtro de médico, buscar apenas os bloqueios desse médico
    if (idMedicoFiltro) {
      const response = await getBloqueiosMedico(idMedicoFiltro)
      return response.data.map(mapearBloqueioRes)
    }
    
    // Caso contrário, buscar bloqueios de todos os médicos
    const promises = medicosAtivos.map(async (medico) => {
      if (!medico.medico?.idMedico) return []
      try {
        const response = await getBloqueiosMedico(medico.medico.idMedico)
        return response.data.map(mapearBloqueioRes)
      } catch (error) {
        console.error(`Erro ao buscar bloqueios do médico ${medico.medico.idMedico}:`, error)
        return []
      }
    })

    const results = await Promise.all(promises)
    return results.flat()
  } catch (error) {
    console.error('Erro ao buscar bloqueios:', error)
    return []
  }
}
