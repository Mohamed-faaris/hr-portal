import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { jobs } from "~/server/db/schema";
import { desc, eq, and, sql } from "drizzle-orm";

export const jobsRouter = createTRPCRouter({
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
