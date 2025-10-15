import React, { useState, useMemo } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { MdLocalPharmacy, MdSearch } from 'react-icons/md'
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
  const [pesquisa, setPesquisa] = useState('')
  const [modalVisualizar, setModalVisualizar] = useState(false)
  const [prescricaoSelecionada, setPrescricaoSelecionada] = useState<Prescricao | null>(null)

  // Filtrar prescrições com base na pesquisa
  const prescricoesFiltradas = useMemo(() => {
    if (!pesquisa) return prescricoes

    const termoBusca = pesquisa.toLowerCase()
    return prescricoes.filter(prescricao => {
      // Buscar em vários campos
      const buscaConsulta = prescricao.idConsulta.toString().includes(termoBusca)
      const buscaData = prescricao.dtaConsulta.toLowerCase().includes(termoBusca)
      const buscaMedico = prescricao.nomeMedico?.toLowerCase().includes(termoBusca)
      const buscaPaciente = prescricao.nomePaciente?.toLowerCase().includes(termoBusca)
      const buscaEspecialidade = prescricao.especialidade?.toLowerCase().includes(termoBusca)
      
      // Buscar nos medicamentos
      const buscaMedicamentos = prescricao.medicamentos.some(med => 
        med.nomeMedicamento.toLowerCase().includes(termoBusca)
      )

      return buscaConsulta || buscaData || buscaMedico || buscaPaciente || 
             buscaEspecialidade || buscaMedicamentos
    })
  }, [prescricoes, pesquisa])

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

  // Calcular estatísticas
  const totalMedicamentos = prescricoes.reduce((acc, p) => acc + p.medicamentos.length, 0)
  const totalControlados = prescricoes.reduce((acc, p) => 
    acc + p.medicamentos.filter(m => m.controlado).length, 0
  )

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
        {/* Cabeçalho */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{
              backgroundColor: '#eff6ff',
              p: 1.5,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <MdLocalPharmacy size={32} color="#3b82f6" />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ 
                fontWeight: '700', 
                color: '#1e293b',
                fontSize: isMobile ? '1.5rem' : '2rem'
              }}>
                Minhas Prescrições
              </Typography>
              <Typography sx={{ 
                color: '#64748b', 
                fontSize: '0.9rem',
                mt: 0.5
              }}>
                Gerencie e visualize suas receitas médicas
              </Typography>
            </Box>
          </Box>

          {/* Estatísticas */}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ 
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                p: 2,
                textAlign: 'center'
              }}>
                <Typography sx={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  color: '#3b82f6'
                }}>
                  {prescricoes.length}
                </Typography>
                <Typography sx={{ 
                  fontSize: '0.8rem', 
                  color: '#64748b',
                  fontWeight: '500'
                }}>
                  Prescrições Registradas
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ 
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                p: 2,
                textAlign: 'center'
              }}>
                <Typography sx={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  color: '#10b981'
                }}>
                  {totalMedicamentos}
                </Typography>
                <Typography sx={{ 
                  fontSize: '0.8rem', 
                  color: '#64748b',
                  fontWeight: '500'
                }}>
                  Total de Medicamentos
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ 
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                p: 2,
                textAlign: 'center'
              }}>
                <Typography sx={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  color: '#ef4444'
                }}>
                  {totalControlados}
                </Typography>
                <Typography sx={{ 
                  fontSize: '0.8rem', 
                  color: '#64748b',
                  fontWeight: '500'
                }}>
                  Medicamentos Controlados
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Filtro de Pesquisa */}
        <Box sx={{ mb: 3 }}>
          <Filtro 
            pesquisa={pesquisa}
            setPesquisa={setPesquisa}
            title="Pesquisar prescrições"
          />
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
              {pesquisa 
                ? 'Nenhuma prescrição encontrada com os critérios de busca'
                : 'Nenhuma prescrição registrada'
              }
            </Typography>
            {pesquisa && (
              <Typography sx={{ 
                mt: 1, 
                color: '#94a3b8',
                fontSize: '0.9rem'
              }}>
                Tente buscar por outro termo
              </Typography>
            )}
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
