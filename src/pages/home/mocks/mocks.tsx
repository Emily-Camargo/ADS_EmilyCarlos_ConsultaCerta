import { USER_ROLES } from "../utils/constants";

export const getDashboardStats = (indPapel: number) => {
  switch (indPapel) {
    case USER_ROLES.SECRETARIA:
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

// Dados mock para consultas do dia (secretária)
export const consultasDoDia = [
  {
    id: 1,
    paciente: 'Maria Silva Santos',
    medico: 'Dr. João Oliveira',
    horario: '09:00',
    status: 'Agendada',
    especialidade: 'Cardiologia',
  },
  {
    id: 2,
    paciente: 'Pedro Costa Lima',
    medico: 'Dra. Ana Paula',
    horario: '10:30',
    status: 'Confirmada',
    especialidade: 'Dermatologia',
  },
  {
    id: 3,
    paciente: 'Carla Mendes',
    medico: 'Dr. Roberto Silva',
    horario: '14:00',
    status: 'Em Andamento',
    especialidade: 'Ortopedia',
  },
  {
    id: 4,
    paciente: 'Lucas Ferreira',
    medico: 'Dra. Mariana Costa',
    horario: '15:30',
    status: 'Agendada',
    especialidade: 'Pediatria',
  },
];

// Dados mock para consultas do paciente
export const consultasPaciente = [
  {
    id: 1,
    medico: 'Dr. João Oliveira',
    especialidade: 'Cardiologia',
    data: '2024-01-15',
    horario: '09:00',
    status: 'Agendada',
  },
  {
    id: 2,
    medico: 'Dra. Ana Paula',
    especialidade: 'Dermatologia',
    data: '2024-01-20',
    horario: '14:30',
    status: 'Confirmada',
  },
];

// Dados mock para atendimentos do médico
export const atendimentosMedico = [
  {
    id: 1,
    paciente: 'Maria Silva Santos',
    horario: '09:00',
    status: 'Em Andamento',
    especialidade: 'Cardiologia',
  },
  {
    id: 2,
    paciente: 'Pedro Costa Lima',
    horario: '10:30',
    status: 'Aguardando',
    especialidade: 'Cardiologia',
  },
  {
    id: 3,
    paciente: 'Carla Mendes',
    horario: '14:00',
    status: 'Concluída',
    especialidade: 'Cardiologia',
  },
];
