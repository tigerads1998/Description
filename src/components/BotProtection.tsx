import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Link } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

interface BotProtectionProps {
  onVerified: () => void;
}

const BotProtection: React.FC<BotProtectionProps> = ({ onVerified }) => {
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);

  const handleCaptchaClick = () => {
    if (captchaChecked || captchaLoading) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaChecked(true);
      setCaptchaLoading(false);
      onVerified();
    }, 1500);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 3,
          p: 4,
          maxWidth: 400,
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Verify You're Human
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please complete this verification to continue
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: '#f9f9fb',
            border: '1.5px solid #d3d7de',
            borderRadius: 2.5,
            px: 0,
            py: 2,
            boxShadow: '0 2px 8px 0 rgba(60,60,60,0.07)',
            minHeight: 80,
            width: 340,
            mx: 'auto',
            cursor: captchaChecked ? 'default' : 'pointer',
            userSelect: 'none',
            transition: 'border 0.2s',
            '&:hover': {
              border: captchaChecked ? '1.5px solid #d3d7de' : '1.5px solid #b3b7be',
            },
            position: 'relative',
          }}
          onClick={handleCaptchaClick}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1, justifyContent: 'center', height: 40 }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 32 }}>
              {captchaChecked ? (
                <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 32 }} />
              ) : captchaLoading ? (
                <CircularProgress size={28} thickness={5} sx={{ color: '#1976d2' }} />
              ) : (
                <ShieldOutlinedIcon sx={{ color: '#b3b7be', fontSize: 32 }} />
              )}
            </Box>
            <Typography fontSize={18} fontWeight={500} color="#222" sx={{ lineHeight: '32px', display: 'flex', alignItems: 'center' }}>
              I'm not a robot
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', alignSelf: 'center', fontSize: 13, letterSpacing: 0.1, width: 'auto' }}>
            reCAPTCHA • <Link href="/captcha-privacy" target="_blank" rel="noopener" color="primary.main" underline="hover" sx={{ fontSize: 13 }}>Privacy Policy</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BotProtection; 