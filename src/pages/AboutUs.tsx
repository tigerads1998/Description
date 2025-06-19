import React from 'react';
import { Container, Typography, Box, Grid, Avatar, Stack, Link } from '@mui/material';
import marcelo from '../assets/Marcelo Claure.jpg';
import anmol from '../assets/Anmol R..jpg';
import britt from '../assets/Britt Even.jpg';

const team = [
  {
    name: 'Marcelo Claure',
    role: 'Founder & CEO',
    avatar: marcelo,
    bio: 'Marcelo is a visionary entrepreneur and business leader with a passion for building global talent platforms.'
  },
  {
    name: 'Anmol R.',
    role: 'Head of Product',
    avatar: anmol,
    bio: 'Anmol drives product innovation, ensuring our platform delivers value to both employers and job seekers.'
  },
  {
    name: 'Britt Even',
    role: 'Customer Success Manager',
    avatar: britt,
    bio: 'Britt is dedicated to supporting our users and ensuring a seamless experience for every candidate and employer.'
  },
];

const AboutUs = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Empowering Careers Across All Industries
        </Typography>
      </Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Our Mission
        </Typography>
        <Typography color="text.secondary">
          Our mission is to connect talented professionals with top companies, helping both sides grow and succeed in the fast-evolving global job market.
        </Typography>
      </Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Our Values
        </Typography>
        <ul>
          <li><Typography color="text.secondary">Transparency and trust in every connection</Typography></li>
          <li><Typography color="text.secondary">Continuous learning and innovation</Typography></li>
          <li><Typography color="text.secondary">Supportive and user-centric approach</Typography></li>
        </ul>
      </Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {team.map((member, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar src={member.avatar} sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }} />
                <Typography fontWeight={600}>{member.name}</Typography>
                <Typography color="primary.main" fontSize={14}>{member.role}</Typography>
                <Typography color="text.secondary" fontSize={14} sx={{ mt: 1 }}>{member.bio}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Contact Us
        </Typography>
        <Stack spacing={1} alignItems="center">
          <Typography color="text.secondary">Have questions or want to partner with us?</Typography>
          <Link href="mailto:support@jobenginehq.com" color="primary.main" fontWeight={600}>
            support@jobenginehq.com
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};

export default AboutUs; 