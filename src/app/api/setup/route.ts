import { NextResponse } from "next/server";
import { auth } from "~/server/better-auth";
import { db } from "~/server/db";
import { DEFAULT_JOB_CONFIG, jobConfigs, jobs, user } from "~/server/db/schema";
import { eq } from "drizzle-orm";

const MOCK_JOBS = [
  {
    title: "HR Executive",
    location: "Aruppukottai",
    industry: "MSME",
    description: "We are seeking a dedicated HR Executive to manage recruitment processes.",
    eligibility: "MBA in HR preferred. Must speak Tamil and English fluently.",
    salaryMin: 15000,
    salaryMax: 25000,
    salaryCurrency: "INR",
    experienceMin: 0,
    experienceMax: 2,
    type: 'full-time',
    status: 'closed',
    priority: 'urgent',
  },
  {
    title: "Textile Supervisor",
    location: "Virudhunagar",
    industry: "Textile Manufacturing",
    description: "Oversee daily floor operations and ensure quality control.",
    eligibility: "Diploma in Textile Technology. Shift work required.",
    salaryMin: 20000,
    salaryMax: 40000,
    salaryCurrency: "INR",
    experienceMin: 3,
    experienceMax: 5,
    type: 'full-time',
    status: 'published',
    priority: 'urgent',
  },
  {
    title: "Senior Software Engineer",
    location: "Chennai",
    industry: "Start-Ups",
    description: "Develop scalable web applications using React and Node.js.",
    eligibility: "B.E./B.Tech in CS/IT. Strong JS skills.",
    salaryMin: 800000,
    salaryMax: 1200000,
    salaryCurrency: "INR",
    experienceMin: 5,
    experienceMax: 8,
    type: 'full-time',
    status: 'published',
    priority: 'featured',
  },
  {
    title: "General Staff Nurse",
    location: "Madurai",
    industry: "Medical / Healthcare",
    description: "Provide patient care and assist doctors.",
    eligibility: "B.Sc Nursing or GNM.",
    salaryMin: 18000,
    salaryMax: 30000,
    salaryCurrency: "INR",
    experienceMin: 1,
    experienceMax: 3,
    type: 'full-time',
    status: 'published',
    priority: 'normal',
  },
  {
    title: "Head Chef",
    location: "Coimbatore",
    industry: "Hotels / Restaurants",
    description: "Lead the kitchen team.",
    eligibility: "Degree in Culinary Arts.",
    salaryMin: 35000,
    salaryMax: 50000,
    salaryCurrency: "INR",
    experienceMin: 5,
    experienceMax: 10,
    type: 'full-time',
    status: 'published',
    priority: 'urgent',
  },
  {
    title: "Store Manager",
    location: "Trichy",
    industry: "Retail / FMCG",
    description: "Manage inventory and sales.",
    eligibility: "Any degree.",
    salaryMin: 20000,
    salaryMax: 35000,
    salaryCurrency: "INR",
    experienceMin: 2,
    experienceMax: 4,
    type: 'full-time',
    status: 'published',
    priority: 'normal',
  },
  {
    title: "Diesel Mechanic",
    location: "Salem",
    industry: "Automobile",
    description: "Repair and maintain heavy commercial vehicles.",
    eligibility: "ITI in Diesel Mechanic.",
    salaryMin: 15000,
    salaryMax: 22000,
    salaryCurrency: "INR",
    experienceMin: 1,
    experienceMax: 3,
    type: 'full-time',
    status: 'published',
    priority: 'normal',
  },
  {
    title: "Civil Site Engineer",
    location: "Tirunelveli",
    industry: "Construction",
    description: "Supervise construction site.",
    eligibility: "B.E. Civil Engineering.",
    salaryMin: 18000,
    salaryMax: 25000,
    salaryCurrency: "INR",
    experienceMin: 0,
    experienceMax: 2,
    type: 'full-time',
    status: 'published',
    priority: 'featured',
  },
  {
    title: "Customer Support Executive",
    location: "Chennai",
    industry: "BPO / Customer Services",
    description: "Handle inbound customer queries.",
    eligibility: "12th Pass or Diploma.",
    salaryMin: 12000,
    salaryMax: 18000,
    salaryCurrency: "INR",
    experienceMin: 0,
    experienceMax: 1,
    type: 'full-time',
    status: 'published',
    priority: 'urgent',
  },
  {
    title: "Field Sales Officer",
    location: "Erode",
    industry: "Sales & Marketing",
    description: "Visit clients to sell banking products.",
    eligibility: "Any Degree.",
    salaryMin: 15000,
    salaryMax: 25000,
    salaryCurrency: "INR",
    experienceMin: 1,
    experienceMax: 3,
    type: 'full-time',
    status: 'published',
    priority: 'normal',
  },
  {
    title: "NEET Physics Faculty",
    location: "Namakkal",
    industry: "Education & Training",
    description: "Teach Physics for NEET aspirants.",
    eligibility: "M.Sc Physics / B.Tech.",
    salaryMin: 40000,
    salaryMax: 60000,
    salaryCurrency: "INR",
    experienceMin: 2,
    experienceMax: 5,
    type: 'contract',
    status: 'published',
    priority: 'featured',
  },
  {
    title: "Mechanical Maintenance Engg",
    location: "Hosur",
    industry: "Engineering & Technical",
    description: "Maintenance of CNC machines.",
    eligibility: "B.E. Mechanical.",
    salaryMin: 22000,
    salaryMax: 30000,
    salaryCurrency: "INR",
    experienceMin: 2,
    experienceMax: 4,
    type: 'full-time',
    status: 'published',
    priority: 'normal',
  },
  {
    title: "Quality Controller (Garments)",
    location: "Tiruppur",
    industry: "Textiles & Garments",
    description: "Inspect finished garments.",
    eligibility: "10th/12th Pass.",
    salaryMin: 12000,
    salaryMax: 18000,
    salaryCurrency: "INR",
    experienceMin: 1,
    experienceMax: 3,
    type: 'full-time',
    status: 'published',
    priority: 'urgent',
  },
  {
    title: "Production Assistant",
    location: "Sivakasi",
    industry: "Small – scale Manufacturing",
    description: "Assist in printing and binding.",
    eligibility: "Hardworking.",
    salaryMin: 10000,
    salaryMax: 14000,
    salaryCurrency: "INR",
    experienceMin: 0,
    experienceMax: 1,
    type: 'full-time',
    status: 'published',
    priority: 'normal',
  },
  {
    title: "Accounts Manager",
    location: "Karur",
    industry: "MSME",
    description: "Handle GST filing and Tally.",
    eligibility: "B.Com/M.Com.",
    salaryMin: 25000,
    salaryMax: 35000,
    salaryCurrency: "INR",
    experienceMin: 4,
    experienceMax: 7,
    type: 'full-time',
    status: 'published',
    priority: 'urgent',
  },
  {
    title: "Digital Marketing Intern",
    location: "Coimbatore",
    industry: "Start-Ups",
    description: "Manage social media pages.",
    eligibility: "Any degree.",
    salaryMin: 8000,
    salaryMax: 12000,
    salaryCurrency: "INR",
    experienceMin: 0,
    experienceMax: 1,
    type: 'internship',
    status: 'published',
    priority: 'normal',
  },
  {
    title: "Medical Lab Technician",
    location: "Thanjavur",
    industry: "Medical / Healthcare",
    description: "Collect samples and perform tests.",
    eligibility: "DMLT or B.Sc MLT.",
    salaryMin: 14000,
    salaryMax: 20000,
    salaryCurrency: "INR",
    experienceMin: 1,
    experienceMax: 3,
    type: 'full-time',
    status: 'published',
    priority: 'normal',
  },
  {
    title: "Restaurant Manager",
    location: "Pondicherry",
    industry: "Hotels / Restaurants",
    description: "Manage front of house.",
    eligibility: "Degree in Hotel Management.",
    salaryMin: 25000,
    salaryMax: 40000,
    salaryCurrency: "INR",
    experienceMin: 3,
    experienceMax: 6,
    type: 'full-time',
    status: 'published',
    priority: 'featured',
  },
  {
    title: "Salesman (Textile Showroom)",
    location: "Kanchipuram",
    industry: "Retail / FMCG",
    description: "Assist customers in selecting sarees.",
    eligibility: "Good communication skills.",
    salaryMin: 12000,
    salaryMax: 16000,
    salaryCurrency: "INR",
    experienceMin: 1,
    experienceMax: 5,
    type: 'full-time',
    status: 'published',
    priority: 'urgent',
  },
  {
    title: "Car Wash Supervisor",
    location: "Chennai",
    industry: "Automobile",
    description: "Manage a team of cleaners.",
    eligibility: "10th Pass.",
    salaryMin: 15000,
    salaryMax: 18000,
    salaryCurrency: "INR",
    experienceMin: 2,
    experienceMax: 5,
    type: 'full-time',
    status: 'published',
    priority: 'normal',
  },
  {
    title: "Structural Engineer",
    location: "Madurai",
    industry: "Construction",
    description: "Design and analyze structures.",
    eligibility: "M.E. Structural Engineering.",
    salaryMin: 30000,
    salaryMax: 45000,
    salaryCurrency: "INR",
    experienceMin: 2,
    experienceMax: 5,
    type: 'full-time',
    status: 'published',
    priority: 'normal',
  },
  {
    title: "Tele-Sales Executive",
    location: "Coimbatore",
    industry: "BPO / Customer Services",
    description: "Outbound calling.",
    eligibility: "Fresher or Experienced.",
    salaryMin: 12000,
    salaryMax: 20000,
    salaryCurrency: "INR",
    experienceMin: 0,
    experienceMax: 2,
    type: 'full-time',
    status: 'published',
    priority: 'urgent',
  },
  {
    title: "Merchandiser",
    location: "Tiruppur",
    industry: "Textiles & Garments",
    description: "Coordinate between buyers and production.",
    eligibility: "Apparel Merchandising degree.",
    salaryMin: 20000,
    salaryMax: 30000,
    salaryCurrency: "INR",
    experienceMin: 2,
    experienceMax: 4,
    type: 'full-time',
    status: 'published',
    priority: 'normal',
  }
];

