import { Box, Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(() => ({
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  border: '1px solid #e5e7eb',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
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
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  }));