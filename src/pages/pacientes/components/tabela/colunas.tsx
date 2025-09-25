import { TableColumn } from 'react-data-table-component'
import { PacienteData } from '../../utils/interfaces'

export function colunasPacientes() {
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
    },
    {
      name: 'Carteirinha',
      selector: (row) => row.numero_carteirinha,
      sortable: true,
      center: true,
    },
    {
      name: 'Contato de Emergência',
      selector: (row) => row.contato_emergencia_nome,
      sortable: true,
    },
    {
      name: 'Telefone de Emergência',
      selector: (row) => row.contato_emergencia_telefone,
      sortable: true,
      center: true,
    },
    {
      name: 'Observações',
      selector: (row) => row.observacoes,
      sortable: false,
      grow: 2,
      cell: (row) => (
        <div title={row.observacoes} style={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap' 
        }}>
          {row.observacoes}
        </div>
      ),
    },
  ]
  return rows
}