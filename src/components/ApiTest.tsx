import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Paper, Typography, CircularProgress } from '@mui/material';

const ApiTest = () => {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const [publicData, setPublicData] = useState<string>('');
  const [privateData, setPrivateData] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const callPublicApi = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/public');
      const data = await response.json();
      setPublicData(JSON.stringify(data, null, 2));
    } catch (error) {
      setPublicData(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const callPrivateApi = async () => {
    try {
      setLoading(true);
      if (!isAuthenticated) {
        await loginWithRedirect();
        return;
      }

      const token = await getAccessTokenSilently({
        audience: 'https://jobenginehq/api',
      });

      const response = await fetch('http://localhost:4000/api/private', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPrivateData(JSON.stringify(data, null, 2));
    } catch (error) {
      setPrivateData(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        API Test Dashboard
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Public API Test
        </Typography>
        <Button 
          variant="contained" 
          onClick={callPublicApi}
          disabled={loading}
          sx={{ mb: 2 }}
        >
          Call Public API
        </Button>
        {publicData && (
          <Box sx={{ 
            bgcolor: 'grey.100', 
            p: 2, 
            borderRadius: 1,
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace'
          }}>
            {publicData}
          </Box>
        )}
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Private API Test
        </Typography>
        <Button 
          variant="contained" 
          onClick={callPrivateApi}
          disabled={loading}
          sx={{ mb: 2 }}
        >
          Call Private API
        </Button>
        {privateData && (
          <Box sx={{ 
            bgcolor: 'grey.100', 
            p: 2, 
            borderRadius: 1,
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace'
          }}>
            {privateData}
          </Box>
        )}
      </Paper>

      {loading && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 2 
        }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ApiTest; 