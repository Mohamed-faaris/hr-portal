import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { generatePresignedUrl } from "~/lib/s3";

export const downloadsRouter = createTRPCRouter({
    getPresignedUrl: protectedProcedure
        .input(
            z.object({
                fileUrl: z.string().url(),
                expiresIn: z.number().optional().default(3600), // 1 hour default
            }),
        )
        .query(async ({ input }) => {
            console.log("📥 getPresignedUrl query received:", input);
            const presignedUrl = await generatePresignedUrl(input.fileUrl, input.expiresIn);
            console.log("📤 getPresignedUrl returning:", presignedUrl.substring(0, 100) + "...");
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
            console.log("📥 getMultiplePresignedUrls query received:", input.fileUrls.length, "URLs");
            const presignedUrls = await Promise.all(
                input.fileUrls.map((url) =>
                    generatePresignedUrl(url, input.expiresIn),
                ),
            );
            console.log("📤 getMultiplePresignedUrls returning:", presignedUrls.length, "URLs");
            return presignedUrls;
        }),
});
