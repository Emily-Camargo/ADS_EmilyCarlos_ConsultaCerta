import { AxiosResponse } from 'axios';
import api from '../../config/api';
import { AgendarConsultaReq, BuscarConsultasReq, CancelarConsultaReq, ConfirmarConsultaReq, ConsultaRes, ReagendarConsultaReq, ProntuarioPacienteRes, AtualizarConsultaReq, AtualizarProntuarioReq } from './interface';
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


export const buscarConsultaEspecifica = async (idConsulta: number): Promise<AxiosResponse<ConsultaRes>> => {
  const response = await api.post<ConsultaRes>(
    '/consultas/buscar',
    { idConsulta }
  );

  return Promise.resolve(response);
};


export const reagendarConsulta = async (data: ReagendarConsultaReq): Promise<AxiosResponse<StatusRes>> => {
  const response = await api.put<StatusRes>(
    '/consultas/reagendar',
    data
  );

  return Promise.resolve(response);
};

export const cancelarConsulta = async (data: CancelarConsultaReq): Promise<AxiosResponse<StatusRes>> => {
  const response = await api.put<StatusRes>(
    '/consultas/cancelar',
    data
  );

  return Promise.resolve(response);
};

export const confirmarConsulta = async (data: ConfirmarConsultaReq): Promise<AxiosResponse<StatusRes>> => {
  const response = await api.put<StatusRes>(
    '/consultas/confirmar',
    data
  );

  return Promise.resolve(response);
};

export const buscarProntuarioPaciente = async (idPaciente: number): Promise<AxiosResponse<ProntuarioPacienteRes>> => {
  const response = await api.get<ProntuarioPacienteRes>(
    `/consultas/prontuario/${idPaciente}`
  );

  return Promise.resolve(response);
};

export const atualizarConsulta = async (data: AtualizarConsultaReq): Promise<AxiosResponse<StatusRes>> => {
  const response = await api.put<StatusRes>(
    '/consultas/atualizar-status',
    data
  );

  return Promise.resolve(response);
};
export const atualizarProntuario = async (data: AtualizarProntuarioReq): Promise<AxiosResponse<StatusRes>> => {
  const response = await api.post<StatusRes>(
    '/consultas/criar-prontuario',
    data
  );

  return Promise.resolve(response);
};
