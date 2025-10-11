import { TableColumn } from 'react-data-table-component'
import { BloqueioAgenda, ColunasBloqueiosProps } from '../../utils/interfaces'
import { Tooltip, Zoom, Chip } from '@mui/material'
import { Edit, Visibility, Delete } from '@mui/icons-material'

// Função para formatar data e hora completa
const formatarDataHoraCompleta = (dataHora: string): string => {
  if (!dataHora) return '--'
  const date = new Date(dataHora)
  const data = date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  })
  const hora = date.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  return `${data} ${hora}`
}

export function colunasBloqueios({ 
  editarBloqueio, 
  removerBloqueio,
}: ColunasBloqueiosProps) {
  const rows: TableColumn<BloqueioAgenda>[] = [
    {
      name: 'Data Início',
      selector: (row) => row.data_inicio,
      format: (row) => formatarDataHoraCompleta(row.data_inicio),
      sortable: true,
    },
    {
      name: 'Data Fim',
      selector: (row) => row.data_fim,
      format: (row) => formatarDataHoraCompleta(row.data_fim),
      sortable: true,
    },
    {
      name: 'Tipo',
      selector: (row) => row.tipo_bloqueio,
      sortable: true,
      center: true,
    },
    {
      name: 'Motivo',
      selector: (row) => row.motivo,
      sortable: true,
      grow: 2,  
      wrap: true,
      center: true,
    },
    {
      name: 'Criado Por',
      selector: (row) => row.nome_criado_por || '--',
      sortable: true,
      center: true,
    },
    {
      name: 'Status',
      cell: (row) => {
        const dataFim = new Date(row.data_fim)
        const hoje = new Date()
        const isAtivo = dataFim >= hoje

        return (
          <Chip
            label={isAtivo ? 'Ativo' : 'Expirado'}
            color={isAtivo ? 'success' : 'default'}
            size="small"
            variant="filled"
          />
        )
      },
      center: true,
    },
    {
      name: 'Editar',
      center: true,
      cell: (row) => {
        return (
          <div>
            <Tooltip
              TransitionComponent={Zoom}
              placement="top"
              title="Editar bloqueio"
            >
              <button
                onClick={() => editarBloqueio(row)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Edit className="text-medical-primary" fontSize="small" />
              </button>
            </Tooltip>
          </div>
        )
      },
    },
    {
      name: 'Remover',
      center: true,
      cell: (row) => {
        return (
          <div>
            <Tooltip
              TransitionComponent={Zoom}
              placement="top"
              title="Remover bloqueio"
            >
              <button
                onClick={() => removerBloqueio(row)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Delete className="text-red-500" fontSize="small" />
              </button>
            </Tooltip>
          </div>
        )
      },
    },
  ]

  return rows
}

