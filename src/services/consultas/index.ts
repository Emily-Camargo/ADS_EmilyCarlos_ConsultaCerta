import { AxiosResponse } from 'axios';
import api from '../../config/api';
import { BuscarConsultasReq, ConsultaRes } from './interface';

export const postBuscarConsultas = async (
  data: BuscarConsultasReq,
): Promise<AxiosResponse<ConsultaRes[]>> => {
  const response = await api.post<ConsultaRes[]>(
    '/consultas/buscar',
    data
  );

  return Promise.resolve(response);
};

