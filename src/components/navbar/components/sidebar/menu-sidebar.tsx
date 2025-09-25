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
      navigate('/home');
    } else if (seqAplicacao === 2) {
      navigate('/consultas');
    } else if (seqAplicacao === 3) {
      navigate('/agenda');
    } else if (seqAplicacao === 4) {
      navigate('/pacientes');
    } else if (seqAplicacao === 5) {
      navigate('/prontuarios');
    } else if (seqAplicacao === 6) {
      navigate('/prescricoes');
    } else if (seqAplicacao === 7) {
      navigate('/exames');
    } else if (seqAplicacao === 12) {
      navigate('/admin');
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
