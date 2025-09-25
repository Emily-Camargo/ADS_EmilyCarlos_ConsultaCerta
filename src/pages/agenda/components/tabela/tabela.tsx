import { memo } from 'react'
import DataTable from 'react-data-table-component'
import { TabelaHorariosProps } from '../../utils/interfaces'
import { colunasHorarios } from './colunas'
import { customStyles } from '../../../../styles/customTable'
import CustomLoaders from '../../../../components/Loader'

export const TabelaHorarios = memo(function TabelaHorarios({
  horarios,
  isLoading = false,
  editarHorario,
  detalhesHorario,
}: Readonly<TabelaHorariosProps>) {
  const colunas = colunasHorarios({
    editarHorario,
    detalhesHorario,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CustomLoaders open animation="LoadingDots" />
      </div>
    )
  }

  return (
    <div className="mt-4">
      <DataTable
        columns={colunas}
        data={horarios}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
        noDataComponent={
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum horário encontrado</p>
          </div>
        }
        paginationComponentOptions={{
          rowsPerPageText: 'Linhas por página:',
          rangeSeparatorText: 'de',
          selectAllRowsItem: true,
          selectAllRowsItemText: 'Todos',
        }}
      />
    </div>
  )
})
