export interface AgendaRes {
    idHorario: number;
    idMedico: number;
    diaSemana: number;
    horaInicio: string;
    horaFim: string;
    intervaloMinutos: number;
    almocoInicio: string;
    almocoFim: string;
    dataVigenciaInicio: string;
    dataVigenciaFim: string;
    ativo: boolean;
    criadoEm: string;
    atualizadoEm: string;
    nomeMedico: string;
    nomeEspecialidade: string;
}