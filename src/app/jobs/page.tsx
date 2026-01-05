"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Search, MapPin, Briefcase, Flame, Loader2, ChevronDown } from "lucide-react";
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Current Job Openings
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore exciting career opportunities across multiple industries.
            </p>
          </div>

          <Card className="border-none shadow-lg mb-12">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
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
                    Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
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
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-2">No jobs found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {visibleJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                          {job.title}
                        </h3>
                        {job.priority === 'featured' && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                            <Flame className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        {job.priority === 'urgent' && (
                          <Badge variant="destructive">Urgent</Badge>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{job.industry}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-sm font-semibold text-primary">
                          ₹{(job.salaryMin / 100000).toFixed(1)}L - ₹{(job.salaryMax / 100000).toFixed(1)}L
                        </span>
                        <Button asChild variant="ghost" size="sm" className="group-hover:text-primary">
                          <Link href={`/jobs/${job.id}`}>
                            View Details →
                          </Link>
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
                    onClick={() => setVisibleCount(prev => prev + JOBS_PER_PAGE)}
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
