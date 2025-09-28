export interface ConsultaCardMedicoProps {
    id: number;
    paciente: string;
    medico: string;
    horario: string;
    status: string;
    especialidade?: string;
    data?: string;
    onClick?: () => void;
    onIniciarAtendimento?: (id: number) => void;
    onNaoCompareceu?: (id: number) => void;
}

export interface ConsultaCardSecretariaProps {
    id: number;
    paciente: string;
    medico: string;
    horario: string;
    status: string;
    especialidade?: string;
    data?: string;
    onClick?: () => void;
    showActions?: boolean;
  }