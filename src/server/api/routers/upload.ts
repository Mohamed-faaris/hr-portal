import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "~/lib/s3";
import { env } from "~/env";

export const uploadRouter = createTRPCRouter({
    getPresignedUrl: publicProcedure
        .input(
            z.object({
                fileName: z.string(),
                fileType: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { fileName, fileType } = input;
            const key = `${crypto.randomUUID()}-${fileName}`;

            const command = new PutObjectCommand({
                Bucket: env.S3_BUCKET_NAME,
                Key: key,
                ContentType: fileType,
            });

            const signedUrl = await getSignedUrl(s3Client, command, {
                expiresIn: 3600,
            });

            return {
                uploadUrl: signedUrl,
                key,
                // The public URL depends on how Backblaze is configured. 
                // Usually it's https://<bucket>.<endpoint>/<key> or https://<endpoint>/<bucket>/<key>
                // For Backblaze with forcePathStyle: true, it's often https://<endpoint>/<bucket>/<key>
                url: `${env.S3_ENDPOINT}/${env.S3_BUCKET_NAME}/${key}`,
            };
        }),
});
