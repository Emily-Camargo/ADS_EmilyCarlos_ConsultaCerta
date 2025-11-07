import { memo } from 'react'
import DataTable from 'react-data-table-component'
import { TabelaBloqueiosProps } from '../../utils/interfaces'
import { colunasBloqueiosGeral } from './colunas-bloqueios-geral'
import { customStyles } from '../../../../styles/customTable'
import CustomLoaders from '../../../../components/Loader'

export const TabelaBloqueiosGeral = memo(function TabelaBloqueiosGeral({
  bloqueios,
  isLoading = false,
  editarBloqueio,
  detalhesBloqueio,
  removerBloqueio,
}: Readonly<TabelaBloqueiosProps>) {
  const colunas = colunasBloqueiosGeral({
    editarBloqueio,
    detalhesBloqueio,
    removerBloqueio,
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
        data={bloqueios}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
        noDataComponent={
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum bloqueio encontrado</p>
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

