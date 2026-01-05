import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { applications } from "~/server/db/schema";

export const applicationsRouter = createTRPCRouter({
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
