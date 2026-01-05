import { pgTable, serial, text, timestamp, boolean, integer, uuid, jsonb } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: serial().primaryKey(),
  title: text().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// Better Auth tables
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  expiresAt: timestamp('expiresAt'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
})

// Job listings table
export const jobs = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  location: text('location'),
  industry: text('industry'),
  description: text('description'),
  eligibility: text('eligibility'),
  salaryMin: integer('salary_min'),
  salaryMax: integer('salary_max'),
  salaryCurrency: text('salary_currency').notNull().default('INR'),
  experienceMin: integer('experience_min').notNull().default(0),
  experienceMax: integer('experience_max'),
  type: text('type').notNull().default('full-time'), // 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance'
  status: text('status').notNull().default('draft'), // 'draft' | 'published' | 'closed'
  priority: text('priority').notNull().default('normal'), // 'normal' | 'featured' | 'urgent'
  googleFormUrl: text('google_form_url'),
  config: jsonb('config').$type<Record<string, 'required' | 'shown' | 'hidden'>>().notNull().default({}),
  createdBy: text('created_by').references(() => user.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Job applications table
export const applications = pgTable('applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  jobId: uuid('job_id')
    .notNull()
    .references(() => jobs.id, { onDelete: 'cascade' }),

  // Personal Information
  fullName: text('full_name'),
  email: text('email'),
  phone: text('phone'),
  gender: text('gender'),

  // Location
  currentLocation: text('current_location'),
  preferredWorkLocation: text('preferred_work_location'),

  // Experience
  totalExperience: text('total_experience'),
  currentCompany: text('current_company'),
  currentDesignation: text('current_designation'),

  // Salary & Availability
  currentSalary: text('current_salary'),
  expectedSalary: text('expected_salary'),
  noticePeriod: text('notice_period'),

  // Education
  highestQualification: text('highest_qualification'),
  specialization: text('specialization'),
  university: text('university'),

  // Skills & Preferences
  keySkills: text('key_skills'),
  preferredJobType: text('preferred_job_type'),

  // Additional Info
  dateOfBirth: text('date_of_birth'),
  linkedinProfile: text('linkedin_profile'),
  portfolio: text('portfolio'),

  // Documents
  resumeUrl: text('resume_url'),

  // Status & Metadata
  status: text('status').notNull().default('new'), // 'new' | 'contacted' | 'hired' | 'rejected'
  notes: text('notes'),
  captchaToken: text('captcha_token'),

  appliedAt: timestamp('applied_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
