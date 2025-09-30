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

export const getMenuItems = (indPapel: number) => {
    switch (indPapel) {
      case USER_ROLES.SECRETARIA:
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
          { 
            seqAplicacao: 7, 
            label: 'Exames', 
            icon: MdAssignment,
            route: '/exames'
          },
          
        ];
      
      case USER_ROLES.PACIENTE:
        return [
          { 
            seqAplicacao: 2, 
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