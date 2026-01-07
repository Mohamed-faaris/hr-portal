"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { JobApplicationModal } from "~/components/jobs/JobApplicationModal";
import type { Job } from "~/types";

interface JobDetailContentProps {
  job: Job;
}

export function JobDetailContent({ job }: JobDetailContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="section-padding bg-gradient-to-b from-amber-50 to-white">
        <div className="container-wide max-w-4xl">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/jobs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="mb-4 flex items-start justify-between">
                  <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                    {job.title}
                  </h1>
                  {job.priority === "featured" && (
                    <Badge
                      variant="secondary"
                      className="bg-amber-100 text-amber-800"
                    >
                      Featured
                    </Badge>
                  )}
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="mr-2 h-5 w-5" />
                    <span>{job.industry}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2 h-5 w-5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-2 h-5 w-5" />
                    <span className="capitalize">
                      {job.type.replace("-", " ")}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="mr-2 h-5 w-5" />
                    <span>
                      ₹{(job.salaryMin / 100000).toFixed(1)}L - ₹
                      {(job.salaryMax / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6 border-t pt-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Job Description
                </h2>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>

              <div className="mb-6 border-t pt-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Eligibility Criteria
                </h2>
                <p className="text-gray-600">{job.eligibility}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Experience Required:</span>{" "}
                    {job.experienceMin} - {job.experienceMax} years
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Apply Now
                </h2>
                <div className="flex flex-col gap-4 sm:flex-row">
                  {job.googleFormUrl ? (
                    <Button asChild size="lg" className="flex-1 sm:flex-none">
                      <a
                        href={job.googleFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply via Google Form
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="flex-1 bg-amber-600 text-white hover:bg-amber-700 sm:flex-none"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Apply Now
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50 sm:flex-none"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <JobApplicationModal
        job={job}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
