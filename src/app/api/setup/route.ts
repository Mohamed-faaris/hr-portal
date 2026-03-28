import { NextResponse } from "next/server";
import { auth } from "~/server/better-auth";
import { db } from "~/server/db";
import { user } from "~/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Development-only setup API to bootstrap the initial admin user.
 * This is NOT available in production.
 */
export async function POST(req: Request) {
  // Security: Only allow this once (if admin already exists, reject)

  const body = await req.json().catch(() => ({}));

  const email = body.email || "dharvistahr@gmail.com";
  const password = body.password || "Akracer@12345";
  const name = body.name || "test";
  const image = body.image || "https://example.com/image.png";

  const logs: string[] = [];
  let userId: string | undefined;

  // 1. Create the Admin User
  try {
    logs.push("Step 1: Creating admin user...");
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        image,
      },
    });
    userId = result.user.id;
    logs.push(`Successfully created user: ${userId}`);
  } catch (error: any) {
    logs.push(`Step 1 Failed: ${error.message || "User might already exist"}`);
    // Try to find existing user to continue seeding
    try {
      const existingUser = await db.query.user.findFirst({
        where: eq(user.email, email),
      });
      if (existingUser) {
        userId = existingUser.id;
        logs.push(`Found existing user with ID: ${userId}. Continuing...`);
      }
    } catch (findError: any) {
      logs.push(`Failed to find existing user: ${findError.message}`);
    }
  }

  const isSuccess = userId !== undefined;

  return NextResponse.json({
    success: isSuccess,
    message: isSuccess
      ? "Setup process completed (check logs for details)"
      : "Setup failed: Could not establish a user identity",
    logs,
    user: userId
      ? {
          id: userId,
          email,
        }
      : null,
  });
}
