import { z } from "zod";

// Build a Zod schema based on job config: required fields are validated, shown/optional fields are allowed
export const buildFormSchema = (cfg: Record<string, string>) => {
    const field = (name: string) => {
        const required = cfg?.[name] === "required";
        switch (name) {
            case "email":
                return required ? z.string().email({ message: "Invalid email" }) : z.string().optional();
            case "dateOfBirth":
                return required ? z.string().min(1, { message: "Date of birth is required" }) : z.string().optional();
            case "linkedinProfile":
            case "portfolio":
                return required
                    ? z.string().url({ message: "Must be a valid URL" })
                    : z.string().optional();
            case "preferredJobType":
                return required
                    ? z.enum(["Full-time", "Part-time", "Contract"])
                    : z.enum(["Full-time", "Part-time", "Contract"]).optional();
            case "resumeUrl":
                return required ? z.string().min(1, { message: "Resume is required" }) : z.string().optional();
            default:
                return required ? z.string().min(1, { message: `${name} is required` }) : z.string().optional();
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
