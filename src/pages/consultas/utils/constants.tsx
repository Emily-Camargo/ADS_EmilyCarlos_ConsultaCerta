import { MdCheck, MdCancel, MdAccessTime } from "react-icons/md";

/**
 * Retorna o ícone correspondente ao status da consulta.
 * @param status Status da consulta
 */
export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'concluida':
      return <MdCheck style={{ color: '#10b981' }} />;
    case 'cancelada':
      return <MdCancel style={{ color: '#ef4444' }} />;
    case 'aguardando confirmacao':
      return <MdAccessTime style={{ color: '#f59e0b' }} />;
    case 'confirmada':
      return <MdCheck style={{ color: '#3b82f6' }} />;
    default:
      return <MdAccessTime style={{ color: '#6b7280' }} />;
  }
};

/**
 * Retorna a cor correspondente ao status da consulta.
 * @param status Status da consulta
 */
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'concluida':
      return '#10b981';
    case 'cancelada':
      return '#ef4444';
    case 'aguardando confirmacao':
      return '#f59e0b';
    case 'confirmada':
      return '#3b82f6';
    default:
      return '#6b7280';
  }
};

/**
 * Retorna um array com as datas dos dias da semana, baseado em uma data de referência.
 * @param currentWeek Data de referência (normalmente a data atual ou início da semana)
 */
export const getWeekDays = (currentWeek: Date): Date[] => {
  const startOfWeek = new Date(currentWeek);
  startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay());

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(day);
  }
  return days;
};

/**
 * Retorna os horários disponíveis para agendamento de consultas.
 */
export const getTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let hour = 8; hour <= 18; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return slots;
};
