import { AxiosResponse } from 'axios'
import api from '../../config/api'
import { PrescricaoRes, BuscarPrescricoesReq } from './interfaces'

export const buscarPrescricoes = async (
  data: BuscarPrescricoesReq
): Promise<AxiosResponse<PrescricaoRes[]>> => {
  const response = await api.post<PrescricaoRes[]>(
    '/prescricoes/buscar-prescricoes',
    data
  )

  return Promise.resolve(response)
}