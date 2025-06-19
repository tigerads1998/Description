import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'How do I apply for jobs on this portal?',
    answer:
      'You can search and apply for jobs directly on our website. Simply browse the job listings, select the job you are interested in, and click the "Easy Apply" button to submit your application. No registration is required for job applications.'
  },
  {
    question: 'What types of jobs are available on this portal?',
    answer:
      'Our platform features a wide range of job opportunities across various industries and functions, including but not limited to marketing, technology, finance, sales, operations, and more. Both full-time and part-time positions are available.'
  },
  {
    question: 'Is there any fee for job seekers?',
    answer:
      'No, our platform is completely free for job seekers. You can search and apply for jobs at no cost.'
  },
  {
    question: 'How do I know if my application was successful?',
    answer:
      'After submitting your application, you will receive a confirmation message on the website. The employer will review your application and contact you directly if you are shortlisted.'
  },
  {
    question: 'Can I apply for multiple jobs?',
    answer:
      'Yes, you can apply for as many jobs as you wish. There is no limit to the number of applications you can submit.'
  },
  {
    question: 'How often are job listings updated?',
    answer:
      'Our job listings are updated regularly to ensure you have access to the latest opportunities across all industries and professions.'
  },
  {
    question: 'Do I need to create an account to apply for jobs?',
    answer:
      'No, you do not need to create an account to apply for jobs. However, creating an account allows you to save jobs, track your applications, and receive personalized job recommendations (coming soon).'
  },
  {
    question: 'How can I contact the employer?',
    answer:
      'Once you apply for a job, your information will be sent directly to the employer. If you are shortlisted, the employer will contact you via email or phone.'
  },
  {
    question: 'Who can I contact for support?',
    answer:
      'If you have any questions or need assistance, please contact our support team at support@jobenginehq.com.'
  },
  {
    question: 'Is my personal information kept confidential?',
    answer:
      'Yes, we are committed to protecting your privacy. Your information will only be shared with employers for the purpose of job applications and will not be sold or disclosed to third parties.'
  },
];

const FAQ = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Find answers to the most common questions about our job portal.
        </Typography>
      </Box>
      {faqs.map((faq, idx) => (
        <Accordion key={idx} sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQ; 