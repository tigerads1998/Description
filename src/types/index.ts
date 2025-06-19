// Job Types
export interface Job {
  id?: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  posted?: string;
  verified?: boolean;
  status?: 'active' | 'closed';
}

// Application Types
export interface Application {
  id?: string;
  name: string;
  email: string;
  linkedin?: string;
  jobId: string;
  jobTitle: string;
  company: string;
  cvUrl?: string;
  status: 'pending' | 'reviewed' | 'contacted' | 'rejected';
  date: string;
}

// User Types
export interface User {
  id?: string;
  email: string;
  role: 'admin' | 'employer' | 'applicant';
  name?: string;
  company?: string;
  createdAt?: string;
} 