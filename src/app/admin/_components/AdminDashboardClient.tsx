"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Menu,
  LogOut,
  Plus,
  ChevronLeft,
  X,
  ExternalLink,
  MapPin,
  Calendar,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Trash2,
  Lock,
  Settings,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { authClient } from "~/server/better-auth/client";
import Image from "next/image";

const INDUSTRIES = [
  "Medical / Healthcare",
  "Hotels / Restaurants",
  "Retail / FMCG",
  "Automobile",
  "Construction",
  "BPO / Customer Services",
  "Sales & Marketing",
  "Education & Training",
  "Engineering & Technical",
  "Textile Manufacturing",
  "Small – scale Manufacturing",
  "Textiles & Garments",
  "MSME",
  "Start-Ups",
];

const FIELD_NAMES = [
  { key: "fullName", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "gender", label: "Gender" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "currentLocation", label: "Current Location" },
  { key: "preferredWorkLocation", label: "Preferred Work Location" },
  { key: "totalExperience", label: "Total Experience" },
  { key: "currentCompany", label: "Current Company" },
  { key: "currentDesignation", label: "Current Designation" },
  { key: "currentSalary", label: "Current Salary" },
  { key: "expectedSalary", label: "Expected Salary" },
  { key: "noticePeriod", label: "Notice Period" },
  { key: "highestQualification", label: "Highest Qualification" },
  { key: "specialization", label: "Specialization" },
  { key: "university", label: "University" },
  { key: "keySkills", label: "Key Skills" },
  { key: "preferredJobType", label: "Preferred Job Type" },
  { key: "linkedinProfile", label: "LinkedIn Profile" },
  { key: "portfolio", label: "Portfolio" },
  { key: "resumeUrl", label: "Resume Upload" },
];

