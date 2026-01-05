import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { applications } from "~/server/db/schema";
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
        linkedinProfile: z.string().url().optional(),
        portfolio: z.string().url().optional(),
        resumeUrl: z.string().url().optional(),
        captchaToken: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(applications).values({
        ...input,
      }).returning();
    }),
});
