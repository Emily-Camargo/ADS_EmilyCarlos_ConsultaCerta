import {
  Box,
  Drawer,
  List,
} from '@mui/material'
import React from 'react'
import MenuSidebar from './menu-sidebar'
import logoConsulta from '/assets/logoConsulta.png'
import { useDimension } from '../../../../hooks'
import { 
  EventNote,
  Schedule,
  People,
  Description,
  Medication,
  Assignment,
  Notifications,
  Dashboard,
  Psychology,
  LocalHospital,
  Settings,
  AdminPanelSettings
} from '@mui/icons-material'

export interface NavbarComponentProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarComponent = ({ open, setOpen }: NavbarComponentProps) => {
  const isMobile = useDimension(800)
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const handleClick = (aplicacao: number) => {
    setOpenIndex(openIndex === aplicacao ? null : aplicacao)
  }

  const menuItems = [
    { 
      seqAplicacao: 1, 
      label: 'Dashboards e Relatórios', 
      icon: <Dashboard className="!text-white" />,
      route: '/home'
    },
    { 
      seqAplicacao: 2, 
      label: 'Consultas', 
      icon: <EventNote className="!text-white" />,
      route: '/consultas'
    }, 
    { 
      seqAplicacao: 3, 
      label: 'Agenda Médica', 
      icon: <Schedule className="!text-white" />,
      route: '/agenda'
    }, 
    { 
      seqAplicacao: 4, 
      label: 'Pacientes', 
      icon: <People className="!text-white" />,
      route: '/pacientes'
    },
    { 
      seqAplicacao: 5, 
      label: 'Prontuários', 
      icon: <Description className="!text-white" />,
      route: '/prontuarios'
    },
    { 
      seqAplicacao: 6, 
      label: 'Prescrições', 
      icon: <Medication className="!text-white" />,
      route: '/prescricoes'
    },
    { 
      seqAplicacao: 7, 
      label: 'Exames', 
      icon: <Assignment className="!text-white" />,
      route: '/exames'
    },
    { 
      seqAplicacao: 8, 
      label: 'Notificações', 
      icon: <Notifications className="!text-white" />,
      route: '/notificacoes'
    },
    { 
      seqAplicacao: 12, 
      label: 'Administração', 
      icon: <AdminPanelSettings className="!text-white" />,
      route: '/admin'
    },
  ]

  return (
    <Drawer
      open={open}
      transitionDuration={{ enter: 400, exit: 400 }}
      onClose={() => setOpen(false)}
      variant="temporary"
      sx={{
        width: isMobile ? 150 : 200,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isMobile ? 280 : 320,
          borderRadius: '0px 20px 20px 0px',
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #1D4ED8 100%)',
          position: 'relative',
          boxShadow: '4px 0 20px rgba(37, 99, 235, 0.3)',
        },
      }}
    >
      {/* Header do Sidebar com Logo */}
      <div className={`flex flex-col items-center justify-center ${isMobile ? 'pt-4 pb-3' : 'pt-6 pb-4'} border-b border-white/20`}>
        <div className={isMobile ? 'mb-2' : 'mb-3'}>
          <img 
            src={logoConsulta} 
            width={isMobile ? 180 : 220} 
            height={isMobile ? 50 : 60}
            alt="ConsultaCerta"
            className="object-contain"
          />
        </div>
        <div className={`flex items-center space-x-2 text-white/80 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
          <LocalHospital fontSize={isMobile ? "small" : "small"} />
          <span>{isMobile ? 'Sistema Médico' : 'Sistema Médico Integrado'}</span>
        </div>
      </div>

      <Box
        sx={{
          width: isMobile ? 280 : 320,
          overflow: 'auto',
          position: 'relative',
          paddingTop: isMobile ? 1.5 : 2,
          paddingBottom: isMobile ? 1.5 : 2,
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

      {/* Footer do Sidebar */}
      <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'p-3' : 'p-4'} border-t border-white/20 bg-black/10`}>
        <div className={`text-center text-white/70 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
          <div className={`flex items-center justify-center space-x-1 ${isMobile ? 'mb-0.5' : 'mb-1'}`}>
            <LocalHospital fontSize={isMobile ? "small" : "small"} />
            <span>{isMobile ? 'v2.0' : 'ConsultaCerta v2.0'}</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-green-400 rounded-full animate-pulse`}></div>
            <span>{isMobile ? 'Online' : 'Sistema Operacional'}</span>
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default SidebarComponent