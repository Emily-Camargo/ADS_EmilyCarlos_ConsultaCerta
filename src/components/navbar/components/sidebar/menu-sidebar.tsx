import {
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material'

import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

export interface MenuSidebarProps {
  open: boolean
  onClick: () => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  seqAplicacao: number
  label: string
  icon: React.ReactNode
}

const MenuSidebar = ({
  onClick,
  seqAplicacao,
  label,
  icon,               
  setOpen,     
}: MenuSidebarProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (seqAplicacao === 1) {
      navigate('/clientes');
    } else if (seqAplicacao === 2) {
      navigate('/fotos');
    } else if (seqAplicacao === 3) {
      navigate('/usuarios');
    } else if (seqAplicacao === 4) {
      navigate('/sobre');
    }
    
    onClick();
    setOpen(false);
  };

  return (
      <ListItemButton onClick={handleNavigation}>
        <ListItemIcon className="!text-white mb-1">
          {icon}           
        </ListItemIcon>
        <ListItemText className="!-ml-4">
          <p className="text-[15px] text-white">{label}</p>
        </ListItemText>
      </ListItemButton>
  );
  
}

export default memo(MenuSidebar)
