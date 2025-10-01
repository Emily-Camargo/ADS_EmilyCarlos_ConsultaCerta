// Dados mock para as consultas da semana
export const consultasSemana: Array<{
  id: number;
  paciente: string;
  horario: string;
  status: 'concluida' | 'cancelada' | 'aguardando confirmacao' | 'confirmada';
  medico: string;
}> = [
  // Segunda-feira
  { id: 1, paciente: 'Juliana Oliveira', horario: '08:00', status: 'concluida', medico: 'Dra. Carla' },
  { id: 27, paciente: 'Pedro Santos', horario: '08:00', status: 'confirmada', medico: 'Dr. João Oliveira' },
  { id: 29, paciente: 'Ana Costa', horario: '08:00', status: 'aguardando confirmacao', medico: 'Dr. Roberto Silva' },
  { id: 2, paciente: 'Caio Guedes', horario: '09:00', status: 'confirmada', medico: 'Dr. João Oliveira' },
  { id: 28, paciente: 'Maria Silva', horario: '09:00', status: 'aguardando confirmacao', medico: 'Dra. Ana Paula' },
  { id: 30, paciente: 'João Pedro', horario: '09:00', status: 'concluida', medico: 'Dr. Carlos Eduardo' },
  { id: 3, paciente: 'Antônio Carlos', horario: '10:00', status: 'concluida', medico: 'Dra. Ana Paula' },
  { id: 4, paciente: 'Douglas Viena', horario: '11:00', status: 'confirmada', medico: 'Dr. Roberto Silva' },
  { id: 5, paciente: 'Carlos Eduardo', horario: '15:00', status: 'concluida', medico: 'Dr. Carlos Eduardo' },

  // Terça-feira
  { id: 6, paciente: 'Geovanna Silva', horario: '08:00', status: 'concluida', medico: 'Dra. Carla' },
  { id: 31, paciente: 'Roberto Lima', horario: '08:00', status: 'confirmada', medico: 'Dr. João Oliveira' },
  { id: 7, paciente: 'João Paulo', horario: '09:00', status: 'cancelada', medico: 'Dr. João Oliveira' },
  { id: 32, paciente: 'Carla Mendes', horario: '09:00', status: 'aguardando confirmacao', medico: 'Dra. Ana Paula' },
  { id: 8, paciente: 'Maicon Guedes', horario: '10:00', status: 'confirmada', medico: 'Dra. Ana Paula' },
  { id: 9, paciente: 'Leandro Amaral', horario: '11:00', status: 'concluida', medico: 'Dr. Roberto Silva' },
  { id: 10, paciente: 'Júlia Santos', horario: '14:00', status: 'confirmada', medico: 'Dr. Carlos Eduardo' },
  { id: 11, paciente: 'Regina Marques', horario: '16:00', status: 'aguardando confirmacao', medico: 'Dra. Patricia Lima' },

  // Quarta-feira
  { id: 12, paciente: 'Paula Neves', horario: '08:00', status: 'concluida', medico: 'Dra. Carla' },
  { id: 13, paciente: 'Norberto Neves', horario: '09:00', status: 'concluida', medico: 'Dr. João Oliveira' },
  { id: 14, paciente: 'João Marcos', horario: '10:00', status: 'aguardando confirmacao', medico: 'Dra. Ana Paula' },
  { id: 15, paciente: 'Marcos', horario: '11:00', status: 'concluida', medico: 'Dr. Roberto Silva' },
  { id: 16, paciente: 'Douglas Amaral', horario: '15:00', status: 'concluida', medico: 'Dr. Carlos Eduardo' },

  // Quinta-feira
  { id: 17, paciente: 'Bruno Santos', horario: '08:00', status: 'aguardando confirmacao', medico: 'Dra. Patricia Lima' },
  { id: 18, paciente: 'Maria Lúcia', horario: '09:00', status: 'aguardando confirmacao', medico: 'Dra. Carla' },
  { id: 19, paciente: 'Ana Paula', horario: '10:00', status: 'concluida', medico: 'Dr. João Oliveira' },
  { id: 20, paciente: 'Marcia Luz', horario: '11:00', status: 'aguardando confirmacao', medico: 'Dra. Ana Paula' },
  { id: 21, paciente: 'Cristiane Oliveira', horario: '14:00', status: 'concluida', medico: 'Dr. Roberto Silva' },
  { id: 22, paciente: 'Ricardo Ramos', horario: '15:00', status: 'aguardando confirmacao', medico: 'Dr. Carlos Eduardo' },

  // Sexta-feira
  { id: 23, paciente: 'Maria José', horario: '08:00', status: 'aguardando confirmacao', medico: 'Dra. Patricia Lima' },
  { id: 24, paciente: 'José Luiz', horario: '09:00', status: 'aguardando confirmacao', medico: 'Dra. Carla' },
  { id: 25, paciente: 'Felipe Marques', horario: '10:00', status: 'concluida', medico: 'Dr. João Oliveira' },
  { id: 26, paciente: 'Gabriel Santos', horario: '11:00', status: 'concluida', medico: 'Dra. Ana Paula' },
];

// Função corrigida: agora sempre retorna um array de consultas do dia
export const getConsultasForDay = (dayIndex: number): Array<{
  id: number;
  paciente: string;
  horario: string;
  status: 'concluida' | 'cancelada' | 'aguardando confirmacao' | 'confirmada';
  medico: string;
}> => {
  // Mock: distribuir consultas pelos dias da semana
  const consultasPorDia: number[][] = [
    [1, 27, 29, 2, 28, 30, 3, 4, 5], // Segunda
    [6, 31, 7, 32, 8, 9, 10, 11], // Terça
    [12, 13, 14, 15, 16], // Quarta
    [17, 18, 19, 20, 21, 22], // Quinta
    [23, 24, 25, 26], // Sexta
    [], // Sábado
    [] // Domingo
  ];

  const idsDoDia = consultasPorDia[dayIndex] || [];
  return idsDoDia
    .map(id => consultasSemana.find(c => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
};