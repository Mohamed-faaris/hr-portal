"use client";

import { api } from "~/trpc/react";
import { toast } from "sonner";
import ApplicantsView from "../_components/ApplicantsView";

export default function ApplicantsPage() {
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
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Candidate Applications
        </h1>
      </div>
      <ApplicantsView
        applicants={applicants}
        jobs={jobs}
        loading={appLoading}
        updateStatus={(id: string, status: string) =>
          updateApplicantStatusMutation.mutate({ id, status })
        }
      />
    </>
  );
}
