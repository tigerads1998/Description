import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, Grid, MenuItem, Snackbar, Alert, Checkbox, FormControlLabel } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useLoading } from '../contexts/LoadingContext';

const JOB_TYPES = ['Full-time', 'Part-time', 'Remote'];
const INTERNAL_PASSWORD = 'lovetime01';

const PostJobs = () => {
  const { setLoading } = useLoading();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    posted: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showSalary, setShowSalary] = useState(true);
  const [postedDate, setPostedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [verified, setVerified] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === INTERNAL_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      if (!form.title || !form.company || !form.location || !form.type || !form.description) {
        throw new Error('Please fill in all required fields');
      }
      const payload = {
        ...form,
        posted: postedDate,
        verified,
        salary: showSalary ? form.salary : '',
        createdAt: new Date().toISOString(),
        status: 'active',
      };
      // Log payload rõ ràng
      console.log('PAYLOAD SUBMIT JOB:', payload);
      await addDoc(collection(db, 'jobs'), payload);
      setSuccess(true);
      setForm({ title: '', company: '', location: '', type: '', salary: '', description: '', posted: '' });
      setPostedDate(new Date().toISOString().slice(0, 10));
      setVerified(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
          Post a Job (Internal Only)
        </Typography>
        {!isAuthenticated ? (
          <Box component="form" onSubmit={handlePasswordSubmit} sx={{ mt: 4 }}>
            <Typography align="center" color="text.secondary" sx={{ mb: 2 }}>
              This page is for internal use only. Please enter the internal password to continue.
            </Typography>
            <TextField
              fullWidth
              label="Internal Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={form.company}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={form.location}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Job Type"
                  name="type"
                  value={form.type}
                  onChange={handleFormChange}
                  required
                >
                  {JOB_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={<Checkbox checked={showSalary} onChange={e => setShowSalary(e.target.checked)} />}
                  label="Show Salary"
                />
                <TextField
                  fullWidth
                  label="Salary"
                  name="salary"
                  value={form.salary}
                  onChange={handleFormChange}
                  required={showSalary}
                  disabled={!showSalary}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Posted Date"
                  type="date"
                  value={postedDate}
                  onChange={(e) => setPostedDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  required
                  multiline
                  minRows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={verified} onChange={e => setVerified(e.target.checked)} />}
                  label="Verified"
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
              {success && (
                <Grid item xs={12}>
                  <Alert severity="success">Job posted successfully!</Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Post Job
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PostJobs; 