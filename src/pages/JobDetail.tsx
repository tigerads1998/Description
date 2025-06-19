import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Chip,
  Divider,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Link,
  Avatar,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Skeleton,
  Alert as MuiAlert,
  AlertTitle,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  ArrowBack as ArrowBackIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Description as DescriptionIcon,
  Verified as VerifiedIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Language as LanguageIcon,
  Computer as ComputerIcon,
  Psychology as PsychologyIcon,
  GroupWork as GroupWorkIcon,
  EmojiEvents as EmojiEventsIcon,
  WorkOutline as WorkOutlineIcon,
  BusinessCenter as BusinessCenterIcon,
  Apartment as ApartmentIcon,
  Public as PublicIcon,
  Flag as FlagIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  MonetizationOn as MonetizationOnIcon,
  CalendarMonth as CalendarMonthIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { useLoading } from '../contexts/LoadingContext';
import { RichTextContent } from '../components/RichTextContent';
import { databases, storage, DATABASE_ID, JOBS_COLLECTION_ID, APPLICATIONS_COLLECTION_ID, RESUMES_BUCKET_ID } from '../appwrite';
import { ID, Query } from 'appwrite';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const [job, setJob] = useState<any>(null);
  const [error, setError] = useState('');
  const [applyDialog, setApplyDialog] = useState(false);
  const [success, setSuccess] = useState<string | boolean>('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    experience: '',
    message: '',
    resume: ''
  });
  const [agreed, setAgreed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await databases.getDocument(
          DATABASE_ID,
          JOBS_COLLECTION_ID,
          id
        );
        
        setJob(response);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to load job details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      experience: '',
      message: '',
      resume: ''
    });
    setFile(null);
    setFileName('');
    setAgreed(false);
  };

  const handleApply = async () => {
    if (!job || !form.name || !form.email) return;
    
    try {
      setLoading(true);
      let resumeUrl = '';

      // Upload file if exists
      if (file) {
        const response = await storage.createFile(
          RESUMES_BUCKET_ID,
          ID.unique(),
          file
        );
        resumeUrl = storage.getFileView(RESUMES_BUCKET_ID, response.$id);
      }

      const payload = {
        jobId: job.$id,
        jobTitle: job.title,
        company: job.company,
        name: form.name,
        email: form.email,
        linkedin: form.linkedin,
        resumeUrl: resumeUrl,
        date: new Date().toISOString()
      };

      await databases.createDocument(
        DATABASE_ID,
        APPLICATIONS_COLLECTION_ID,
        ID.unique(),
        payload
      );
      
      setSuccess(true);
      setApplyDialog(false);
      resetForm();
    } catch (error) {
      console.error('Error submitting application:', error);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'intern': return 'default';
      case 'staff': return 'primary';
      case 'executive': return 'secondary';
      case 'team leader': return 'success';
      case 'manager': return 'warning';
      case 'director': return 'error';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'full-time': return 'success';
      case 'part-time': return 'warning';
      case 'remote': return 'info';
      case 'contract': return 'secondary';
      default: return 'default';
    }
  };

  if (error || !job) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MuiAlert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>Error</AlertTitle>
          {error || 'Job not found'}
        </MuiAlert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/jobs')}
        >
          Back to Jobs
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          color="inherit"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          sx={{ cursor: 'pointer' }}
        >
          Home
        </Link>
        <Link
          color="inherit"
          href="/jobs"
          onClick={(e) => {
            e.preventDefault();
            navigate('/jobs');
          }}
          sx={{ cursor: 'pointer' }}
        >
          Jobs
        </Link>
        <Typography color="text.primary">{job.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, mb: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1" fontWeight={700} sx={{ flexGrow: 1 }}>
                  {job.title}
                </Typography>
                {job.verified && (
                  <Tooltip title="Verified Company">
                    <VerifiedIcon color="primary" sx={{ ml: 1 }} />
                  </Tooltip>
                )}
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  icon={<BusinessIcon color="primary" />}
                  label={job.company}
                  variant="outlined"
                />
                <Chip
                  icon={<LocationIcon color="error" />}
                  label={job.location}
                  variant="outlined"
                />
                <Chip
                  icon={<WorkIcon />}
                  label={job.type}
                  color={getTypeColor(job.type) as any}
                  variant="filled"
                />
                {job.level && (
                  <Chip
                    icon={<TrendingUpIcon />}
                    label={job.level}
                    color={getLevelColor(job.level) as any}
                    variant="filled"
                  />
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                {job.salary && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <MoneyIcon color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {job.salary}
                    </Typography>
                  </Box>
                )}
                {job.posted && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarIcon color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Posted {job.posted}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Description */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <DescriptionIcon color="primary" />
                Job Description
              </Typography>
              <RichTextContent content={job.description} />
            </Box>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SchoolIcon color="primary" />
                  Requirements
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  {job.requirements.map((req: string, index: number) => (
                    <RichTextContent key={index} content={req} />
                  ))}
                </Box>
              </Box>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmojiEventsIcon color="primary" />
                  Benefits
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  {job.benefits.map((benefit: string, index: number) => (
                    <Typography key={index} component="li" variant="body1" sx={{ mb: 1 }}>
                      {benefit}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3, position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Quick Apply
              </Typography>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => setApplyDialog(true)}
                sx={{ mb: 2 }}
              >
                Apply Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => navigate('/jobs')}
              >
                View All Jobs
              </Button>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Company Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'white', border: 1, borderColor: 'grey.300' }}>
                  <BusinessIcon color="primary" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {job.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.location}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkOutlineIcon fontSize="small" color="success" />
                  <Typography variant="body2">
                    {job.type} • {job.level || 'Not specified'}
                  </Typography>
                </Box>
                {job.salary && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MonetizationOnIcon fontSize="small" color="warning" />
                    <Typography variant="body2">
                      {job.salary}
                    </Typography>
                  </Box>
                )}
                {job.posted && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarMonthIcon fontSize="small" color="info" />
                    <Typography variant="body2">
                      Posted {job.posted}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Apply Dialog */}
      <Dialog open={applyDialog} onClose={() => setApplyDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Easy Apply - {job.title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name *"
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email *"
                type="email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="LinkedIn Profile"
                value={form.linkedin}
                onChange={(e) => setForm(prev => ({ ...prev, linkedin: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<DescriptionIcon />}
                sx={{ 
                  textTransform: 'none',
                  height: 56,
                  borderColor: 'rgba(0, 0, 0, 0.23)'
                }}
              >
                Upload CV/Resume
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </Button>
              {fileName && (
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  Selected file: {fileName}
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setApplyDialog(false)}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={handleApply}
            disabled={!form.name || !form.email}
            sx={{ 
              bgcolor: 'grey.200',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'grey.300'
              }
            }}
          >
            Submit
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

export default JobDetail; 