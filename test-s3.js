import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
});

async function test() {
    try {
        const response = await client.send(new ListBucketsCommand({}));
        console.log("Buckets:", response.Buckets.map(b => b.Name));
    } catch (err) {
        console.error("Test failed:", err);
    }
}

test();
