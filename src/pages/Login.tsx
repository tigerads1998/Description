import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Container,
  Box,
  Button,
  Typography,
  Paper,
  Divider
} from '@mui/material';
import { Google as GoogleIcon, GitHub as GitHubIcon, LinkedIn as LinkedInIcon } from '@mui/icons-material';

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4">You are already logged in!</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Sign in to access your account
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={() => loginWithRedirect({
                authorizationParams: {
                  connection: 'google-oauth2'
                }
              })}
            >
              Continue with Google
            </Button>

            <Button
              variant="contained"
              fullWidth
              startIcon={<GitHubIcon />}
              onClick={() => loginWithRedirect({
                authorizationParams: {
                  connection: 'github'
                }
              })}
            >
              Continue with GitHub
            </Button>

            <Button
              variant="contained"
              fullWidth
              startIcon={<LinkedInIcon />}
              onClick={() => loginWithRedirect({
                authorizationParams: {
                  connection: 'linkedin'
                }
              })}
            >
              Continue with LinkedIn
            </Button>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => loginWithRedirect()}
            >
              Sign in with Email
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 