export default function AdminDashboardClient() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<
    "jobs" | "applicants" | "configs"
  >("jobs");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const utils = api.useUtils();
  const { data: jobs = [], isLoading: jobsLoading } =
    api.jobs.getAllAdmin.useQuery();
  const { data: applicants = [], isLoading: appLoading } =
    api.applications.getAll.useQuery();
  const { data: configs = [], isLoading: configsLoading } =
    api.jobConfigs.getAll.useQuery();

  const createJobMutation = api.jobs.create.useMutation({
    onSuccess: () => {
      toast.success("Job published successfully!");
      void utils.jobs.getAllAdmin.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteJobMutation = api.jobs.delete.useMutation({
    onSuccess: () => {
      toast.success("Job deleted successfully!");
      void utils.jobs.getAllAdmin.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateJobStatusMutation = api.jobs.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Job status updated!");
      void utils.jobs.getAllAdmin.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateApplicantStatusMutation =
    api.applications.updateStatus.useMutation({
      onSuccess: () => {
        toast.success("Applicant status updated!");
        void utils.applications.getAll.invalidate();
      },
      onError: (err) => toast.error(err.message),
    });

  const createConfigMutation = api.jobConfigs.create.useMutation({
    onSuccess: () => {
      toast.success("Config created successfully!");
      void utils.jobConfigs.getAll.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteConfigMutation = api.jobConfigs.delete.useMutation({
    onSuccess: () => {
      toast.success("Config deleted successfully!");
      void utils.jobConfigs.getAll.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateConfigMutation = api.jobConfigs.update.useMutation({
    onSuccess: () => {
      toast.success("Config updated successfully!");
      void utils.jobConfigs.getAll.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const NavItems = () => (
    <nav className="flex-1 space-y-2 py-4">
      <Button
        variant={activeView === "jobs" ? "secondary" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveView("jobs");
          setIsMobileMenuOpen(false);
        }}
      >
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Jobs Management
      </Button>

      <Button
        variant={activeView === "applicants" ? "secondary" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveView("applicants");
          setIsMobileMenuOpen(false);
        }}
      >
        <Users className="mr-2 h-4 w-4" />
        Applicants
      </Button>

      <Button
        variant={activeView === "configs" ? "secondary" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveView("configs");
          setIsMobileMenuOpen(false);
        }}
      >
        <Settings className="mr-2 h-4 w-4" />
        Application Configs
      </Button>
    </nav>
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50 md:flex-row">
      {/* MOBILE HEADER */}
      <header className="z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white p-4 md:hidden">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden">
            <Image
              src="/assets/dharvista-logo.jpg"
              alt="Logo"
              width={48}
              height={48}
              className="h-full w-full object-cover mix-blend-multiply"
            />
          </div>
          <span className="text-primary text-xl font-black tracking-[1.5px] uppercase">
            DHARVISTA
          </span>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="text-primary h-8 w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex w-64 flex-col p-0">
            <div className="text-primary border-b p-6 text-lg font-bold uppercase">
              Menu
            </div>
            <div className="flex-1 p-4">
              <NavItems />
            </div>
            <div className="border-t p-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* DESKTOP SIDEBAR */}
      <aside className="z-10 hidden h-full w-72 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="flex flex-col items-center gap-2 border-b border-gray-100 p-6 text-center">
          <div className="relative h-20 w-20 overflow-hidden transition-transform hover:scale-105">
            <Image
              src="/assets/dharvista-logo.jpg"
              alt="Logo"
              width={80}
              height={80}
              className="h-full w-full object-cover mix-blend-multiply"
            />
          </div>
          <div>
            <h2 className="text-primary text-2xl leading-none font-black tracking-[1.5px] uppercase">
              DHARVISTA
            </h2>
            <p className="mt-1 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
              Admin Portal
            </p>
          </div>
        </div>

        <div className="flex-1 p-4">
          <NavItems />
        </div>

        <div className="border-t border-gray-100 p-4">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {activeView === "jobs"
                ? "Jobs Overview"
                : activeView === "applicants"
                  ? "Candidate Applications"
                  : "Application Form Configs"}
            </h1>
          </div>

          {activeView === "jobs" ? (
            <JobsView
              jobs={jobs}
              configs={configs}
              createJob={(data) => createJobMutation.mutate(data)}
              deleteJob={(id) => deleteJobMutation.mutate({ id })}
              updateStatus={(id, status) =>
                updateJobStatusMutation.mutate({ id, status })
              }
              loading={jobsLoading}
            />
          ) : activeView === "applicants" ? (
            <ApplicantsView
              applicants={applicants}
              jobs={jobs}
              loading={appLoading}
              updateStatus={(id, status) =>
                updateApplicantStatusMutation.mutate({ id, status })
              }
            />
          ) : (
            <ConfigsView
              configs={configs}
              createConfig={(data) => createConfigMutation.mutate(data)}
              deleteConfig={(id) => deleteConfigMutation.mutate({ id })}
              updateConfig={(data) => updateConfigMutation.mutate(data)}
              loading={configsLoading}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// ----------------------------------------------------------------------
// JOBS VIEW COMPONENT
// ----------------------------------------------------------------------
function JobsView({
  jobs,
  configs,
  createJob,
  deleteJob,
  updateStatus,
  loading,
}: any) {
  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    industry: "",
    salaryMin: "" as any,
    salaryMax: "" as any,
    experienceMin: "" as any,
    experienceMax: "" as any,
    eligibility: "",
    description: "",
    type: "full-time",
    priority: "normal",
    status: "published",
    configId: "" as string | undefined,
  });

  const [customConfig, setCustomConfig] = useState<Record<
    string,
    "required" | "shown" | "hidden"
  > | null>(null);
  const [editingJobForConfig, setEditingJobForConfig] = useState<any>(null);
  const [isCustomConfigOpen, setIsCustomConfigOpen] = useState(false);

  useEffect(() => {
    if (configs && configs.length > 0 && !newJob.configId && !customConfig) {
      setNewJob((prev) => ({ ...prev, configId: configs[0].id }));
    }
  }, [configs, newJob.configId, customConfig]);

  const handleAddJob = () => {
    if (!newJob.title || !newJob.location) {
      toast.error("Title and Location are required");
      return;
    }

    const payload = {
      ...newJob,
      salaryMin: newJob.salaryMin ? parseInt(newJob.salaryMin) : null,
      salaryMax: newJob.salaryMax ? parseInt(newJob.salaryMax) : null,
      experienceMin: newJob.experienceMin ? parseInt(newJob.experienceMin) : 0,
      experienceMax: newJob.experienceMax
        ? parseInt(newJob.experienceMax)
        : null,
      // If custom config exists, we don't send configId
      ...(customConfig ? { config: customConfig, configId: undefined } : {}),
    };

    createJob(payload);

    setNewJob({
      title: "",
      location: "",
      industry: "",
      salaryMin: "",
      salaryMax: "",
      experienceMin: "",
      experienceMax: "",
      eligibility: "",
      description: "",
      type: "full-time",
      priority: "normal",
      status: "published",
      configId: configs?.[0]?.id,
    });
    setCustomConfig(null);
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-400">Loading jobs...</div>
    );

  return (
    <div className="space-y-6 pb-10">
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle>Post New Job</CardTitle>
          <CardDescription>
            Enter requirements for the position.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              placeholder="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
            <Input
              placeholder="Location"
              value={newJob.location}
              onChange={(e) =>
                setNewJob({ ...newJob, location: e.target.value })
              }
            />
            <Select
              value={newJob.type}
              onValueChange={(val) => setNewJob({ ...newJob, type: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="md:col-span-1">
              <Select
                value={newJob.industry}
                onValueChange={(val) => setNewJob({ ...newJob, industry: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Input
              placeholder="Min Salary"
              type="number"
              value={newJob.salaryMin}
              onChange={(e) =>
                setNewJob({ ...newJob, salaryMin: e.target.value })
              }
            />
            <Input
              placeholder="Max Salary"
              type="number"
              value={newJob.salaryMax}
              onChange={(e) =>
                setNewJob({ ...newJob, salaryMax: e.target.value })
              }
            />
            <div className="flex gap-2">
              <Input
                placeholder="Min Exp"
                type="number"
                className="w-1/2"
                value={newJob.experienceMin}
                onChange={(e) =>
                  setNewJob({ ...newJob, experienceMin: e.target.value })
                }
              />
              <Input
                placeholder="Max Exp"
                type="number"
                className="w-1/2"
                value={newJob.experienceMax}
                onChange={(e) =>
                  setNewJob({ ...newJob, experienceMax: e.target.value })
                }
              />
            </div>
          </div>

          <Textarea
            placeholder="Eligibility Criteria..."
            value={newJob.eligibility}
            onChange={(e) =>
              setNewJob({ ...newJob, eligibility: e.target.value })
            }
            className="h-20"
          />
          <Textarea
            placeholder="Job Description..."
            value={newJob.description}
            onChange={(e) =>
              setNewJob({ ...newJob, description: e.target.value })
            }
            className="h-32"
          />

          <div className="space-y-4 rounded-lg border bg-gray-50/50 p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">
                Application Form Configuration
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCustomConfigOpen(true)}
                className={customConfig ? "border-primary text-primary" : ""}
              >
                {customConfig
                  ? "Edit Custom Config"
                  : "Create Custom For This Job"}
              </Button>
            </div>

            {!customConfig ? (
              <div className="space-y-2">
                <Select
                  value={newJob.configId || ""}
                  onValueChange={(val) =>
                    setNewJob({
                      ...newJob,
                      configId: val,
                    })
                  }
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select a configuration" />
                  </SelectTrigger>
                  <SelectContent>
                    {configs.length === 0 && (
                      <SelectItem value="none" disabled>
                        No configs found
                      </SelectItem>
                    )}
                    {configs.map((config: any) => (
                      <SelectItem key={config.id} value={config.id}>
                        {config.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Choose from existing configurations or create a custom one.
                </p>
              </div>
            ) : (
              <div className="border-primary/20 flex items-center justify-between rounded-md border bg-white p-3">
                <div className="flex items-center gap-2">
                  <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
                  <span className="text-sm font-medium">
                    Using Custom Configuration
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCustomConfig(null);
                    if (configs?.[0])
                      setNewJob((prev) => ({
                        ...prev,
                        configId: configs[0].id,
                      }));
                  }}
                  className="h-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  Reset to Default
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex w-full items-center space-x-2 rounded-md border bg-gray-50 px-4 py-2 md:w-auto">
              <input
                type="checkbox"
                id="urgentParams"
                className="h-4 w-4"
                checked={newJob.priority === "urgent"}
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    priority: e.target.checked ? "urgent" : "normal",
                  })
                }
              />
              <label
                htmlFor="urgentParams"
                className="cursor-pointer text-sm font-medium"
              >
                Mark as Urgent Hiring
              </label>
            </div>
            <Button onClick={handleAddJob} className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Publish Job
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={isCustomConfigOpen}
        onOpenChange={(open) => {
          setIsCustomConfigOpen(open);
          if (!open) setEditingJobForConfig(null);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingJobForConfig
                ? `Custom Job Configuration — ${editingJobForConfig.title}`
                : "Custom Job Configuration"}
            </DialogTitle>
            <DialogDescription>
              Configure which fields are required, shown, or hidden for this
              specific job.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FIELD_NAMES.map((field) => {
              const currentValue = customConfig?.[field.key] || "shown";
              return (
                <div
                  key={field.key}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span className="text-sm font-medium">{field.label}</span>
                  <div className="flex rounded-md bg-gray-100 p-1">
                    {(["required", "shown", "hidden"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() =>
                          setCustomConfig({
                            ...(customConfig || {}),
                            [field.key]: mode,
                          })
                        }
                        className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${
                          currentValue === mode
                            ? "text-primary bg-white shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {mode === "shown" ? "Show" : mode}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsCustomConfigOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!customConfig) {
                  const initial: any = {};
                  FIELD_NAMES.forEach((f) => (initial[f.key] = "shown"));
                  setCustomConfig(initial);
                }
                // keep the dialog UX consistent; if editing an existing job we
                // keep the edited config in memory (preview only)
                setIsCustomConfigOpen(false);
                if (editingJobForConfig) {
                  toast.success("Configuration updated (preview)");
                }
              }}
            >
              Apply Configuration
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Active Jobs ({jobs.length})</h3>
        {jobs.map((job: any) => (
          <Card
            key={job.id}
            className={`${job.status === "closed" ? "bg-gray-100 opacity-70" : ""}`}
          >
            <CardContent className="flex flex-col justify-between gap-4 p-4 md:flex-row">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold">{job.title}</h4>
                  <Badge
                    variant={
                      job.priority === "urgent" ? "destructive" : "secondary"
                    }
                  >
                    {job.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  {job.location} • {job.industry} • {job.type}
                </p>
              </div>
              <div className="flex items-center gap-2 self-end md:self-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateStatus(
                      job.id,
                      job.status === "published" ? "closed" : "published",
                    )
                  }
                >
                  {job.status === "published" ? "Close" : "Publish"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // preload custom config from job (either inline config or linked template)
                    const preloaded =
                      job.config ||
                      configs?.find((c: any) => c.id === job.configId)
                        ?.config ||
                      null;
                    setCustomConfig(preloaded);
                    setEditingJobForConfig(job);
                    setIsCustomConfigOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    if (confirm("Delete this job?")) deleteJob(job.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// APPLICANTS VIEW COMPONENT
// ----------------------------------------------------------------------
function ApplicantsView({ applicants, jobs, loading, updateStatus }: any) {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-400">
        Loading applications...
      </div>
    );

  if (selectedJob) {
    const jobApplicants = applicants.filter(
      (app: any) => app.jobId === selectedJob.id,
    );

    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => setSelectedJob(null)}
          className="mb-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{selectedJob.title}</CardTitle>
            <CardDescription>{jobApplicants.length} Applicants</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobApplicants.map((app: any) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">
                      {app.fullName}
                    </TableCell>
                    <TableCell>{app.totalExperience}</TableCell>
                    <TableCell>{app.currentLocation}</TableCell>
                    <TableCell>
                      <Badge
                        variant={app.status === "new" ? "default" : "outline"}
                      >
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={app.status}
                        onValueChange={(val) => updateStatus(app.id, val)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="hired">Hired</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job: any) => {
        const count = applicants.filter(
          (app: any) => app.jobId === job.id,
        ).length;
        return (
          <Card
            key={job.id}
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => setSelectedJob(job)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <CardDescription>{job.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {count} Applications
                </span>
                <ChevronLeft className="h-4 w-4 rotate-180 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
// ----------------------------------------------------------------------
// CONFIGS VIEW COMPONENT
// ----------------------------------------------------------------------
function ConfigsView({
  configs,
  createConfig,
  deleteConfig,
  updateConfig,
  loading,
}: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<any>(null);
  const [currentConfig, setCurrentConfig] = useState({
    name: "",
    config: {} as Record<string, "required" | "shown" | "hidden">,
  });

  const handleOpenCreate = () => {
    setEditingConfig(null);
    setCurrentConfig({ name: "", config: {} });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (config: any) => {
    setEditingConfig(config);
    setCurrentConfig({
      name: config.name,
      config: { ...config.config },
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentConfig.name) {
      toast.error("Config name is required");
      return;
    }

    if (editingConfig) {
      updateConfig({
        id: editingConfig.id,
        name: currentConfig.name,
        config: currentConfig.config,
      });
    } else {
      createConfig(currentConfig);
    }

    setIsDialogOpen(false);
  };

  const updateField = (
    fieldKey: string,
    value: "required" | "shown" | "hidden",
  ) => {
    setCurrentConfig((prev) => ({
      ...prev,
      config: { ...prev.config, [fieldKey]: value },
    }));
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">Loading configs...</div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Application Form Configurations</CardTitle>
            <CardDescription>
              Manage reusable templates for job application forms
            </CardDescription>
          </div>
          <Button onClick={handleOpenCreate}>
            <Plus className="mr-2 h-4 w-4" /> New Template
          </Button>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">
          Saved Templates ({configs.length})
        </h3>
        {configs.length === 0 && (
          <p className="py-4 text-gray-500 italic">No templates created yet.</p>
        )}
        {configs.map((config: any) => (
          <Card key={config.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50/50 py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{config.name}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEdit(config)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => {
                      if (confirm(`Delete config "${config.name}"?`)) {
                        deleteConfig(config.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                <div>
                  <span className="mb-2 flex items-center gap-1 font-semibold text-green-600">
                    <CheckCircle className="h-3 w-3" /> Required
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(config.config)
                      .filter(([_, v]) => v === "required")
                      .map(([k]) => (
                        <Badge
                          key={k}
                          variant="default"
                          className="px-1.5 py-0 text-[10px]"
                        >
                          {FIELD_NAMES.find((f) => f.key === k)?.label || k}
                        </Badge>
                      ))}
                    {Object.entries(config.config).filter(
                      ([_, v]) => v === "required",
                    ).length === 0 && (
                      <span className="text-xs text-gray-400 italic">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="mb-2 flex items-center gap-1 font-semibold text-blue-600">
                    <Clock className="h-3 w-3" /> Optional
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(config.config)
                      .filter(([_, v]) => v === "shown")
                      .map(([k]) => (
                        <Badge
                          key={k}
                          variant="secondary"
                          className="px-1.5 py-0 text-[10px]"
                        >
                          {FIELD_NAMES.find((f) => f.key === k)?.label || k}
                        </Badge>
                      ))}
                    {Object.entries(config.config).filter(
                      ([_, v]) => v === "shown",
                    ).length === 0 && (
                      <span className="text-xs text-gray-400 italic">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="mb-2 flex items-center gap-1 font-semibold text-gray-500">
                    <XCircle className="h-3 w-3" /> Hidden
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(config.config)
                      .filter(([_, v]) => v === "hidden")
                      .map(([k]) => (
                        <Badge
                          key={k}
                          variant="outline"
                          className="px-1.5 py-0 text-[10px] text-gray-400"
                        >
                          {FIELD_NAMES.find((f) => f.key === k)?.label || k}
                        </Badge>
                      ))}
                    {Object.entries(config.config).filter(
                      ([_, v]) => v === "hidden",
                    ).length === 0 && (
                      <span className="text-xs text-gray-400 italic">None</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingConfig ? "Edit Template" : "New Form Template"}
            </DialogTitle>
            <DialogDescription>
              Define which fields should be required or optional in the
              application form.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Template Name</label>
              <Input
                placeholder="e.g. Sales Executive Form, IT Dev Application"
                value={currentConfig.name}
                onChange={(e) =>
                  setCurrentConfig({ ...currentConfig, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Field Settings</label>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {FIELD_NAMES.map((field) => {
                  const currentValue =
                    currentConfig.config[field.key] || "hidden";
                  return (
                    <div
                      key={field.key}
                      className="flex items-center justify-between rounded-lg border bg-white p-3"
                    >
                      <span className="text-sm font-medium">{field.label}</span>
                      <div className="flex rounded-md bg-gray-100 p-0.5">
                        {(["required", "shown", "hidden"] as const).map(
                          (mode) => (
                            <button
                              key={mode}
                              onClick={() => updateField(field.key, mode)}
                              className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${
                                currentValue === mode
                                  ? "text-primary bg-white shadow-sm"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              {mode === "shown" ? "Optional" : mode}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingConfig ? "Save Changes" : "Create Template"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
