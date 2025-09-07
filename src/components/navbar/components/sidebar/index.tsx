import {
  Box,
  Grid,
  Drawer,
  List,
} from '@mui/material'
import React from 'react'
import MenuSidebar from './menu-sidebar'
import PetsIcon from '@mui/icons-material/Pets'
import logoescrita from '../../../../assets/logoescrita.png'
import { Collections, Info, Person } from '@mui/icons-material'


export interface NavbarComponentProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarComponent = ({ open, setOpen }: NavbarComponentProps) => {

  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const handleClick = (aplicacao: number) => {
    setOpenIndex(openIndex === aplicacao ? null : aplicacao)
  }


  const menuItems = [
    { seqAplicacao: 1, label: 'Clientes cadastrados', icon: <PetsIcon className="!text-white" /> },
    { seqAplicacao: 2, label: 'Fotos', icon: <Collections className="!text-white" /> }, 
    { seqAplicacao: 3, label: 'Cadastro de usuários', icon: <Person className="!text-white" /> }, 
    { seqAplicacao: 4, label: 'Sobre', icon: <Info className="!text-white" /> },

  ]

  return (
    <Drawer
      open={open}
      transitionDuration={{ enter: 400, exit: 400 }}
      onClose={() => setOpen(false)}
      variant="temporary"
      sx={{
        width: 200,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 300,
          borderRadius: '0px 30px 30px 0px',
          boxSizing: 'border-box',
          background: 'repeating-linear-gradient(#4e2096, #4e2096, #4b1e8c )',
          position: 'relative',
        },
      }}
    >
      <Grid className="flex items-center justify-center mt-4">
        <img src={logoescrita} width={250} />
      </Grid>
      <Box
        sx={{
          width: 300,
          overflow: 'auto',
          position: 'relative',
          
        }}
      >
        <List component="nav" aria-labelledby="nested-list-subheader">
          {menuItems.map((v) => (
            <MenuSidebar
              key={v.seqAplicacao}              
              setOpen={setOpen}                
              open={openIndex === v.seqAplicacao}
              onClick={() => handleClick(v.seqAplicacao)}
              seqAplicacao={v.seqAplicacao}    
              label={v.label}                   
              icon={v.icon}                    
            />
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default React.memo(SidebarComponent)
