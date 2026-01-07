import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { jobConfigs } from "~/server/db/schema";
import { desc, eq } from "drizzle-orm";

const ConfigSchema = z.record(z.enum(['required', 'shown', 'hidden']));

export const jobConfigsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.jobConfigs.findMany({
      orderBy: [desc(jobConfigs.createdAt)],
    });
  }),

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      config: ConfigSchema,
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(jobConfigs).values({
        ...input,
      }).returning();
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(jobConfigs)
        .where(eq(jobConfigs.id, input.id))
        .returning();
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      name: z.string().min(1),
      config: ConfigSchema,
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...values } = input;
      return await ctx.db
        .update(jobConfigs)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(eq(jobConfigs.id, id))
        .returning();
    }),
});
