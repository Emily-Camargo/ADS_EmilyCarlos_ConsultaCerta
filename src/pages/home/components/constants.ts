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
} from 'react-icons/md';

export const dashboardStats = {
  consultasHoje: 12,
  consultasSemana: 47,
  pacientesAtivos: 156,
};

export const quickActions = [
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