import { AxiosResponse } from "axios";
import api from "../../config/api";
import { AgendaRes, MedicoAgendaReq } from "./interface";
import { getBuscarMedicos } from "../usuario";
import { InfoUsuarioRes } from "../usuario/interface";

export const getInfoAgenda = async (): Promise<AxiosResponse<AgendaRes[]>> => {
    const response = await api.get<AgendaRes[]>(
      `/medicos/horarios-atendimento`
    );
    
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
        // Filtrar apenas usuários que são médicos (idPerfil = 3) e que têm informações de médico
        const medicos = response.data.filter(usuario => 
            usuario.idPerfil === 3 && usuario.medico && usuario.ativo
        );
        return medicos;
    } catch (error) {
        console.error('Erro ao buscar médicos:', error);
        throw error;
    }
};