"use client";

import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import ApplicantsView from "../_components/ApplicantsView";
import type { ApplicantStatus } from "~/types";

function ApplicantsContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [initialJobId, setInitialJobId] = useState<string | null>(jobId);

  const utils = api.useUtils();
  const { data: jobs = [] } = api.jobs.getAllAdmin.useQuery();
  const { data: applicants = [], isLoading: appLoading } =
    api.applications.getAll.useQuery();

  const updateApplicantStatusMutation =
    api.applications.updateStatus.useMutation({
      onMutate: async ({ id, status }) => {
        // Cancel outgoing refetches
        await utils.applications.getAll.cancel();

        // Snapshot previous data
        const previousApplicants = utils.applications.getAll.getData();

        // Optimistically update to new value
        utils.applications.getAll.setData(undefined, (old) => {
          if (!old) return old;
          return old.map((app) =>
            app.id === id ? { ...app, status: status as ApplicantStatus } : app,
          );
        });

        // Return context with snapshotted value
        return { previousApplicants };
      },
      onError: (err, _newStatus, context) => {
        // Rollback on error
        if (context?.previousApplicants) {
          utils.applications.getAll.setData(
            undefined,
            context.previousApplicants,
          );
        }
        toast.error(`Failed to update status: ${err.message}`);
      },
      onSuccess: () => {
        toast.success("Applicant status updated!");
      },
      onSettled: () => {
        // Refetch after error or success
        void utils.applications.getAll.invalidate();
      },
    });

  return (
    <ApplicantsView
      applicants={applicants}
      jobs={jobs}
      loading={appLoading}
      initialJobId={initialJobId}
      updateStatus={(id: string, status: ApplicantStatus) =>
        updateApplicantStatusMutation.mutate({ id, status })
      }
    />
  );
}

export default function ApplicantsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Candidate Applications
        </h1>
      </div>
      <Suspense
        fallback={
          <div className="p-10 text-center text-gray-400">Loading...</div>
        }
      >
        <ApplicantsContent />
      </Suspense>
    </>
  );
}
