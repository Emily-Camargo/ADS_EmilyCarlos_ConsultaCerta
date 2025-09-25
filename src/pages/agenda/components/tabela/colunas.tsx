import { TableColumn } from 'react-data-table-component'
import { ColunasHorariosProps, HorarioAtendimento } from '../../utils/interfaces'
import { Tooltip, Zoom, Chip } from '@mui/material'
import { Edit, Visibility, Block } from '@mui/icons-material'
import { getNomeDiaSemana, formatarHorario, formatarData } from '../../utils/constants'

export function colunasHorarios({ 
  editarHorario, 
  detalhesHorario, 
}: ColunasHorariosProps) {
  const rows: TableColumn<HorarioAtendimento>[] = [
    {
      name: 'Médico',
      selector: (row) => row.nome_medico || '',
      sortable: true,
    },
    {
      name: 'Especialidade',
      selector: (row) => row.especialidade || '',
      sortable: true,
    },
    {
      name: 'CRM',
      selector: (row) => row.crm || '',
      sortable: true,
    },
    {
      name: 'Dia da Semana',
      selector: (row) => row.dia_semana,
      format: (row) => getNomeDiaSemana(row.dia_semana),
      sortable: true,
      center: true,
    },
    {
      name: 'Horário',
      selector: (row) => row.hora_inicio,
      format: (row) => `${formatarHorario(row.hora_inicio)} - ${formatarHorario(row.hora_fim)}`,
      sortable: true,
      center: true,
    },
    {
      name: 'Intervalo',
      selector: (row) => row.intervalo_minutos,
      format: (row) => `${row.intervalo_minutos}min`,
      sortable: true,
      center: true,
    },
    {
      name: 'Almoço',
      selector: (row) => row.almoco_inicio,
      format: (row) => {
        if (!row.almoco_inicio || !row.almoco_fim) return '--'
        return `${formatarHorario(row.almoco_inicio)} - ${formatarHorario(row.almoco_fim)}`
      },
      sortable: true,
      center: true,
    },
    {
      name: 'Vigência',
      selector: (row) => row.data_vigencia_inicio,
      format: (row) => {
        const inicio = formatarData(row.data_vigencia_inicio)
        const fim = formatarData(row.data_vigencia_fim)
        if (inicio === '--' && fim === '--') return 'Indefinida'
        return `${inicio} - ${fim}`
      },
      sortable: true,
      center: true,
    },
    {
      name: 'Status',
      selector: (row) => row.ativo,
      format: (row) => (
        <Chip
          label={row.ativo ? 'Ativo' : 'Inativo'}
          color={row.ativo ? 'success' : 'default'}
          size="small"
          variant="filled"
        />
      ),
      sortable: true,
      center: true,
    },
    {
      name: 'Detalhes',
      center: true,
      cell: (row) => {
        return (
          <div>
            <Tooltip
              TransitionComponent={Zoom}
              placement="top"
              title="Ver detalhes"
            >
              <button
                onClick={() => detalhesHorario(row)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Visibility className="text-medical-primary" fontSize="small" />
              </button>
            </Tooltip>
          </div>
        )
      },
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
              title="Editar horário"
            >
              <button
                onClick={() => editarHorario(row)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Edit className="text-medical-primary" fontSize="small" />
              </button>
            </Tooltip>
          </div>
        )
      },
    },
  ]
  return rows
}
