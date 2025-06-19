import React from 'react';
import SEOHead from '../components/SEOHead';
import { useLocation } from 'react-router-dom';

const JobListPage = ({ category, location }) => {
  const { pathname } = useLocation();
  
  const pageTitle = category 
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Jobs`
    : 'All Jobs';
    
  const pageDescription = category
    ? `Find the latest ${category} jobs and career opportunities. Browse through thousands of ${category} job listings and apply today!`
    : 'Search and apply for the latest job opportunities across all industries. Find your dream job today!';

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        path={pathname}
        category={category}
        location={location}
      />
      
      {/* Rest of your job listing page content */}
      <div className="job-list-container">
        <h1>{pageTitle}</h1>
        {/* Job listings content */}
      </div>
    </>
  );
};

export default JobListPage; 