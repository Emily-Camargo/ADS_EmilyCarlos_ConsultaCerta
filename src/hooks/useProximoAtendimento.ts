import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { postBuscarConsultas } from '../services/consultas';
import { ConsultaRes } from '../services/consultas/interface';

interface ProximoAtendimento {
  consulta: ConsultaRes | null;
  mensagem: string;
  loading: boolean;
  error: string | null;
}

export const useProximoAtendimento = () => {
  const [proximoAtendimento, setProximoAtendimento] = useState<ProximoAtendimento>({
    consulta: null,
    mensagem: '',
    loading: true,
    error: null
  });

  const { getIdMedico } = useAuth();

  useEffect(() => {
    const buscarProximoAtendimento = async () => {
      try {
        setProximoAtendimento(prev => ({ ...prev, loading: true, error: null }));

        const idMedico = getIdMedico();
        if (!idMedico) {
          setProximoAtendimento({
            consulta: null,
            mensagem: '',
            loading: false,
            error: 'ID do médico não encontrado'
          });
          return;
        }

        // Buscar consultas do médico
        const response = await postBuscarConsultas({
          idMedico,
          dataInicio: new Date().toISOString().split('T')[0] // A partir de hoje
        });

        const consultas: ConsultaRes[] = response.data;

        // Filtrar consultas com status 'agendada' ou 'confirmada'
        const consultasValidas = consultas.filter(consulta => 
          consulta.status === 'agendada' || consulta.status === 'confirmada'
        );

        if (consultasValidas.length === 0) {
          setProximoAtendimento({
            consulta: null,
            mensagem: 'Nenhum atendimento agendado encontrado',
            loading: false,
            error: null
          });
          return;
        }

        // Ordenar por data e pegar a mais próxima
        const proxima = consultasValidas.sort((a, b) => 
          new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
        )[0];

        // Formatar data e hora
        const dataHora = new Date(proxima.dataHora);
        const dataFormatada = dataHora.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        const horaFormatada = dataHora.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        });

        // Criar mensagem baseada no status
        let mensagem = `Seu próximo atendimento é com ${proxima.paciente.nome} dia ${dataFormatada} às ${horaFormatada}`;
        
        if (proxima.status === 'agendada') {
          mensagem += '. Aguardando confirmação do paciente';
        }

        setProximoAtendimento({
          consulta: proxima,
          mensagem,
          loading: false,
          error: null
        });

      } catch (error) {
        console.error('Erro ao buscar próximo atendimento:', error);
        setProximoAtendimento({
          consulta: null,
          mensagem: '',
          loading: false,
          error: 'Erro ao carregar atendimentos'
        });
      }
    };

    buscarProximoAtendimento();
  }, [getIdMedico]);

  return proximoAtendimento;
};
