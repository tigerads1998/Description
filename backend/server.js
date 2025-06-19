require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');

const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Cho phép tất cả domain trong giai đoạn development
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Auth0 Middleware
const jwtCheck = auth({
  audience: 'https://jobenginehq/api',
  issuerBaseURL: 'https://dev-nfadek7d68wbf77m.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or invalid token'
    });
  }
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong'
  });
});

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Public route (không cần xác thực)
app.get('/api/public', (req, res) => {
  res.json({ 
    message: 'Public endpoint, no authentication required.',
    timestamp: new Date().toISOString()
  });
});

// Private routes (cần xác thực)
app.use('/api/private', jwtCheck);

app.get('/api/private', (req, res) => {
  try {
    res.json({ 
      message: 'Private endpoint, you are authenticated!',
      user: req.auth,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/private/profile', (req, res) => {
  try {
    res.json({ 
      message: 'Private profile endpoint',
      user: req.auth,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/healthz`);
}); 