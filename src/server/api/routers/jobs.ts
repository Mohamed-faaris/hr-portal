import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Job } from "~/types";

// Mock data
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    location: "Mumbai, India",
    industry: "Technology",
    description: `<h2>About the Role</h2><p>We are seeking a talented Senior Software Engineer to join our growing team.</p>
      <h3>Key Responsibilities:</h3>
      <ul>
        <li>Design and develop scalable web applications</li>
        <li>Collaborate with cross-functional teams</li>
        <li>Mentor junior developers</li>
        <li>Participate in code reviews</li>
      </ul>`,
    eligibility: "Bachelor's degree in Computer Science or related field. 5+ years of experience in software development.",
    salaryMin: 1200000,
    salaryMax: 2000000,
    salaryCurrency: "INR",
    experienceMin: 5,
    experienceMax: 10,
    type: "full-time",
    status: "published",
    priority: "featured",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "2",
    title: "Marketing Manager",
    location: "Delhi, India",
    industry: "Marketing",
    description: `<h2>About the Role</h2><p>Looking for an experienced Marketing Manager to lead our marketing initiatives.</p>
      <h3>Key Responsibilities:</h3>
      <ul>
        <li>Develop and execute marketing strategies</li>
        <li>Manage marketing campaigns</li>
        <li>Analyze market trends</li>
        <li>Lead marketing team</li>
      </ul>`,
    eligibility: "MBA in Marketing preferred. 4+ years of marketing experience.",
    salaryMin: 800000,
    salaryMax: 1500000,
    salaryCurrency: "INR",
    experienceMin: 4,
    experienceMax: 8,
    type: "full-time",
    status: "published",
    priority: "normal",
    createdAt: new Date("2024-01-10").toISOString(),
    updatedAt: new Date("2024-01-10").toISOString(),
  },
  {
    id: "3",
    title: "UI/UX Designer",
    location: "Bangalore, India",
    industry: "Design",
    description: `<h2>About the Role</h2><p>We need a creative UI/UX Designer to craft beautiful user experiences.</p>
      <h3>Key Responsibilities:</h3>
      <ul>
        <li>Create wireframes and prototypes</li>
        <li>Design user interfaces</li>
        <li>Conduct user research</li>
        <li>Collaborate with developers</li>
      </ul>`,
    eligibility: "Portfolio required. 3+ years of UI/UX design experience.",
    salaryMin: 600000,
    salaryMax: 1200000,
    salaryCurrency: "INR",
    experienceMin: 3,
    experienceMax: 6,
    type: "full-time",
    status: "published",
    priority: "urgent",
    createdAt: new Date("2024-01-20").toISOString(),
    updatedAt: new Date("2024-01-20").toISOString(),
  },
  {
    id: "4",
    title: "Data Analyst",
    location: "Pune, India",
    industry: "Analytics",
    description: `<h2>About the Role</h2><p>Join us as a Data Analyst to drive data-driven decisions.</p>
      <h3>Key Responsibilities:</h3>
      <ul>
        <li>Analyze complex datasets</li>
        <li>Create data visualizations</li>
        <li>Generate insights and reports</li>
        <li>Work with stakeholders</li>
      </ul>`,
    eligibility: "Strong SQL and Python skills. 2+ years of data analysis experience.",
    salaryMin: 500000,
    salaryMax: 900000,
    salaryCurrency: "INR",
    experienceMin: 2,
    experienceMax: 5,
    type: "full-time",
    status: "published",
    priority: "normal",
    createdAt: new Date("2024-01-12").toISOString(),
    updatedAt: new Date("2024-01-12").toISOString(),
  },
  {
    id: "5",
    title: "HR Manager",
    location: "Hyderabad, India",
    industry: "Human Resources",
    description: `<h2>About the Role</h2><p>Experienced HR Manager needed to lead our people operations.</p>
      <h3>Key Responsibilities:</h3>
      <ul>
        <li>Manage recruitment processes</li>
        <li>Handle employee relations</li>
        <li>Develop HR policies</li>
        <li>Ensure compliance</li>
      </ul>`,
    eligibility: "MBA in HR preferred. 5+ years of HR management experience.",
    salaryMin: 700000,
    salaryMax: 1300000,
    salaryCurrency: "INR",
    experienceMin: 5,
    experienceMax: 10,
    type: "full-time",
    status: "published",
    priority: "normal",
    createdAt: new Date("2024-01-08").toISOString(),
    updatedAt: new Date("2024-01-08").toISOString(),
  },
  {
    id: "6",
    title: "Full Stack Developer Intern",
    location: "Remote",
    industry: "Technology",
    description: `<h2>About the Role</h2><p>Great opportunity for students to gain hands-on development experience.</p>
      <h3>Key Responsibilities:</h3>
      <ul>
        <li>Assist in web development projects</li>
        <li>Learn modern frameworks</li>
        <li>Participate in team meetings</li>
        <li>Write clean code</li>
      </ul>`,
    eligibility: "Currently pursuing Computer Science degree. Basic knowledge of web technologies.",
    salaryMin: 180000,
    salaryMax: 300000,
    salaryCurrency: "INR",
    experienceMin: 0,
    experienceMax: 1,
    type: "internship",
    status: "published",
    priority: "normal",
    createdAt: new Date("2024-01-18").toISOString(),
    updatedAt: new Date("2024-01-18").toISOString(),
  },
];

export const jobsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        location: z.string().optional(),
        industry: z.string().optional(),
        type: z.string().optional(),
      }).optional()
    )
    .query(({ input }) => {
      let filtered = mockJobs.filter(job => job.status === 'published');

      if (input?.location && input.location !== 'all') {
        filtered = filtered.filter(job => job.location === input.location);
      }
      if (input?.industry && input.industry !== 'all') {
        filtered = filtered.filter(job => job.industry === input.industry);
      }
      if (input?.type && input.type !== 'all') {
        filtered = filtered.filter(job => job.type === input.type);
      }

      return filtered.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }),

  getLatest: publicProcedure
    .input(z.object({ limit: z.number().default(3) }))
    .query(({ input }) => {
      return mockJobs
        .filter(job => job.status === 'published')
        .sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, input.limit);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const job = mockJobs.find(j => j.id === input.id);
      if (!job) {
        throw new Error('Job not found');
      }
      return job;
    }),

  getFilters: publicProcedure.query(() => {
    const locations = Array.from(new Set(mockJobs.map(j => j.location)));
    const industries = Array.from(new Set(mockJobs.map(j => j.industry)));
    const types = Array.from(new Set(mockJobs.map(j => j.type)));

    return { locations, industries, types };
  }),
});
