import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const CaptchaPrivacy = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Box>
      <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
        Captcha Privacy Policy
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Effective Date: January 1, 2024
      </Typography>
      <Typography paragraph>
        This Captcha Privacy Policy explains how our captcha verification service collects, uses, and protects your information when you interact with the captcha widget on this website. The captcha service is implemented to protect our site from spam and abuse, and to ensure a secure user experience.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>1. Information Collected</Typography>
      <Typography paragraph>
        When you interact with the captcha widget, the service may automatically collect certain information, including:
      </Typography>
      <Box component="ul" sx={{ pl: 4, mb: 2 }}>
        <li>Device and application data (such as browser type, operating system, and device identifiers)</li>
        <li>IP address</li>
        <li>Date and time of your interaction</li>
        <li>Mouse movements, clicks, and other behavioral data</li>
        <li>Cookies or similar technologies for session management and security</li>
      </Box>
      <Typography paragraph>
        This information is used solely for the purpose of distinguishing between human users and automated bots.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>2. Use of Information</Typography>
      <Typography paragraph>
        The information collected by the captcha service is used to:
      </Typography>
      <Box component="ul" sx={{ pl: 4, mb: 2 }}>
        <li>Prevent spam, abuse, and fraudulent activity on our website</li>
        <li>Ensure the security and integrity of our services</li>
        <li>Improve the accuracy and effectiveness of the captcha verification</li>
      </Box>
      <Typography paragraph>
        The data is not used for advertising or marketing purposes.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>3. Data Sharing</Typography>
      <Typography paragraph>
        We do not sell or share captcha-related data with third parties, except:
      </Typography>
      <Box component="ul" sx={{ pl: 4, mb: 2 }}>
        <li>As required by law, regulation, or legal process</li>
        <li>To maintain the security and proper functioning of the captcha service</li>
      </Box>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>4. Cookies and Similar Technologies</Typography>
      <Typography paragraph>
        The captcha service may use cookies or similar technologies to:
      </Typography>
      <Box component="ul" sx={{ pl: 4, mb: 2 }}>
        <li>Authenticate users and prevent fraudulent use of the service</li>
        <li>Store session information and user preferences</li>
      </Box>
      <Typography paragraph>
        You can control cookies through your browser settings, but disabling them may affect the functionality of the captcha.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>5. Data Retention</Typography>
      <Typography paragraph>
        Captcha-related data is retained only as long as necessary for security and anti-abuse purposes, and in accordance with applicable laws.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>6. Your Rights</Typography>
      <Typography paragraph>
        Depending on your jurisdiction, you may have the right to:
      </Typography>
      <Box component="ul" sx={{ pl: 4, mb: 2 }}>
        <li>Request access to the personal data collected by the captcha service</li>
        <li>Request deletion or correction of your data</li>
      </Box>
      <Typography paragraph>
        To exercise these rights, please contact us at <b>support@jobenginehq.com</b>.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>7. Changes to This Policy</Typography>
      <Typography paragraph>
        We may update this Captcha Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
      </Typography>
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>8. Contact</Typography>
      <Typography paragraph>
        If you have any questions or concerns about this Captcha Privacy Policy, please contact us at <b>support@jobenginehq.com</b>.
      </Typography>
    </Box>
  </Container>
);

export default CaptchaPrivacy; 