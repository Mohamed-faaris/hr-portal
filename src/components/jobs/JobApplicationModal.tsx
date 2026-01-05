import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useToast } from "~/hooks/use-toast";
import { UploadCloud, FileText, X, Loader2, CheckCircle2, User, MapPin, Briefcase, Paperclip } from "lucide-react";
import type { Job } from "~/types";

interface JobApplicationModalProps {
  job: Job;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobApplicationModal({ job, open, onOpenChange }: JobApplicationModalProps) {
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

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
    highestQualification: "",
    specialization: "",
    university: "",
    keySkills: "",
    preferredJobType: "Full-time",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast({ title: "Invalid File Type", description: "Please upload a PDF, DOC, or DOCX file.", variant: "destructive" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File Too Large", description: "Resume size must be less than 5MB.", variant: "destructive" });
        return;
      }
      setResume(file);
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resume) {
      toast({ title: "Resume Required", description: "Please upload your resume.", variant: "destructive" });
      return;
    }

    if (!captchaToken) {
      toast({ title: "Verification Required", description: "Please complete the reCAPTCHA.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      // 🟢 STEP 1: PREPARE DATA FOR BACKEND
      // We use 'FormData' because we are uploading a File (Resume)
      const payload = new FormData();
      
      // Append Metadata
      payload.append("jobId", job.id);
      payload.append("jobTitle", job.title); // Helpful for backend to know which job without looking up ID
      payload.append("captchaToken", captchaToken);
      
      // Append The File
      payload.append("resume", resume);

      // Append All Text Fields
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      // 🟢 STEP 2: SEND TO API (BACKEND HANDOVER SECTION)
      // ---------------------------------------------------------------------------
      // 🚧 TODO FOR BACKEND DEV: 
      // Replace the URL below with your actual API endpoint (e.g., http://localhost:5000/api/apply)
      // ---------------------------------------------------------------------------
      
      /* UNCOMMENT THIS BLOCK WHEN API IS READY
      
      const response = await fetch("https://your-api-domain.com/api/apply", {
        method: "POST",
        body: payload, 
        // ⚠️ IMPORTANT: Do NOT set 'Content-Type' header manually!
        // The browser automatically sets it to 'multipart/form-data; boundary=...'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed");
      }
      */

      // 🟡 FOR NOW: Simulate Success (So Frontend Dev can test UI)
      console.log("📦 [MOCK SUBMIT] Payload ready for backend:", payload);
      // To see the values in console, you have to loop them:
      for (const pair of payload.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
      // ---------------------------------------------------------------------------

      toast({
        title: "Application Submitted!",
        description: "We have received your application. Good luck!",
      });

      // Reset Form
      setFormData({
        fullName: "", email: "", phone: "", gender: "", currentLocation: "", preferredWorkLocation: "",
        totalExperience: "", currentCompany: "", currentDesignation: "", highestQualification: "",
        specialization: "", university: "", keySkills: "", preferredJobType: "Full-time",
      });
      setResume(null);
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
      onOpenChange(false);

    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive"
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
      <DialogContent className="w-[95vw] max-w-[95vw] md:w-full md:max-w-[80vw] h-[90vh] md:h-[85vh] p-0 gap-0 bg-stone-50 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <DialogHeader className="p-4 md:p-6 bg-amber-50 border-b border-amber-100 shrink-0">
          <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-3 text-amber-950">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600 shrink-0">
              <FileText className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <span className="truncate">Apply for <span className="text-amber-700">{job.title}</span></span>
          </DialogTitle>
          <DialogDescription className="text-amber-800/70 ml-0 md:ml-14 mt-2 md:mt-0 text-sm md:text-base">
            Fill in the details below. Fields marked with <span className="text-red-500">*</span> are mandatory.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <form id="job-app-form" onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
            
            {/* LEFT COLUMN */}
            <div className="space-y-4 md:space-y-6">
              {/* Personal Information */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-stone-200 shadow-sm space-y-4 md:space-y-5">
                <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2 border-b border-stone-100 pb-3">
                  <User className="w-4 h-4 text-amber-600" /> Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-2">
                    <Label className="text-stone-600">Full Name <span className="text-red-500">*</span></Label>
                    <Input name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" className="bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-stone-600">Email <span className="text-red-500">*</span></Label>
                    <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-stone-600">Phone <span className="text-red-500">*</span></Label>
                    <Input name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91..." className="bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-stone-600">Gender</Label>
                    <Select value={formData.gender} onValueChange={(val) => handleSelectChange("gender", val)}>
                      <SelectTrigger className="bg-stone-50 border-stone-200 focus:ring-amber-500/20">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-stone-200 shadow-sm space-y-4 md:space-y-5">
                <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2 border-b border-stone-100 pb-3">
                  <MapPin className="w-4 h-4 text-amber-600" /> Location & Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-2">
                    <Label className="text-stone-600">Current Location <span className="text-red-500">*</span></Label>
                    <Input name="currentLocation" required value={formData.currentLocation} onChange={handleInputChange} className="bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-stone-600">Preferred Location <span className="text-red-500">*</span></Label>
                    <Input name="preferredWorkLocation" required value={formData.preferredWorkLocation} onChange={handleInputChange} className="bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20" />
                  </div>
                  
                  <div className="md:col-span-2 space-y-3 pt-2">
                    <Label className="text-stone-600">Job Type</Label>
                    <RadioGroup 
                      defaultValue="Full-time" 
                      value={formData.preferredJobType} 
                      onValueChange={(val) => handleSelectChange("preferredJobType", val)}
                      className="flex flex-wrap gap-3 md:gap-4"
                    >
                      {["Full-time", "Part-time", "Contract"].map((type) => (
                        <div key={type} className="flex items-center space-x-2 border border-stone-200 rounded-lg px-3 py-2 md:px-4 md:py-3 hover:bg-stone-50 transition-colors flex-1 min-w-[100px] bg-white">
                          <RadioGroupItem value={type} id={type} className="text-amber-600 border-stone-400" />
                          <Label htmlFor={type} className="cursor-pointer font-normal text-stone-700 w-full text-sm md:text-base">{type}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4 md:space-y-6">
              {/* Professional & Education */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-stone-200 shadow-sm space-y-4 md:space-y-5">
                <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2 border-b border-stone-100 pb-3">
                  <Briefcase className="w-4 h-4 text-amber-600" /> Professional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-2">
                    <Label className="text-stone-600">Total Experience <span className="text-red-500">*</span></Label>
                    <Select value={formData.totalExperience} onValueChange={(val) => handleSelectChange("totalExperience", val)}>
                      <SelectTrigger className="bg-stone-50 border-stone-200 focus:ring-amber-500/20">
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
                  </div>
                  <div className="space-y-2">
                    <Label className="text-stone-600">Highest Qualification <span className="text-red-500">*</span></Label>
                    <Select value={formData.highestQualification} onValueChange={(val) => handleSelectChange("highestQualification", val)}>
                      <SelectTrigger className="bg-stone-50 border-stone-200 focus:ring-amber-500/20">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doctorate">Ph.D / Doctorate</SelectItem>
                        <SelectItem value="post-graduate">Post Graduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-stone-600">Current Company</Label>
                    <Input name="currentCompany" value={formData.currentCompany} onChange={handleInputChange} className="bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-stone-600">Current Designation</Label>
                    <Input name="currentDesignation" value={formData.currentDesignation} onChange={handleInputChange} className="bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-stone-600">Key Skills</Label>
                    <Textarea 
                        name="keySkills" 
                        value={formData.keySkills} 
                        onChange={handleInputChange} 
                        placeholder="React, Java, Python..." 
                        className="resize-none bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20 min-h-[60px]"
                    />
                  </div>
                </div>
              </div>

              {/* Resume & Captcha */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-stone-200 shadow-sm space-y-4 md:space-y-5">
                <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2 border-b border-stone-100 pb-3">
                  <Paperclip className="w-4 h-4 text-amber-600" /> Resume Verification
                </h3>
                
                <div className="space-y-3">
                  <Label className="text-stone-600">Upload Resume <span className="text-red-500">*</span></Label>
                  <div className="border-2 border-dashed border-amber-200 bg-amber-50/30 rounded-lg p-4 md:p-8 flex flex-col items-center justify-center text-center hover:bg-amber-50 transition-colors cursor-pointer relative group">
                    <Input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileChange} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    {resume ? (
                      <div className="flex flex-col items-center gap-2 text-green-700">
                        <div className="bg-green-100 p-2 rounded-full">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <span className="font-medium text-sm max-w-[200px] truncate">{resume.name}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 h-6 px-2 text-xs relative z-20"
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
                        <div className="h-10 w-10 md:h-12 md:w-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <UploadCloud className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <p className="text-sm font-medium text-stone-700">Click to upload or drag and drop</p>
                        <p className="text-xs text-stone-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Captcha */}
                <div className="pt-2 md:pt-4 flex justify-center scale-90 md:scale-100 origin-center">
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LeKLDssAAAAAL2_UAe8KJWwRfJ9dHpN0KziP897"
                        onChange={handleCaptchaChange}
                    />
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 shrink-0 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting} className="border-stone-300 text-stone-700 hover:bg-stone-100">
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="job-app-form"
            className="bg-amber-600 text-white hover:bg-amber-700 font-semibold min-w-[120px] md:min-w-[160px] shadow-lg shadow-amber-600/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Application"}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}