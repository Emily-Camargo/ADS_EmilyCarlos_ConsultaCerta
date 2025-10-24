import api from '../../config/api';
import { AssistenteRequest, AssistenteResponse } from './interface';

export const postConversationMessage = async (
  data: AssistenteRequest,
): Promise<AssistenteResponse> => {
  const response = await api.post<AssistenteResponse>(
    '/conversation/messages',
    data
  );

  return response.data;
};
