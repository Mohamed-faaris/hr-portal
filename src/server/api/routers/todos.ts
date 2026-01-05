import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { todos } from "~/server/db/schema";
import { desc } from "drizzle-orm";

export const todosRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.todos.findMany({
      orderBy: [desc(todos.createdAt)],
    });
  }),

  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(todos).values({
        title: input.title,
      }).returning();
    }),
});
