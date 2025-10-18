import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Filtro from '../../components/filtro'
import { useDimension } from '../../hooks'
import ProntuarioCard from './components/ProntuarioCard'
import VisualizarProntuario from './components/VisualizarProntuario'
import { ProntuarioPacienteRes } from '../../services/consultas/interface'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/AuthContext'
import { buscarProntuarioPaciente } from '../../services/consultas'
import { getBuscarPacientes } from '../../services/usuario'
import { inputsSelect } from './components/filtro'
import { useImmer } from 'use-immer'
import { useQuery } from 'react-query'
import CustomLoaders from '../../components/Loader'
import { prontuariosFil } from './utils/constants'

const Prontuarios: React.FC = () => {
  const isMobile = useDimension(800)
  const { getIdPerfil, getIdPaciente } = useAuth()
  const [modalVisualizar, setModalVisualizar] = useState(false)
  const [prontuarioSelecionado, setProntuarioSelecionado] = useState<ProntuarioPacienteRes | null>(null)
  const [data, setData] = useImmer(prontuariosFil)
  const [prontuariosFiltrados, setProntuariosFiltrados] = useState<ProntuarioPacienteRes[]>([])
  const [filtroAplicado, setFiltroAplicado] = useState(false)
  const [loadingFiltro, setLoadingFiltro] = useState(false)

  const { data: pacientes = [] } = useQuery({
    queryKey: ['pacientes'],
    queryFn: async () => {
      const response = await getBuscarPacientes()
      return response.data
    },
  })

  const { data: prontuarios = [], isLoading: loading, error } = useQuery({
    queryKey: ['prontuarios', getIdPerfil(), getIdPaciente()],
    queryFn: async () => {
      const idPerfil = getIdPerfil()
      
      if (idPerfil === 4) {
        const idPaciente = getIdPaciente()
        if (idPaciente) {
          const response = await buscarProntuarioPaciente(idPaciente)
          return [response.data] // Retorna array para manter consistência
        }
        return []
      } else {
        return []
      }
    },
    enabled: !!getIdPerfil(),
    onError: () => {
      toast.error('Erro ao carregar prontuários')
    }
  })

  // Determina quais prontuários exibir
  const prontuariosParaExibir = filtroAplicado ? prontuariosFiltrados : prontuarios

  const handleVisualizarProntuario = (prontuario: ProntuarioPacienteRes) => {
    setProntuarioSelecionado(prontuario)
    setModalVisualizar(true)
  }

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validação: se não for paciente, deve selecionar um paciente
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

      const response = await buscarProntuarioPaciente(idPaciente)
      setProntuariosFiltrados([response.data])
      setFiltroAplicado(true)
    } catch (error) {
      toast.error('Erro ao carregar prontuário')
    } finally {
      setLoadingFiltro(false)
    }
  }

  const limpar = () => {
    setData(prontuariosFil)
    setProntuariosFiltrados([])
    setFiltroAplicado(false)
  }

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
        <Box sx={{ mb: 3 }}>
          <Filtro
            onSubmit={enviar}
            onClear={limpar}
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
            msm="Carregando prontuários..."
          />
        ) : error ? (
          <CustomLoaders 
            open={true} 
            animation="errorPage" 
            msm="Erro ao carregar prontuários"
          />
        ) : prontuariosParaExibir.length === 0 ? (
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
              Nenhum prontuário encontrado
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
              Exibindo {prontuariosParaExibir.length} {prontuariosParaExibir.length === 1 ? 'prontuário' : 'prontuários'}
            </Typography>
            
            {prontuariosParaExibir.map((prontuario) => (
              <ProntuarioCard
                key={prontuario.paciente.id_paciente}
                prontuario={prontuario}
                onVisualizar={handleVisualizarProntuario}
              />
            ))}
          </Box>
        )}

        <VisualizarProntuario
          modal={modalVisualizar}
          setModal={setModalVisualizar}
          prontuario={prontuarioSelecionado}
        />
      </div>
    </Box>
  )
}

export default Prontuarios
