import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { applications, jobs, DEFAULT_JOB_CONFIG } from "~/server/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { buildFormSchema } from "~/lib/formValidation";
import { validateRecaptcha } from "~/lib/recaptcha";

export const applicationsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    // Get all jobs with application count, sorted by most recent applications first
    const jobsWithCounts = await ctx.db
      .select({
        id: jobs.id,
        title: jobs.title,
        location: jobs.location,
        applicationCount: sql<number>`COUNT(${applications.id})`.mapWith(Number),
        lastApplicationAt: sql<string>`MAX(${applications.appliedAt})`.mapWith(String),
      })
      .from(jobs)
      .leftJoin(applications, eq(jobs.id, applications.jobId))
      .groupBy(jobs.id)
      .orderBy(desc(sql`MAX(${applications.appliedAt})`));

    return jobsWithCounts;
  }),
  getByJob: protectedProcedure
    .input(
      z.object({
        jobId: z.string().uuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.applications.findMany({
        where: eq(applications.jobId, input.jobId),
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

      // Validate reCAPTCHA token if provided
      if (input.captchaToken) {
        const isValidCaptcha = await validateRecaptcha(input.captchaToken);
        if (!isValidCaptcha) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "reCAPTCHA verification failed. Please try again.",
          });
        }
      }

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

      // Validate required fields using shared Zod schema and only include shown/required fields
      try {
        const schema = buildFormSchema(config as Record<string, string>).passthrough();
        schema.parse(input);
      } catch (err) {
        if (err instanceof z.ZodError) {
          const first = err.errors[0];
          throw new TRPCError({ code: "BAD_REQUEST", message: first?.message ?? "Invalid input" });
        }
        throw err;
      }

      for (const field of allowedFields) {
        const cfg = (config as Record<string, string>)?.[field];
        if (cfg === 'hidden') continue; // skip hidden fields

        const val = (input as any)[field];
        if (val !== undefined) {
          values[field] = val;
        }
      }

      return await ctx.db.insert(applications).values({
        ...values,
      }).returning();
    }),
});
