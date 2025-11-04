import React from 'react'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'
import { HorarioOcupacao } from '../../../services/dashboard/interface'

interface HorariosBarChartProps {
  data: HorarioOcupacao[]
  loading?: boolean
}

const HorariosBarChart: React.FC<HorariosBarChartProps> = ({
  data,
  loading = false,
}) => {
  const chartData = data.map((item) => ({
    horario: item.horario,
    Consultas: item.quantidade,
  }))

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
            Ocupação por Horário
          </Typography>
          <Box
            sx={{
              height: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="text.secondary">Carregando...</Typography>
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
            Ocupação por Horário
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
          Ocupação por Horário
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveBar
            data={chartData}
            keys={['Consultas']}
            indexBy="horario"
            margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={['#8B5CF6']}
            borderRadius={4}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: 'Horário',
              legendPosition: 'middle',
              legendOffset: 42,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Consultas',
              legendPosition: 'middle',
              legendOffset: -50,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 1.6]],
            }}
            role="application"
            ariaLabel="Gráfico de ocupação por horário"
            animate={true}
            motionConfig="gentle"
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default HorariosBarChart

