export interface AssistenteRequest {
  content: string;
}

export interface Prescricao {
  nome: string;
  dose: string;
  frequencia: string;
}

export interface AssistenteContent {
  queixaPrincipal: string[];
  diagnostico: string;
  conduta: string;
  observacoes: string;
  prescricao: Prescricao[];
}

export interface AssistenteResponse {
  content: AssistenteContent;
  threadId: string;
  messageId: string;
  role: string;
  timestamp: string;
}
