import { AxiosResponse } from 'axios';
import api from '../../config/api';
import { CriaUsuarioReq, CriaUsuarioRes, InfoUsuarioReq, InfoUsuarioRes, LoginReq, LoginRes } from './interface';

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

