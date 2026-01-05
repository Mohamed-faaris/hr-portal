import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { jobs } from "~/server/db/schema";
import { desc, eq, and, sql } from "drizzle-orm";

export const jobsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      location: z.string().optional(),
      industry: z.string().optional(),
      description: z.string().optional(),
      eligibility: z.string().optional(),
      salaryMin: z.number().optional().nullable(),
      salaryMax: z.number().optional().nullable(),
      experienceMin: z.number().optional(),
      experienceMax: z.number().optional(),
      type: z.string(),
      priority: z.string(),
      status: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { ...values } = input;
      return await ctx.db.insert(jobs).values({
        ...values,
        createdBy: ctx.session.user.id,
      }).returning();
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(jobs)
        .where(eq(jobs.id, input.id))
        .returning();
    }),

  updateStatus: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      status: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(jobs)
        .set({
          status: input.status,
          updatedAt: new Date(),
        })
        .where(eq(jobs.id, input.id))
        .returning();
    }),

  getAllAdmin: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.jobs.findMany({
      orderBy: [desc(jobs.createdAt)],
    });
  }),

  getAll: publicProcedure
    .input(
      z.object({
        location: z.string().optional(),
        industry: z.string().optional(),
        type: z.string().optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      const filters = [eq(jobs.status, 'published')];

      if (input?.location && input.location !== 'all') {
        filters.push(eq(jobs.location, input.location));
      }
      if (input?.industry && input.industry !== 'all') {
        filters.push(eq(jobs.industry, input.industry));
      }
      if (input?.type && input.type !== 'all') {
        filters.push(eq(jobs.type, input.type));
      }

      return await ctx.db.query.jobs.findMany({
        where: and(...filters),
        orderBy: [desc(jobs.createdAt)],
      });
    }),

  getLatest: publicProcedure
    .input(z.object({ limit: z.number().default(3) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.jobs.findMany({
        where: eq(jobs.status, 'published'),
        orderBy: [desc(jobs.createdAt)],
        limit: input.limit,
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const job = await ctx.db.query.jobs.findFirst({
        where: eq(jobs.id, input.id),
      });
      
      if (!job) {
        throw new Error('Job not found');
      }
      return job;
    }),

  getFilters: publicProcedure.query(async ({ ctx }) => {
    const publishedJobs = await ctx.db.query.jobs.findMany({
      where: eq(jobs.status, 'published'),
      columns: {
        location: true,
        industry: true,
        type: true,
      }
    });

    const locations = Array.from(new Set(publishedJobs.map(j => j.location).filter(Boolean) as string[]));
    const industries = Array.from(new Set(publishedJobs.map(j => j.industry).filter(Boolean) as string[]));
    const types = Array.from(new Set(publishedJobs.map(j => j.type).filter(Boolean) as string[]));

    return { locations, industries, types };
  }),
});
