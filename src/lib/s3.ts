import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "~/env";

export const s3Client = new S3Client({
    region: env.S3_REGION,
    endpoint: env.S3_ENDPOINT,
    credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
});

export async function generatePresignedUrl(fileUrl: string, expiresIn: number = 3600): Promise<string> {
    try {
        console.log("📋 generatePresignedUrl called with:", fileUrl);

        // Extract bucket and key from the S3 URL
        const url = new URL(fileUrl);
        console.log("🔍 Parsed URL hostname:", url.hostname);
        console.log("🔍 Parsed URL pathname:", url.pathname);

        // Check if this is actually an S3 URL (contains s3 or backblaze in hostname)
        const isS3Url = url.hostname.includes('s3') || url.hostname.includes('backblaze') || url.hostname.includes('amazonaws');
        console.log("🔍 Is S3 URL:", isS3Url);

        if (!isS3Url) {
            console.warn("⚠️ URL is not an S3 URL (no s3/backblaze/amazonaws in hostname)");
            console.warn("⚠️ Returning original URL as-is");
            return fileUrl;
        }

        const pathParts = url.pathname.split('/').filter(Boolean);
        console.log("🔍 Path parts:", pathParts);

        if (pathParts.length < 2) {
            console.warn("⚠️ Invalid S3 URL format - less than 2 path parts");
            console.warn("⚠️ Expected format: /bucket/key/path");
            console.warn("⚠️ Returning original URL as-is");
            return fileUrl;
        }

        const bucket = pathParts[0];
        const key = pathParts.slice(1).join('/');

        console.log("📦 Bucket:", bucket);
        console.log("🔑 Key:", key);
        console.log("⏱️ Expires in:", expiresIn);

        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        });

        console.log("🔐 Requesting presigned URL from S3...");
        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn });
        console.log("✅ Presigned URL generated successfully");
        console.log("🔗 Presigned URL (first 100 chars):", presignedUrl.substring(0, 100) + "...");
        return presignedUrl;
    } catch (error) {
        console.error('❌ Error generating presigned URL:', error);
        console.error('📝 Error details:', error instanceof Error ? error.message : String(error));
        console.warn("⚠️ Falling back to original URL");
        return fileUrl;
    }
}
