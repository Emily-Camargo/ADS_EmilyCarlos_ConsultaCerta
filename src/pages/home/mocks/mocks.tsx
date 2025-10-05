import { USER_ROLES } from "../utils/constants";

export const getDashboardStats = (idPerfil: number) => {
  switch (idPerfil) {
    case USER_ROLES.RECEPCIONISTA:
      return {
        consultasHoje: 12,
        consultasSemana: 47,
        pacientesAtivos: 156,
      };
    case USER_ROLES.PACIENTE:
      return {
        consultasAgendadas: 2,
        proximaConsulta: 1,
        examesPendentes: 3,
      };
    case USER_ROLES.MEDICO:
      return {
        atendimentosHoje: 8,
        consultasAgendadas: 15,
        prontuariosPendentes: 5,
      };
    default:
      return {
        consultasHoje: 0,
        consultasSemana: 0,
        pacientesAtivos: 0,
      };
  }
};

// Dados mock para consultas da secretaria - Em Andamento
export const consultasEmAndamento = [
  {
    id: 1,
    paciente: 'Maria Silva Santos',
    medico: 'Dr. João Oliveira',
    horario: '09:00',
    status: 'Em Andamento',
    especialidade: 'Cardiologia',
  },
];

// Dados mock para consultas da secretaria - Confirmada
export const consultasConfirmada = [
  {
    id: 2,
    paciente: 'Pedro Costa Lima',
    medico: 'Dra. Ana Paula',
    horario: '10:30',
    status: 'Confirmada',
    especialidade: 'Dermatologia',
  },
];

// Dados mock para consultas da secretaria - Concluída
export const consultasConcluida = [
  {
    id: 3,
    paciente: 'Carla Mendes',
    medico: 'Dr. Roberto Silva',
    horario: '14:00',
    status: 'Concluída',
    especialidade: 'Ortopedia',
  },
];

// Dados mock para consultas da secretaria - Reagendada
export const consultasReagendada = [
  {
    id: 5,
    paciente: 'Fernanda Oliveira',
    medico: 'Dr. Carlos Eduardo',
    horario: '16:00',
    status: 'Reagendada',
    especialidade: 'Neurologia',
  },
];

// Dados mock para consultas da secretaria - Aguardando confirmação
export const consultasAguardandoConfirmacao = [
  {
    id: 6,
    paciente: 'Roberto Alves',
    medico: 'Dra. Patricia Lima',
    horario: '17:00',
    status: 'Aguardando confirmação',
    especialidade: 'Ginecologia',
  },
];

// Dados mock para consultas da secretaria - Não Compareceu
export const consultasNaoCompareceu = [
  {
    id: 7,
    paciente: 'Sandra Mendes',
    medico: 'Dr. Carlos Eduardo',
    horario: '18:00',
    status: 'Não Compareceu',
    especialidade: 'Neurologia',
  },
];

// Dados mock para consultas do dia (secretária) - todos os status
export const consultasDoDia = [
  ...consultasEmAndamento,
  ...consultasConfirmada,
  ...consultasConcluida,
  ...consultasAguardandoConfirmacao,
  ...consultasNaoCompareceu,
];

// Dados mock para atendimentos do médico - Em Andamento
export const atendimentosEmAndamento = [
  {
    id: 1,
    paciente: 'Maria Silva Santos',
    horario: '09:00',
    status: 'Em Andamento',
    especialidade: 'Cardiologia',
  },
];

// Dados mock para atendimentos do médico - Confirmada
export const atendimentosConfirmada = [
  {
    id: 2,
    paciente: 'Pedro Costa Lima',
    horario: '11:00',
    status: 'Confirmada',
    especialidade: 'Cardiologia',
  },
];

// Dados mock para atendimentos do médico - Concluída
export const atendimentosConcluida = [
  {
    id: 3,
    paciente: 'João Santos',
    horario: '08:00',
    status: 'Concluída',
    especialidade: 'Cardiologia',
  },
];

// Dados mock para atendimentos do médico - Não Compareceu
export const atendimentosNaoCompareceu = [
  {
    id: 4,
    paciente: 'Sandra Mendes',
    horario: '12:00',
    status: 'Não Compareceu',
    especialidade: 'Ginecologia',
  },
];

// Dados mock para atendimentos do médico (todos os status)
export const atendimentosMedico = [
  ...atendimentosEmAndamento,
  ...atendimentosConfirmada,
  ...atendimentosConcluida,
  ...atendimentosNaoCompareceu,
];
