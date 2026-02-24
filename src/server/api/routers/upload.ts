import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "~/lib/s3";
import { env } from "~/env";
import path from "path";

export const uploadRouter = createTRPCRouter({
  getPresignedUrl: publicProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileType: z.string(),
        jobId: z.string(),
        applicantName: z.string().optional(),
        applicantEmail: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { fileName, fileType, jobId, applicantName, applicantEmail } =
        input;

      const ext = path.extname(fileName) || "";
      const originalBase = path.basename(fileName, ext);

      const sanitize = (s?: string) =>
        (s || "")
          .toString()
          .normalize("NFKD")
          .replace(/[^a-zA-Z0-9@._\- ]+/g, "")
          .trim()
          .replace(/\s+/g, "_")
          .toLowerCase();

      const baseName = applicantName
        ? sanitize(applicantName)
        : sanitize(originalBase);
      const emailPart = applicantEmail
        ? sanitize(applicantEmail).replace(/@/g, "_")
        : "";
      const rand = Math.floor(Math.random() * 90000) + 10000;
      const ts = Date.now();

      const key = `resume/${jobId}/${baseName}${emailPart ? `-${emailPart}` : ""}-${rand}-${ts}${ext}`;

      const command = new PutObjectCommand({
        Bucket: env.S3_BUCKET_NAME,
        Key: key,
      });

      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });

      return {
        uploadUrl: signedUrl,
        key,
        url: `${env.S3_ENDPOINT}/${env.S3_BUCKET_NAME}/${key}`,
      };
    }),
});
