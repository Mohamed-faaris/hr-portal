import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./client";
import { env } from "~/env";

export async function uploadFile({
    key,
    body,
    contentType,
}: {
    key: string;
    body: Buffer | Uint8Array | Blob | string;
    contentType?: string;
}) {
    const command = new PutObjectCommand({
        Bucket: env.S3_BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: contentType,
    });

    try {
        const response = await s3Client.send(command);
        return {
            success: true,
            key: key,
            url: `${env.S3_ENDPOINT}/${env.S3_BUCKET_NAME}/${key}`,
            response,
        };
    } catch (error: any) {
        console.error("Error uploading file to S3:", {
            message: error.message,
            code: error.Code || error.code || error.$metadata?.httpStatusCode,
            requestId: error.$metadata?.requestId,
            bucket: env.S3_BUCKET_NAME,
            region: env.S3_REGION
        });
        return {
            success: false,
            error,
        };
    }
}
