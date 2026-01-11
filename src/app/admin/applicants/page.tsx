"use client";

import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function ApplicantsPage() {
  const router = useRouter();
  const { data: jobsWithCounts = [], isLoading } =
    api.applications.getAll.useQuery();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Candidate Applications
        </h1>
        <p className="mt-2 text-gray-600">Click on a job to view applicants</p>
      </div>

      {isLoading ? (
        <div className="p-10 text-center text-gray-400">
          Loading jobs overview...
        </div>
      ) : jobsWithCounts.length === 0 ? (
        <div className="p-10 text-center text-gray-400">No jobs found</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobsWithCounts.map((job) => (
            <Card
              key={job.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() =>
                router.push(`/admin/applicants/${encodeURIComponent(job.id)}`)
              }
            >
              <CardHeader>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <CardDescription>{job.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {job.applicationCount} Applications
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
