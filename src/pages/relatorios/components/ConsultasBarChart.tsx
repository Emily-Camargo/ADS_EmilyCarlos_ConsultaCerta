import React from 'react'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'
import { ConsultasPorPeriodo } from '../../../services/dashboard/interface'
import { formatarNomeMes } from '../utils/functions'

interface ConsultasBarChartProps {
  data: ConsultasPorPeriodo[]
  loading?: boolean
}

const ConsultasBarChart: React.FC<ConsultasBarChartProps> = ({
  data,
  loading = false,
}) => {
  const chartData = data.map((item) => ({
    periodo: formatarNomeMes(item.periodo),
    Agendadas: item.agendadas,
    Concluídas: item.concluidas,
    Canceladas: item.canceladas,
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
            Consultas por Período
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
            Consultas por Período
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
          Consultas por Período
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveBar
            data={chartData}
            keys={['Agendadas', 'Concluídas', 'Canceladas']}
            indexBy="periodo"
            margin={{ top: 20, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={['#3B82F6', '#10B981', '#EF4444']}
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
              legend: 'Período',
              legendPosition: 'middle',
              legendOffset: 42,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Quantidade',
              legendPosition: 'middle',
              legendOffset: -50,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 1.6]],
            }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Gráfico de consultas por período"
            animate={true}
            motionConfig="gentle"
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ConsultasBarChart

