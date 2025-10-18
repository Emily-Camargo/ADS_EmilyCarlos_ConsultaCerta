import React from 'react'
import { Box } from '@mui/material'
import Filtro from '../../components/filtro'
import { useDimension } from '../../hooks'

const Prontuarios: React.FC = () => {
  const isMobile = useDimension(800)

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
        <Box sx={{ mb: 3 }}>
        <Filtro />
        </Box>
      </div>
    </Box>
  )
}

export default Prontuarios
