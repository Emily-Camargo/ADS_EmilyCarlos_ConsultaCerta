import { Prescricao } from '../utils/interface'

export const prescricoesMock: Prescricao[] = [
  {
    idConsulta: 45,
    dtaConsulta: '24/06/2025 15:30',
    nomePaciente: 'Maria Silva Santos',
    cpf: '12345678901',
    nomeMedico: 'Dr. João da Silva',
    especialidade: 'Clínico Geral',
    medicamentos: [
      {
        nomeMedicamento: 'Amoxicilina 500mg',
        dosagem: '1 cápsula a cada 8h',
        instrucoes: 'Tomar após as refeições por 7 dias',
        quantidade: 21,
        controlado: false,
        validade: '2025-10-20',
        nomeMedico: 'Dr. João da Silva',
        crm: '12345-RS',
        dtaCriacao: '2025-10-10T15:00:00'
      },
      {
        nomeMedicamento: 'Dipirona 500mg',
        dosagem: '1 comprimido a cada 6h',
        instrucoes: 'Tomar em caso de dor ou febre',
        quantidade: 20,
        controlado: false,
        validade: '2025-11-15',
        nomeMedico: 'Dr. João da Silva',
        crm: '12345-RS',
        dtaCriacao: '2025-10-10T15:00:00'
      }
    ]
  },
  {
    idConsulta: 48,
    dtaConsulta: '15/07/2025 10:00',
    nomePaciente: 'Maria Silva Santos',
    cpf: '12345678903',
    nomeMedico: 'Dra. Ana Paula Costa',
    especialidade: 'Cardiologista',
    medicamentos: [
      {
        nomeMedicamento: 'Losartana 50mg',
        dosagem: '1 comprimido pela manhã',
        instrucoes: 'Tomar em jejum, 30 minutos antes do café',
        quantidade: 30,
        controlado: false,
        validade: '2025-12-20',
        nomeMedico: 'Dra. Ana Paula Costa',
        crm: '23456-RS',
        dtaCriacao: '2025-10-12T10:00:00'
      },
      {
        nomeMedicamento: 'Sinvastatina 20mg',
        dosagem: '1 comprimido à noite',
        instrucoes: 'Tomar antes de dormir',
        quantidade: 30,
        controlado: false,
        validade: '2026-01-10',
        nomeMedico: 'Dra. Ana Paula Costa',
        crm: '23456-RS',
        dtaCriacao: '2025-10-12T10:00:00'
      },
      {
        nomeMedicamento: 'AAS 100mg',
        dosagem: '1 comprimido pela manhã',
        instrucoes: 'Tomar após o café da manhã',
        quantidade: 30,
        controlado: false,
        validade: '2025-11-30',
        nomeMedico: 'Dra. Ana Paula Costa',
        crm: '23456-RS',
        dtaCriacao: '2025-10-12T10:00:00'
      }
    ]
  },
  {
    idConsulta: 52,
    dtaConsulta: '20/08/2025 14:30',
    nomePaciente: 'Maria Silva Santos',
    cpf: '12345678905',
    nomeMedico: 'Dr. Carlos Eduardo Lima',
    especialidade: 'Psiquiatra',
    medicamentos: [
      {
        nomeMedicamento: 'Fluoxetina 20mg',
        dosagem: '1 cápsula pela manhã',
        instrucoes: 'Tomar após o café da manhã. Uso contínuo, não interromper sem orientação médica.',
        quantidade: 30,
        controlado: true,
        validade: '2026-02-15',
        nomeMedico: 'Dr. Carlos Eduardo Lima',
        crm: '34567-RS',
        dtaCriacao: '2025-10-13T14:30:00'
      }
    ]
  },
  {
    idConsulta: 55,
    dtaConsulta: '05/09/2025 09:15',
    nomePaciente: 'Maria Silva Santos',
    cpf: '12345678907',
    nomeMedico: 'Dr. Roberto Alves',
    especialidade: 'Ortopedista',
    medicamentos: [
      {
        nomeMedicamento: 'Ibuprofeno 600mg',
        dosagem: '1 comprimido a cada 8h',
        instrucoes: 'Tomar após as refeições por 5 dias',
        quantidade: 15,
        controlado: false,
        validade: '2025-10-25',
        nomeMedico: 'Dr. Roberto Alves',
        crm: '45678-RS',
        dtaCriacao: '2025-10-14T09:15:00'
      },
      {
        nomeMedicamento: 'Relaxante Muscular',
        dosagem: '1 comprimido à noite',
        instrucoes: 'Tomar antes de dormir por 7 dias',
        quantidade: 7,
        controlado: true,
        validade: '2025-11-20',
        nomeMedico: 'Dr. Roberto Alves',
        crm: '45678-RS',
        dtaCriacao: '2025-10-14T09:15:00'
      }
    ]
  }
]

