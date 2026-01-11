"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, Download } from "lucide-react";
import type {
  ColumnDef,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { Applicant, ApplicantStatus } from "~/types";

interface ApplicantWithOptimistic extends Applicant {
  _optimisticStatus?: ApplicantStatus;
}

const STATUS_BADGE_VARIANTS: Record<
  ApplicantStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  new: "default",
  contacted: "secondary",
  hired: "default",
  rejected: "destructive",
};

interface Job {
  id: string;
  title: string;
  location: string;
}

export default function ApplicantsView({
  applicants,
  jobs,
  loading,
  initialJobId,
  updateStatus,
}: {
  applicants: Applicant[];
  jobs: Job[];
  loading: boolean;
  initialJobId: string | null;
  updateStatus: (id: string, status: ApplicantStatus) => void;
}) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [optimisticUpdates, setOptimisticUpdates] = useState<
    Record<string, ApplicantStatus>
  >({});

  useEffect(() => {
    if (initialJobId && jobs.length > 0 && !selectedJob) {
      const job = jobs.find((j) => j.id === initialJobId);
      if (job) setSelectedJob(job);
    }
  }, [initialJobId, jobs, selectedJob]);

  // Merge optimistic updates with applicants
  const applicantsWithOptimistic: ApplicantWithOptimistic[] = useMemo(
    () =>
      applicants.map((app) => ({
        ...app,
        _optimisticStatus: optimisticUpdates[app.id] ?? app.status,
      })),
    [applicants, optimisticUpdates],
  );

  const handleStatusChange = (id: string, newStatus: ApplicantStatus) => {
    // Optimistic update
    setOptimisticUpdates((prev) => ({
      ...prev,
      [id]: newStatus,
    }));

    // Call the actual mutation
    updateStatus(id, newStatus);

    // Clean up optimistic update after a delay or on response
    // This will be cleared when the query is refetched
    setTimeout(() => {
      setOptimisticUpdates((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }, 3000);
  };

  const columns: ColumnDef<ApplicantWithOptimistic>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email: string = row.getValue("email");
        return (
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
            {email}
          </a>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        const phone: string = row.getValue("phone");
        return (
          <a href={`tel:${phone}`} className="text-blue-600 hover:underline">
            {phone}
          </a>
        );
      },
    },
    {
      accessorKey: "resumeLink",
      header: "Resume",
      cell: ({ row }) => {
        const resumeLink: string = row.getValue("resumeLink");
        const status = (row.getValue("_optimisticStatus") ??
          row.getValue("status")) as ApplicantStatus | undefined;

        if (!resumeLink) {
          return <span className="text-gray-500">NA</span>;
        }

        return (
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <Download className="h-4 w-4" />
            View
          </a>
        );
      },
    },
    {
      accessorKey: "_optimisticStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("_optimisticStatus");
        return (
          <Badge variant={STATUS_BADGE_VARIANTS[status as ApplicantStatus]}>
            {(status as ApplicantStatus).charAt(0).toUpperCase() +
              (status as ApplicantStatus).slice(1)}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const applicant = row.original;
        const currentStatus = applicant._optimisticStatus ?? applicant.status;

        return (
          <Select
            value={currentStatus}
            onValueChange={(val) =>
              handleStatusChange(applicant.id, val as ApplicantStatus)
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
  ];

  const table = useReactTable({
    data: applicantsWithOptimistic,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
  });

  if (loading)
    return (
      <div className="p-10 text-center text-gray-400">
        Loading applications...
      </div>
    );

  if (selectedJob) {
    const jobApplicants = applicantsWithOptimistic.filter(
      (app) => app.jobId === selectedJob.id,
    );

    // Use original API data for exports to include full fields
    const downloadRows = applicants.filter((a) => a.jobId === selectedJob.id);

    const exportToCSV = (rows: Applicant[]) => {
      const headers = [
        "id",
        "name",
        "email",
        "phone",
        "jobId",
        "jobTitle",
        "appliedAt",
        "status",
        "resumeLink",
        "notes",
      ];

      const csv = [headers.join(",")]
        .concat(
          rows.map((r) =>
            headers
              .map((h) => {
                const v = (r as any)[h] ?? "";
                const s = String(v).replace(/"/g, '""');
                return `"${s}"`;
              })
              .join(","),
          ),
        )
        .join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedJob.title.replace(/\s+/g, "_")}_applicants.csv`;
      a.click();
      URL.revokeObjectURL(url);
    };

    const exportToXLS = (rows: Applicant[]) => {
      // Use CSV content but set Excel MIME type so it opens in Excel
      const headers = [
        "id",
        "name",
        "email",
        "phone",
        "jobId",
        "jobTitle",
        "appliedAt",
        "status",
        "resumeLink",
        "notes",
      ];

      const csv = [headers.join(",")]
        .concat(
          rows.map((r) =>
            headers
              .map((h) => {
                const v = (r as any)[h] ?? "";
                const s = String(v).replace(/"/g, '""');
                return `"${s}"`;
              })
              .join(","),
          ),
        )
        .join("\n");

      const blob = new Blob([csv], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedJob.title.replace(/\s+/g, "_")}_applicants.xls`;
      a.click();
      URL.revokeObjectURL(url);
    };

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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="!mb-0">{selectedJob.title}</CardTitle>
                <CardDescription>
                  {jobApplicants.length} Applicants
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Export</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => exportToCSV(downloadRows)}>
                      Download CSV
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => exportToXLS(downloadRows)}>
                      Download XLS
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {jobApplicants.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center text-gray-400"
                      >
                        No applicants found
                      </TableCell>
                    </TableRow>
                  ) : (
                    jobApplicants.map((applicant) => {
                      const applicantRow = table
                        .getRowModel()
                        .rows.find((row) => row.original.id === applicant.id);
                      return applicantRow ? (
                        <TableRow key={applicant.id}>
                          {applicantRow.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ) : null;
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Export All</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                // export all applicants from API data as CSV
                const rows = applicants;
                const headers = [
                  "id",
                  "name",
                  "email",
                  "phone",
                  "jobId",
                  "jobTitle",
                  "appliedAt",
                  "status",
                  "resumeLink",
                  "notes",
                ];

                const csv = [headers.join(",")]
                  .concat(
                    rows.map((r) =>
                      headers
                        .map((h) => {
                          const v = (r as any)[h] ?? "";
                          const s = String(v).replace(/"/g, '""');
                          return `"${s}"`;
                        })
                        .join(","),
                    ),
                  )
                  .join("\n");

                const blob = new Blob([csv], {
                  type: "text/csv;charset=utf-8;",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `all_applicants.csv`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Download CSV
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                const rows = applicants;
                const headers = [
                  "id",
                  "name",
                  "email",
                  "phone",
                  "jobId",
                  "jobTitle",
                  "appliedAt",
                  "status",
                  "resumeLink",
                  "notes",
                ];

                const csv = [headers.join(",")]
                  .concat(
                    rows.map((r) =>
                      headers
                        .map((h) => {
                          // @ts-expect-error simple index
                          const v = (r as any)[h] ?? "";
                          const s = String(v).replace(/"/g, '""');
                          return `"${s}"`;
                        })
                        .join(","),
                    ),
                  )
                  .join("\n");

                const blob = new Blob([csv], {
                  type: "application/vnd.ms-excel;charset=utf-8;",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `all_applicants.xls`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Download XLS
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => {
          const count = applicantsWithOptimistic.filter(
            (app) => app.jobId === job.id,
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
    </div>
  );
}
