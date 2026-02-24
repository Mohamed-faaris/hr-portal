"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Users } from "lucide-react";
import Link from "next/link";
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
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Combobox } from "~/components/ui/combobox";
import { toast } from "sonner";
import { INDUSTRIES, FIELD_NAMES } from "./constants";

export default function JobsView({
  jobs,
  configs,
  createJob,
  deleteJob,
  updateStatus,
  updatePriority,
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
    if (!newJob.title) {
      toast.error("Job Title is required");
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

    createJob.mutate(payload);

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
      <div className="flex min-h-[400px] flex-col items-center justify-center p-10 text-center text-gray-400">
        <Loader2 className="text-primary/20 mb-4 h-10 w-10 animate-spin" />
        <p>Loading jobs and configurations...</p>
      </div>
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
            <div className="space-y-1">
              <label className="text-sm font-medium">Job Title *</label>
              <Input
                placeholder="Job Title"
                value={newJob.title}
                onChange={(e) =>
                  setNewJob({ ...newJob, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="Location"
                value={newJob.location}
                onChange={(e) =>
                  setNewJob({ ...newJob, location: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Job Type</label>
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
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-1 md:col-span-1">
              <label className="text-sm font-medium">Industry</label>
              <Combobox
                options={INDUSTRIES}
                value={newJob.industry}
                onChange={(val) => setNewJob({ ...newJob, industry: val })}
                placeholder="Select Industry"
                searchPlaceholder="Search or type custom industry..."
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Min Salary</label>
              <Input
                placeholder="Min Salary"
                type="number"
                value={newJob.salaryMin}
                onChange={(e) =>
                  setNewJob({ ...newJob, salaryMin: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Max Salary</label>
              <Input
                placeholder="Max Salary"
                type="number"
                value={newJob.salaryMax}
                onChange={(e) =>
                  setNewJob({ ...newJob, salaryMax: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Experience Range</label>
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
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Eligibility Criteria</label>
            <Textarea
              placeholder="Eligibility Criteria..."
              value={newJob.eligibility}
              onChange={(e) =>
                setNewJob({ ...newJob, eligibility: e.target.value })
              }
              className="h-20"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Job Description</label>
            <Textarea
              placeholder="Job Description..."
              value={newJob.description}
              onChange={(e) =>
                setNewJob({ ...newJob, description: e.target.value })
              }
              className="h-32"
            />
          </div>

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
            <Button
              onClick={handleAddJob}
              className="w-full md:w-auto"
              disabled={createJob.isPending}
            >
              {createJob.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Publish Job
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
        <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            <DialogHeader>
              <DialogTitle>
                {editingJobForConfig
                  ? `Custom Job Configuration \u2014 ${editingJobForConfig.title}`
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
                      {(["required", "shown", "hidden"] as const).map(
                        (mode) => (
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
                        ),
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex shrink-0 justify-end gap-3 border-t bg-white p-4">
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
        {jobs.map((job: any) => {
          const isDeleting =
            deleteJob.isPending && deleteJob.variables?.id === job.id;

          return (
            <Card
              key={job.id}
              className={`${job.status === "closed" ? "bg-gray-100 opacity-70" : ""} ${isDeleting ? "opacity-50" : ""}`}
            >
              <CardContent className="flex flex-col justify-between gap-4 p-4 md:flex-row">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold">{job.title}</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Badge
                          variant={
                            job.priority === "urgent"
                              ? "destructive"
                              : "secondary"
                          }
                          className="cursor-pointer capitalize"
                        >
                          {job.priority}
                        </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem
                          onClick={() =>
                            updatePriority.mutate({
                              id: job.id,
                              priority: "normal",
                            })
                          }
                        >
                          Normal
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updatePriority.mutate({
                              id: job.id,
                              priority: "urgent",
                            })
                          }
                        >
                          Urgent
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-gray-500">
                    {job.location} \u2022 {job.industry} \u2022 {job.type}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-end md:self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateStatus.mutate({
                        id: job.id,
                        status:
                          job.status === "published" ? "closed" : "published",
                      })
                    }
                  >
                    {job.status === "published" ? "Close" : "Publish"}
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/applicants/${job.id}`}>
                      <Users className="mr-2 h-3.5 w-3.5" />
                      View Applicants
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isDeleting}
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
                    disabled={isDeleting}
                    onClick={() => {
                      if (confirm("Delete this job?"))
                        deleteJob.mutate({ id: job.id });
                    }}
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
