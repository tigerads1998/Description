import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import UserProfile from './UserProfile';
import logo from '../assets/image.png';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <RouterLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={logo} alt="Logo" style={{ height: 40, marginRight: 12 }} />
            <Typography variant="h6" sx={{ textDecoration: 'none', color: '#111', fontWeight: 700 }}>
              JobEngineHQ
            </Typography>
          </RouterLink>
        </Box>
        <Box>
          {!isMobile && (
            <>
              <Button color="inherit" component={RouterLink} to="/jobs">
                Jobs
              </Button>
              <Button color="inherit" component={RouterLink} to="/api-test">
                API Test
              </Button>
              <Button color="inherit" component={RouterLink} to="/faq">
                FAQ
              </Button>
              <Button color="inherit" component={RouterLink} to="/about">
                About Us
              </Button>
            </>
          )}
          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <>
              <Button 
                color="primary" 
                variant="text" 
                component={RouterLink} 
                to="/login" 
                sx={{ 
                  ml: isMobile ? 0 : 2, 
                  borderRadius: 99, 
                  fontWeight: 600 
                }}
              >
                Login
              </Button>
              <Button 
                color="primary" 
                variant="outlined" 
                component={RouterLink} 
                to="/register" 
                sx={{ 
                  ml: 2, 
                  borderRadius: 99, 
                  fontWeight: 600 
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 