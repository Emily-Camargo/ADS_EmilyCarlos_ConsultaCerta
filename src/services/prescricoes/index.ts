import { AxiosResponse } from 'axios'
import api from '../../config/api'
import { PrescricaoRes } from './interfaces'

export const getPrescricoesByPaciente = async (
  idPaciente: number
): Promise<AxiosResponse<PrescricaoRes[]>> => {
  const response = await api.get<PrescricaoRes[]>(
    `/prescricoes/paciente/${idPaciente}`
  )

  return Promise.resolve(response)
}
