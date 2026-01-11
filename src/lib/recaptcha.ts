import { env } from "~/env.js";

export interface RecaptchaResponse {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    "error-codes"?: string[];
    score?: number;
    action?: string;
}

/**
 * Verifies a reCAPTCHA token with Google's API
 * @param token - The reCAPTCHA token from the client
 * @param remoteIp - Optional IP address of the user
 * @returns RecaptchaResponse from Google's API
 */
export async function verifyRecaptcha(
    token: string,
    remoteIp?: string
): Promise<RecaptchaResponse> {
    try {
        const params = new URLSearchParams({
            secret: env.RECAPTCHA_SECRET_KEY,
            response: token,
            ...(remoteIp && { remoteip: remoteIp }),
        });

        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            body: params,
        });

        if (!response.ok) {
            throw new Error(`reCAPTCHA verification failed with status ${response.status}`);
        }

        const data: RecaptchaResponse = await response.json();
        return data;
    } catch (error) {
        console.error("reCAPTCHA verification error:", error);
        throw new Error("Failed to verify reCAPTCHA token");
    }
}

/**
 * Validates reCAPTCHA response with a minimum score threshold
 * @param token - The reCAPTCHA token
 * @param minScore - Minimum score threshold (0.0 - 1.0), default 0.5
 * @param remoteIp - Optional IP address
 * @returns true if verification succeeds and score meets threshold
 */
export async function validateRecaptcha(
    token: string,
    minScore: number = 0.5,
    remoteIp?: string
): Promise<boolean> {
    const result = await verifyRecaptcha(token, remoteIp);

    if (!result.success) {
        console.warn("reCAPTCHA verification failed:", result["error-codes"]);
        return false;
    }

    // For reCAPTCHA v3, check score
    if (result.score !== undefined && result.score < minScore) {
        console.warn(`reCAPTCHA score ${result.score} below threshold ${minScore}`);
        return false;
    }

    return true;
}
