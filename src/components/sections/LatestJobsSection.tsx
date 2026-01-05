"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { MapPin, Briefcase, ArrowRight, Flame } from "lucide-react";
import { api } from "~/trpc/react";
import type { Job } from "~/types";

export default function LatestJobsSection() {
  const { data: jobs = [], isLoading } = api.jobs.getLatest.useQuery({ limit: 4 });

  if (isLoading) {
    return <div className="py-20 text-center">Loading latest opportunities...</div>;
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest Openings
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the newest opportunities in Tamil Nadu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/jobs">
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 text-foreground px-8">
              View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <Card className="flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-amber-100 border-t-4 border-t-primary rounded-2xl overflow-hidden bg-white">
      <CardHeader className="p-6 pb-4">
        <div className="flex justify-between items-start">
          <Badge variant="secondary" className="mb-2 bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200">{job.industry}</Badge>

          {job.priority === 'urgent' && (
            <Badge variant="secondary" className="flex items-center gap-1 text-[10px] px-1.5 h-5 bg-accent text-accent-foreground border-yellow-400">
                <Flame className="w-3 h-3 fill-current" /> Urgent
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl line-clamp-1 text-gray-900" title={job.title}>
          {job.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 p-6 pt-2">
        <p className="text-gray-500 text-sm line-clamp-2 min-h-[40px]">
          {job.description.replace(/<[^>]*>/g, '')}
        </p>

        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <MapPin className="h-3 w-3" />
            </div>
            {job.location}
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Briefcase className="h-3 w-3" />
            </div>
            {job.experienceMin}-{job.experienceMax} Years Exp
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 mt-auto">
        <Link href={`/jobs/${job.id}`} className="w-full">
          <Button variant="outline" className="w-full text-primary hover:text-white hover:bg-primary border-primary/20 h-10 text-sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}