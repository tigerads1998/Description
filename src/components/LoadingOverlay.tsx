import React, { memo } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useLoading } from '../contexts/LoadingContext';

const LoadingOverlay: React.FC = memo(() => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: '#111',
          animation: 'pulse 1.5s ease-in-out infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
            },
            '50%': {
              transform: 'scale(1.1)',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
        }}
      />
      <Box
        sx={{
          mt: 3,
          width: 120,
          height: 2,
          backgroundColor: '#eee',
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '30%',
            height: '100%',
            backgroundColor: '#111',
            animation: 'loading 1s ease-in-out infinite',
            borderRadius: 1,
          },
          '@keyframes loading': {
            '0%': {
              left: '-30%',
            },
            '100%': {
              left: '100%',
            },
          },
        }}
      />
    </Box>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay';

export default LoadingOverlay; 