import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PrivacyPolicy = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Box>
      <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Effective Date: January 1, 2024
      </Typography>
      <Typography paragraph>
        At JobEngineHQ, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>1. Information We Collect</Typography>
      <Typography paragraph>
        We may collect personal information that you voluntarily provide to us, such as your name, email address, phone number, LinkedIn profile, and resume. We also collect information automatically through cookies and similar technologies.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>2. How We Use Your Information</Typography>
      <Typography paragraph>
        We use your information to:
        <ul>
          <li>Process job applications and connect candidates with employers</li>
          <li>Improve our website and services</li>
          <li>Communicate with you about your account or job applications</li>
          <li>Send you marketing communications (if you opt in)</li>
        </ul>
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>3. Sharing Your Information</Typography>
      <Typography paragraph>
        We do not sell your personal information. We may share your information with employers for recruitment purposes or with service providers who help us operate our website. We may also disclose information if required by law.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>4. Cookies and Tracking Technologies</Typography>
      <Typography paragraph>
        We use cookies and similar technologies to enhance your experience, analyze usage, and deliver relevant content. You can control cookies through your browser settings.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>5. Data Security</Typography>
      <Typography paragraph>
        We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>6. Your Rights</Typography>
      <Typography paragraph>
        You have the right to access, update, or delete your personal information. To exercise these rights, please contact us at <b>support@jobenginehq.com</b>.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>7. Changes to This Policy</Typography>
      <Typography paragraph>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>8. Contact Us</Typography>
      <Typography paragraph>
        If you have any questions about this Privacy Policy, please contact us at <b>support@jobenginehq.com</b>.
      </Typography>
    </Box>
  </Container>
);

export default PrivacyPolicy; 