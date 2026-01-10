"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function ApplicantsView({
  applicants,
  jobs,
  loading,
  updateStatus,
}: any) {
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
