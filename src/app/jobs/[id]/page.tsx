"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { MapPin, Briefcase, Clock, DollarSign, ArrowLeft, ExternalLink } from "lucide-react";
import Layout from "~/components/Layout";
import { api } from "~/trpc/react";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: job, isLoading } = api.jobs.getById.useQuery({ id });

  if (isLoading) {
    return (
      <Layout>
        <div className="section-padding container-wide">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!job) {
    notFound();
  }

  return (
    <Layout>
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
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {job.title}
                  </h1>
                  {job.priority === 'featured' && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      Featured
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-5 w-5 mr-2" />
                    <span>{job.industry}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="capitalize">{job.type.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>₹{(job.salaryMin / 100000).toFixed(1)}L - ₹{(job.salaryMax / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>

              <div className="border-t pt-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
                <p className="text-gray-600">{job.eligibility}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Experience Required:</span> {job.experienceMin} - {job.experienceMax} years
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Apply Now</h2>
                {job.googleFormUrl ? (
                  <Button asChild size="lg" className="w-full md:w-auto">
                    <a href={job.googleFormUrl} target="_blank" rel="noopener noreferrer">
                      Apply via Google Form
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="w-full md:w-auto">
                    <Link href="/contact">
                      Contact Us to Apply
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
