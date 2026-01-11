import { jobsRouter } from "~/server/api/routers/jobs";
import { applicationsRouter } from "~/server/api/routers/applications";
import { jobConfigsRouter } from "~/server/api/routers/jobConfigs";
import { todosRouter } from "~/server/api/routers/todos";
import { uploadRouter } from "~/server/api/routers/upload";
import { downloadsRouter } from "~/server/api/routers/downloads";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  jobs: jobsRouter,
  applications: applicationsRouter,
  jobConfigs: jobConfigsRouter,
  upload: uploadRouter,
  downloads: downloadsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
