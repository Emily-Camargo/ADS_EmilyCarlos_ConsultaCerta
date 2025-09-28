import { MdCalendarToday, MdAccessTime, MdLocalHospital, MdPerson, MdPersonOff } from 'react-icons/md';

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Agendada':
      return <MdCalendarToday size={16} />;
    case 'Confirmada':
      return <MdAccessTime size={16} />;
    case 'Em Andamento':
      return <MdLocalHospital size={16} />;
    case 'Concluída':
      return <MdPerson size={16} />;
    case 'Não Compareceu':
      return <MdPersonOff size={16} />;
    case 'Aguardando':
      return <MdAccessTime size={16} />;
    default:
      return <MdCalendarToday size={16} />;
  }
};

export const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Confirmada':
      return {
        backgroundColor: '#eff6ff',
        color: '#1e40af',
        border: '1px solid #93c5fd',
        boxShadow: '0 1px 3px rgba(59, 130, 246, 0.2)'
      };
    case 'Em Andamento':
      return {
        backgroundColor: '#fffbeb',
        color: '#b45309',
        border: '1px solid #fcd34d',
        boxShadow: '0 1px 3px rgba(245, 158, 11, 0.2)'
      };
    case 'Concluída':
      return {
        backgroundColor: '#f0fdf4',
        color: '#166534',
        border: '1px solid #86efac',
        boxShadow: '0 1px 3px rgba(34, 197, 94, 0.2)'
      };

    case 'Não Compareceu':
      return {
        backgroundColor: '#fee2e2',
        color: '#ef4444',
        border: '1px solid #fca5a5',
        boxShadow: '0 1px 3px rgba(239, 68, 68, 0.2)'
      };

    default:
      return {
        backgroundColor: '#f8fafc',
        color: '#475569',
        border: '1px solid #cbd5e1',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      };
  }
};

export const getGradientColor = (status: string) => {
  switch (status) {
    case 'Agendada':
      return 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
    case 'Confirmada':
      return 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)';
    case 'Em Andamento':
      return 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)';
    case 'Aguardando':
      return 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)';
    case 'Concluída':
      return 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)';
    case 'Não Compareceu':
      return 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)';
    default:
      return 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
  }
};