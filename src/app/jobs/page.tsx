"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  Search,
  MapPin,
  Briefcase,
  Flame,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { FilterSelect } from "~/components/filters/FilterSelect";
import Layout from "~/components/Layout";
import { api } from "~/trpc/react";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const JOBS_PER_PAGE = 6;

  const { data: allJobs = [], isLoading } = api.jobs.getAll.useQuery({
    location: selectedLocation || undefined,
    industry: selectedIndustry || undefined,
  });

  const { data: filters } = api.jobs.getFilters.useQuery();

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const hasActiveFilters = searchTerm || selectedIndustry || selectedLocation;

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedIndustry("");
    setSelectedLocation("");
  };

  return (
    <Layout>
      <section className="section-padding bg-gradient-to-b from-amber-50 to-white">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
              Current Job Openings
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Explore exciting career opportunities across multiple industries.
            </p>
          </div>

          <Card className="mb-12 border-none shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search job title or keywords..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <FilterSelect
                  label="Industry"
                  options={filters?.industries ?? []}
                  value={selectedIndustry}
                  onChange={setSelectedIndustry}
                />

                <FilterSelect
                  label="Location"
                  options={filters?.locations ?? []}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                />
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {filteredJobs.length}{" "}
                    {filteredJobs.length === 1 ? "job" : "jobs"}
                  </p>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="text-primary h-10 w-10 animate-spin" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground mb-2 text-xl">
                No jobs found
              </p>
              <p className="text-muted-foreground text-sm">
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="group border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-start justify-between">
                        <h3 className="group-hover:text-primary line-clamp-2 text-lg font-bold text-gray-900 transition-colors">
                          {job.title}
                        </h3>
                        {job.priority === "featured" && (
                          <Badge
                            variant="secondary"
                            className="border-amber-200 bg-amber-100 text-amber-800"
                          >
                            <Flame className="mr-1 h-3 w-3" />
                            Featured
                          </Badge>
                        )}
                        {job.priority === "urgent" && (
                          <Badge variant="destructive">Urgent</Badge>
                        )}
                      </div>

                      <div className="mb-4 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="mr-2 h-4 w-4 text-gray-400" />
                          <span>{job.industry}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t pt-4">
                        <span className="text-primary text-sm font-semibold">
                          ₹{(job.salaryMin / 100000).toFixed(1)}L - ₹
                          {(job.salaryMax / 100000).toFixed(1)}L
                        </span>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="group-hover:text-primary"
                        >
                          <Link href={`/jobs/${job.id}`}>View Details →</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {visibleCount < filteredJobs.length && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() =>
                      setVisibleCount((prev) => prev + JOBS_PER_PAGE)
                    }
                  >
                    Load More Jobs
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
