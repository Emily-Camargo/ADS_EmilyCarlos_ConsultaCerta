import { TableStyles } from 'react-data-table-component'
export const customStyles: TableStyles = {
  headCells: {
    style: {
      paddingLeft: '10px',
      paddingRight: '2px',
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#F9FAFB',
    },
  },
  cells: {
    style: {
      paddingLeft: '10px',
      paddingRight: '2px',
    },
  },
  rows: {
    style: {
      '&:nth-of-type(even)': {
        backgroundColor: '#F9FAFB85',
      },
    },
  },
}

export const paginationComponentOptions = {
  rowsPerPageText: 'Linhas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}
