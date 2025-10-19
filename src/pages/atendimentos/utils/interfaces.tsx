import { ConsultaRes } from "../../../services/consultas/interface";

export interface CardHeaderProps {
  paciente: string;
  status: string;
  statusColor: string;
  pacienteInitials: string;
}

export interface InfoSectionProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

export interface CardActionsProps {
  status: string;
  onIniciarAtendimento: (e: React.MouseEvent) => void;
  onNaoCompareceu: (e: React.MouseEvent) => void;
  onAbrirProntuario?: (e: React.MouseEvent) => void;
  isLoading?: boolean;
}

export interface AtendimentoCardProps {
  id: number;
  paciente: string;
  motivo: string;
  observacoes: string;
  horario: string;
  status: string;
  data?: string;
  onClick?: () => void;
  onIniciarAtendimento?: (id: number) => void;
  onNaoCompareceu?: (id: number) => void;
  onAbrirProntuario?: (id: number) => void;
  isLoading?: boolean;
}

export interface StatusTab {
  label: string;
  data: ConsultaRes[];
  count: number;
}
