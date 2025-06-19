import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, Alert, Grid, CircularProgress, FormControlLabel, Checkbox, Link } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    linkedin: '',
    resume: null as File | null,
  });
  const [agreements, setAgreements] = useState({ marketing: false });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const { name } = e.target;
      setForm((prev) => ({ ...prev, [name]: e.target.files![0] }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCaptchaClick = () => {
    if (captchaChecked || captchaLoading || registerLoading) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaChecked(true);
      setCaptchaLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword || !form.phone) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!captchaChecked) {
      setError('Please verify that you are not a robot.');
      return;
    }
    setRegisterLoading(true);
    setTimeout(() => {
      // Check if email already registered
      const registered = JSON.parse(localStorage.getItem('registeredEmails') || '[]');
      if (registered.includes(form.email)) {
        setError('This email has already been registered.');
        setRegisterLoading(false);
        return;
      }
      registered.push(form.email);
      localStorage.setItem('registeredEmails', JSON.stringify(registered));
      setSuccess('Registration successful! Please check your email to verify your account.');
      setForm({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        linkedin: '',
        resume: null,
      });
      setAgreements({ marketing: false });
      setCaptchaChecked(false);
      setRegisterLoading(false);
    }, 1500);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
          Create Your Account
        </Typography>
        <Typography color="text.secondary" align="center" sx={{ mb: 4 }}>
          Join our community of professionals
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Required Fields */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Required Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                disabled={registerLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={registerLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                disabled={registerLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={registerLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={registerLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="LinkedIn Profile"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/your-profile"
                disabled={registerLoading}
              />
            </Grid>
            {/* Optional Documents */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Optional Documents
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ height: 56 }}
                disabled={registerLoading}
              >
                Upload CV/Resume
                <input
                  type="file"
                  name="resume"
                  hidden
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  disabled={registerLoading}
                />
              </Button>
              {form.resume && (
                <Typography variant="caption" color="text.secondary">
                  Selected: {form.resume.name}
                </Typography>
              )}
            </Grid>
            {/* Agreements */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Agreements
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="marketing"
                      checked={agreements.marketing}
                      onChange={handleCheckboxChange}
                      disabled={registerLoading}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to receive marketing communications
                    </Typography>
                  }
                />
              </Box>
            </Grid>
            {/* Captcha fake */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0, width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    bgcolor: '#f9f9fb',
                    border: '1.5px solid #d3d7de',
                    borderRadius: 2.5,
                    px: 0,
                    py: 2,
                    boxShadow: '0 2px 8px 0 rgba(60,60,60,0.07)',
                    minHeight: 80,
                    width: { xs: '100%', sm: 340 },
                    maxWidth: 400,
                    mx: 0,
                    cursor: captchaChecked ? 'default' : 'pointer',
                    userSelect: 'none',
                    transition: 'border 0.2s',
                    '&:hover': {
                      border: captchaChecked ? '1.5px solid #d3d7de' : '1.5px solid #b3b7be',
                    },
                    opacity: registerLoading ? 0.7 : 1,
                    position: 'relative',
                  }}
                  onClick={handleCaptchaClick}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1, justifyContent: 'center', height: 40 }}>
                    <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 32 }}>
                      {captchaChecked ? (
                        <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 32 }} />
                      ) : captchaLoading ? (
                        <CircularProgress size={28} thickness={5} sx={{ color: '#1976d2' }} />
                      ) : (
                        <ShieldOutlinedIcon sx={{ color: '#b3b7be', fontSize: 32 }} />
                      )}
                    </Box>
                    <Typography fontSize={18} fontWeight={500} color="#222" sx={{ lineHeight: '32px', display: 'flex', alignItems: 'center' }}>
                      I'm not a robot
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', alignSelf: 'center', fontSize: 13, letterSpacing: 0.1, width: 'auto' }}>
                    reCAPTCHA • <Link href="/captcha-privacy" target="_blank" rel="noopener" color="primary.main" underline="hover" sx={{ fontSize: 13 }}>Privacy Policy</Link>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* Error/Success Messages */}
            {error && (
              <Grid item xs={12}>
                <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
              </Grid>
            )}
            {success && (
              <Grid item xs={12}>
                <Alert severity="success" sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Registration Successful!
                  </Typography>
                  <Typography variant="body2">
                    Please check your email to verify your account. If you don't see the email, please check your spam folder.
                  </Typography>
                </Alert>
              </Grid>
            )}
            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 2, height: 56, borderRadius: 2, fontSize: '1.1rem', textTransform: 'none', boxShadow: 2, '&:hover': { boxShadow: 4 } }}
                disabled={registerLoading}
                startIcon={registerLoading ? <CircularProgress size={24} color="inherit" /> : null}
              >
                {registerLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 