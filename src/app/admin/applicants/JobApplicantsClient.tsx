"use client";

import ApplicantsView from "../_components/ApplicantsView";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import type { ApplicantStatus } from "~/types";
import { useEffect, useState, Suspense } from "react";

export default function JobApplicantsClient({ jobId }: { jobId: string }) {
  const [initialJobId, setInitialJobId] = useState<string | null>(null);
  useEffect(() => setInitialJobId(jobId), [jobId]);

  const utils = api.useUtils();
  const { data: jobs = [] } = api.jobs.getAllAdmin.useQuery();
  const { data: applicants = [], isLoading: appLoading } =
    api.applications.getByJob.useQuery({ jobId: jobId }, { enabled: !!jobId });

  const updateApplicantStatusMutation =
    api.applications.updateStatus.useMutation({
      onMutate: async ({ id, status }) => {
        await utils.applications.getByJob.cancel({ jobId });
        const previousApplicants = utils.applications.getByJob.getData({
          jobId,
        });

        utils.applications.getByJob.setData({ jobId }, (old) => {
          if (!old) return old;
          return old.map((app) =>
            app.id === id ? { ...app, status: status as ApplicantStatus } : app,
          );
        });

        return { previousApplicants };
      },
      onError: (err, _newStatus, context) => {
        if (context?.previousApplicants) {
          utils.applications.getByJob.setData(
            { jobId },
            context.previousApplicants,
          );
        }
        toast.error(`Failed to update status: ${err.message}`);
      },
      onSuccess: () => {
        toast.success("Applicant status updated!");
      },
      onSettled: () => void utils.applications.getAll.invalidate(),
    });

  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-gray-400">Loading...</div>
      }
    >
      <ApplicantsView
        applicants={applicants}
        jobs={jobs}
        loading={appLoading}
        initialJobId={initialJobId}
        updateStatus={(id: string, status: ApplicantStatus) =>
          updateApplicantStatusMutation.mutate({ id, status })
        }
      />
    </Suspense>
  );
}
