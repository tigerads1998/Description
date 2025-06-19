import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Paper, useTheme, useMediaQuery, Badge, List, ListItem, ListItemText, Collapse, Link, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../contexts/LoadingContext';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import FacebookIcon from '@mui/icons-material/Facebook';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Home = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const [showCompanies, setShowCompanies] = useState(false);
  const theme = useTheme();

  // Danh sách công ty tuyển dụng nhiều
  const topCompanies = [
    { 
      name: 'WPP', 
      detail: "World's Largest Marketing & Communications Group",
      jobCount: 156
    },
    { 
      name: 'Dentsu', 
      detail: 'Global Leader in Digital Marketing & Advertising',
      jobCount: 143
    },
    { 
      name: 'Publicis Groupe', 
      detail: 'Innovative Digital Solutions & Media Agency',
      jobCount: 128
    },
    { 
      name: 'Accenture', 
      detail: 'Global Professional Services Company',
      jobCount: 112
    },
    { 
      name: 'Deloitte Digital', 
      detail: 'Digital Consulting & Technology Services',
      jobCount: 98
    }
  ];

  const handleShowCompanies = () => {
    setShowCompanies(!showCompanies);
  };

  const handleSearchClick = () => {
    navigate('/jobs');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(247,247,247,1) 100%)',
          py: { xs: 4, md: 6 },
          textAlign: 'center',
          mb: 4,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: '#111',
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Find Your Dream Job
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 400,
              color: '#444',
              mb: 3,
            }}
          >
            Search through thousands of job listings
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 3, md: 4 }, backgroundColor: '#fff', mt: -2, flex: 1 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {/* Search Jobs */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  border: '1px solid #eee',
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SearchIcon sx={{ fontSize: 40, color: '#111', mr: 2 }} />
                  <Typography variant="h5" fontWeight={600} color="#111">
                    Search Jobs
                  </Typography>
                </Box>
                <Typography color="#444" paragraph>
                  Find the perfect job that matches your skills and experience
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleSearchClick}
                  sx={{
                    mt: 2,
                    borderColor: '#111',
                    color: '#111',
                    '&:hover': {
                      borderColor: '#333',
                      backgroundColor: 'rgba(0,0,0,0.04)',
                    },
                  }}
                >
                  GO TO JOBS
                </Button>
              </Paper>
            </Grid>

            {/* Top Companies */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  border: '1px solid #eee',
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BusinessIcon sx={{ fontSize: 40, color: '#111', mr: 2 }} />
                  <Typography variant="h5" fontWeight={600} color="#111">
                    Top Companies
                  </Typography>
                </Box>
                <Typography color="#444" paragraph>
                  Work with leading digital marketing agencies
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleShowCompanies}
                  sx={{
                    mt: 2,
                    borderColor: '#111',
                    color: '#111',
                    '&:hover': {
                      borderColor: '#333',
                      backgroundColor: 'rgba(0,0,0,0.04)',
                    },
                  }}
                >
                  VIEW COMPANIES
                </Button>
              </Paper>
            </Grid>
          </Grid>

          {/* Companies List with Animation */}
          <Collapse in={showCompanies} timeout={300}>
            <Box sx={{ mt: 4, mx: 'auto', maxWidth: 800 }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  border: '1px solid #eee', 
                  borderRadius: 2,
                  transform: 'translateY(0)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <List>
                  {topCompanies.map((company, index) => (
                    <ListItem 
                      key={index}
                      sx={{ 
                        borderBottom: index < topCompanies.length - 1 ? '1px solid #eee' : 'none',
                        py: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.02)',
                        }
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111', mb: 0.5 }}>
                          {company.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {company.detail}
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: 'success.main',
                        ml: 2 
                      }}>
                        <TrendingUpIcon fontSize="small" />
                      </Box>
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ p: 2, textAlign: 'center', borderTop: '1px solid #eee' }}>
                  <Button
                    onClick={() => navigate('/jobs')}
                    sx={{
                      color: '#111',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.04)',
                      },
                    }}
                  >
                    View All Companies
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Collapse>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          bgcolor: '#f7f7f7',
          py: 6,
          borderTop: '1px solid #eee',
          mt: 'auto'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Contact Info */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" color="#111" gutterBottom fontWeight={600}>
                CONTACT US
              </Typography>
              <Typography variant="body2" color="#666">
                JOBENGINE CORPORATION
              </Typography>
              <Typography variant="body2" color="#666" sx={{ mt: 1 }}>
                Email: contact@jobenginehq.com
              </Typography>
              <Typography variant="body2" color="#666">
                Phone: (+1) 415 555 0123
              </Typography>
              <Typography variant="body2" color="#666" sx={{ mt: 1 }}>
                HQ: 100 Pine Street, Suite 1600
              </Typography>
              <Typography variant="body2" color="#666">
                San Francisco, CA 94111
              </Typography>
            </Grid>

            {/* Company Links */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="#111" gutterBottom fontWeight={600}>
                COMPANY
              </Typography>
              <Link href="/about" color="#666" underline="hover" display="block" sx={{ mb: 1 }}>
                About Us
              </Link>
              <Link href="/jobs" color="#666" underline="hover" display="block" sx={{ mb: 1 }}>
                Careers
              </Link>
              <Link href="/contact" color="#666" underline="hover" display="block" sx={{ mb: 1 }}>
                Contact
              </Link>
              <Link href="/blog" color="#666" underline="hover" display="block" sx={{ mb: 1 }}>
                Blog
              </Link>
            </Grid>

            {/* Products */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" color="#111" gutterBottom fontWeight={600}>
                PRODUCTS
              </Typography>
              <Link href="/jobs" color="#666" underline="hover" display="block" sx={{ mb: 1 }}>
                Job Search
              </Link>
              <Link href="/jobs" color="#666" underline="hover" display="block" sx={{ mb: 1 }}>
                Talent Pool
              </Link>
              <Link href="/jobs" color="#666" underline="hover" display="block" sx={{ mb: 1 }}>
                Recruitment Solutions
              </Link>
            </Grid>

            {/* Connect */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" color="#111" gutterBottom fontWeight={600}>
                CONNECT
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Link 
                  href="https://www.facebook.com/profile.php?id=61577758403651" 
                  target="_blank"
                  color="#666"
                  underline="hover"
                  display="flex"
                  alignItems="center"
                  sx={{ gap: 1 }}
                >
                  <FacebookIcon />
                  <span>Follow us on Facebook</span>
                </Link>
              </Box>
            </Grid>
          </Grid>

          {/* Copyright and Links */}
          <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid #ddd' }}>
            <Typography variant="body2" color="#666" align="center">
              © {new Date().getFullYear()} JobEngine Corporation. All rights reserved.
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Link href="/privacy" color="#666" underline="hover">
                Privacy Policy
              </Link>
              <Link href="/terms" color="#666" underline="hover">
                Terms of Service
              </Link>
              <Link href="/cookies" color="#666" underline="hover">
                Cookie Policy
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 