import { Updater } from 'use-immer'
import { DataReqAgenda } from './interfaces'

// Função para lidar com mudanças nos inputs de filtro
export const handleChange = (
  field: keyof DataReqAgenda,
  value: string,
  setData: Updater<DataReqAgenda>
) => {
  setData((draft) => {
    draft[field] = value
  })
}

// Função para validar horário
export const validarHorario = (inicio: string, fim: string): boolean => {
  if (!inicio || !fim) return false
  
  const [horaInicio, minutoInicio] = inicio.split(':').map(Number)
  const [horaFim, minutoFim] = fim.split(':').map(Number)
  
  const inicioMinutos = horaInicio * 60 + minutoInicio
  const fimMinutos = horaFim * 60 + minutoFim
  
  return inicioMinutos < fimMinutos
}

// Função para validar intervalo de almoço
export const validarIntervaloAlmoco = (
  inicioExpediente: string,
  fimExpediente: string,
  inicioAlmoco: string,
  fimAlmoco: string
): boolean => {
  if (!inicioAlmoco || !fimAlmoco) return true // Almoço é opcional
  
  const [horaInicioExp, minutoInicioExp] = inicioExpediente.split(':').map(Number)
  const [horaFimExp, minutoFimExp] = fimExpediente.split(':').map(Number)
  const [horaInicioAlm, minutoInicioAlm] = inicioAlmoco.split(':').map(Number)
  const [horaFimAlm, minutoFimAlm] = fimAlmoco.split(':').map(Number)
  
  const inicioExpMinutos = horaInicioExp * 60 + minutoInicioExp
  const fimExpMinutos = horaFimExp * 60 + minutoFimExp
  const inicioAlmMinutos = horaInicioAlm * 60 + minutoInicioAlm
  const fimAlmMinutos = horaFimAlm * 60 + minutoFimAlm
  
  return (
    inicioAlmMinutos > inicioExpMinutos &&
    fimAlmMinutos < fimExpMinutos &&
    inicioAlmMinutos < fimAlmMinutos
  )
}

// Função para validar datas de vigência
export const validarDatasVigencia = (dataInicio: string, dataFim: string): boolean => {
  if (!dataInicio || !dataFim) return true // Datas são opcionais
  
  const inicio = new Date(dataInicio)
  const fim = new Date(dataFim)
  
  return inicio <= fim
}

// Função para validar período de bloqueio
export const validarPeriodoBloqueio = (dataInicio: string, dataFim: string): boolean => {
  if (!dataInicio || !dataFim) return false
  
  const inicio = new Date(dataInicio)
  const fim = new Date(dataFim)
  
  return inicio < fim
}

// Função para calcular duração em minutos entre dois horários
export const calcularDuracaoMinutos = (inicio: string, fim: string): number => {
  if (!inicio || !fim) return 0
  
  const [horaInicio, minutoInicio] = inicio.split(':').map(Number)
  const [horaFim, minutoFim] = fim.split(':').map(Number)
  
  const inicioMinutos = horaInicio * 60 + minutoInicio
  const fimMinutos = horaFim * 60 + minutoFim
  
  return fimMinutos - inicioMinutos
}

// Função para gerar slots de horário baseado no intervalo
export const gerarSlotsHorario = (
  horaInicio: string,
  horaFim: string,
  intervaloMinutos: number,
  almocoInicio?: string,
  almocoFim?: string
): string[] => {
  const slots: string[] = []
  
  if (!horaInicio || !horaFim || intervaloMinutos <= 0) return slots
  
  const [horaIni, minutoIni] = horaInicio.split(':').map(Number)
  const [horaFin, minutoFin] = horaFim.split(':').map(Number)
  
  let almocoIniMinutos = 0
  let almocoFimMinutos = 0
  
  if (almocoInicio && almocoFim) {
    const [horaAlmIni, minutoAlmIni] = almocoInicio.split(':').map(Number)
    const [horaAlmFim, minutoAlmFim] = almocoFim.split(':').map(Number)
    almocoIniMinutos = horaAlmIni * 60 + minutoAlmIni
    almocoFimMinutos = horaAlmFim * 60 + minutoAlmFim
  }
  
  let minutoAtual = horaIni * 60 + minutoIni
  const minutoFinal = horaFin * 60 + minutoFin
  
  while (minutoAtual < minutoFinal) {
    // Pular horário de almoço
    if (almocoInicio && almocoFim && 
        minutoAtual >= almocoIniMinutos && minutoAtual < almocoFimMinutos) {
      minutoAtual = almocoFimMinutos
      continue
    }
    
    const hora = Math.floor(minutoAtual / 60)
    const minuto = minutoAtual % 60
    
    const horarioFormatado = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`
    slots.push(horarioFormatado)
    
    minutoAtual += intervaloMinutos
  }
  
  return slots
}


