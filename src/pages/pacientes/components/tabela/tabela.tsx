import DataTable from 'react-data-table-component'
import {
  customStyles,
  paginationComponentOptions,
} from '../../../../styles/customTable'
import CustomLoaders from '../../../../components/Loader'
import { TabelaPacientesProps } from '../../utils/interfaces'
import { Kbd } from '@mantine/core'
import { colunasPacientes } from './colunas'

export function TabelaPacientes({
  pacientes,
  isLoading = false,
  editarPaciente,
  detalhesPaciente,
}: Readonly<TabelaPacientesProps>) {

  return (
    <>
      {!isLoading && pacientes.length > 0 && (
        <div className="text-xs my-4">
          <div>
            Se necessário, utilize <Kbd>Shift &#8679;</Kbd> +{' '}
            <Kbd>Scroll 🖱️</Kbd> para rolar a tabela.
          </div>
        </div>
      )}
      <DataTable
        columns={colunasPacientes({ editarPaciente, detalhesPaciente })}
        data={pacientes}
        customStyles={customStyles}
        progressComponent={<CustomLoaders open />}
        progressPending={isLoading}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        noDataComponent={<CustomLoaders open={true} animation="notFound" />}
        highlightOnHover
        pointerOnHover
      />
    </>
  )
}