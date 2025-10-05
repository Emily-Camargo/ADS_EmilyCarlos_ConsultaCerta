import { AxiosResponse } from 'axios';
import api from '../../config/api';
import { CriaUsuarioReq, CriaUsuarioRes, LoginReq, LoginRes } from './interface';

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
  try {
    const response = await api.post<LoginRes>(
      '/auth/login',
      data
    );
    
    return Promise.resolve(response);
  } catch (error) {
    throw error;
  }
};
