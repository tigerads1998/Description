import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, MenuItem, Checkbox, FormControlLabel, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper as MuiTablePaper, Link as MuiLink } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useLoading } from '../contexts/LoadingContext';

const INTERNAL_PASSWORD = 'lovetime01';
const JOB_TYPES = ['Full-time', 'Part-time', 'Remote'];

const ManageJobs = () => {
  const { setLoading } = useLoading();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; jobId: string | null }>({ open: false, jobId: null });
  const [editDialog, setEditDialog] = useState<{ open: boolean; job: any | null }>({ open: false, job: null });
  const [addDialog, setAddDialog] = useState(false);
  const [form, setForm] = useState<any>({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    posted: '',
  });
  const [showSalary, setShowSalary] = useState(true);
  const [postedDate, setPostedDate] = useState<Date | null>(new Date());
  const [verified, setVerified] = useState(false);
  const [tab, setTab] = useState(0);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'jobs'));
        const firestoreJobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(firestoreJobs);
      } catch (err) {
        console.error('Error loading jobs:', err);
        setError('Error loading jobs. Please try again.');
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (tab === 1) {
      const fetchCandidates = async () => {
        const querySnapshot = await getDocs(collection(db, 'applications'));
        setCandidates(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      };
      fetchCandidates();
    }
  }, [tab]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === INTERNAL_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        verified,
        posted: postedDate ? postedDate.toISOString().slice(0, 10) : '',
        level: '',
        salary: showSalary ? form.salary : '',
        description: form.description,
        isDefault: false,
        createdAt: new Date().toISOString(),
      };
      console.log('PAYLOAD ADD JOB:', payload);
      await addDoc(collection(db, 'jobs'), payload);
      setAddDialog(false);
      setForm({ title: '', company: '', location: '', type: '', salary: '', description: '', posted: '' });
      setVerified(false);
      setSuccess('Job added successfully!');
      // Refresh jobs list
      const querySnapshot = await getDocs(collection(db, 'jobs'));
      const firestoreJobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(firestoreJobs);
    } catch (err) {
      setError('Error adding job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...editDialog.job,
        ...form,
        verified,
        posted: postedDate ? postedDate.toISOString().slice(0, 10) : '',
        salary: showSalary ? form.salary : '',
        description: form.description,
      };
      console.log('PAYLOAD EDIT JOB:', payload);
      await updateDoc(doc(db, 'jobs', String(editDialog.job.id)), payload);
      let newJobs = jobs.map((job) => (job.id === editDialog.job.id ? { ...job, ...payload } : job));
      setJobs(newJobs);
      setEditDialog({ open: false, job: null });
      setShowSalary(!!payload.salary);
      setVerified(!!payload.verified);
      setSuccess('Job updated successfully!');
    } catch (err) {
      setError('Error updating job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDialog.jobId) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'jobs', confirmDialog.jobId));
      setJobs(jobs.filter(job => job.id !== confirmDialog.jobId));
      setConfirmDialog({ open: false, jobId: null });
      setSuccess('Job deleted successfully!');
    } catch (err) {
      setError('Error deleting job. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedJobs.length === 0) return;
    setDeleting(true);
    try {
      for (const jobId of selectedJobs) {
        await deleteDoc(doc(db, 'jobs', jobId));
      }
      setJobs(jobs.filter(job => !selectedJobs.includes(job.id)));
      setSelectedJobs([]);
      setSuccess(`${selectedJobs.length} jobs deleted successfully!`);
    } catch (err) {
      setError('Error deleting jobs. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    if (selectedJobs.length === jobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(jobs.map(job => job.id));
    }
  };

  const openEditDialog = (job: any) => {
    setEditDialog({ open: true, job });
    setForm({
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      type: job.type || '',
      salary: job.salary || '',
      description: job.description || '',
      posted: job.posted || '',
    });
    setShowSalary(!!job.salary);
    setVerified(!!job.verified);
    setPostedDate(job.posted ? new Date(job.posted) : new Date());
  };

  const openAddDialog = () => {
    setAddDialog(true);
    setForm({ title: '', company: '', location: '', type: '', salary: '', description: '', posted: '' });
    setShowSalary(true);
    setVerified(false);
    setPostedDate(new Date());
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
          Manage Jobs (Internal Only)
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
          <>
            <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 3 }}>
              <Tab label="Jobs" />
              <Tab label="Candidates" />
            </Tabs>

            {tab === 0 && (
              <>
                <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                  <Button variant="contained" onClick={openAddDialog}>
                    Add New Job
                  </Button>
                  {selectedJobs.length > 0 && (
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={handleBulkDelete}
                      disabled={deleting}
                    >
                      Delete Selected ({selectedJobs.length})
                    </Button>
                  )}
                </Box>

                <TableContainer component={MuiTablePaper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectedJobs.length === jobs.length && jobs.length > 0}
                            indeterminate={selectedJobs.length > 0 && selectedJobs.length < jobs.length}
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedJobs.includes(job.id)}
                              onChange={() => handleSelectJob(job.id)}
                            />
                          </TableCell>
                          <TableCell>{job.title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{job.type}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => openEditDialog(job)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => setConfirmDialog({ open: true, jobId: job.id })}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

            {tab === 1 && (
              <TableContainer component={MuiTablePaper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Job Title</TableCell>
                      <TableCell>Company</TableCell>
                      <TableCell>Date Applied</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {candidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>{candidate.name}</TableCell>
                        <TableCell>{candidate.email}</TableCell>
                        <TableCell>{candidate.jobTitle}</TableCell>
                        <TableCell>{candidate.company}</TableCell>
                        <TableCell>{new Date(candidate.date).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Paper>

      {/* Add Job Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Job</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                value={form.title}
                onChange={(e) => setForm((prev: any) => ({ ...prev, title: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={form.company}
                onChange={(e) => setForm((prev: any) => ({ ...prev, company: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={form.location}
                onChange={(e) => setForm((prev: any) => ({ ...prev, location: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Job Type"
                value={form.type}
                onChange={(e) => setForm((prev: any) => ({ ...prev, type: e.target.value }))}
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
                value={form.salary}
                onChange={(e) => setForm((prev: any) => ({ ...prev, salary: e.target.value }))}
                required={showSalary}
                disabled={!showSalary}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns as any}>
                <DatePicker
                  label="Posted Date"
                  value={postedDate}
                  onChange={(date) => setPostedDate(date)}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={form.description}
                onChange={(e) => setForm((prev: any) => ({ ...prev, description: e.target.value }))}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">Add Job</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, job: null })} maxWidth="md" fullWidth>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                value={form.title}
                onChange={(e) => setForm((prev: any) => ({ ...prev, title: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={form.company}
                onChange={(e) => setForm((prev: any) => ({ ...prev, company: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={form.location}
                onChange={(e) => setForm((prev: any) => ({ ...prev, location: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Job Type"
                value={form.type}
                onChange={(e) => setForm((prev: any) => ({ ...prev, type: e.target.value }))}
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
                value={form.salary}
                onChange={(e) => setForm((prev: any) => ({ ...prev, salary: e.target.value }))}
                required={showSalary}
                disabled={!showSalary}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns as any}>
                <DatePicker
                  label="Posted Date"
                  value={postedDate}
                  onChange={(date) => setPostedDate(date)}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={form.description}
                onChange={(e) => setForm((prev: any) => ({ ...prev, description: e.target.value }))}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, job: null })}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained">Update Job</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, jobId: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this job?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, jobId: null })}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageJobs; 