import { ConsultaCardMedicoProps } from '../../home/utils/interfaces';

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
}

export interface AtendimentoCardProps extends ConsultaCardMedicoProps {
}
