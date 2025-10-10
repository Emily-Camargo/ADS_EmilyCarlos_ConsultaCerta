import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { MdVisibilityOff, MdVisibility, MdLocalHospital } from 'react-icons/md'
import { InputAdornment } from '@mui/material'
import { memo, useCallback, useState } from 'react'
import { useDimension } from '../../hooks'
import { useAuth } from '../../contexts/AuthContext'
import CadastroDrawer from './cadastro/cadastro-usuario'
import EsqueceuSenhaModal from './esqueceu-senha/esqueceu-senha'
import { postLogin, getInfoUsuario } from '../../services/usuario'
import { toast } from 'react-toastify'

const Acessar = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPswd, setShowPswd] = useState(false)
  const isMobile = useDimension(800)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCadastroOpen, setIsCadastroOpen] = useState(false)
  const [isEsqueceuSenhaOpen, setIsEsqueceuSenhaOpen] = useState(false)

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      
      if (!username || !password) {
        toast.error('Por favor, preencha todos os campos')
        return
      }

      setIsLoading(true)
      
      try {
        const response = await postLogin({
          email: username,
          senha: password
        })

        if (!response || !response.data) {
          toast.error('Erro ao processar resposta do servidor. Tente novamente.')
          return
        }

        const { access_token, user } = response.data

        // Valida se recebeu o token de acesso
        if (!access_token) {
          toast.error('Token de autenticação não recebido. Tente novamente.')
          return
        }

        if (!user) {
          toast.error('Dados do usuário não recebidos. Tente novamente.')
          return
        }

        if (!user.idUsuario || !user.email || !user.nome || !user.idPerfil) {
          toast.error('Dados do usuário incompletos. Tente novamente.')
          return
        }

        // Salva o token temporariamente para usar na próxima requisição
        localStorage.setItem('access_token', access_token);

        // Busca dados completos do usuário (incluindo dados do médico, paciente, etc)
        const userInfoResponse = await getInfoUsuario({ id: user.idUsuario });
        const fullUserData = userInfoResponse.data;

        console.log('Dados completos do usuário:', fullUserData);

        const userData = {
          idUsuario: fullUserData.idUsuario,
          nome: fullUserData.nome,
          email: fullUserData.email,
          idPerfil: fullUserData.idPerfil,
          perfil: fullUserData.perfil,
          medico: fullUserData.medico, // Inclui dados do médico se existirem
          paciente: fullUserData.paciente // Inclui dados do paciente se existirem
        }

        console.log('Dados do usuário a serem salvos:', userData);

        login(userData, access_token)
        
        toast.success(`Bem-vindo(a), ${fullUserData.nome}!`)
        
        navigate('/home')
      } catch (error: any) {

          const message = error.response?.data?.message || 
                       error.response?.data?.error || 
                       'Erro ao fazer login. Tente novamente.'
        
        toast.error(message)
      } finally {
        setIsLoading(false)
      }
    },
    [username, password, navigate, login],
  )

  return (
    <div className="min-h-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-medical-gray-800 via-medical-gray-700 to-medical-primary-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-medical-primary/20 rounded-full opacity-40 animate-bounce" style={{animationDelay: '0s', animationDuration: '2s'}}></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-medical-secondary/30 rounded-full opacity-50 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '2s'}}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-medical-accent/25 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s', animationDuration: '2s'}}></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-medical-primary-400/40 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '2s'}}></div>
        
        <div className="absolute top-1/4 left-1/3 text-medical-primary-400/20 transform rotate-12">
          <MdLocalHospital size={40} />
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-medical-secondary-400/25 transform -rotate-12">
          <MdLocalHospital size={35} />
        </div>
        
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-16 opacity-20"></div>
      </div>

      <div className={`${isMobile ? 'max-w-sm mx-4' : 'max-w-md'} w-full bg-white rounded-2xl shadow-2xl border border-gray-100 space-y-8 z-10 relative ${isMobile ? 'p-6' : 'p-10'}`}>
        
        <div className="text-center space-y-4">
          <div className={`mx-auto ${isMobile ? 'w-16 h-16' : 'w-20 h-20'} bg-gradient-to-r from-medical-primary to-medical-primary-600 rounded-full flex items-center justify-center shadow-lg`}>
            <MdLocalHospital size={isMobile ? 28 : 36} className="text-white" />
          </div>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold bg-gradient-to-r from-medical-primary to-medical-primary-700 bg-clip-text text-transparent`}>
            ConsultaCerta
          </h2>
          <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed`}>
            Sistema de agendamento médico seguro<br />
            e confiável para pacientes e profissionais.
          </p>
        </div>

        <form className={`${isMobile ? 'space-y-4' : 'space-y-6'}`} onSubmit={handleSubmit}>
          <div className={`${isMobile ? 'space-y-4' : 'space-y-5'}`}>
            <div className="relative">
              <Input
                required
                size="small"
                type="email"
                label="Email"
                autoComplete="username"
                value={username}
                className="w-full rounded-lg border-gray-200 focus:border-medical-primary focus:ring-medical-primary"
                placeholder="Digite seu email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Input
                required
                size="small"
                label="Senha"
                autoComplete="current-password"
                value={password}
                className="w-full rounded-lg border-gray-200 focus:border-medical-primary focus:ring-medical-primary"
                placeholder="Digite sua senha"
                type={showPswd ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="cursor-pointer"
                      position="end"
                      onClick={() => setShowPswd(!showPswd)}
                    >
                      {showPswd ? (
                        <MdVisibility size={20} className="text-medical-primary hover:text-medical-primary-700 transition-colors duration-200" />
                      ) : (
                        <MdVisibilityOff size={20} className="text-medical-primary hover:text-medical-primary-700 transition-colors duration-200" />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-medical-primary hover:text-medical-primary-700 font-medium transition-colors duration-200 hover:underline"
              onClick={() => setIsEsqueceuSenhaOpen(true)}
            >
              Esqueceu sua senha?
            </button>
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-medical-primary hover:text-medical-primary-700 font-medium transition-colors duration-200 hover:underline"
              onClick={() => setIsCadastroOpen(true)}
            >
              Não possui uma conta? Clique aqui e cadastre-se!
            </button>
          </div>

          <div className={`${isMobile ? 'pt-1' : 'pt-2'}`}>
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className={`w-full bg-gradient-to-r from-medical-primary to-medical-primary-600 hover:from-medical-primary-700 hover:to-medical-primary-800 text-white font-semibold ${isMobile ? 'py-2.5 px-3' : 'py-3 px-4'} rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2`}
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span className={isMobile ? 'text-sm' : ''}>{isLoading ? 'Entrando...' : 'Acessar Sistema'}</span>
            </button>
          </div>
        </form>
        <div className={`text-center ${isMobile ? 'pt-3' : 'pt-4'} border-t border-gray-100`}>
          <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-gray-500`}>
            © 2024 ConsultaCerta - Todos os direitos reservados
          </p>
        </div>
      </div>
      
      <CadastroDrawer 
        isOpen={isCadastroOpen} 
        onClose={() => setIsCadastroOpen(false)} 
      />
      
      <EsqueceuSenhaModal 
        isOpen={isEsqueceuSenhaOpen} 
        onClose={() => setIsEsqueceuSenhaOpen(false)} 
      />
    </div>
  )
}

export default memo(Acessar)