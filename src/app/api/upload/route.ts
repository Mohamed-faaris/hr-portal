import { route, type Router } from '@better-upload/server';
import { toRouteHandler } from '@better-upload/server/adapters/next';
import { backblaze } from '@better-upload/server/clients';
import { env } from "~/env";

const router: Router = {
    client: backblaze({
        region: env.BACKBLAZE_REGION,
        applicationKeyId: env.BACKBLAZE_APPLICATION_KEY_ID,
        applicationKey: env.BACKBLAZE_APPLICATION_KEY,
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
                console.log(`[UPLOAD_REQUEST] Initiating resume upload: ${file.name} (${file.size} bytes)`);
                return {
                    objectInfo: {
                        key: `resume_${Date.now()}_${file.name}`,
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
