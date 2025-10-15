import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { MdSearch } from 'react-icons/md'
import Filtro from '../../components/filtro'
import { useDimension } from '../../hooks'
import PrescricaoCard from './components/prescricao-card'
import VisualizarPrescricao from './components/visualizar-prescricao'
import { Prescricao } from './utils/interface'
import { prescricoesMock } from './mocks'
import { toast } from 'react-toastify'

const Prescricoes: React.FC = () => {
  const isMobile = useDimension(800)
  const [prescricoes] = useState<Prescricao[]>(prescricoesMock)
  const [modalVisualizar, setModalVisualizar] = useState(false)
  const [prescricaoSelecionada, setPrescricaoSelecionada] = useState<Prescricao | null>(null)

  // Sem pesquisa: exibe tudo.
  const prescricoesFiltradas = prescricoes

  const handleVisualizarPrescricao = (prescricao: Prescricao) => {
    setPrescricaoSelecionada(prescricao)
    setModalVisualizar(true)
  }

  const handleImprimirPrescricao = (prescricao: Prescricao) => {
    toast.info('Preparando impressão da prescrição...')
    setPrescricaoSelecionada(prescricao)
    setTimeout(() => {
      setModalVisualizar(true)
      setTimeout(() => {
        window.print()
      }, 500)
    }, 300)
  }


  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div className={`${isMobile ? 'p-4' : 'p-6'}`}>


        <Box sx={{ mb: 3 }}>
          <Filtro />
        </Box>

        {/* Lista de Prescrições */}
        {prescricoesFiltradas.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <MdSearch size={64} color="#cbd5e1" />
            <Typography sx={{ 
              mt: 2, 
              color: '#64748b',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>
              Nenhuma prescrição registrada
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography sx={{ 
              mb: 2, 
              color: '#64748b',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              Exibindo {prescricoesFiltradas.length} {prescricoesFiltradas.length === 1 ? 'prescrição' : 'prescrições'}
            </Typography>
            
            {prescricoesFiltradas.map((prescricao) => (
              <PrescricaoCard
                key={prescricao.idConsulta}
                prescricao={prescricao}
                onVisualizar={handleVisualizarPrescricao}
                onImprimir={handleImprimirPrescricao}
              />
            ))}
          </Box>
        )}

        {/* Modal de Visualização */}
        <VisualizarPrescricao
          modal={modalVisualizar}
          setModal={setModalVisualizar}
          prescricao={prescricaoSelecionada}
        />
      </div>
    </Box>
  )
}

export default Prescricoes
