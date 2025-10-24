import { useMutation } from 'react-query';
import { postConversationMessage } from '../services/assistente';
import { AssistenteRequest, AssistenteResponse } from '../services/assistente/interface';

export const useAssistente = () => {
  const mutation = useMutation<AssistenteResponse, Error, AssistenteRequest>(
    postConversationMessage
  );

  return {
    sendMessage: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    reset: mutation.reset,
  };
};
