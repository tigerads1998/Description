import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CookiePolicy = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Box>
      <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
        Cookie Policy
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Effective Date: January 1, 2024
      </Typography>
      <Typography paragraph>
        This Cookie Policy explains how JobEngineHQ uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>1. What Are Cookies?</Typography>
      <Typography paragraph>
        Cookies are small data files placed on your device when you visit a website. They are widely used to make websites work, or to work more efficiently, as well as to provide reporting information.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>2. How We Use Cookies</Typography>
      <Typography paragraph>
        We use cookies to:
        <ul>
          <li>Remember your preferences and settings</li>
          <li>Understand how you use our website</li>
          <li>Improve your experience and our services</li>
        </ul>
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>3. Types of Cookies We Use</Typography>
      <Typography paragraph>
        <ul>
          <li><b>Essential Cookies:</b> Necessary for the website to function properly.</li>
          <li><b>Analytics Cookies:</b> Help us understand how visitors interact with our site.</li>
          <li><b>Preference Cookies:</b> Remember your preferences and settings.</li>
        </ul>
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>4. Managing Cookies</Typography>
      <Typography paragraph>
        You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your experience on our website.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>5. Changes to This Policy</Typography>
      <Typography paragraph>
        We may update this Cookie Policy from time to time. We encourage you to review this page periodically for the latest information.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>6. Contact Us</Typography>
      <Typography paragraph>
        If you have any questions about our use of cookies, please contact us at <b>support@jobenginehq.com</b>.
      </Typography>
    </Box>
  </Container>
);

export default CookiePolicy; 