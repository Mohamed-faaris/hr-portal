"use client";

import { useState } from "react";
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

export default function AdminDashboardClient() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<"jobs" | "applicants">("jobs");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const utils = api.useUtils();
  const { data: jobs = [], isLoading: jobsLoading } =
    api.jobs.getAllAdmin.useQuery();
  const { data: applicants = [], isLoading: appLoading } =
    api.applications.getAll.useQuery();

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
    </nav>
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50 md:flex-row">
      {/* MOBILE HEADER */}
      <header className="z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white p-4 md:hidden">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden">
            <Image
              src="/dharvista-logo.jpg"
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
              src="/dharvista-logo.jpg"
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
                : "Candidate Applications"}
            </h1>
          </div>

          {activeView === "jobs" ? (
            <JobsView
              jobs={jobs}
              createJob={(data) => createJobMutation.mutate(data)}
              deleteJob={(id) => deleteJobMutation.mutate({ id })}
              updateStatus={(id, status) =>
                updateJobStatusMutation.mutate({ id, status })
              }
              loading={jobsLoading}
            />
          ) : (
            <ApplicantsView
              applicants={applicants}
              jobs={jobs}
              loading={appLoading}
              updateStatus={(id, status) =>
                updateApplicantStatusMutation.mutate({ id, status })
              }
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
function JobsView({ jobs, createJob, deleteJob, updateStatus, loading }: any) {
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
  });

  const handleAddJob = () => {
    if (!newJob.title || !newJob.location) {
      toast.error("Title and Location are required");
      return;
    }
    createJob({
      ...newJob,
      salaryMin: newJob.salaryMin ? parseInt(newJob.salaryMin) : null,
      salaryMax: newJob.salaryMax ? parseInt(newJob.salaryMax) : null,
      experienceMin: newJob.experienceMin ? parseInt(newJob.experienceMin) : 0,
      experienceMax: newJob.experienceMax
        ? parseInt(newJob.experienceMax)
        : null,
    });
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
    });
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
