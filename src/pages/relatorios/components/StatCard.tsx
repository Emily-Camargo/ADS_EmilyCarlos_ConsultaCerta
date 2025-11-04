import React from 'react'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { IconType } from 'react-icons'
import {
  MdTrendingUp,
  MdTrendingDown,
  MdTrendingFlat,
} from 'react-icons/md'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: IconType
  iconColor?: string
  iconBgColor?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  loading?: boolean
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = '#3B82F6',
  iconBgColor = '#DBEAFE',
  trend,
  loading = false,
}) => {
  const getTrendIcon = () => {
    if (!trend) return null
    if (trend.value === 0) return <MdTrendingFlat />
    return trend.isPositive ? <MdTrendingUp /> : <MdTrendingDown />
  }

  const getTrendColor = () => {
    if (!trend) return 'inherit'
    if (trend.value === 0) return '#6B7280'
    return trend.isPositive ? '#10B981' : '#EF4444'
  }

  if (loading) {
    return (
      <Card
        sx={{
          height: '100%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 2,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        }}
      >
        <CardContent>
          <Box className="animate-pulse">
            <Box
              sx={{
                width: 48,
                height: 48,
                backgroundColor: '#E5E7EB',
                borderRadius: 2,
                mb: 2,
              }}
            />
            <Box
              sx={{
                height: 20,
                backgroundColor: '#E5E7EB',
                borderRadius: 1,
                mb: 1,
              }}
            />
            <Box
              sx={{
                height: 32,
                backgroundColor: '#E5E7EB',
                borderRadius: 1,
                width: '60%',
              }}
            />
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
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#6B7280',
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#1F2937',
                mb: 0.5,
              }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography
                variant="caption"
                sx={{
                  color: '#9CA3AF',
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: iconBgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon style={{ fontSize: 24, color: iconColor }} />
          </Box>
        </Box>

        {trend && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              mt: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: getTrendColor(),
                fontSize: 20,
              }}
            >
              {getTrendIcon()}
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: getTrendColor(),
                fontWeight: 600,
              }}
            >
              {trend.value > 0 ? '+' : ''}
              {trend.value.toFixed(1)}%
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#9CA3AF',
              }}
            >
              vs mês anterior
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default StatCard

