import { z } from "zod";

const phoneRegex = /^[+]?[\d\s\-()]{8,20}$/;
const nameRegex = /^[a-zA-Z\s'-]+$/;

const minAge = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        return age - 1;
    }
    return age;
};

export const buildFormSchema = (cfg: Record<string, string>) => {
    const field = (name: string) => {
        const required = cfg?.[name] === "required";
        switch (name) {
            case "fullName":
                return required
                    ? z.string()
                          .min(2, { message: "Name must be at least 2 characters" })
                          .max(100, { message: "Name is too long" })
                          .regex(nameRegex, { message: "Name can only contain letters, spaces, hyphens, and apostrophes" })
                    : z.string().optional();
            case "email":
                return required
                    ? z.string().email({ message: "Please enter a valid email address" })
                    : z.string().email({ message: "Please enter a valid email address" }).optional().or(z.literal(""));
            case "phone":
                return required
                    ? z.string()
                          .min(8, { message: "Phone number is too short" })
                          .max(20, { message: "Phone number is too long" })
                          .regex(phoneRegex, { message: "Please enter a valid phone number" })
                    : z.string().regex(phoneRegex, { message: "Please enter a valid phone number" }).optional().or(z.literal(""));
            case "dateOfBirth":
                return required
                    ? z.string()
                          .min(1, { message: "Date of birth is required" })
                          .refine((val) => {
                              const age = minAge(val);
                              return age >= 18;
                          }, { message: "You must be at least 18 years old" })
                    : z.string().optional();
            case "linkedinProfile":
                return required
                    ? z.string()
                          .url({ message: "Please enter a valid URL" })
                          .refine((val) => val.includes("linkedin.com"), { message: "Please enter a valid LinkedIn URL" })
                    : z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal(""));
            case "portfolio":
                return required
                    ? z.string().url({ message: "Please enter a valid URL" })
                    : z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal(""));
            case "currentSalary":
            case "expectedSalary":
                return required
                    ? z.string()
                          .min(1, { message: `${name === "currentSalary" ? "Current" : "Expected"} salary is required` })
                          .refine((val) => !isNaN(Number(val.replace(/[^0-9.]/g, ""))) && Number(val.replace(/[^0-9.]/g, "")) > 0, {
                              message: "Please enter a valid salary amount",
                          })
                    : z.string().optional();
            case "keySkills":
                return required
                    ? z.string()
                          .min(3, { message: "Please enter at least one skill" })
                          .max(500, { message: "Skills description is too long" })
                    : z.string().optional();
            case "preferredJobType":
                return required
                    ? z.enum(["Full-time", "Part-time", "Contract"])
                    : z.enum(["Full-time", "Part-time", "Contract"]).optional();
            case "resumeUrl":
                return required
                    ? z.string().min(1, { message: "Please upload your resume" })
                    : z.string().optional();
            case "currentLocation":
            case "preferredWorkLocation":
                return required
                    ? z.string()
                          .min(2, { message: "Location is required" })
                          .max(100, { message: "Location name is too long" })
                    : z.string().optional();
            default:
                return required
                    ? z.string().min(1, { message: `${name} is required` })
                    : z.string().optional();
        }
    };

    return z.object({
        fullName: field("fullName"),
        email: field("email"),
        phone: field("phone"),
        gender: field("gender"),
        currentLocation: field("currentLocation"),
        preferredWorkLocation: field("preferredWorkLocation"),
        totalExperience: field("totalExperience"),
        currentCompany: field("currentCompany"),
        currentDesignation: field("currentDesignation"),
        currentSalary: field("currentSalary"),
        expectedSalary: field("expectedSalary"),
        noticePeriod: field("noticePeriod"),
        highestQualification: field("highestQualification"),
        specialization: field("specialization"),
        university: field("university"),
        keySkills: field("keySkills"),
        preferredJobType: field("preferredJobType"),
        dateOfBirth: field("dateOfBirth"),
        linkedinProfile: field("linkedinProfile"),
        portfolio: field("portfolio"),
        resumeUrl: field("resumeUrl"),
    });
};

export type FormSchema = ReturnType<typeof buildFormSchema>;
