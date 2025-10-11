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

export interface MedicoAgendaReq {
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
}

export interface MedicoAgendaPutReq {
    horaInicio: string;
    horaFim: string;
    intervaloMinutos: number;
    almocoInicio: string;
    almocoFim: string;
    ativo: boolean;
}

export interface BloquearAgendaReq {
    idMedico: number;
    dataInicio: string;
    dataFim: string;
    motivo: string;
    tipoBloqueio: string;
}

export interface BloquearAgendaRes {
    idBloqueio: number;
    idMedico: number;
    dataInicio: string;
    dataFim: string;
    motivo: string;
    tipoBloqueio: string;
    criadoPor: number;
    criadoEm: string;
    nomeMedico: string;
    nomeEspecialidade: string;
    nomeCriadoPor: string;
}

export interface BloquearAgendaPutReq {
    dataInicio: string;
    dataFim: string;
    motivo: string;
    tipoBloqueio: string;
}


export interface EspecialidadeRes {
    idEspecialidade: number;
    nome: string;
    descricao: string;
    ativo: boolean;
}

export interface EspecialidadeMedicoRes {
    idMedico: number;
    nome: string;
    crm: string;
    especialidade: string;
    valorConsulta: number;
    tempoConsulta: number;
    ativo: boolean;
}

export interface EspecialidadeMedicoReq {
    idEspecialidade: number;
}
