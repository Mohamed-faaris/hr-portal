"use client";

import { api } from "~/trpc/react";
import { toast } from "sonner";
import JobsView from "../_components/JobsView";

export default function JobsPage() {
  const utils = api.useUtils();
  const { data: jobs = [], isLoading: jobsLoading } =
    api.jobs.getAllAdmin.useQuery();
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

  const updateJobPriorityMutation = api.jobs.updatePriority.useMutation({
    onSuccess: () => {
      toast.success("Job priority updated!");
      void utils.jobs.getAllAdmin.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Jobs Overview
        </h1>
      </div>
      <JobsView
        jobs={jobs}
        configs={configs}
        createJob={createJobMutation}
        deleteJob={deleteJobMutation}
        updateStatus={updateJobStatusMutation}
        updatePriority={updateJobPriorityMutation}
        loading={jobsLoading || configsLoading}
      />
    </>
  );
}
