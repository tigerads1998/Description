import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const TermsOfService = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Box>
      <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
        Terms of Service
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Effective Date: January 1, 2024
      </Typography>
      <Typography paragraph>
        Welcome to JobEngineHQ. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>1. Use of the Website</Typography>
      <Typography paragraph>
        You may use our website only for lawful purposes and in accordance with these Terms. You agree not to use the site for any fraudulent or unlawful activity.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>2. User Accounts</Typography>
      <Typography paragraph>
        You are responsible for maintaining the confidentiality of your account information. You agree to provide accurate and complete information when registering or applying for jobs.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>3. Job Listings and Applications</Typography>
      <Typography paragraph>
        JobEngineHQ is not responsible for the content of job listings or the outcome of job applications. We do not guarantee employment or the accuracy of job postings.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>4. Intellectual Property</Typography>
      <Typography paragraph>
        All content on this website, including text, graphics, logos, and software, is the property of JobEngineHQ or its licensors and is protected by copyright laws.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>5. Limitation of Liability</Typography>
      <Typography paragraph>
        JobEngineHQ is not liable for any damages arising from your use of the website or reliance on any information provided.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>6. Changes to Terms</Typography>
      <Typography paragraph>
        We may update these Terms of Service at any time. Continued use of the website after changes constitutes acceptance of the new terms.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>7. Governing Law</Typography>
      <Typography paragraph>
        These Terms are governed by the laws of your country of residence. Any disputes will be resolved in accordance with applicable law.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>8. Contact Us</Typography>
      <Typography paragraph>
        If you have any questions about these Terms, please contact us at <b>support@jobenginehq.com</b>.
      </Typography>
    </Box>
  </Container>
);

export default TermsOfService; 