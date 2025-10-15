import {
    MdEventNote,
    MdSchedule,
    MdPeople,
    MdDescription,
    MdMedication,
    MdAssignment,
    MdDashboard,
    MdLocalHospital,
  } from 'react-icons/md';

import { USER_ROLES } from "../utils/constants";

export const getMenuItems = (idPerfil: number) => {
    switch (idPerfil) {
      case USER_ROLES.ADMIN:
        return [
          { 
            seqAplicacao: 1, 
            label: 'Dashboard Administrativo', 
            icon: MdDashboard,
            route: '/admin'
          },
          { 
            seqAplicacao: 2, 
            label: 'Usuários', 
            icon: MdPeople,
            route: '/usuarios'
          },
          { 
            seqAplicacao: 3, 
            label: 'Relatórios', 
            icon: MdAssignment,
            route: '/relatorios'
          },
        ];
      
      case USER_ROLES.RECEPCIONISTA:
        return [
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
          
        ];
      
      case USER_ROLES.PACIENTE:
        return [
          { 
            seqAplicacao: 8, 
            label: 'Minhas Consultas', 
            icon: MdEventNote,
            route: '/minhas-consultas'
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
            seqAplicacao: 13, 
            label: 'Atendimentos', 
            icon: MdLocalHospital,
            route: '/atendimentos'
          },
          { 
            seqAplicacao: 8, 
            label: 'Relatórios e Dashboards', 
            icon: MdDashboard,
            route: '/relatorios'
          },
        ];
      
      default:
        return [];
    }
  };