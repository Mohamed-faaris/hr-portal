import { type NextRequest, NextResponse } from "next/server";
import { uploadFile } from "~/server/s3/uploader";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const key = `uploads/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

        const result = await uploadFile({
            key,
            body: buffer,
            contentType: file.type,
        });

        if (result.success) {
            return NextResponse.json({
                url: result.url,
                key: result.key,
            });
        } else {
            return NextResponse.json(
                { error: "Failed to upload to S3", details: result.error },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("S3 Upload API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
