import React from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import { AccountCircle, } from '@mui/icons-material'
import { Box, AppBar, Toolbar, IconButton } from '@mui/material'
import logoescrita from '../../../../assets/logoescrita.png'
import ContaComponent from '../navbar/usuario'
import { useNavigate } from 'react-router-dom'
export interface NavbarComponentProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NavbarComponent = ({ open, setOpen }: NavbarComponentProps) => {
  const [anchorConta, setAnchorConta] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate();

  const handleClickConta = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorConta(event.currentTarget)
  }

  return (
    <Box>
      <AppBar position="fixed" className="!pr-0 !z-999 " id="navbar">
        <Toolbar className="bg-gradient-to-r from-grzprimary to-grzsecondary !min-h-14 !h-14">
          <IconButton
            size="large"
            edge="start"
            sx={{ mr: 2 }}
            color="inherit"
            id="navbar-hamburguer"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
          >
            <HiOutlineMenu size={25} />
          </IconButton>
          <button
            id="navbar-logo"
            className="w-44 h-16 "
            onClick={() => navigate('/home')}
          >
            <img src={logoescrita} width={250} height={100}/>
          </button>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            color="inherit"
            id="navbar-notifications"
          >
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            id="navbar-menu-user"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClickConta}
          >
            <AccountCircle />
          </IconButton>
          <ContaComponent
        anchorEl={anchorConta}
        setAnchorEl={setAnchorConta}
      />
        </Toolbar>
      </AppBar>
      <div className="!min-h-14 !h-14" />
    </Box>
  )
}

export default React.memo(NavbarComponent)
