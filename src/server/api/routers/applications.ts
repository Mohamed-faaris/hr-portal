import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { applications, jobs, DEFAULT_JOB_CONFIG } from "~/server/db/schema";
import { desc, eq } from "drizzle-orm";

export const applicationsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.applications.findMany({
      orderBy: [desc(applications.appliedAt)],
    });
  }),

  updateStatus: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      status: z.enum(['new', 'contacted', 'hired', 'rejected']),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;
      return await ctx.db
        .update(applications)
        .set({
          ...updates,
          updatedAt: new Date(),
        })
        .where(eq(applications.id, id))
        .returning();
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(applications)
        .where(eq(applications.id, input.id))
        .returning();
    }),

  create: publicProcedure
    .input(
      z.object({
        jobId: z.string().uuid(),
        fullName: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        gender: z.string().optional(),
        currentLocation: z.string().optional(),
        preferredWorkLocation: z.string().optional(),
        totalExperience: z.string().optional(),
        currentCompany: z.string().optional(),
        currentDesignation: z.string().optional(),
        currentSalary: z.string().optional(),
        expectedSalary: z.string().optional(),
        noticePeriod: z.string().optional(),
        highestQualification: z.string().optional(),
        specialization: z.string().optional(),
        university: z.string().optional(),
        keySkills: z.string().optional(),
        preferredJobType: z.string().optional(),
        dateOfBirth: z.string().optional(),
        linkedinProfile: z.string().optional(),
        portfolio: z.string().optional(),
        resumeUrl: z.string().optional(),
        captchaToken: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Fetch job to get its field config
      const job = await ctx.db.query.jobs.findFirst({ where: eq(jobs.id, input.jobId) });
      const config = job?.config ?? DEFAULT_JOB_CONFIG;

      // Fields we allow in applications table
      const allowedFields = [
        'fullName',
        'email',
        'phone',
        'gender',
        'currentLocation',
        'preferredWorkLocation',
        'totalExperience',
        'currentCompany',
        'currentDesignation',
        'currentSalary',
        'expectedSalary',
        'noticePeriod',
        'highestQualification',
        'specialization',
        'university',
        'keySkills',
        'preferredJobType',
        'dateOfBirth',
        'linkedinProfile',
        'portfolio',
        'resumeUrl',
      ];

      const values: Record<string, any> = { jobId: input.jobId };

      // include captchaToken if present
      if (input.captchaToken) {
        values.captchaToken = input.captchaToken;
      }

      // Validate required fields and only include shown/required fields
      for (const field of allowedFields) {
        const cfg = (config as Record<string, string>)?.[field];
        if (cfg === 'hidden') continue; // skip hidden fields

        const val = (input as any)[field];
        if (cfg === 'required') {
          if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
            throw new Error(`Missing required field: ${field}`);
          }
        }

        if (val !== undefined) {
          values[field] = val;
        }
      }

      return await ctx.db.insert(applications).values({
        ...values,
      }).returning();
    }),
});
