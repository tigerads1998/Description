import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#f7f7f7',
        py: 6,
        borderTop: '1px solid #eee',
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

          {/* Company */}
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
  );
};

export default Footer; 