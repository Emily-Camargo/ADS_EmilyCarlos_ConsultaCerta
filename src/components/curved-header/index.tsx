import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface CurvedHeaderProps {
  userName: string;
  userRole: string;
  nextAppointment: string;
  profileImage?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

const CurvedHeader: React.FC<CurvedHeaderProps> = ({
  userName,
  userRole,
  nextAppointment,
  profileImage,
  primaryColor = '#4FC3F7',
  secondaryColor = '#29B6F6'
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        borderRadius: '0 0 40px 40px',
        padding: { xs: '20px 0 30px', md: '24px 0 36px' },
        marginBottom: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        minHeight: { xs: '140px', md: '160px' },
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '0 0 40px 40px',
          backdropFilter: 'blur(5px)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-1px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40%',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '1px',
        }
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -15,
          right: -15,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.04)',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: -10,
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.03)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          px: { xs: 3, md: 4 }
        }}
      >
        {/* Profile Image */}
        <Avatar
          src={profileImage}
          alt={userName}
          sx={{
            width: { xs: 50, md: 60 },
            height: { xs: 50, md: 60 },
            mb: { xs: 1.5, md: 2 },
            border: '2px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            fontSize: { xs: '1.2rem', md: '1.4rem' },
            fontWeight: '600',
            background: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </Avatar>

        {/* Greeting */}
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            fontWeight: '600',
            fontSize: { xs: '1.3rem', md: '1.6rem' },
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.15)',
            mb: { xs: 1, md: 1.5 },
          }}
        >
          Olá, {userRole} {userName}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.92)',
            fontSize: { xs: '0.85rem', md: '0.95rem' },
            fontWeight: '400',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.12)',
            padding: { xs: '8px 16px', md: '10px 20px' },
            borderRadius: '20px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            maxWidth: '95%',
            lineHeight: 1.4,
          }}
        >
          {nextAppointment}
        </Typography>
      </Box>
    </Box>
  );
};

export default CurvedHeader;
