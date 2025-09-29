import { ConsultaPaciente, Especialidade } from '../utils/interfaces'

// Mock de especialidades
export const mockEspecialidades: Especialidade[] = [
  {
    id_especialidade: 1,
    nome: 'Cardiologia',
    descricao: 'Especialidade médica que trata do coração e sistema cardiovascular',
    ativa: true
  },
  {
    id_especialidade: 2,
    nome: 'Pediatria',
    descricao: 'Especialidade médica dedicada ao cuidado de crianças e adolescentes',
    ativa: true
  },
  {
    id_especialidade: 3,
    nome: 'Ortopedia',
    descricao: 'Especialidade médica que trata de problemas do sistema musculoesquelético',
    ativa: true
  },
  {
    id_especialidade: 4,
    nome: 'Ginecologia',
    descricao: 'Especialidade médica que cuida da saúde da mulher',
    ativa: true
  },
  {
    id_especialidade: 5,
    nome: 'Neurologia',
    descricao: 'Especialidade médica que trata do sistema nervoso',
    ativa: true
  },
  {
    id_especialidade: 6,
    nome: 'Dermatologia',
    descricao: 'Especialidade médica que trata da pele, cabelos e unhas',
    ativa: true
  },
  {
    id_especialidade: 7,
    nome: 'Oftalmologia',
    descricao: 'Especialidade médica que trata dos olhos e visão',
    ativa: true
  },
  {
    id_especialidade: 8,
    nome: 'Psiquiatria',
    descricao: 'Especialidade médica que trata de transtornos mentais',
    ativa: true
  }
]

// Mock de consultas do paciente
export const mockConsultasPaciente: ConsultaPaciente[] = [
  {
    id_consulta: 1,
    id_paciente: 1,
    id_medico: 1,
    data_hora: '2024-12-15T14:30:00Z',
    observacoes: 'Consulta de rotina para acompanhamento',
    valor_consulta: 150.00,
    status: 'concluida',
    criado_em: '2024-11-15T10:00:00Z',
    medico: {
      id_medico: 1,
      nome_medico: 'Dr. João Silva',
      especialidade: 'Cardiologia',
      crm: '12345-SP',
      ativo: true
    }
  },
  {
    id_consulta: 2,
    id_paciente: 1,
    id_medico: 2,
    data_hora: '2024-12-20T09:00:00Z',
    observacoes: 'Consulta para exame de rotina',
    valor_consulta: 120.00,
    status: 'confirmada',
    criado_em: '2024-11-20T14:30:00Z',
    medico: {
      id_medico: 2,
      nome_medico: 'Dra. Maria Santos',
      especialidade: 'Pediatria',
      crm: '23456-SP',
      ativo: true
    }
  },
  {
    id_consulta: 3,
    id_paciente: 1,
    id_medico: 3,
    data_hora: '2024-12-25T16:00:00Z',
    observacoes: 'Avaliação de dor no joelho',
    valor_consulta: 180.00,
    status: 'agendada',
    criado_em: '2024-12-01T11:15:00Z',
    medico: {
      id_medico: 3,
      nome_medico: 'Dr. Carlos Oliveira',
      especialidade: 'Ortopedia',
      crm: '34567-SP',
      ativo: true
    }
  },
  {
    id_consulta: 4,
    id_paciente: 1,
    id_medico: 5,
    data_hora: '2024-11-10T10:30:00Z',
    observacoes: 'Consulta cancelada pelo paciente',
    valor_consulta: 200.00,
    status: 'cancelada',
    criado_em: '2024-10-25T16:45:00Z',
    atualizado_em: '2024-11-08T09:20:00Z',
    medico: {
      id_medico: 5,
      nome_medico: 'Dr. Pedro Almeida',
      especialidade: 'Neurologia',
      crm: '56789-SP',
      ativo: true
    }
  },
  {
    id_consulta: 5,
    id_paciente: 1,
    id_medico: 6,
    data_hora: '2024-12-30T11:00:00Z',
    observacoes: 'Avaliação de manchas na pele',
    valor_consulta: 130.00,
    status: 'agendada',
    criado_em: '2024-12-05T13:20:00Z',
    medico: {
      id_medico: 6,
      nome_medico: 'Dra. Ana Costa',
      especialidade: 'Dermatologia',
      crm: '45678-SP',
      ativo: true
    }
  }
]

// Mock de médicos por especialidade
export const mockMedicosPorEspecialidade = {
  1: [ // Cardiologia
    {
      id_medico: 1,
      nome_medico: 'Dr. João Silva',
      especialidade: 'Cardiologia',
      crm: '12345-SP',
      ativo: true
    },
    {
      id_medico: 7,
      nome_medico: 'Dr. Roberto Cardoso',
      especialidade: 'Cardiologia',
      crm: '67890-SP',
      ativo: true
    }
  ],
  2: [ // Pediatria
    {
      id_medico: 2,
      nome_medico: 'Dra. Maria Santos',
      especialidade: 'Pediatria',
      crm: '23456-SP',
      ativo: true
    },
    {
      id_medico: 8,
      nome_medico: 'Dr. Lucas Pediatra',
      especialidade: 'Pediatria',
      crm: '78901-SP',
      ativo: true
    }
  ],
  3: [ // Ortopedia
    {
      id_medico: 3,
      nome_medico: 'Dr. Carlos Oliveira',
      especialidade: 'Ortopedia',
      crm: '34567-SP',
      ativo: true
    }
  ],
  4: [ // Ginecologia
    {
      id_medico: 4,
      nome_medico: 'Dra. Ana Costa',
      especialidade: 'Ginecologia',
      crm: '45678-SP',
      ativo: true
    }
  ],
  5: [ // Neurologia
    {
      id_medico: 5,
      nome_medico: 'Dr. Pedro Almeida',
      especialidade: 'Neurologia',
      crm: '56789-SP',
      ativo: true
    }
  ],
  6: [ // Dermatologia
    {
      id_medico: 6,
      nome_medico: 'Dra. Ana Costa',
      especialidade: 'Dermatologia',
      crm: '45678-SP',
      ativo: true
    }
  ],
  7: [ // Oftalmologia
    {
      id_medico: 9,
      nome_medico: 'Dr. Marcos Oftalmo',
      especialidade: 'Oftalmologia',
      crm: '89012-SP',
      ativo: true
    }
  ],
  8: [ // Psiquiatria
    {
      id_medico: 10,
      nome_medico: 'Dra. Paula Psiquiatra',
      especialidade: 'Psiquiatria',
      crm: '90123-SP',
      ativo: true
    }
  ]
}

// Função para obter horários disponíveis de um médico em uma data específica
export const getHorariosDisponiveis = (idMedico: number, data: string): string[] => {
  // Mock de horários disponíveis (8h às 17h com intervalos de 30min)
  const horarios = []
  for (let hora = 8; hora < 17; hora++) {
    for (let minuto = 0; minuto < 60; minuto += 30) {
      if (hora === 12 && minuto === 0) continue // Pular horário de almoço
      const horario = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`
      horarios.push(horario)
    }
  }
  return horarios
}
