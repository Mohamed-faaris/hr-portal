import { notFound } from "next/navigation";
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
import Layout from "~/components/Layout";
import { db } from "~/server/db";
import { jobs } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { JobDetailContent } from "../_components/JobDetailContent";

export async function generateStaticParams() {
  const allJobs = await db.query.jobs.findMany({
    where: eq(jobs.status, "published"),
  });
  return allJobs.map((job) => ({
    id: job.id,
  }));
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await db.query.jobs.findFirst({
    where: eq(jobs.id, id),
  });

  if (!job) {
    notFound();
  }

  return (
    <Layout>
      <JobDetailContent job={job as any} />
    </Layout>
  );
}
