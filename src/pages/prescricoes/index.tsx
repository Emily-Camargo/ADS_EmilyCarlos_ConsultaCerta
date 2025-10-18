import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { MdSearch } from 'react-icons/md'
import Filtro from '../../components/filtro'
import { useDimension } from '../../hooks'
import PrescricaoCard from './components/prescricao-card'
import VisualizarPrescricao from './components/visualizar-prescricao'
import { Prescricao } from './utils/interface'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/AuthContext'
import { getPrescricoesByPaciente } from '../../services/prescricoes'

const Prescricoes: React.FC = () => {
  const isMobile = useDimension(800)
  const { getIdPerfil, getIdPaciente } = useAuth()
  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([])
  const [loading, setLoading] = useState(true)
  const [modalVisualizar, setModalVisualizar] = useState(false)
  const [prescricaoSelecionada, setPrescricaoSelecionada] = useState<Prescricao | null>(null)

  // Carrega prescrições baseado no perfil do usuário
  useEffect(() => {
    const carregarPrescricoes = async () => {
      try {
        setLoading(true)
        const idPerfil = getIdPerfil()
        
        if (idPerfil === 4) {
          // Se for paciente, busca prescrições da API
          const idPaciente = getIdPaciente()
          if (idPaciente) {
            const response = await getPrescricoesByPaciente(idPaciente)
            setPrescricoes(response.data)
          }
        } else {
          // Para outros perfis, usa mocks por enquanto
          setPrescricoes(prescricoes)
        }
      } catch (error) {
        console.error('Erro ao carregar prescrições:', error)
        toast.error('Erro ao carregar prescrições')
        // Em caso de erro, usa mocks como fallback
        setPrescricoes(prescricoes)
      } finally {
        setLoading(false)
      }
    }

    carregarPrescricoes()
  }, [getIdPerfil, getIdPaciente])

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

        {loading ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <Typography sx={{ 
              color: '#64748b',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>
              Carregando prescrições...
            </Typography>
          </Box>
        ) : prescricoesFiltradas.length === 0 ? (
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
