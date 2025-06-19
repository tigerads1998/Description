import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  Stack,
  InputAdornment,
  useTheme,
  Drawer,
  IconButton,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  MonetizationOn as MonetizationOnIcon,
  CalendarMonth as CalendarMonthIcon,
  Star as StarIcon,
  Close as CloseIcon,
  FilterList as FilterListIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { differenceInDays, format } from 'date-fns';
import Pagination from '@mui/material/Pagination';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useLoading } from '../contexts/LoadingContext';
import { Job } from '../types';
import { databases, DATABASE_ID, JOBS_COLLECTION_ID } from '../appwrite';
import { Query } from 'appwrite';

const workTypes = ['Full-time', 'Part-time', 'Remote'];

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  resume: File | null;
  linkedin: string;
};

function formatPostedDate(dateString: string | undefined) {
  if (!dateString) return 'Recently';
  const posted = new Date(dateString);
  if (isNaN(posted.getTime())) return 'Recently';
  const now = new Date();
  const diff = differenceInDays(now, posted);
  if (diff <= 0) return 'just now';
  if (diff === 1) return '1 day ago';
  if (diff <= 7) return `${diff} days ago`;
  return format(posted, 'MMM d, yyyy');
}

const Jobs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { id } = useParams();
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [workType, setWorkType] = useState('');
  const [applyDialog, setApplyDialog] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<FormDataType>({ name: '', email: '', phone: '', resume: null, linkedin: '' });
  const [customJobs, setCustomJobs] = useState<Job[]>([]);
  const allJobs = customJobs;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        let queries = [
          Query.orderDesc('$createdAt'),
          Query.limit(12)
        ];

        if (search) {
          queries.push(Query.search('title', search));
        }

        if (workType && workType !== 'all') {
          queries.push(Query.equal('type', workType));
        }

        const response = await databases.listDocuments(
          DATABASE_ID,
          JOBS_COLLECTION_ID,
          queries
        );

        const jobsData = response.documents.map(doc => ({
          id: doc.$id,
          title: doc.title || 'No Title',
          company: doc.company || 'No Company',
          location: doc.location || 'No Location',
          type: doc.type || 'Full-time',
          salary: doc.salary || 'Not specified',
          description: doc.description || 'No description available',
          requirements: doc.requirements || [],
          posted: doc.posted || 'Recently',
          verified: !!doc.verified,
        } as Job));

        setJobs(jobsData);
        setTotalPages(Math.ceil(response.total / 12));
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [search, workType]);

  const filteredJobs = allJobs.filter(
    (job) =>
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())) &&
      (workType ? job.type === workType : true)
  );

  const jobsPerPage = 7;
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset page when filter/search changes
  }, [search, workType]);

  const handleOpenApply = (job: Job) => {
    setApplyJob(job);
    setApplyDialog(true);
  };
  const handleCloseApply = () => {
    setApplyDialog(false);
    setFormData({ name: '', email: '', phone: '', resume: null, linkedin: '' });
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    }
  };
  const handleSubmitApply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await addDoc(collection(db, 'applications'), {
        name: formData.name,
        email: formData.email,
        linkedin: formData.linkedin,
        jobId: applyJob?.id,
        jobTitle: applyJob?.title,
        company: applyJob?.company,
        date: new Date().toISOString(),
        fileName: formData.resume ? formData.resume.name : '',
      });
      
      setApplyDialog(false);
      setFormData({ name: '', email: '', phone: '', resume: null, linkedin: '' });
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (job: Job) => {
    if (job.id) {
      navigate(`/jobs/${job.id}`);
    }
  };

  const handleSearchClick = () => {
    navigate('/jobs');
  };

  if (id) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Sidebar: Job List & Filter */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder="Search by job title, company, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton sx={{ ml: 1 }} onClick={() => setFilterDrawer(true)}>
              <FilterListIcon />
            </IconButton>
          </Box>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Work Type</InputLabel>
              <Select
                value={workType}
                label="Work Type"
                onChange={(e) => setWorkType(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {workTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ position: 'relative', height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <Card
                    key={job.id}
                    sx={{ mb: 2, borderRadius: 4, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)', border: '1.5px solid #e0e3e8', bgcolor: selectedJob?.id === job.id ? '#f5f8fa' : '#fff', transition: 'box-shadow 0.2s, border 0.2s' }}
                    onClick={() => setSelectedJob(job)}
                  >
                    <Box sx={{ p: 2, position: 'relative', bgcolor: selectedJob?.id === job.id ? '#f5f8fa' : '#fff', borderRadius: 3, minHeight: 150 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="subtitle1" fontWeight={700} color="primary.main" sx={{ mb: 0.5, wordBreak: 'break-word' }}>
                            {job.title}
                          </Typography>
                          <Typography color="text.secondary" fontWeight={500} sx={{ fontSize: 14, wordBreak: 'break-word' }}>{job.company}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ bgcolor: '#111', color: '#fff', borderRadius: 99, fontWeight: 700, textTransform: 'none', boxShadow: 2, px: 2, py: 0.5, fontSize: 13, minWidth: 0, minHeight: 0, lineHeight: 1.1, '&:hover': { bgcolor: '#222', color: '#fff' } }}
                            onClick={e => { e.stopPropagation(); handleOpenApply(job); }}
                          >
                            Easy Apply
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: 99, fontWeight: 600, textTransform: 'none', fontSize: 13, px: 2, py: 0.5, mt: 1, width: '100%' }}
                            onClick={e => { e.stopPropagation(); if (job.id) { setLoading(true); navigate(`/jobs/${job.id}`); } }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </Box>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1, mt: 1 }}>
                        <Chip icon={<LocationIcon color="inherit" sx={{ color: '#e53935' }} />} label={job.location} size="small" />
                        <Chip icon={<WorkIcon color="inherit" sx={{ color: '#1976d2' }} />} label={job.type} size="small" />
                      </Stack>
                      <Typography color="text.secondary" sx={{ fontSize: 13, mb: 0, ml: 0.5 }}>{formatPostedDate(job.posted)}</Typography>
                    </Box>
                  </Card>
                ))
              ) : (
                <Typography align="center" color="text.secondary">
                  No jobs found.
                </Typography>
              )}
            </Box>
            <Box sx={{ position: 'sticky', bottom: 0, bgcolor: '#fff', pt: 1, pb: 1, zIndex: 2 }}>
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, page) => setCurrentPage(page)}
                    color="primary"
                    shape="rounded"
                    size="large"
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
        {/* Main Content: Job Detail */}
        <Grid item xs={12} md={8} sx={{ display: { xs: 'none', md: 'block' } }}>
          {selectedJob ? (
            <Card sx={{ borderRadius: 4, boxShadow: 3, p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color="primary.main"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    {selectedJob.title}
                    {selectedJob.verified && (
                      <VerifiedIcon sx={{ color: '#0a66c2', fontSize: 28 }} />
                    )}
                  </Typography>
                  <Typography color="text.secondary" fontWeight={500}>
                    {selectedJob.company}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1, mb: 1 }}>
                    <Chip icon={<LocationIcon color="inherit" sx={{ color: '#e53935' }} />} label={selectedJob.location} size="small" />
                    <Chip icon={<WorkIcon color="inherit" sx={{ color: '#1976d2' }} />} label={selectedJob.type} size="small" />
                  </Stack>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 99,
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: 18,
                    bgcolor: '#0a66c2',
                    color: '#fff',
                    boxShadow: '0 2px 8px 0 rgba(112, 181, 249, 0.15)',
                    '&:hover': {
                      bgcolor: '#004182',
                      color: '#fff',
                    },
                  }}
                  onClick={() => handleOpenApply(selectedJob)}
                >
                  Easy Apply
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                Job Description & Requirements
              </Typography>
              <div style={{ marginBottom: 16, fontSize: 16 }} dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
            </Card>
          ) : (
            <Typography align="center" color="text.secondary">
              Select a job to view details.
            </Typography>
          )}
        </Grid>
      </Grid>
      {/* Drawer: More Filters */}
      <Drawer anchor="right" open={filterDrawer} onClose={() => setFilterDrawer(false)}>
        <Box sx={{ width: 320, p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
              More Filters
            </Typography>
            <IconButton onClick={() => setFilterDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Work Type</InputLabel>
            <Select
              value={workType}
              label="Work Type"
              onChange={(e) => setWorkType(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {workTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Drawer>
      {/* Dialog: Easy Apply */}
      <Dialog open={applyDialog} onClose={handleCloseApply} maxWidth="xs" fullWidth>
        <DialogTitle>Easy Apply - {applyJob?.title}</DialogTitle>
        <form onSubmit={handleSubmitApply}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 350 }}>
            <TextField
              fullWidth
              label="Full Name *"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Email *"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="LinkedIn Profile"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleFormChange}
              sx={{ mb: 1 }}
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
            >
              Upload CV/Resume
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
            </Button>
            {formData.resume && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                Selected: {formData.resume.name}
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
            <Button onClick={handleCloseApply}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!formData.name || !formData.email}
              sx={{ fontWeight: 600, letterSpacing: 1 }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Your application has been submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Jobs; 