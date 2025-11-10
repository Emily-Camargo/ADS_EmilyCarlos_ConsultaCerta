import { useState, memo, useEffect, useMemo } from 'react'
import { Grid } from '@mui/material'
import { MdLock, MdEmail, MdCheckCircle, MdArrowBack, MdArrowForward, MdCheck, MdClose as MdX } from 'react-icons/md'
import Dialog from '../../../components/dialog'
import Button from '../../../components/button'
import Input from '../../../components/Inputs/Input'
import { EsqueceuSenhaModalProps } from '../interfaces'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { postRecoverPassword, postValidateCode, postResetPassword } from '../../../services/usuario'
import { RecoverPasswordReq, ValidateCodeReq, ResetPasswordReq } from '../../../services/usuario/interface'

type Step = 1 | 2 | 3

const validatePassword = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  }
}

const EsqueceuSenhaModal = ({ isOpen, onClose }: EsqueceuSenhaModalProps) => {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [success, setSuccess] = useState(false)
  const [token, setToken] = useState('')
  
  const [tempoRestante, setTempoRestante] = useState(0)
  const [podeReenviar, setPodeReenviar] = useState(false)

  const passwordValidation = useMemo(() => validatePassword(novaSenha), [novaSenha])
  const isPasswordValid = useMemo(() => 
    passwordValidation.minLength && 
    passwordValidation.hasLetter && 
    passwordValidation.hasNumber && 
    passwordValidation.hasSymbol
  , [passwordValidation])

  const recoverPasswordMutation = useMutation({
    mutationKey: ['recoverPassword'],
    mutationFn: (data: RecoverPasswordReq) => postRecoverPassword(data),
    onSuccess: (response) => {
      toast.success(response.data.message || 'Código enviado para o seu email!')
      iniciarTimer()
      setCurrentStep(2)
    },
    onError: (error: any) => {
      console.error('Erro ao enviar código:', error)
      toast.error(
        error?.response?.data?.message || 
        'Erro ao enviar código. Verifique o email e tente novamente.'
      )
    }
  })

  const validateCodeMutation = useMutation({
    mutationKey: ['validateCode'],
    mutationFn: (data: ValidateCodeReq) => postValidateCode(data),
    onSuccess: (response) => {
      toast.success(response.data.message || 'Código validado com sucesso!')
      setToken(response.data.token)
      setCurrentStep(3)
    },
    onError: (error: any) => {
      console.error('Erro ao validar código:', error)
      toast.error(
        error?.response?.data?.message || 
        'Código inválido ou expirado. Tente novamente.'
      )
    }
  })

  const resetPasswordMutation = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: (data: ResetPasswordReq) => postResetPassword(data),
    onSuccess: (response) => {
      toast.success(response.data.message || 'Senha redefinida com sucesso!')
      setSuccess(true)
      setTimeout(() => {
        cancelar()
      }, 2000)
    },
    onError: (error: any) => {
      console.error('Erro ao redefinir senha:', error)
      toast.error(
        error?.response?.data?.message || 
        'Erro ao redefinir senha. Tente novamente.'
      )
    }
  })

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (tempoRestante > 0) {
      interval = setInterval(() => {
        setTempoRestante((prev) => {
          if (prev <= 1) {
            setPodeReenviar(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [tempoRestante])

  const iniciarTimer = () => {
    setTempoRestante(60)
    setPodeReenviar(false)
  }

  const cancelar = () => {
    setCurrentStep(1)
    setEmail('')
    setCodigo('')
    setNovaSenha('')
    setConfirmarSenha('')
    setSuccess(false)
    setToken('')
    setTempoRestante(0)
    setPodeReenviar(false)
    onClose()
  }

  const enviarCodigo = () => {
    if (!email) {
      toast.error('Por favor, informe o email')
      return
    }
    
    recoverPasswordMutation.mutate({ email })
  }

  const reenviarCodigo = () => {
    if (podeReenviar && email) {
      recoverPasswordMutation.mutate({ email })
    }
  }

  const validarCodigo = () => {
    if (!codigo || codigo.length !== 6) {
      toast.error('Por favor, informe o código de 6 dígitos')
      return
    }
    
    validateCodeMutation.mutate({ email, codigo })
  }

  const redefinirSenha = () => {
    if (!novaSenha || !confirmarSenha) {
      toast.error('Por favor, preencha todos os campos')
      return
    }
    
    if (novaSenha !== confirmarSenha) {
      toast.error('As senhas não coincidem')
      return
    }
    
    if (!isPasswordValid) {
      toast.error('A senha não atende aos requisitos mínimos')
      return
    }
    
    resetPasswordMutation.mutate({ token, novaSenha, confirmarSenha })
  }

  const voltarEtapa = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  if (success) {
    return (
      <Dialog
        maxWidth="sm"
        title="Senha Redefinida!"
        open={isOpen}
        onClose={cancelar}
        actions={
          <Button color="primary" onClick={cancelar}>
            Fechar
          </Button>
        }
      >
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCheckCircle className="text-green-600 text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Sucesso!</h3>
          <p className="text-gray-600">
            Sua senha foi redefinida com sucesso. Você pode fazer login com a nova senha.
          </p>
        </div>
      </Dialog>
    )
  }

  const getTitulo = () => {
    switch (currentStep) {
      case 1:
        return 'Recuperar Senha'
      case 2:
        return 'Validar Código'
      case 3:
        return 'Nova Senha'
      default:
        return 'Redefinir Senha'
    }
  }

  const getActions = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Button 
              color="error" 
              onClick={cancelar}
              disabled={recoverPasswordMutation.isLoading}
            >
              Cancelar
            </Button>
            <Button 
              color="primary" 
              onClick={enviarCodigo}
              endIcon={<MdArrowForward />}
              disabled={recoverPasswordMutation.isLoading}
            >
              {recoverPasswordMutation.isLoading ? 'Enviando...' : 'Enviar Código'}
            </Button>
          </>
        )
      case 2:
        return (
          <>
            <Button 
              color="secondary" 
              onClick={voltarEtapa}
              startIcon={<MdArrowBack />}
              disabled={validateCodeMutation.isLoading}
            >
              Voltar
            </Button>
            <Button 
              color="error" 
              onClick={cancelar}
              disabled={validateCodeMutation.isLoading}
            >
              Cancelar
            </Button>
            <Button 
              color="primary" 
              onClick={validarCodigo}
              endIcon={<MdArrowForward />}
              disabled={validateCodeMutation.isLoading}
            >
              {validateCodeMutation.isLoading ? 'Validando...' : 'Validar Código'}
            </Button>
          </>
        )
      case 3:
        return (
          <>
            <Button 
              color="secondary" 
              onClick={voltarEtapa}
              startIcon={<MdArrowBack />}
              disabled={resetPasswordMutation.isLoading}
            >
              Voltar
            </Button>
            <Button 
              color="error" 
              onClick={cancelar}
              disabled={resetPasswordMutation.isLoading}
            >
              Cancelar
            </Button>
            <Button 
              color="primary" 
              onClick={redefinirSenha}
              disabled={resetPasswordMutation.isLoading}
            >
              {resetPasswordMutation.isLoading ? 'Redefinindo...' : 'Redefinir Senha'}
            </Button>
          </>
        )
      default:
        return (
          <Button color="error" onClick={cancelar}>
            Cancelar
          </Button>
        )
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="py-2">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-medical-primary-100 rounded-full flex items-center justify-center">
                  <MdEmail className="text-medical-primary text-3xl" />
                </div>
              </div>
              <p className="text-center text-gray-600 text-sm">
                Digite seu email para receber o código de recuperação
              </p>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full"
                  required
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <div className="mr-2 text-gray-400">
                        <MdEmail size={20} />
                      </div>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </div>
        )
      case 2:
        return (
          <div className="py-2">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <MdCheckCircle className="text-blue-600 text-3xl" />
                </div>
              </div>
              <p className="text-center text-gray-600 text-sm mb-2">
                Um código foi enviado para <strong>{email}</strong>
              </p>
              <p className="text-center text-gray-500 text-xs">
                Verifique sua caixa de entrada e spam
              </p>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  label="Código de Verificação"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full text-center"
                  required
                  autoFocus
                  inputProps={{
                    style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }
                  }}
                />
              </Grid>
            </Grid>
            <div className="mt-4 text-center">
              <button
                className={`text-sm ${
                  podeReenviar 
                    ? 'text-medical-primary hover:underline cursor-pointer' 
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                onClick={reenviarCodigo}
                disabled={!podeReenviar}
              >
                {podeReenviar 
                  ? 'Reenviar código' 
                  : `Reenviar código em ${tempoRestante}s`
                }
              </button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="py-2">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <MdLock className="text-purple-600 text-3xl" />
                </div>
              </div>
              <p className="text-center text-gray-600 text-sm">
                Defina sua nova senha
              </p>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  label="Nova Senha"
                  type="password"
                  className="w-full"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Digite sua nova senha"
                  required
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <div className="mr-2 text-gray-400">
                        <MdLock size={20} />
                      </div>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  label="Confirmar Nova Senha"
                  type="password"
                  className="w-full"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Confirme sua nova senha"
                  required
                  InputProps={{
                    startAdornment: (
                      <div className="mr-2 text-gray-400">
                        <MdLock size={20} />
                      </div>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            
            {novaSenha && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md space-y-2">
                <p className="text-xs font-medium text-gray-700 mb-2">A senha deve conter:</p>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    {passwordValidation.minLength ? (
                      <MdCheck size={16} className="text-green-600" />
                    ) : (
                      <MdX size={16} className="text-red-500" />
                    )}
                    <span className={`text-xs ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-600'}`}>
                      Mínimo de 8 caracteres
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {passwordValidation.hasLetter ? (
                      <MdCheck size={16} className="text-green-600" />
                    ) : (
                      <MdX size={16} className="text-red-500" />
                    )}
                    <span className={`text-xs ${passwordValidation.hasLetter ? 'text-green-600' : 'text-gray-600'}`}>
                      Pelo menos uma letra
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {passwordValidation.hasNumber ? (
                      <MdCheck size={16} className="text-green-600" />
                    ) : (
                      <MdX size={16} className="text-red-500" />
                    )}
                    <span className={`text-xs ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-600'}`}>
                      Pelo menos um número
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {passwordValidation.hasSymbol ? (
                      <MdCheck size={16} className="text-green-600" />
                    ) : (
                      <MdX size={16} className="text-red-500" />
                    )}
                    <span className={`text-xs ${passwordValidation.hasSymbol ? 'text-green-600' : 'text-gray-600'}`}>
                      Pelo menos um símbolo (!@#$%^&*...)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog
      maxWidth="sm"
      title={getTitulo()}
      open={isOpen}
      onClose={cancelar}
      actions={getActions()}
    >
      <div className="min-h-[300px]">
        <div className="flex items-center justify-center mb-6 gap-2">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                  transition-all duration-300
                  ${currentStep === step 
                    ? 'bg-medical-primary text-white scale-110' 
                    : currentStep > step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {currentStep > step ? <MdCheckCircle size={20} /> : step}
              </div>
              {step < 3 && (
                <div 
                  className={`
                    w-12 h-1 mx-1 rounded transition-all duration-300
                    ${currentStep > step ? 'bg-green-500' : 'bg-gray-200'}
                  `}
                />
              )}
            </div>
          ))}
        </div>

        <div className="transition-all duration-300 ease-in-out">
          {renderStepContent()}
        </div>
      </div>
    </Dialog>
  )
}

export default memo(EsqueceuSenhaModal)
