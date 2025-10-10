import { TableColumn } from 'react-data-table-component'
import { ColunasPacientesProps, PacienteData } from '../../utils/interfaces'
import { Tooltip, Zoom } from '@mui/material'
import { Edit, Visibility } from '@mui/icons-material'

export function colunasPacientes({ editarPaciente, detalhesPaciente }: ColunasPacientesProps) {
  const rows: TableColumn<PacienteData>[] = [
    {
      name: 'Nome do Paciente',
      selector: (row) => row.nome_paciente,
      sortable: true,
    },
    {
      name: 'CPF',
      selector: (row) => row.cpf,
      sortable: true,
      center: true,
    },
    {
      name: 'Celular',
      selector: (row) => row.celular,
      sortable: true,
      center: true,
    },
    {
      name: 'Data de Nascimento',
      selector: (row) => row.data_nascimento,
      format: (row) => new Date(row.data_nascimento).toLocaleDateString('pt-BR'),
      sortable: true,
      center: true,
    },
    {
      name: 'Gênero',
      selector: (row) => row.genero,
      format: (row) => row.genero === 'M' ? 'Masculino' : 'Feminino',
      sortable: true,
      center: true,
    },
    {
      name: 'Tipo Sanguíneo',
      selector: (row) => row.tipo_sanguineo,
      sortable: true,
      center: true,
    },
    {
      name: 'Convênio',
      selector: (row) => row.convenio,
      sortable: true,
      center: true,
    },
    {
      name: 'Carteirinha',
      selector: (row) => row.numero_carteirinha,
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
                placement="right"
                title="Detalhes"
              >
                <button
                  onClick={() => detalhesPaciente(row)}
                >
                  <Visibility className="text-medical-primary"/>
                </button>
              </Tooltip>
            </div>
          )
        },
        sortable: true,
    },
    {
        name: 'Editar',
        center: true,
        cell: (row) => {
          return (
            <div>
              <Tooltip
                TransitionComponent={Zoom}
                placement="right"
                title="Editar"
              >
                <button
                  onClick={() => editarPaciente(row)}
                >
                  <Edit className="text-medical-primary"/>
                </button>
              </Tooltip>
            </div>
          )
        },
        sortable: true,
      },
  ]
  return rows
}