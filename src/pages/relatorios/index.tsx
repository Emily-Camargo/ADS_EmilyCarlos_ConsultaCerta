import React from 'react'
import { Box, Typography } from '@mui/material'
import { useDimension } from '../../hooks'

const Relatorios: React.FC = () => {
  const isMobile = useDimension(800)

  return (
    <Box
      sx={{
        width: '100%',
        padding: isMobile ? 2 : 4,
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: '#1E3A8A',
        }}
      >
        Relatórios e Dashboards
      </Typography>

      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          padding: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Página de relatórios em desenvolvimento...
        </Typography>
      </Box>
    </Box>
  )
}

export default Relatorios