/**
 * Development-only setup API to bootstrap the initial admin user and mock data.
 * This is NOT available in production.
 */
export async function POST(req: Request) {
  // Security: Only allow this in development environment
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse(null, { status: 404 });
  }

  const body = await req.json().catch(() => ({}));

  const email = body.email || "Admin@dev.com";
  const password = body.password || "Admin@dev.com";
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

  // 2. Seed the mock jobs linked to this user
  if (userId) {
    try {
      logs.push("Step 2: Seeding mock jobs...");
      await db.insert(jobs).values(
        MOCK_JOBS.map((job) => ({
          ...job,
          createdBy: userId!,
          config: DEFAULT_JOB_CONFIG,
        }))
      );
      logs.push(`Seeded ${MOCK_JOBS.length} jobs`);
    } catch (error: any) {
      logs.push(`Step 2 Failed: ${error.message}`);
    }
  } else {
    logs.push("Skipping Step 2: No valid User ID found");
  }

  // 3. Seed job configurations
  try {
    logs.push("Step 3: Seeding job configurations...");
    await db.insert(jobConfigs).values([
      {
        name: "Default Config",
        config: DEFAULT_JOB_CONFIG,
      },
      {
        name: "Minimal Config",
        config: {
          fullName: "required",
          email: "required",
          phone: "required",
          resumeUrl: "shown",
        } as Record<string, "required" | "shown" | "hidden">,
      },
    ]);
    logs.push("Seeded job configurations");
  } catch (error: any) {
    logs.push(`Step 3 Failed: ${error.message}`);
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
    jobsCount: MOCK_JOBS.length,
  });
}