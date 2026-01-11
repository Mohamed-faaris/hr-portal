import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { generatePresignedUrl, getAllResumesInJobFolder } from "~/lib/s3";

export const downloadsRouter = createTRPCRouter({
    getPresignedUrl: protectedProcedure
        .input(
            z.object({
                fileUrl: z.string().url(),
                expiresIn: z.number().optional().default(3600),
            }),
        )
        .query(async ({ input }) => {
            const presignedUrl = await generatePresignedUrl(input.fileUrl, input.expiresIn);
            return presignedUrl;
        }),

    getMultiplePresignedUrls: protectedProcedure
        .input(
            z.object({
                fileUrls: z.array(z.string().url()),
                expiresIn: z.number().optional().default(3600),
            }),
        )
        .query(async ({ input }) => {
            const presignedUrls = await Promise.all(
                input.fileUrls.map((url) =>
                    generatePresignedUrl(url, input.expiresIn),
                ),
            );
            return presignedUrls;
        }),

    getAllResumesForJob: protectedProcedure
        .input(
            z.object({
                jobId: z.string(),
                expiresIn: z.number().optional().default(3600),
            }),
        )
        .query(async ({ input }) => {
            const presignedUrls = await getAllResumesInJobFolder(input.jobId, input.expiresIn);
            return presignedUrls;
        }),
});
