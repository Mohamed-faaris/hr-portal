import { route, type Router } from '@better-upload/server';
import { toRouteHandler } from '@better-upload/server/adapters/next';
import { backblaze } from '@better-upload/server/clients';
import { env } from "~/env";

const router: Router = {
    client: backblaze({
        region: env.S3_REGION ?? "us-east-1",
        applicationKeyId: env.S3_ACCESS_KEY_ID,
        applicationKey: env.S3_SECRET_ACCESS_KEY,
    }),
    bucketName: env.S3_BUCKET_NAME,
    routes: {
        resume: route({
            fileTypes: [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ],
            maxFileSize: 1024 * 1024 * 5, // 5MB
            onBeforeUpload: async ({ file }) => {
                const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
                const key = `resume_${Date.now()}_${safeName}`;
                const url = `https://${env.S3_BUCKET_NAME}.${env.S3_ENDPOINT.replace("https://", "")}/${key}`;

                console.log(`[UPLOAD_REQUEST] Initiating resume upload: ${file.name} (${file.size} bytes) \nAssigned key: ${key}`);
                return {
                    objectInfo: {
                        key,
                        url,
                    },
                };
            },
            onAfterSignedUrl: async ({ file }) => {
                console.log(`[UPLOAD_SIGNED_URL] Presigned URL generated for: ${file.name}`);
                return {};
            },
        }),
    },
};

export const { POST } = toRouteHandler(router);
