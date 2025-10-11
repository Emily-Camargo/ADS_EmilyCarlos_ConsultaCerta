import { AxiosResponse } from "axios";
import api from "../../config/api";
import { AgendaRes } from "./interface";

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