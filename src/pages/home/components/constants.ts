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
    colorClass: 'bg-gradient-to-br from-medical-primary to-medical-primary-600 text-white hover:from-medical-primary-600 hover:to-medical-primary-700',
  },
  {
    title: 'Agenda Médica',
    description: 'Configure horários e disponibilidade dos médicos.',
    icon: MdSchedule,
    path: '/agenda',
    colorClass: 'bg-gradient-to-br from-medical-primary to-medical-primary-600 text-white hover:from-medical-primary-600 hover:to-medical-primary-700',
  },
  {
    title: 'Pacientes',
    description: 'Cadastre e gerencie informações dos pacientes.',
    icon: MdPeople,
    path: '/pacientes',
    colorClass: 'bg-gradient-to-br from-medical-primary to-medical-primary-600 text-white hover:from-medical-primary-600 hover:to-medical-primary-700',
  },
  {
    title: 'Prontuários',
    description: 'Acesse e edite prontuários eletrônicos.',
    icon: MdDescription,
    path: '/prontuarios',
    colorClass: 'bg-gradient-to-br from-medical-secondary to-medical-secondary-600 text-white hover:from-medical-secondary-600 hover:to-medical-secondary-700',
  },
  {
    title: 'Prescrições',
    description: 'Gerencie receitas e medicamentos prescritos.',
    icon: MdMedication,
    path: '/prescricoes',
    colorClass: 'bg-gradient-to-br from-medical-secondary to-medical-secondary-600 text-white hover:from-medical-secondary-600 hover:to-medical-secondary-700',
  },
  {
    title: 'Exames',
    description: 'Solicite e acompanhe resultados de exames.',
    icon: MdAssignment,
    path: '/exames',
    colorClass: 'bg-gradient-to-br from-medical-secondary to-medical-secondary-600 text-white hover:from-medical-secondary-600 hover:to-medical-secondary-700',
  },
  {
    title: 'Notificações',
    description: 'Configure lembretes e comunicações automáticas.',
    icon: MdNotifications,
    path: '/notificacoes',
    colorClass: 'bg-gradient-to-br from-medical-gray-500 to-medical-gray-600 text-white hover:from-medical-gray-600 hover:to-medical-gray-700',
  },
  {
    title: 'Relatórios',
    description: 'Visualize dashboards e análises de desempenho.',
    icon: MdDashboard,
    path: '/relatorios',
    colorClass: 'bg-gradient-to-br from-medical-gray-500 to-medical-gray-600 text-white hover:from-medical-gray-600 hover:to-medical-gray-700',
  },
];