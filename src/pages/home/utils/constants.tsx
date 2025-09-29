import { MdAssignment, MdDashboard, MdDescription, MdEventNote, MdLocalHospital, MdMedication, MdPeople, MdSchedule } from "react-icons/md";

export const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendada':
        return 'default';
      case 'Confirmada':
        return 'primary';
      case 'Em Andamento':
        return 'warning';
      case 'Concluída':
        return 'success';
      default:
        return 'default';
    }
};


export const USER_ROLES = {
    SECRETARIA: 1,
    PACIENTE: 2,
    MEDICO: 3,
    ADMIN: 4,
  } as const;


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
            path: '/minhas-consultas',
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
  