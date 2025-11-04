import { AxiosResponse } from "axios";
import api from "../../config/api";
import { AgendaRes, BloquearAgendaPutReq, BloquearAgendaReq, BloquearAgendaRes, EspecialidadeMedicoReq, EspecialidadeMedicoRes, EspecialidadeRes, GetInfoAgendaParams, HorariosMedicoReq, HorariosMedicoRes, MedicoAgendaPutReq, MedicoAgendaReq } from "./interface";
import { getBuscarMedicos } from "../usuario";
import { InfoUsuarioRes } from "../usuario/interface";
import { StatusRes } from "../interfaceGeneric";

export const getInfoAgenda = async (params?: GetInfoAgendaParams): Promise<AxiosResponse<AgendaRes[]>> => {
    const queryParams = new URLSearchParams();
    
    if (params?.idMedico) {
        queryParams.append('idMedico', params.idMedico.toString());
    }
    if (params?.dataVigenciaInicio) {
        queryParams.append('dataVigenciaInicio', params.dataVigenciaInicio);
    }
    if (params?.dataVigenciaFim) {
        queryParams.append('dataVigenciaFim', params.dataVigenciaFim);
    }

    const queryString = queryParams.toString();
    const url = `/medicos/horarios-atendimento${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get<AgendaRes[]>(url);
    
    return Promise.resolve(response);
};

export const getHorariosMedico = async (idMedico: number): Promise<AxiosResponse<AgendaRes[]>> => {
    const response = await api.get<AgendaRes[]>(
      `/medicos/horarios-atendimento/medico/${idMedico}`
    );
    
    return Promise.resolve(response);
};

export const postHorariosMedico = async (data: MedicoAgendaReq): Promise<AxiosResponse<AgendaRes[]>> => {
    const response = await api.post<AgendaRes[]>(
      `/medicos/horario-atendimento`, data);

    return Promise.resolve(response);
};

export const getMedicos = async (): Promise<InfoUsuarioRes[]> => {
    try {
        const response = await getBuscarMedicos();
        const medicos = response.data.filter(usuario => 
            usuario.idPerfil === 3 && usuario.medico && usuario.ativo
        );
        return medicos;
    } catch (error) {
        console.error('Erro ao buscar médicos:', error);
        throw error;
    }
};

export const putHorariosMedico = async (idHorario: number, data: MedicoAgendaPutReq): Promise<AxiosResponse<AgendaRes[]>> => {
    const response = await api.put<AgendaRes[]>(
      `/medicos/horario-atendimento/${idHorario}`, data);

    return Promise.resolve(response);
};

export const postBloquearAgenda = async (data: BloquearAgendaReq): Promise<AxiosResponse<BloquearAgendaRes>> => {
    const response = await api.post<BloquearAgendaRes>(
      `/medicos/bloqueio-agenda`, data);

    return Promise.resolve(response);
};

export const getBloqueiosMedico = async (idMedico: number): Promise<AxiosResponse<BloquearAgendaRes[]>> => {
    const response = await api.get<BloquearAgendaRes[]>(
      `/medicos/bloqueios-agenda/medico/${idMedico}`
    );
    
    return Promise.resolve(response);
};

export const putBloqueiosMedico = async (idBloqueio: number, data: BloquearAgendaPutReq): Promise<AxiosResponse<BloquearAgendaRes[]>> => {
    const response = await api.put<BloquearAgendaRes[]>(
      `/medicos/bloqueio-agenda/${idBloqueio}`, data
    );
    
    return Promise.resolve(response);
};

export const deleteBloqueiosMedico = async (idBloqueio: number): Promise<AxiosResponse<StatusRes>> => {
    const response = await api.delete<StatusRes>(
      `/medicos/bloqueio-agenda/${idBloqueio}`
    );
    
    return Promise.resolve(response);
};

export const getEspecialidades = async (): Promise<AxiosResponse<EspecialidadeRes[]>> => {
    const response = await api.get<EspecialidadeRes[]>(
      `/medicos/especialidades`
    );
    
    return Promise.resolve(response);
};

export const postEspecialidadesMedico = async (data: EspecialidadeMedicoReq): Promise<AxiosResponse<EspecialidadeMedicoRes[]>> => {
    const response = await api.post<EspecialidadeMedicoRes[]>(
      `/medicos/especialidade`,
      data
    );
    
    return Promise.resolve(response);
};

export const postHorariosDisponiveis = async (data: HorariosMedicoReq): Promise<AxiosResponse<HorariosMedicoRes[]>> => {
    const response = await api.post<HorariosMedicoRes[]>(
      `/medicos/horarios-disponiveis`,
      data
    );
    
    return Promise.resolve(response);
};

