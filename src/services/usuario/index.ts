import axios, { AxiosResponse } from 'axios';
import { CriaUsuarioReq, LoginReq, LoginRes, RetornaUsuarioRes } from './interface';
import { StatusRes } from './interface';

export const getUsers = async (): Promise<AxiosResponse<RetornaUsuarioRes[]>> => {
  const response = await axios.get<RetornaUsuarioRes[]>('http://localhost:3005/api/teds/users', {
  });

  return Promise.resolve(response);
}

export const postUsers = async (
  data: CriaUsuarioReq,
): Promise<AxiosResponse<StatusRes>> => {
  const response = await axios.post<StatusRes>(
    'http://localhost:3005/api/teds/users',
    data,
  )

  return Promise.resolve(response)
}

export const deletaUser = async (
  id: number,
): Promise<AxiosResponse<StatusRes>> => {
  const response = await axios.delete<StatusRes>(
    `http://localhost:3005/api/teds/users/${id}`,
  );

  return Promise.resolve(response);
};


export const updateUser = async (
  id: number,
  updatePetDto: Partial<CriaUsuarioReq>
): Promise<AxiosResponse<StatusRes>> => {
  const response = await axios.put<StatusRes>(
    `http://localhost:3005/api/teds/users/${id}`, 
    updatePetDto
  );

  return Promise.resolve(response);
};

export const postLogin = async (
  data: LoginReq,
): Promise<AxiosResponse<LoginRes>> => {
  const response = await axios.post<LoginRes>(
    'http://localhost:3005/api/teds/auth/login',
    data,
  )

  return Promise.resolve(response)
}