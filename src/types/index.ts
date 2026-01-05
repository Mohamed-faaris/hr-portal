export type JobStatus = 'draft' | 'published' | 'closed';
export type JobPriority = 'normal' | 'featured' | 'urgent';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
export type ApplicantStatus = 'new' | 'contacted' | 'hired' | 'rejected';

export interface Job {
  id: string;
  title: string;
  location: string;
  industry: string;

  description: string;
  eligibility: string;

  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;

  experienceMin: number;
  experienceMax: number;

  type: JobType;
  status: JobStatus;
  priority: JobPriority;

  createdAt: string;
  updatedAt: string;

  googleFormUrl?: string;
}

export interface Applicant {
  id: string;
  jobId: string;
  jobTitle: string;

  name: string;
  email: string;
  phone: string;

  resumeLink: string;

  appliedAt: string;
  status: ApplicantStatus;

  notes?: string;
}
