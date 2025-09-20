import React, { useState } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from '../../../../components/ui/drawer'
import Input from '../../../../components/Inputs/Input'
import { MdClose, MdPerson, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { InputAdornment, Switch, FormControlLabel } from '@mui/material'
import { cn } from '../../../../lib/utils'

interface CadastroDrawerProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  id_perfil: number
  nome: string
  cpf: string
  email: string
  telefone: string
  numero_whatsapp: string
  whatsapp_autorizado: boolean
  senha_hash: string
  ativo: boolean
}

const CadastroDrawer: React.FC<CadastroDrawerProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    id_perfil: 1,
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    numero_whatsapp: '',
    whatsapp_autorizado: false,
    senha_hash: '',
    ativo: true
  })

  const perfilPaciente = { id: 1, nome: 'Paciente' }

  const handleInputChange = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Aqui você implementaria a lógica de cadastro
      console.log('Dados do cadastro:', formData)
      
      // Simula um delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset do formulário e fechamento do drawer
      setFormData({
        id_perfil: 1,
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        numero_whatsapp: '',
        whatsapp_autorizado: false,
        senha_hash: '',
        ativo: true
      })
      onClose()
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
    } finally {
      setIsLoading(false)
    }
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
                <DrawerTitle className="text-xl font-bold text-gray-900">
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
          {/* Perfil */}
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

          {/* Nome */}
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

          {/* CPF */}
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

          {/* Email */}
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

          {/* Telefone */}
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
              mask="(00) 0000-0000"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <Input
              size="small"
              type="text"
              label="Número do WhatsApp"
              value={formData.numero_whatsapp}
              onChange={(e) => handleInputChange('numero_whatsapp', e.target.value)}
              className="w-full"
              placeholder="(00) 00000-0000"
              mask="(00) 00000-0000"
            />
          </div>

          {/* Autorização WhatsApp */}
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.whatsapp_autorizado}
                  onChange={(e) => handleInputChange('whatsapp_autorizado', e.target.checked)}
                  color="primary"
                />
              }
              label="Autorizar contato via WhatsApp"
              className="text-sm"
            />
          </div>

          {/* Senha */}
          <div>
            <Input
              required
              size="small"
              type={showPassword ? 'text' : 'password'}
              label="Senha *"
              value={formData.senha_hash}
              onChange={(e) => handleInputChange('senha_hash', e.target.value)}
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
          </div>

          {/* Botões */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.nome || !formData.cpf || !formData.email || !formData.telefone || !formData.senha_hash}
              className={cn(
                "flex-1 px-4 py-2 bg-gradient-to-r from-medical-primary to-medical-primary-600 hover:from-medical-primary-700 hover:to-medical-primary-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              )}
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>{isLoading ? 'Cadastrando...' : 'Cadastrar'}</span>
            </button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

export default CadastroDrawer
