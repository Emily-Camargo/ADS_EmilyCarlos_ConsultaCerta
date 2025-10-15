import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { postBuscarConsultas } from '../services/consultas';
import { ConsultaRes } from '../services/consultas/interface';

interface ProximaConsulta {
  consulta: ConsultaRes | null;
  mensagem: string;
  loading: boolean;
  error: string | null;
}

export const useProximaConsulta = () => {
  const [proximaConsulta, setProximaConsulta] = useState<ProximaConsulta>({
    consulta: null,
    mensagem: '',
    loading: true,
    error: null
  });

  const { getIdPaciente } = useAuth();

  useEffect(() => {
    const buscarProximaConsulta = async () => {
      try {
        setProximaConsulta(prev => ({ ...prev, loading: true, error: null }));

        const idPaciente = getIdPaciente();
        if (!idPaciente) {
          setProximaConsulta({
            consulta: null,
            mensagem: '',
            loading: false,
            error: 'ID do paciente não encontrado'
          });
          return;
        }

        // Buscar consultas do paciente
        const response = await postBuscarConsultas({
          idPaciente,
          dataInicio: new Date().toISOString().split('T')[0] // A partir de hoje
        });

        const consultas: ConsultaRes[] = response.data;

        // Filtrar consultas com status 'agendada' ou 'confirmada'
        const consultasValidas = consultas.filter(consulta => 
          consulta.status === 'agendada' || consulta.status === 'confirmada'
        );

        if (consultasValidas.length === 0) {
          setProximaConsulta({
            consulta: null,
            mensagem: 'Nenhuma consulta agendada encontrada',
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
        let mensagem = `Sua próxima consulta é com Dr(a). ${proxima.medico.nome} dia ${dataFormatada} às ${horaFormatada}`;
        
        if (proxima.status === 'agendada') {
          mensagem += '. Lembre-se de confirmá-la para garantir sua consulta';
        }

        setProximaConsulta({
          consulta: proxima,
          mensagem,
          loading: false,
          error: null
        });

      } catch (error) {
        console.error('Erro ao buscar próxima consulta:', error);
        setProximaConsulta({
          consulta: null,
          mensagem: '',
          loading: false,
          error: 'Erro ao carregar consultas'
        });
      }
    };

    buscarProximaConsulta();
  }, [getIdPaciente]);

  return proximaConsulta;
};
