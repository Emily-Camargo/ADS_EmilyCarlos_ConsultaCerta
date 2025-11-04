import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
} from '@mui/material'
import { EstatisticasMedico } from '../../../services/dashboard/interface'
import { formatarMoeda } from '../utils/functions'

interface MedicosTableProps {
  data: EstatisticasMedico[]
  loading?: boolean
}

const MedicosTable: React.FC<MedicosTableProps> = ({
  data,
  loading = false,
}) => {
  if (loading) {
    return (
      <Card
        sx={{
          height: '100%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Desempenho por Médico
          </Typography>
          <Box sx={{ height: 300 }}>
            <LinearProgress />
          </Box>
        </CardContent>
      </Card>
    )
  }

  if (data.length === 0) {
    return (
      <Card
        sx={{
          height: '100%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Desempenho por Médico
          </Typography>
          <Box
            sx={{
              height: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="text.secondary">
              Nenhum dado disponível
            </Typography>
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      sx={{
        height: '100%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: '#1F2937',
          }}
        >
          Desempenho por Médico
        </Typography>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, backgroundColor: '#F9FAFB' }}>
                  Médico
                </TableCell>
                <TableCell sx={{ fontWeight: 600, backgroundColor: '#F9FAFB' }}>
                  Especialidade
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, backgroundColor: '#F9FAFB' }}
                >
                  Total
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, backgroundColor: '#F9FAFB' }}
                >
                  Concluídas
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, backgroundColor: '#F9FAFB' }}
                >
                  Taxa
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: 600, backgroundColor: '#F9FAFB' }}
                >
                  Receita
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((medico) => (
                <TableRow
                  key={medico.idMedico}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F9FAFB',
                    },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {medico.nomeMedico}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={medico.especialidade}
                      size="small"
                      sx={{
                        backgroundColor: '#DBEAFE',
                        color: '#1E40AF',
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {medico.totalConsultas}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ color: '#10B981' }}>
                      {medico.consultasConcluidas}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color:
                            medico.taxaConclusao >= 80
                              ? '#10B981'
                              : medico.taxaConclusao >= 60
                                ? '#F59E0B'
                                : '#EF4444',
                        }}
                      >
                        {medico.taxaConclusao.toFixed(1)}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={medico.taxaConclusao}
                        sx={{
                          width: 50,
                          height: 4,
                          borderRadius: 2,
                          mt: 0.5,
                          backgroundColor: '#E5E7EB',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor:
                              medico.taxaConclusao >= 80
                                ? '#10B981'
                                : medico.taxaConclusao >= 60
                                  ? '#F59E0B'
                                  : '#EF4444',
                          },
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: '#059669' }}
                    >
                      {formatarMoeda(medico.receitaGerada)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default MedicosTable

