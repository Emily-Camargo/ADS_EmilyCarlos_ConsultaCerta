import { AxiosResponse } from 'axios';
import api from '../../config/api';
import { CriaUsuarioReq, CriaUsuarioRes } from './interface';

export const postCriaUsuario = async (
  data: CriaUsuarioReq,
): Promise<AxiosResponse<CriaUsuarioRes>> => {
  const response = await api.post<CriaUsuarioRes>(
    '/usuarios/registrar',
    data
  );

  return Promise.resolve(response);
};
