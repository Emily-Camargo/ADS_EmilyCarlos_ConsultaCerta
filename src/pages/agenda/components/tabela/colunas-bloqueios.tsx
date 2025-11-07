import { TableColumn } from 'react-data-table-component'
import { BloqueioAgenda, ColunasBloqueiosProps } from '../../utils/interfaces'
import { Tooltip, Zoom, Chip } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

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
        const dataFim = new Date(row.data_fim)
        const hoje = new Date()
        dataFim.setHours(23, 59, 59, 999)
        hoje.setHours(0, 0, 0, 0)
        const isExpirado = dataFim < hoje

        return (
          <Tooltip
            TransitionComponent={Zoom}
            placement="top"
            title={isExpirado ? "Não é possível editar bloqueio expirado" : "Editar bloqueio"}
          >
            <span>
              <button
                onClick={() => !isExpirado && editarBloqueio(row)}
                className={`p-1 rounded ${
                  isExpirado 
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'hover:bg-gray-100 cursor-pointer'
                }`}
                disabled={isExpirado}
              >
                <Edit 
                  className={isExpirado ? "text-gray-400" : "text-medical-primary"} 
                  fontSize="small" 
                />
              </button>
            </span>
          </Tooltip>
        )
      },
    },
    {
      name: 'Excluir',
      center: true,
      cell: (row) => {
        const dataFim = new Date(row.data_fim)
        const hoje = new Date()
        dataFim.setHours(23, 59, 59, 999)
        hoje.setHours(0, 0, 0, 0)
        const isExpirado = dataFim < hoje

        return (
          <Tooltip
            TransitionComponent={Zoom}
            placement="top"
            title={isExpirado ? "Não é possível excluir bloqueio expirado" : "Excluir bloqueio"}
          >
            <span>
              <button
                onClick={() => !isExpirado && removerBloqueio(row)}
                className={`p-1 rounded ${
                  isExpirado 
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'hover:bg-gray-100 cursor-pointer'
                }`}
                disabled={isExpirado}
              >
                <Delete 
                  className={isExpirado ? "text-gray-400" : "text-red-500"} 
                  fontSize="small" 
                />
              </button>
            </span>
          </Tooltip>
        )
      },
    },
  ]

  return rows
}

