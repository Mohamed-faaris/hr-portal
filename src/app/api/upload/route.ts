import { route, type Router } from '@better-upload/server';
import { toRouteHandler } from '@better-upload/server/adapters/next';
import { aws } from '@better-upload/server/clients';
import { env } from "~/env";

const router: Router = {
    client: aws({
        accessKeyId: env.S3_ACCESS_KEY_ID ?? "",
        secretAccessKey: env.S3_SECRET_ACCESS_KEY ?? "",
        region: env.S3_REGION ?? "us-east-1",
        endpoint: env.S3_ENDPOINT,
        forcePathStyle: env.S3_FORCE_PATH_STYLE,
    }),
    bucketName: env.S3_BUCKET_NAME ?? "hr-portal-resumes",
    routes: {
        resume: route({
            fileTypes: [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ],
            maxFileSize: 1024 * 1024 * 5, // 5MB
            onBeforeUpload: async ({ file }) => {
                console.log(`[UPLOAD_REQUEST] Initiating resume upload: ${file.name} (${file.size} bytes)`);
                return {};
            },
            onAfterSignedUrl: async ({ file }) => {
                console.log(`[UPLOAD_SIGNED_URL] Presigned URL generated for: ${file.name}`);
                return {};
            },
        }),
    },
};

export const { POST } = toRouteHandler(router);
