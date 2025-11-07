import React, { useState, useMemo } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from '../../../components/ui/drawer'
import { Button } from '@mantine/core'
import Input from '../../../components/Inputs/Input'
import { MdClose, MdPerson, MdVisibility, MdVisibilityOff, MdCheck, MdClose as MdX } from 'react-icons/md'
import { InputAdornment, Switch, FormControlLabel } from '@mui/material'
import { useMutation } from 'react-query'
import { CadastroDrawerProps, FormData } from '../interfaces'
import { postCriaUsuario } from '../../../services/usuario'
import { CriaUsuarioReq } from '../../../services/usuario/interface'
import { toast } from 'react-toastify'

const validatePassword = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  }
}

const CadastroDrawer = ({ isOpen, onClose }: CadastroDrawerProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [formData, setFormData] = useState<FormData>({
    idPerfil: 4,
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    numeroWhatsapp: '',
    whatsappAutorizado: false,
    senha: ''
  })

  const passwordValidation = useMemo(() => validatePassword(formData.senha), [formData.senha])
  const isPasswordValid = useMemo(() => 
    passwordValidation.minLength && 
    passwordValidation.hasLetter && 
    passwordValidation.hasNumber && 
    passwordValidation.hasSymbol
  , [passwordValidation])

  const createUserMutation = useMutation({
    mutationKey: ['createUser'],
    mutationFn: (data: CriaUsuarioReq) => postCriaUsuario(data),
    onSuccess: () => {
      toast.success('Usuário cadastrado com sucesso! Faça seu login para continuar.')
      resetForm()
      onClose()
    },
    onError: (error: any) => {
      console.error('Erro ao criar usuário:', error)
      toast.error(
        error?.response?.data?.message || 
        'Erro ao cadastrar usuário. Tente novamente.'
      )
    }
  })

  const perfilPaciente = { id: 1, nome: 'Paciente' }

  const resetForm = () => {
    setFormData({
      idPerfil: 3,
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      numeroWhatsapp: '',
      whatsappAutorizado: false,
      senha: ''
    })
    setErrorMessage('')
  }

  const handleInputChange = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const userData: CriaUsuarioReq = {
      idPerfil: formData.idPerfil,
      nome: formData.nome,
      cpf: formData.cpf,
      email: formData.email,
      telefone: formData.telefone,
      numeroWhatsapp: formData.numeroWhatsapp,
      whatsappAutorizado: formData.whatsappAutorizado,
      senha: formData.senha
    }
    
    createUserMutation.mutate(userData)
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-full w-full max-w-md ml-auto bg-white">
        <DrawerHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-medical-primary to-medical-primary-600 rounded-full flex items-center justify-center">
                <MdPerson size={20} className="text-white" />
              </div>
              <div>
                <DrawerTitle className="text-base font-bold text-gray-800">
                  Cadastro de Usuário
                </DrawerTitle>
                <DrawerDescription className="text-sm text-gray-600">
                  Preencha os dados para criar sua conta
                </DrawerDescription>
              </div>
            </div>
            <DrawerClose className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MdClose size={20} className="text-gray-500" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {errorMessage}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Perfil
            </label>
            <Input
              size="small"
              type="text"
              value={perfilPaciente.nome}
              className="w-full"
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdPerson size={20} className="text-medical-primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div>
            <Input
              required
              size="small"
              type="text"
              label="Nome Completo *"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              className="w-full"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div>
            <Input
              required
              size="small"
              type="text"
              label="CPF *"
              value={formData.cpf}
              onChange={(e) => handleInputChange('cpf', e.target.value)}
              className="w-full"
              placeholder="000.000.000-00"
              mask="000.000.000-00"
            />
          </div>

          <div>
            <Input
              required
              size="small"
              type="email"
              label="Email *"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <Input
              required
              size="small"
              type="text"
              label="Telefone *"
              value={formData.telefone}
              onChange={(e) => handleInputChange('telefone', e.target.value)}
              className="w-full"
              placeholder="(00) 0000-0000"
              mask="(00) 00000-0000"
            />
          </div>

          <div>
            <Input
              size="small"
              type="text"
              label="Número do WhatsApp"
              value={formData.numeroWhatsapp}
              onChange={(e) => handleInputChange('numeroWhatsapp', e.target.value)}
              className="w-full"
              placeholder="(00) 00000-0000"
              mask="(00) 00000-0000"
            />
          </div>

          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.whatsappAutorizado}
                  onChange={(e) => handleInputChange('whatsappAutorizado', e.target.checked)}
                  color="primary"
                />
              }
              label="Autorizar contato via WhatsApp"
              className="text-sm text-gray-700"
            />
          </div>

          <div>
            <Input
              required
              size="small"
              type={showPassword ? 'text' : 'password'}
              label="Senha *"
              value={formData.senha}
              onChange={(e) => handleInputChange('senha', e.target.value)}
              className="w-full"
              placeholder="Digite sua senha"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    className="cursor-pointer"
                    position="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <MdVisibility size={20} className="text-medical-primary hover:text-medical-primary-700 transition-colors duration-200" />
                    ) : (
                      <MdVisibilityOff size={20} className="text-medical-primary hover:text-medical-primary-700 transition-colors duration-200" />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            
            {/* Feedback de validação da senha */}
            {formData.senha && (
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

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              color="gray"
              onClick={handleClose}
              className="flex-1"
              size="sm"
              radius="md"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createUserMutation.isLoading || !formData.nome || !formData.cpf || !formData.email || !formData.telefone || !formData.senha || !isPasswordValid}
              className="flex-1"
              size="sm"
              radius="md"
              loading={createUserMutation.isLoading}
              color="teal"
            >
              {createUserMutation.isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

export default CadastroDrawer
