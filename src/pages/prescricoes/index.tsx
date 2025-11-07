import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { MdSearch } from 'react-icons/md'
import Filtro from '../../components/filtro'
import { useDimension } from '../../hooks'
import PrescricaoCard from './components/prescricao-card'
import VisualizarPrescricao from './components/visualizar-prescricao'
import { PrescricaoRes } from '../../services/prescricoes/interfaces'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/AuthContext'
import { buscarPrescricoes } from '../../services/prescricoes'
import { getBuscarPacientes } from '../../services/usuario'
import { inputsPrescricoes, inputsSelect } from './components/filtro'
import { useImmer } from 'use-immer'
import { prescricoesFil } from './utils/constants'
import { useQuery } from 'react-query'
import CustomLoaders from '../../components/Loader'

const Prescricoes: React.FC = () => {
  const isMobile = useDimension(800)
  const { getIdPerfil, getIdPaciente } = useAuth()
  const [modalVisualizar, setModalVisualizar] = useState(false)
  const [prescricaoSelecionada, setPrescricaoSelecionada] = useState<PrescricaoRes | null>(null)
  const [data, setData] = useImmer(prescricoesFil)
  const [prescricoesFiltradas, setPrescricoesFiltradas] = useState<PrescricaoRes[]>([])
  const [filtroAplicado, setFiltroAplicado] = useState(false)
  const [loadingFiltro, setLoadingFiltro] = useState(false)

  const { data: pacientes = [] } = useQuery({
    queryKey: ['pacientes'],
    queryFn: async () => {
      const response = await getBuscarPacientes()
      return response.data
    },
  })

  const { data: prescricoes = [], isLoading: loading, error } = useQuery({
    queryKey: ['prescricoes', getIdPerfil(), getIdPaciente()],
    queryFn: async () => {
      const idPerfil = getIdPerfil()
      
      if (idPerfil === 4) {
        const idPaciente = getIdPaciente()
        if (idPaciente) {
          const response = await buscarPrescricoes({ idPaciente })
          return response.data
        }
        return []
      } else {
        return []
      }
    },
    enabled: !!getIdPerfil(),
    onError: () => {
      toast.error('Erro ao carregar prescrições')
    }
  })

  const prescricoesParaExibir = filtroAplicado ? prescricoesFiltradas : prescricoes

  const handleVisualizarPrescricao = (prescricao: PrescricaoRes) => {
    setPrescricaoSelecionada(prescricao)
    setModalVisualizar(true)
  }

  const handleImprimirPrescricao = (prescricao: PrescricaoRes) => {
    toast.info('Preparando impressão da prescrição...')
    setPrescricaoSelecionada(prescricao)
    setTimeout(() => {
      setModalVisualizar(true)
      setTimeout(() => {
        window.print()
      }, 500)
    }, 300)
  }

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (getIdPerfil() !== 4 && !data.pacientes) {
      toast.error('Paciente deve ser selecionado')
      return
    }

    try {
      setLoadingFiltro(true)
      
      let idPaciente: number
      
      if (getIdPerfil() === 4) {
        const pacienteId = getIdPaciente()
        if (!pacienteId) {
          toast.error('ID do paciente não encontrado')
          return
        }
        idPaciente = pacienteId
      } else {
        if (!data.pacientes || !data.pacientes.paciente) {
          toast.error('Paciente deve ser selecionado')
          return
        }
        idPaciente = data.pacientes.paciente.idPaciente
      }
      const requestData = {
        idPaciente,
        ...(data.dtaIni && { dataIni: data.dtaIni }),
        ...(data.dtaFinal && { dataFinal: data.dtaFinal })
      }

      const response = await buscarPrescricoes(requestData)
      setPrescricoesFiltradas(response.data)
      setFiltroAplicado(true)
    } catch (error) {
      toast.error('Erro ao carregar prescrições')
    } finally {
      setLoadingFiltro(false)
    }
  }

  const limpar = () => {
    setData(prescricoesFil)
    setPrescricoesFiltradas([])
    setFiltroAplicado(false)
  }


  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
        <Box sx={{ mb: 3 }}>
        <Filtro
        onSubmit={enviar}
        onClear={limpar}
        inputs={inputsPrescricoes({
          data: data,
          setData: setData,
        })}
        inputSelect={
          getIdPerfil() !== 4 ? inputsSelect({
            data: data,
            setData: setData,
            pacientes: pacientes,
          }) : []
        }
      />
        </Box>

        {loading || loadingFiltro ? (
          <CustomLoaders 
            open={true} 
            animation="LoadingDots" 
            msm="Carregando prescrições..."
          />
        ) : error ? (
          <CustomLoaders 
            open={true} 
            animation="errorPage" 
            msm="Erro ao carregar prescrições"
          />
        ) : prescricoesParaExibir.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
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
              Exibindo {prescricoesParaExibir.length} {prescricoesParaExibir.length === 1 ? 'prescrição' : 'prescrições'}
            </Typography>
            
            {prescricoesParaExibir.map((prescricao) => (
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
