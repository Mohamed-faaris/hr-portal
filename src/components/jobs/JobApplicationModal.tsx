import { useState } from "react";
import type { Job } from "~/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useToast } from "~/hooks/use-toast";
import { z } from "zod";
import { buildFormSchema } from "~/lib/formValidation";
import { cn } from "~/lib/utils";
import {
  UploadCloud,
  FileText,
  X,
  Loader2,
  CheckCircle2,
  User,
  MapPin,
  Briefcase,
  Paperclip,
} from "lucide-react";
import { type inferRouterInputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";

interface JobApplicationModalProps {
  job: Job;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobApplicationModal({
  job,
  open,
  onOpenChange,
}: JobApplicationModalProps) {
  const { toast } = useToast();
  const createApplication = api.applications.create.useMutation();
  const getPresignedUrl = api.upload.getPresignedUrl.useMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    currentLocation: "",
    preferredWorkLocation: "",
    totalExperience: "",
    currentCompany: "",
    currentDesignation: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    highestQualification: "",
    specialization: "",
    university: "",
    keySkills: "",
    preferredJobType: "Full-time",
    dateOfBirth: "",
    linkedinProfile: "",
    portfolio: "",
  });

  const config = job.config ?? {
    fullName: "required",
    email: "required",
    phone: "required",
    resumeUrl: "required",
  };

  const isFieldVisible = (name: string) => {
    const val = config?.[name];
    return val === "shown" || val === "required";
  };

  const isPanelVisible = (names: string[]) => {
    return names.some((n) => isFieldVisible(n));
  };

  const isFieldRequired = (name: string) => {
    return config[name] === "required";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, DOC, or DOCX file.",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Resume size must be less than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setResume(file);
      if (fieldErrors["resumeUrl"]) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next["resumeUrl"];
          return next;
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const schema = buildFormSchema(config as Record<string, string>);
    const validationInput = {
      ...formData,
      resumeUrl: resume ? resume.name : "",
    };
    
    const result = schema.safeParse(validationInput as any);
    
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!errors[field]) {
          errors[field] = err.message;
        }
      });
      setFieldErrors(errors);
      
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      let resumeUrl: string | undefined = undefined;
      if (resume) {
        // Get presigned URL for upload
        const { uploadUrl, url } = await getPresignedUrl.mutateAsync({
          fileName: resume.name,
          fileType: resume.type,
          jobId: job.id,
          applicantName: formData.fullName,
          applicantEmail: formData.email,
        });

        // Upload file to S3/Backblaze
        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          body: resume,
          headers: {
            "Content-Type": resume.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload resume");
        }

        resumeUrl = url;
      }

      await createApplication.mutateAsync({
        jobId: job.id,
        ...(resumeUrl ? { resumeUrl } : {}),
        ...formData,
      });

      toast({
        title: "Application Submitted!",
        description: "We have received your application. Good luck!",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        currentLocation: "",
        preferredWorkLocation: "",
        totalExperience: "",
        currentCompany: "",
        currentDesignation: "",
        currentSalary: "",
        expectedSalary: "",
        noticePeriod: "",
        highestQualification: "",
        specialization: "",
        university: "",
        keySkills: "",
        preferredJobType: "Full-time",
        dateOfBirth: "",
        linkedinProfile: "",
        portfolio: "",
      });
      setResume(null);
      setFieldErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Submission Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* RESPONSIVE CONTAINER:
        - Mobile: w-[95vw], max-w-[95vw], h-[90vh]
        - PC: md:w-full, md:max-w-[80vw], md:h-[85vh]
      */}
      <DialogContent className="flex h-[90vh] w-[95vw] max-w-[95vw] flex-col gap-0 overflow-hidden rounded-xl bg-stone-50 p-0 shadow-2xl md:h-[85vh] md:w-full md:max-w-[80vw]">
        {/* Header */}
        <DialogHeader className="shrink-0 border-b border-amber-100 bg-amber-50 p-4 md:p-6">
          <DialogTitle className="flex items-center gap-3 text-xl font-bold text-amber-950 md:text-2xl">
            <div className="shrink-0 rounded-lg bg-amber-100 p-2 text-amber-600">
              <FileText className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <span className="truncate">
              Apply for <span className="text-amber-700">{job.title}</span>
            </span>
          </DialogTitle>
          <DialogDescription className="mt-2 ml-0 text-sm text-amber-800/70 md:mt-0 md:ml-14 md:text-base">
            Fill in the details below. Fields marked with{" "}
            <span className="text-red-500">*</span> are mandatory.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <form
            id="job-app-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2"
          >
            {/* LEFT COLUMN */}
            <div className="space-y-4 md:space-y-6">
              {/* Personal Information */}
              {isPanelVisible([
                "fullName",
                "email",
                "phone",
                "gender",
                "dateOfBirth",
              ]) && (
                <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm md:space-y-5 md:p-6">
                  <h3 className="flex items-center gap-2 border-b border-stone-100 pb-3 text-sm font-bold tracking-wider text-stone-800 uppercase">
                    <User className="h-4 w-4 text-amber-600" /> Personal Details
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                    {isFieldVisible("fullName") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Full Name{" "}
                          {isFieldRequired("fullName") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          name="fullName"
                          required={isFieldRequired("fullName")}
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className={cn(
                            "border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.fullName && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.fullName && (
                          <p className="text-xs text-red-500">{fieldErrors.fullName}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("email") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Email{" "}
                          {isFieldRequired("email") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          name="email"
                          type="email"
                          required={isFieldRequired("email")}
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className={cn(
                            "border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.email && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.email && (
                          <p className="text-xs text-red-500">{fieldErrors.email}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("phone") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Phone{" "}
                          {isFieldRequired("phone") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          name="phone"
                          required={isFieldRequired("phone")}
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91..."
                          className={cn(
                            "border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.phone && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.phone && (
                          <p className="text-xs text-red-500">{fieldErrors.phone}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("gender") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Gender{" "}
                          {isFieldRequired("gender") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(val) =>
                            handleSelectChange("gender", val)
                          }
                          required={isFieldRequired("gender")}
                        >
                          <SelectTrigger className={cn(
                            "border-stone-200 bg-stone-50 focus:ring-amber-500/20",
                            fieldErrors.gender && "border-red-500"
                          )}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {fieldErrors.gender && (
                          <p className="text-xs text-red-500">{fieldErrors.gender}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("dateOfBirth") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Date of Birth{" "}
                          {isFieldRequired("dateOfBirth") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          name="dateOfBirth"
                          type="date"
                          required={isFieldRequired("dateOfBirth")}
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className={cn(
                            "border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.dateOfBirth && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.dateOfBirth && (
                          <p className="text-xs text-red-500">{fieldErrors.dateOfBirth}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Location */}
              {isPanelVisible([
                "currentLocation",
                "preferredWorkLocation",
                "preferredJobType",
              ]) && (
                <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm md:space-y-5 md:p-6">
                  <h3 className="flex items-center gap-2 border-b border-stone-100 pb-3 text-sm font-bold tracking-wider text-stone-800 uppercase">
                    <MapPin className="h-4 w-4 text-amber-600" /> Location &
                    Preferences
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                    {isFieldVisible("currentLocation") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Current Location{" "}
                          {isFieldRequired("currentLocation") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          name="currentLocation"
                          required={isFieldRequired("currentLocation")}
                          value={formData.currentLocation}
                          onChange={handleInputChange}
                          className={cn(
                            "border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.currentLocation && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.currentLocation && (
                          <p className="text-xs text-red-500">{fieldErrors.currentLocation}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("preferredWorkLocation") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Preferred Location{" "}
                          {isFieldRequired("preferredWorkLocation") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          name="preferredWorkLocation"
                          required={isFieldRequired("preferredWorkLocation")}
                          value={formData.preferredWorkLocation}
                          onChange={handleInputChange}
                          className={cn(
                            "border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.preferredWorkLocation && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.preferredWorkLocation && (
                          <p className="text-xs text-red-500">{fieldErrors.preferredWorkLocation}</p>
                        )}
                      </div>
                    )}

                    {isFieldVisible("preferredJobType") && (
                      <div className="space-y-3 pt-2 md:col-span-2">
                        <Label className="text-stone-600">
                          Job Type{" "}
                          {isFieldRequired("preferredJobType") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <RadioGroup
                          defaultValue="Full-time"
                          value={formData.preferredJobType}
                          onValueChange={(val) =>
                            handleSelectChange("preferredJobType", val)
                          }
                          className="flex flex-wrap gap-3 md:gap-4"
                        >
                          {["Full-time", "Part-time", "Contract"].map(
                            (type) => (
                              <div
                                key={type}
                                className="flex min-w-[100px] flex-1 items-center space-x-2 rounded-lg border border-stone-200 bg-white px-3 py-2 transition-colors hover:bg-stone-50 md:px-4 md:py-3"
                              >
                                <RadioGroupItem
                                  value={type}
                                  id={type}
                                  className="border-stone-400 text-amber-600"
                                />
                                <Label
                                  htmlFor={type}
                                  className="w-full cursor-pointer text-sm font-normal text-stone-700 md:text-base"
                                >
                                  {type}
                                </Label>
                              </div>
                            ),
                          )}
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4 md:space-y-6">
              {/* Professional & Education */}
              {isPanelVisible([
                "totalExperience",
                "highestQualification",
                "currentCompany",
                "currentDesignation",
                "currentSalary",
                "expectedSalary",
                "keySkills",
                "linkedinProfile",
                "portfolio",
              ]) && (
                <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm md:space-y-5 md:p-6">
                  <h3 className="flex items-center gap-2 border-b border-stone-100 pb-3 text-sm font-bold tracking-wider text-stone-800 uppercase">
                    <Briefcase className="h-4 w-4 text-amber-600" />{" "}
                    Professional Details
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                    {isFieldVisible("totalExperience") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Total Experience{" "}
                          {isFieldRequired("totalExperience") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Select
                          value={formData.totalExperience}
                          onValueChange={(val) =>
                            handleSelectChange("totalExperience", val)
                          }
                          required={isFieldRequired("totalExperience")}
                        >
                          <SelectTrigger className={cn(
                            "border-stone-200 bg-stone-50 focus:ring-amber-500/20",
                            fieldErrors.totalExperience && "border-red-500"
                          )}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fresher">Fresher</SelectItem>
                            <SelectItem value="0-1">0 - 1 Years</SelectItem>
                            <SelectItem value="1-3">1 - 3 Years</SelectItem>
                            <SelectItem value="3-5">3 - 5 Years</SelectItem>
                            <SelectItem value="5-10">5 - 10 Years</SelectItem>
                            <SelectItem value="10+">10+ Years</SelectItem>
                          </SelectContent>
                        </Select>
                        {fieldErrors.totalExperience && (
                          <p className="text-xs text-red-500">{fieldErrors.totalExperience}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("highestQualification") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Highest Qualification{" "}
                          {isFieldRequired("highestQualification") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Select
                          value={formData.highestQualification}
                          onValueChange={(val) =>
                            handleSelectChange("highestQualification", val)
                          }
                          required={isFieldRequired("highestQualification")}
                        >
                          <SelectTrigger className={cn(
                            "border-stone-200 bg-stone-50 focus:ring-amber-500/20",
                            fieldErrors.highestQualification && "border-red-500"
                          )}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="doctorate">
                              Ph.D / Doctorate
                            </SelectItem>
                            <SelectItem value="post-graduate">
                              Post Graduate
                            </SelectItem>
                            <SelectItem value="graduate">Graduate</SelectItem>
                            <SelectItem value="diploma">Diploma</SelectItem>
                          </SelectContent>
                        </Select>
                        {fieldErrors.highestQualification && (
                          <p className="text-xs text-red-500">{fieldErrors.highestQualification}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("currentCompany") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Current Company{" "}
                          {isFieldRequired("currentCompany") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          name="currentCompany"
                          required={isFieldRequired("currentCompany")}
                          value={formData.currentCompany}
                          onChange={handleInputChange}
                          className={cn(
                            "border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.currentCompany && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.currentCompany && (
                          <p className="text-xs text-red-500">{fieldErrors.currentCompany}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("currentDesignation") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Current Designation{" "}
                          {isFieldRequired("currentDesignation") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          name="currentDesignation"
                          required={isFieldRequired("currentDesignation")}
                          value={formData.currentDesignation}
                          onChange={handleInputChange}
                          className={cn(
                            "border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.currentDesignation && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.currentDesignation && (
                          <p className="text-xs text-red-500">{fieldErrors.currentDesignation}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("currentSalary") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Current Salary{" "}
                          {isFieldRequired("currentSalary") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          name="currentSalary"
                          required={isFieldRequired("currentSalary")}
                          value={formData.currentSalary}
                          onChange={handleInputChange}
                          className={cn(
                            "border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.currentSalary && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.currentSalary && (
                          <p className="text-xs text-red-500">{fieldErrors.currentSalary}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("expectedSalary") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Expected Salary{" "}
                          {isFieldRequired("expectedSalary") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          name="expectedSalary"
                          required={isFieldRequired("expectedSalary")}
                          value={formData.expectedSalary}
                          onChange={handleInputChange}
                          className={cn(
                            "border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.expectedSalary && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.expectedSalary && (
                          <p className="text-xs text-red-500">{fieldErrors.expectedSalary}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("keySkills") && (
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-stone-600">
                          Key Skills{" "}
                          {isFieldRequired("keySkills") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Textarea
                          name="keySkills"
                          required={isFieldRequired("keySkills")}
                          value={formData.keySkills}
                          onChange={handleInputChange}
                          placeholder="React, Java, Python..."
                          className={cn(
                            "min-h-[60px] resize-none border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.keySkills && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.keySkills && (
                          <p className="text-xs text-red-500">{fieldErrors.keySkills}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("linkedinProfile") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          LinkedIn Profile{" "}
                          {isFieldRequired("linkedinProfile") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          name="linkedinProfile"
                          required={isFieldRequired("linkedinProfile")}
                          value={formData.linkedinProfile}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/..."
                          className={cn(
                            "border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.linkedinProfile && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.linkedinProfile && (
                          <p className="text-xs text-red-500">{fieldErrors.linkedinProfile}</p>
                        )}
                      </div>
                    )}
                    {isFieldVisible("portfolio") && (
                      <div className="space-y-2">
                        <Label className="text-stone-600">
                          Portfolio{" "}
                          {isFieldRequired("portfolio") && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          name="portfolio"
                          required={isFieldRequired("portfolio")}
                          value={formData.portfolio}
                          onChange={handleInputChange}
                          placeholder="https://yourportfolio.com"
                          className={cn(
                            "border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-amber-500/20",
                            fieldErrors.portfolio && "border-red-500 focus:border-red-500"
                          )}
                        />
                        {fieldErrors.portfolio && (
                          <p className="text-xs text-red-500">{fieldErrors.portfolio}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Resume & Captcha */}
              {isPanelVisible(["resumeUrl"]) && (
                <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm md:space-y-5 md:p-6">
                  <h3 className="flex items-center gap-2 border-b border-stone-100 pb-3 text-sm font-bold tracking-wider text-stone-800 uppercase">
                    <Paperclip className="h-4 w-4 text-amber-600" /> Resume
                    Verification
                  </h3>

                  <div className="space-y-3">
                    <Label className="text-stone-600">
                      Upload Resume{" "}
                      {isFieldRequired("resumeUrl") && (
                        <span className="text-red-500">*</span>
                      )}
                    </Label>
                    <div className={cn(
                      "group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-amber-50/30 p-4 text-center transition-colors hover:bg-amber-50 md:p-8",
                      fieldErrors.resumeUrl ? "border-red-300" : "border-amber-200"
                    )}>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required={isFieldRequired("resumeUrl")}
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                      />

                      {resume ? (
                        <div className="flex flex-col items-center gap-2 text-green-700">
                          <div className="rounded-full bg-green-100 p-2">
                            <CheckCircle2 className="h-6 w-6" />
                          </div>
                          <span className="max-w-[200px] truncate text-sm font-medium">
                            {resume.name}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="relative z-20 h-6 px-2 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={(e) => {
                              e.preventDefault();
                              setResume(null);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-transform group-hover:scale-110 md:h-12 md:w-12">
                            <UploadCloud className="h-5 w-5 md:h-6 md:w-6" />
                          </div>
                          <p className="text-sm font-medium text-stone-700">
                            Click to upload or drag and drop
                          </p>
                          <p className="mt-1 text-xs text-stone-500">
                            PDF, DOC, DOCX (Max 5MB)
                          </p>
                        </>
                      )}
                    </div>
                    {fieldErrors.resumeUrl && (
                      <p className="text-xs text-red-500">{fieldErrors.resumeUrl}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end gap-3 border-t border-stone-200 bg-stone-50 p-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="border-stone-300 text-stone-700 hover:bg-stone-100"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="job-app-form"
            className="min-w-[120px] bg-amber-600 font-semibold text-white shadow-lg shadow-amber-600/20 hover:bg-amber-700 md:min-w-[160px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
