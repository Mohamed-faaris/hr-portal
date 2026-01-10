"use client";

import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import ApplicantsView from "../_components/ApplicantsView";

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
      onSuccess: () => {
        toast.success("Applicant status updated!");
        void utils.applications.getAll.invalidate();
      },
      onError: (err) => toast.error(err.message),
    });

  return (
    <ApplicantsView
      applicants={applicants}
      jobs={jobs}
      loading={appLoading}
      initialJobId={initialJobId}
      updateStatus={(id: string, status: string) =>
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
