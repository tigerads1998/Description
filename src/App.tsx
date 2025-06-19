import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import LoadingOverlay from './components/LoadingOverlay';
import theme from './theme';
import { Auth0Provider } from '@auth0/auth0-react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import FAQ from './pages/FAQ';
import PostJobs from './pages/PostJobs';
import ManageJobs from './pages/ManageJobs';
import CaptchaPrivacy from './pages/CaptchaPrivacy';
import Footer from './components/Footer';
import ApiTest from './components/ApiTest';

const AppContent = () => {
  const { setLoading } = useLoading();
  const location = useLocation();

  React.useEffect(() => {
    // Reset loading state when route changes
    setLoading(false);
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/post-jobs" element={<PostJobs />} />
          <Route path="/manage-jobs" element={<ManageJobs />} />
          <Route path="/captcha-privacy" element={<CaptchaPrivacy />} />
          <Route path="/api-test" element={<ApiTest />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Auth0Provider
      domain="dev-nfadek7d68wbf77m.us.auth0.com"
      clientId="Zv2IDZ8zHU81XaekiRCiX5OxQbRfsnCT"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://jobenginehq/api'
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingProvider>
          <Router>
            <LoadingOverlay />
            <AppContent />
          </Router>
        </LoadingProvider>
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default App; 