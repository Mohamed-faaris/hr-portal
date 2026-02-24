import { jobsRouter } from "~/server/api/routers/jobs";
import { applicationsRouter } from "~/server/api/routers/applications";
import { jobConfigsRouter } from "~/server/api/routers/jobConfigs";
import { uploadRouter } from "~/server/api/routers/upload";
import { downloadsRouter } from "~/server/api/routers/downloads";
import { enquiriesRouter } from "~/server/api/routers/enquiries";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  jobs: jobsRouter,
  applications: applicationsRouter,
  jobConfigs: jobConfigsRouter,
  upload: uploadRouter,
  downloads: downloadsRouter,
  enquiries: enquiriesRouter,
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
