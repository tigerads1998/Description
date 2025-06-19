import React from 'react';
import { Helmet } from 'react-helmet';

const generateKeywords = (path, category, location, jobType, experience) => {
  const baseKeywords = ['job search', 'career opportunities', 'job portal', 'find jobs', 'job listings'];
  
  // Add category-specific keywords
  if (category) {
    const categoryKeywords = {
      'it': [
        'IT jobs', 'software developer', 'tech careers', 'programming jobs',
        'software engineer', 'web developer', 'mobile developer', 'data scientist',
        'AI jobs', 'machine learning', 'cloud computing', 'cybersecurity jobs',
        'devops engineer', 'system administrator', 'network engineer'
      ],
      'marketing': [
        'marketing jobs', 'digital marketing', 'social media jobs',
        'content marketing', 'SEO specialist', 'PPC jobs', 'brand manager',
        'marketing manager', 'digital strategist', 'growth marketing',
        'email marketing', 'affiliate marketing', 'performance marketing'
      ],
      'finance': [
        'finance jobs', 'accounting careers', 'banking jobs',
        'financial analyst', 'investment banking', 'financial advisor',
        'accountant', 'auditor', 'tax specialist', 'financial controller',
        'risk management', 'compliance jobs', 'treasury jobs'
      ],
      'sales': [
        'sales jobs', 'business development', 'account executive',
        'sales manager', 'sales representative', 'business development manager',
        'sales director', 'account manager', 'sales operations',
        'inside sales', 'outside sales', 'sales engineer'
      ],
      'design': [
        'design jobs', 'UI/UX careers', 'graphic design jobs',
        'product designer', 'interaction designer', 'visual designer',
        'art director', 'creative director', 'motion designer',
        'industrial designer', 'fashion designer', 'interior designer'
      ],
      'hr': [
        'HR jobs', 'human resources', 'recruitment jobs',
        'talent acquisition', 'HR manager', 'HR specialist',
        'HR business partner', 'learning and development',
        'compensation and benefits', 'HR operations'
      ],
      'healthcare': [
        'healthcare jobs', 'medical careers', 'nursing jobs',
        'doctor jobs', 'healthcare administration', 'medical coding',
        'pharmacy jobs', 'healthcare IT', 'medical research',
        'healthcare consulting', 'public health'
      ],
      'education': [
        'education jobs', 'teaching jobs', 'academic careers',
        'professor jobs', 'education administration', 'curriculum development',
        'educational technology', 'special education', 'online teaching',
        'education consulting'
      ],
      'engineering': [
        'engineering jobs', 'mechanical engineer', 'electrical engineer',
        'civil engineer', 'chemical engineer', 'industrial engineer',
        'aerospace engineer', 'biomedical engineer', 'environmental engineer',
        'engineering management'
      ],
      'customer-service': [
        'customer service jobs', 'customer support', 'call center jobs',
        'customer success', 'client relations', 'customer experience',
        'technical support', 'customer service manager', 'customer care'
      ]
    };
    baseKeywords.push(...(categoryKeywords[category] || []));
  }

  // Add job type specific keywords
  if (jobType) {
    const jobTypeKeywords = {
      'full-time': ['full time jobs', 'permanent positions', 'career opportunities'],
      'part-time': ['part time jobs', 'flexible hours', 'side jobs'],
      'contract': ['contract jobs', 'temporary positions', 'project based work'],
      'remote': ['remote jobs', 'work from home', 'virtual jobs', 'telecommute'],
      'internship': ['internships', 'student jobs', 'entry level positions'],
      'freelance': ['freelance jobs', 'independent contractor', 'gig work']
    };
    baseKeywords.push(...(jobTypeKeywords[jobType] || []));
  }

  // Add experience level keywords
  if (experience) {
    const experienceKeywords = {
      'entry': ['entry level jobs', 'graduate jobs', 'junior positions'],
      'mid': ['mid level jobs', 'experienced positions'],
      'senior': ['senior jobs', 'leadership positions', 'management jobs'],
      'executive': ['executive jobs', 'C-level positions', 'director jobs']
    };
    baseKeywords.push(...(experienceKeywords[experience] || []));
  }

  // Add location-specific keywords
  if (location) {
    baseKeywords.push(
      `${location} jobs`,
      `jobs in ${location}`,
      `careers in ${location}`,
      `${location} careers`
    );
  }

  // Add path-specific keywords
  if (path.includes('/jobs/')) {
    baseKeywords.push('job listings', 'find jobs', 'job search', 'career search');
  } else if (path.includes('/career-advice/')) {
    baseKeywords.push(
      'career tips',
      'job search advice',
      'interview preparation',
      'resume writing',
      'career development',
      'professional growth'
    );
  } else if (path.includes('/companies/')) {
    baseKeywords.push(
      'company profiles',
      'employer reviews',
      'company culture',
      'workplace reviews',
      'employer information'
    );
  }

  return baseKeywords.join(', ');
};

const SEOHead = ({ 
  title, 
  description, 
  path, 
  category, 
  location,
  jobType,
  experience,
  extraKeywords = ''
}) => {
  const keywords = generateKeywords(path, category, location, jobType, experience);
  const fullTitle = `${title} | Job Portal - Latest Job Opportunities 2024`;
  const allKeywords = extraKeywords ? keywords + ', ' + extraKeywords : keywords;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="robots" content="index, follow" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={`https://yourdomain.com${path}`} />
    </Helmet>
  );
};

export default SEOHead; 