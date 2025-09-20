import React, { useState } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from '../../../components/ui/drawer'
import { Button } from '@mantine/core'
import Input from '../../../components/Inputs/Input'
import { MdClose, MdPerson, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { InputAdornment, Switch, FormControlLabel } from '@mui/material'
import { CadastroDrawerProps, FormData } from '../interfaces'

const CadastroDrawer = ({ isOpen, onClose }: CadastroDrawerProps) => {
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

  const handleClose = () => {
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      console.log('Dados do cadastro:', formData)
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
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
              value={formData.numero_whatsapp}
              onChange={(e) => handleInputChange('numero_whatsapp', e.target.value)}
              className="w-full"
              placeholder="(00) 00000-0000"
              mask="(00) 00000-0000"
            />
          </div>

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

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              color="gray"
              onClick={handleClose}
              className="flex-1"
              size="md"
              radius="md"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.nome || !formData.cpf || !formData.email || !formData.telefone || !formData.senha_hash}
              className="flex-1"
              size="md"
              radius="md"
              loading={isLoading}
              color="teal"
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

export default CadastroDrawer
