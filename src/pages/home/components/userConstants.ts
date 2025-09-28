import {
  MdEventNote,
  MdSchedule,
  MdPeople,
  MdDescription,
  MdMedication,
  MdAssignment,
  MdNotifications,
  MdDashboard,
  MdSmartToy,
  MdLocalHospital,
  MdAccessTime,
  MdCalendarMonth,
} from 'react-icons/md';

// Constantes para diferentes tipos de usuários
export const USER_ROLES = {
  SECRETARIA: 1,
  PACIENTE: 2,
  MEDICO: 3,
} as const;

// Dashboard stats específicos por papel
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

// Menus específicos por papel
export const getMenuItems = (indPapel: number) => {
  switch (indPapel) {
    case USER_ROLES.SECRETARIA:
      return [
        { 
          seqAplicacao: 1, 
          label: 'Dashboard', 
          icon: MdDashboard,
          route: '/home'
        },
        { 
          seqAplicacao: 2, 
          label: 'Consultas', 
          icon: MdEventNote,
          route: '/consultas'
        }, 
        { 
          seqAplicacao: 3, 
          label: 'Agenda Médica', 
          icon: MdSchedule,
          route: '/agenda'
        }, 
        { 
          seqAplicacao: 4, 
          label: 'Pacientes', 
          icon: MdPeople,
          route: '/pacientes'
        },
        { 
          seqAplicacao: 5, 
          label: 'Prontuários', 
          icon: MdDescription,
          route: '/prontuarios'
        },
        { 
          seqAplicacao: 6, 
          label: 'Prescrições', 
          icon: MdMedication,
          route: '/prescricoes'
        },
        { 
          seqAplicacao: 7, 
          label: 'Exames', 
          icon: MdAssignment,
          route: '/exames'
        },
        { 
          seqAplicacao: 8, 
          label: 'Relatórios', 
          icon: MdDashboard,
          route: '/relatorios'
        },
      ];
    
    case USER_ROLES.PACIENTE:
      return [
        { 
          seqAplicacao: 1, 
          label: 'Dashboard', 
          icon: MdDashboard,
          route: '/home'
        },
        { 
          seqAplicacao: 2, 
          label: 'Minhas Consultas', 
          icon: MdEventNote,
          route: '/consultas'
        },
        { 
          seqAplicacao: 6, 
          label: 'Prescrições', 
          icon: MdMedication,
          route: '/prescricoes'
        },
      ];
    
    case USER_ROLES.MEDICO:
      return [
        { 
          seqAplicacao: 1, 
          label: 'Dashboard', 
          icon: MdDashboard,
          route: '/home'
        },
        { 
          seqAplicacao: 2, 
          label: 'Consultas', 
          icon: MdEventNote,
          route: '/consultas'
        },
        { 
          seqAplicacao: 5, 
          label: 'Prontuários', 
          icon: MdDescription,
          route: '/prontuarios'
        },
        { 
          seqAplicacao: 8, 
          label: 'Atendimentos', 
          icon: MdLocalHospital,
          route: '/atendimentos'
        },
      ];
    
    default:
      return [];
  }
};

// Quick actions específicos por papel
export const getQuickActions = (indPapel: number) => {
  switch (indPapel) {
    case USER_ROLES.SECRETARIA:
      return [
        {
          title: 'Consultas',
          description: 'Agende, visualize e gerencie consultas médicas.',
          icon: MdEventNote,
          path: '/consultas',
          colorClass: 'bg-gradient-to-br from-blue-400 to-blue-600',
        },
        {
          title: 'Agenda Médica',
          description: 'Configure horários e disponibilidade dos médicos.',
          icon: MdSchedule,
          path: '/agenda',
          colorClass: 'bg-gradient-to-br from-blue-400 to-blue-600',
        },
        {
          title: 'Pacientes',
          description: 'Cadastre e gerencie informações dos pacientes.',
          icon: MdPeople,
          path: '/pacientes',
          colorClass: 'bg-gradient-to-br from-blue-400 to-blue-600',
        },
        {
          title: 'Prontuários',
          description: 'Acesse e edite prontuários eletrônicos.',
          icon: MdDescription,
          path: '/prontuarios',
          colorClass: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
        },
        {
          title: 'Prescrições',
          description: 'Gerencie receitas e medicamentos prescritos.',
          icon: MdMedication,
          path: '/prescricoes',
          colorClass: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
        },
        {
          title: 'Exames',
          description: 'Solicite e acompanhe resultados de exames.',
          icon: MdAssignment,
          path: '/exames',
          colorClass: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
        },
        {
          title: 'Relatórios',
          description: 'Visualize dashboards e análises de desempenho.',
          icon: MdDashboard,
          path: '/relatorios',
          colorClass: 'bg-gradient-to-br from-slate-400 to-slate-600',
        },
      ];
    
    case USER_ROLES.PACIENTE:
      return [
        {
          title: 'Minhas Consultas',
          description: 'Visualize e gerencie suas consultas agendadas.',
          icon: MdEventNote,
          path: '/consultas',
          colorClass: 'bg-gradient-to-br from-blue-400 to-blue-600',
        },
        {
          title: 'Prescrições',
          description: 'Acesse suas prescrições e medicamentos.',
          icon: MdMedication,
          path: '/prescricoes',
          colorClass: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
        },
      ];
    
    case USER_ROLES.MEDICO:
      return [
        {
          title: 'Consultas',
          description: 'Gerencie suas consultas e agenda.',
          icon: MdEventNote,
          path: '/consultas',
          colorClass: 'bg-gradient-to-br from-blue-400 to-blue-600',
        },
        {
          title: 'Prontuários',
          description: 'Acesse e edite prontuários eletrônicos.',
          icon: MdDescription,
          path: '/prontuarios',
          colorClass: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
        },
        {
          title: 'Atendimentos',
          description: 'Gerencie seus atendimentos e pacientes.',
          icon: MdLocalHospital,
          path: '/atendimentos',
          colorClass: 'bg-gradient-to-br from-red-400 to-red-600',
        },
      ];
    
    default:
      return [];
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
