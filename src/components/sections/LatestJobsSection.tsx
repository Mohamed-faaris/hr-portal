"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { MapPin, Briefcase, ArrowRight, Flame } from "lucide-react";
import { api } from "~/trpc/react";
import type { Job } from "~/types";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "~/lib/animations";

export default function LatestJobsSection() {
  const { data: jobs = [], isLoading } = api.jobs.getLatest.useQuery({
    limit: 4,
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center">Loading latest opportunities...</div>
    );
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <motion.div
          className="mb-16 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer()}
        >
          <motion.h2
            className="text-foreground mb-4 text-3xl font-bold md:text-4xl"
            variants={fadeInUp}
          >
            Latest Openings
          </motion.h2>
          <motion.div
            className="bg-primary mx-auto mb-6 h-1 w-20"
            variants={fadeInUp}
          />
          <motion.p
            className="text-muted-foreground mx-auto max-w-2xl text-lg"
            variants={fadeInUp}
          >
            Explore the newest opportunities in Tamil Nadu.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer()}
        >
          {jobs.map((job) => (
            <motion.div key={job.id} variants={fadeInUp}>
              <JobCard job={job} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/jobs">
            <Button
              size="lg"
              variant="outline"
              className="border-primary/20 hover:bg-primary/5 text-foreground px-8"
            >
              View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <Card className="border-t-primary flex h-full flex-col overflow-hidden rounded-2xl border border-t-4 border-amber-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <Badge
            variant="secondary"
            className="mb-2 border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
          >
            {job.industry}
          </Badge>

          {job.priority === "urgent" && (
            <Badge
              variant="secondary"
              className="bg-accent text-accent-foreground flex h-5 items-center gap-1 border-yellow-400 px-1.5 text-[10px]"
            >
              <Flame className="h-3 w-3 fill-current" /> Urgent
            </Badge>
          )}
        </div>
        <CardTitle
          className="line-clamp-1 text-xl text-gray-900"
          title={job.title}
        >
          {job.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 p-6 pt-2">
        <p className="line-clamp-2 min-h-[40px] text-sm text-gray-500">
          {job.description.replace(/<[^>]*>/g, "")}
        </p>

        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full">
              <MapPin className="h-3 w-3" />
            </div>
            {job.location}
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full">
              <Briefcase className="h-3 w-3" />
            </div>
            {job.experienceMin}-{job.experienceMax} Years Exp
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto p-6 pt-0">
        <Link href={`/jobs/${job.id}`} className="w-full">
          <Button
            variant="outline"
            className="text-primary hover:bg-primary border-primary/20 h-10 w-full text-sm hover:text-white"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
