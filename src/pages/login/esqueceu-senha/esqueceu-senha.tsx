import React, { useState, memo } from 'react'
import { Grid } from '@mui/material'
import { MdLock, MdPerson } from 'react-icons/md'
import Dialog from '../../../components/dialog'
import Button from '../../../components/button'
import Input from '../../../components/Inputs/Input'
import { mascaradorCPFCNPJ } from '../../../functions/mascaras'
import { EsqueceuSenhaModalProps } from '../interfaces'
import CustomLoaders from '../../../components/Loader'


const EsqueceuSenhaModal = ({ isOpen, onClose }: EsqueceuSenhaModalProps) => {
  const [cpf, setCpf] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const cancelar = () => {
    setCpf('')
    setNovaSenha('')
    setConfirmarSenha('')
    setSuccess(false)
    onClose()
  }

  const confirmar = async () => {
    if (!cpf || !novaSenha || !confirmarSenha) {
      return
    }
    setIsLoading(true)
    
    try {
      // Simula uma requisição para redefinir senha
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess(true)
      setTimeout(() => {
        cancelar()
      }, 2000)
    } catch (err) {
      // Erro ao redefinir senha
    } finally {
      setIsLoading(false)
    }
  }


  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = mascaradorCPFCNPJ({ v: e.target.value, ignoreCNPJ: true })
    if (formatted.length <= 14) {
      setCpf(formatted)
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
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdLock className="text-green-600 text-2xl" />
          </div>
          <p className="text-gray-600">
            Sua senha foi redefinida com sucesso. Você pode fazer login com a nova senha.
          </p>
        </div>
      </Dialog>
    )
  }

  return (
    <Dialog
      maxWidth="sm"
      title="Redefinir Senha"
      open={isOpen}
      onClose={cancelar}
      actions={
        <>
          <Button color="error" onClick={cancelar} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            color="primary" 
            onClick={confirmar}
            disabled={isLoading || !cpf || !novaSenha || !confirmarSenha}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <CustomLoaders 
                  open={true} 
                  animation="LoadingDots" 
                  msm=""
                  noPadding={true}
                />
                <span>Redefinindo...</span>
              </div>
            ) : (
              'Redefinir Senha'
            )}
          </Button>
        </>
      }
    >
      <div className="text-sm">
        <p>Digite seu CPF e defina uma nova senha</p>
        <Grid container spacing={2} className="pt-4">
          <Grid item xs={12} mb={1}>
            <Input
              label="CPF"
              value={cpf}
              onChange={handleCpfChange}
              placeholder="000.000.000-00"
              className="w-full"
              required
              InputProps={{
                startAdornment: (
                  <div className="mr-2 text-gray-400">
                    <MdPerson size={20} />
                  </div>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} mb={1}>
            <Input
              label="Nova Senha"
              type="password"
              className="w-full"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Digite sua nova senha"
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
        
        <div className="bg-medical-primary-50 p-3 rounded-lg mt-4">
          <p className="text-sm text-medical-primary font-medium mb-1">
            Requisitos da senha:
          </p>
          <ul className="text-xs text-medical-primary space-y-1">
            <li>• Pelo menos 6 caracteres</li>
            <li>• Uma letra minúscula</li>
            <li>• Uma letra maiúscula</li>
            <li>• Um número</li>
          </ul>
        </div>
      </div>
    </Dialog>
  )
}

export default memo(EsqueceuSenhaModal)
