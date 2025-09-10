import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { MdVisibilityOff, MdVisibility, MdLocalHospital } from 'react-icons/md'
import { InputAdornment } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'

const Acessar: React.FC = () => {
  const navigate = useNavigate()
  const [showPswd, setShowPswd] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      
      if (!username || !password) {
        return
      }

      setIsLoading(true)
      
      // Simula um delay de carregamento
      setTimeout(() => {
        // Simula um token de acesso
        localStorage.setItem('access_token', 'mock_access_token')
        navigate('/home')
        setIsLoading(false)
      }, 1000)
    },
    [username, password, navigate],
  )

  return (
    <div className="min-h-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-medical-gray-800 via-medical-gray-700 to-medical-primary-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-medical-primary/20 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-medical-secondary/30 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-medical-accent/25 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-medical-primary-400/40 rounded-full opacity-60 animate-bounce"></div>
        
        <div className="absolute top-1/4 left-1/3 text-medical-primary-400/20 transform rotate-12">
          <MdLocalHospital size={40} />
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-medical-secondary-400/25 transform -rotate-12">
          <MdLocalHospital size={35} />
        </div>
        
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-16 opacity-20"></div>
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-gray-100 space-y-8 z-10 relative p-10">
        
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-medical-primary to-medical-primary-600 rounded-full flex items-center justify-center shadow-lg">
            <MdLocalHospital size={36} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-medical-primary to-medical-primary-700 bg-clip-text text-transparent">
            ConsultaCerta
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Sistema de agendamento médico seguro<br />
            e confiável para pacientes e profissionais.
          </p>
        </div>

        {/* Formulário */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
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
              onClick={() => {}}
            >
              Esqueceu sua senha?
            </button>
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-medical-primary hover:text-medical-primary-700 font-medium transition-colors duration-200 hover:underline"
              onClick={() => {}}
            >
              Não possui uma conta? Clique aqui e cadastre-se!
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full bg-gradient-to-r from-medical-primary to-medical-primary-600 hover:from-medical-primary-700 hover:to-medical-primary-800 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>{isLoading ? 'Entrando...' : 'Acessar Sistema'}</span>
            </button>
          </div>
        </form>
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            © 2024 ConsultaCerta - Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  )
}

export default memo(Acessar)