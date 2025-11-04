import { AxiosResponse } from 'axios';
import api from '../../config/api';
import { DashboardReq, DashboardRes } from './interface';

export const getDashboard = async (
  params?: DashboardReq,
): Promise<AxiosResponse<DashboardRes>> => {
  const response = await api.get<DashboardRes>(
    '/dashboard',
    { params }
  );

  return Promise.resolve(response);
};

