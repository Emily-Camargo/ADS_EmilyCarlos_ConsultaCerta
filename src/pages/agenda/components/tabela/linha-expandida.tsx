import { LinhaExpandidaProps } from '../../utils/interfaces'
import { getBloqueiosMedico } from '../../../../services/medico'
import { TabelaBloqueios } from './tabela-bloqueios'
import { mapearBloqueioRes } from '../../utils/constants'
import { useQuery } from 'react-query'

export function LinhaExpandida({ 
  data, 
  editarBloqueio, 
  removerBloqueio 
}: LinhaExpandidaProps) {
  const { data: bloqueiosData, isLoading, error } = useQuery(
    ['bloqueios-medico', data.id_medico],
    async () => {
      const response = await getBloqueiosMedico(data.id_medico)
      return response.data.map(mapearBloqueioRes)
    },
    {
      refetchOnWindowFocus: false,
    }
  )

  if (error) {
    return (
      <div className="text-center py-8 text-red-500 bg-gray-50">
        <p>Erro ao carregar bloqueios</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-gray-50">
      <div className="mb-2">
        <h4 className="text-sm font-semibold text-gray-700">
          Bloqueios de Agenda - {data.nome_medico}
        </h4>
      </div>
      <TabelaBloqueios
        bloqueios={bloqueiosData || []}
        isLoading={isLoading}
        editarBloqueio={editarBloqueio || (() => {})}
        removerBloqueio={removerBloqueio || (() => {})}
      />
    </div>
  )
}

