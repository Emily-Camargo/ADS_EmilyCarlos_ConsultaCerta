import { memo } from 'react'
import DataTable from 'react-data-table-component'
import { TabelaBloqueiosProps } from '../../utils/interfaces'
import { colunasBloqueios } from './colunas-bloqueios'
import { customStyles } from '../../../../styles/customTable'
import CustomLoaders from '../../../../components/Loader'

export const TabelaBloqueios = memo(function TabelaBloqueios({
  bloqueios,
  isLoading = false,
  editarBloqueio,
  removerBloqueio,
}: Readonly<TabelaBloqueiosProps>) {
  const colunas = colunasBloqueios({
    editarBloqueio,
    removerBloqueio,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8 bg-gray-50">
        <CustomLoaders open animation="LoadingDots" />
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      <DataTable
        columns={colunas}
        data={bloqueios}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
        highlightOnHover
        customStyles={customStyles}
        noDataComponent={
          <div className="text-center py-6 text-gray-500">
            <p>Nenhum bloqueio encontrado para este médico</p>
          </div>
        }
        paginationComponentOptions={{
          rowsPerPageText: 'Linhas:',
          rangeSeparatorText: 'de',
          selectAllRowsItem: false,
        }}
      />
    </div>
  )
})

