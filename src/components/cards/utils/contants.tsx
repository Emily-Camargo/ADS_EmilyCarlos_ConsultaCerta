import { Box, Card, styled } from "@mui/material";

// StyledCard para CardStats (fundo branco)
export const StyledCard = styled(Card)(() => ({
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  border: '1px solid #e5e7eb',
  backgroundColor: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
}));

// StyledCard para QuickActionCard (com gradientes)
export const StyledCardGradient = styled(Card)(() => ({
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'linear-gradient(30deg, transparent 20%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0.3) 55%, transparent 80%)',
    transform: 'translateX(-100%) translateY(-100%) rotate(30deg)',
    transition: 'transform 0.6s ease',
    zIndex: 1,
  },
  '&:hover': {
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transform: 'translateY(-2px)',
    '&::before': {
      transform: 'translateX(100%) translateY(100%) rotate(30deg)',
    },
  },
}));

export const IconContainer = styled(Box)<{ color: 'primary' | 'secondary' | 'accent' }>(({ color }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:
    color === 'primary'
      ? '#dbeafe'
      : color === 'secondary'
      ? '#fef3c7'
      : color === 'accent'
      ? '#e0e7ff'
      : '#dbeafe',
}));

export const getColorValue = (color: string) => {
  switch (color) {
    case 'primary':
      return '#3b82f6';
    case 'secondary':
      return '#f59e0b';
    case 'accent':
      return '#8b5cf6';
    default:
      return '#3b82f6';
  }
};

export const IconContainerCard = styled(Box)(() => ({
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transform: 'scale(1.05)',
      boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)',
    },
  }));