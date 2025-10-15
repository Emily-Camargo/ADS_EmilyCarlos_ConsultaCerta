import React from 'react'
import { Box, Typography, Chip } from '@mui/material'
import { MedicamentoCardProps } from '../utils/interface'
import { getMedicamentoIcon, verificarValidadeMedicamento } from '../utils/constants'
import { MdInfo } from 'react-icons/md'

const MedicamentoCard: React.FC<MedicamentoCardProps> = ({ medicamento, index }) => {
  const validadeInfo = verificarValidadeMedicamento(medicamento.validade)

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        p: 2,
        mb: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          borderColor: '#cbd5e1'
        }
      }}
    >
      {/* Cabeçalho do medicamento */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <Box sx={{
            backgroundColor: medicamento.controlado ? '#fef2f2' : '#f0fdf4',
            p: 0.75,
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center'
          }}>
            {getMedicamentoIcon(medicamento.controlado)}
          </Box>
          <Box>
            <Typography sx={{ 
              fontWeight: '600', 
              color: '#1e293b',
              fontSize: '0.9rem',
              lineHeight: 1.3
            }}>
              {index + 1}. {medicamento.nomeMedicamento}
            </Typography>
            {medicamento.controlado && (
              <Chip
                label="Medicamento Controlado"
                size="small"
                sx={{
                  height: '20px',
                  fontSize: '0.65rem',
                  fontWeight: '600',
                  backgroundColor: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  mt: 0.5
                }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {validadeInfo.icone}
          <Typography sx={{ 
            fontSize: '0.7rem', 
            color: validadeInfo.cor,
            fontWeight: '500'
          }}>
            {validadeInfo.texto}
          </Typography>
        </Box>
      </Box>

      {/* Dosagem */}
      <Box sx={{ 
        backgroundColor: '#f8fafc',
        borderRadius: '6px',
        p: 1.5,
        mb: 1.5
      }}>
        <Typography sx={{ 
          fontSize: '0.75rem', 
          color: '#64748b',
          fontWeight: '500',
          mb: 0.5,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Dosagem
        </Typography>
        <Typography sx={{ 
          fontSize: '0.875rem', 
          color: '#1e293b',
          fontWeight: '600'
        }}>
          {medicamento.dosagem}
        </Typography>
      </Box>

      {/* Instruções */}
      <Box sx={{ 
        display: 'flex',
        gap: 1,
        mb: 1.5,
        p: 1.5,
        backgroundColor: '#eff6ff',
        borderRadius: '6px',
        border: '1px solid #dbeafe'
      }}>
        <MdInfo size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
        <Box>
          <Typography sx={{ 
            fontSize: '0.75rem', 
            color: '#1e40af',
            fontWeight: '500',
            mb: 0.5
          }}>
            Instruções de Uso
          </Typography>
          <Typography sx={{ 
            fontSize: '0.8rem', 
            color: '#1e40af',
            lineHeight: 1.5
          }}>
            {medicamento.instrucoes}
          </Typography>
        </Box>
      </Box>

      {/* Quantidade */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pt: 1,
        borderTop: '1px solid #e2e8f0'
      }}>
        <Typography sx={{ 
          fontSize: '0.75rem', 
          color: '#64748b'
        }}>
          Quantidade prescrita
        </Typography>
        <Chip
          label={`${medicamento.quantidade} ${medicamento.quantidade === 1 ? 'unidade' : 'unidades'}`}
          size="small"
          sx={{
            height: '22px',
            fontSize: '0.75rem',
            fontWeight: '600',
            backgroundColor: '#f1f5f9',
            color: '#334155'
          }}
        />
      </Box>
    </Box>
  )
}

export default MedicamentoCard

