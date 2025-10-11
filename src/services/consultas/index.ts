import { AxiosResponse } from 'axios';
import api from '../../config/api';
import { AgendarConsultaReq, BuscarConsultasReq, ConsultaRes } from './interface';
import { StatusRes } from '../interfaceGeneric';

export const postBuscarConsultas = async (
  data: BuscarConsultasReq,
): Promise<AxiosResponse<ConsultaRes[]>> => {
  const response = await api.post<ConsultaRes[]>(
    '/consultas/buscar',
    data
  );

  return Promise.resolve(response);
};

export const postAgendarConsulta = async (data: AgendarConsultaReq): Promise<AxiosResponse<StatusRes>> => {
  const response = await api.post<StatusRes>(
    '/consultas/agendar',
    data
  );

  return Promise.resolve(response);
};
