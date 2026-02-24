import {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
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
  requestChecksumCalculation: "WHEN_REQUIRED",
});

export async function generatePresignedUrl(
  fileUrl: string,
  expiresIn: number = 3600,
): Promise<string> {
  try {
    // Extract bucket and key from the S3 URL
    const url = new URL(fileUrl);

    // Check if this is actually an S3 URL (contains s3 or backblaze in hostname)
    const isS3Url =
      url.hostname.includes("s3") ||
      url.hostname.includes("backblaze") ||
      url.hostname.includes("amazonaws");

    if (!isS3Url) {
      return fileUrl;
    }

    const pathParts = url.pathname.split("/").filter(Boolean);

    if (pathParts.length < 2) {
      return fileUrl;
    }

    const bucket = pathParts[0];
    const key = pathParts.slice(1).join("/");

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return presignedUrl;
  } catch (error) {
    return fileUrl;
  }
}

export async function getAllResumesInJobFolder(
  jobId: string,
  expiresIn: number = 3600,
): Promise<Array<{ filename: string; url: string }>> {
  try {
    const bucket = "dharvista-hr-portals-resume";
    const prefix = `resume/${jobId}/`;

    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
    });

    const response = await s3Client.send(command);

    if (!response.Contents || response.Contents.length === 0) {
      return [];
    }

    const presignedUrls = await Promise.all(
      response.Contents.filter((obj) => obj.Key && !obj.Key.endsWith("/")).map(
        async (obj) => {
          const key = obj.Key!;

          try {
            const command = new GetObjectCommand({
              Bucket: bucket,
              Key: key,
            });

            const presignedUrl = await getSignedUrl(s3Client, command, {
              expiresIn,
            });
            const filename = key.split("/").pop() || key;

            return {
              filename,
              url: presignedUrl,
            };
          } catch (error) {
            return null;
          }
        },
      ),
    );

    return presignedUrls.filter((url) => url !== null) as Array<{
      filename: string;
      url: string;
    }>;
  } catch (error) {
    return [];
  }
}
