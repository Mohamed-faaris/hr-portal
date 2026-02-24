export type JobStatus = "draft" | "published" | "closed";
export type JobPriority = "normal" | "featured" | "urgent";
export type JobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "freelance";
export type ApplicantStatus = "new" | "contacted" | "hired" | "rejected";

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
  config?: Record<string, "required" | "shown" | "hidden">;
}

export interface Applicant {
  id: string;
  jobId: string;

  fullName: string | null;
  email: string | null;
  phone: string | null;

  gender: string | null;
  currentLocation: string | null;
  preferredWorkLocation: string | null;
  totalExperience: string | null;
  currentCompany: string | null;
  currentDesignation: string | null;
  currentSalary: string | null;
  expectedSalary: string | null;
  noticePeriod: string | null;
  highestQualification: string | null;
  specialization: string | null;
  university: string | null;
  keySkills: string | null;
  preferredJobType: string | null;
  dateOfBirth: string | null;
  linkedinProfile: string | null;
  portfolio: string | null;

  resumeUrl: string | null;

  appliedAt: Date;
  updatedAt: Date;
  status: ApplicantStatus;

  notes: string | null;
}
