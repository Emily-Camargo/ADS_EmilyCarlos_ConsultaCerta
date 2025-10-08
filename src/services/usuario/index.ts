import { AxiosResponse } from 'axios';
import api from '../../config/api';
import { CriaUsuarioReq, CriaUsuarioRes, InfoUsuarioReq, InfoUsuarioRes, LoginReq, LoginRes, AtualizarPacienteParams, BuscarUsuariosReq, CadastrarPacienteReq } from './interface';

export const postCriaUsuario = async (
  data: CriaUsuarioReq,
): Promise<AxiosResponse<CriaUsuarioRes>> => {
  const response = await api.post<CriaUsuarioRes>(
    '/usuarios/registrar',
    data
  );

  return Promise.resolve(response);
};

export const postLogin = async (
  data: LoginReq,
): Promise<AxiosResponse<LoginRes>> => {
    const response = await api.post<LoginRes>(
      '/auth/login', data
    );
    
    return Promise.resolve(response);
};


export const getInfoUsuario = async (
  data: InfoUsuarioReq,
): Promise<AxiosResponse<InfoUsuarioRes>> => {
    const response = await api.get<InfoUsuarioRes>(
      `/usuarios/buscar/${data.id}`
    );
    
    return Promise.resolve(response);
};

export const postCadastrarPaciente = async (
  data: CadastrarPacienteReq,
): Promise<AxiosResponse<InfoUsuarioRes>> => {
  const response = await api.post<InfoUsuarioRes>(
    'usuarios/registrar-paciente',
    data
  );
  
  return Promise.resolve(response);
};

export const putAtualizarPaciente = async (
  params: AtualizarPacienteParams,
): Promise<AxiosResponse<InfoUsuarioRes>> => {
  const response = await api.put<InfoUsuarioRes>(
    `usuarios/atualizar-usuario/${params.idUsuario}`,
    params.data
  );
  
  return Promise.resolve(response);
};

export const getBuscarPacientes = async (): Promise<AxiosResponse<InfoUsuarioRes[]>> => {
  const data: BuscarUsuariosReq = { idPerfil: 4 };
  const response = await api.post<InfoUsuarioRes[]>('/usuarios/buscar', data);
  
  return Promise.resolve(response);
};

export const getBuscarPaciente = async (
  id: number
): Promise<AxiosResponse<InfoUsuarioRes>> => {
  const response = await api.get<InfoUsuarioRes>(`/usuarios/buscar/${id}`, {});
  
  return Promise.resolve(response);
};

