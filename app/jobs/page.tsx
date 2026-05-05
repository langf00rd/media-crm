"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Job, mockJobs } from "@/lib/data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const initialFilter =
    (searchParams.get("filter") as
      | "all"
      | "active"
      | "completed"
      | "cancelled") || "all";
  const [jobFilter, setJobFilter] = useState(initialFilter);

  useEffect(() => {
    if (searchParams.get("filter")) {
      setJobFilter(
        searchParams.get("filter") as
          | "all"
          | "active"
          | "completed"
          | "cancelled",
      );
    }
  }, [searchParams]);

  const getFilteredJobs = () => {
    if (jobFilter === "all") return mockJobs;
    if (jobFilter === "active")
      return mockJobs.filter(
        (job) => job.status === "in-progress" || job.status === "pending",
      );
    return mockJobs.filter((job) => job.status === jobFilter);
  };

  const statusColors: Record<Job["status"], string> = {
    completed: "bg-green-100 text-success",
    "in-progress": "bg-blue-100 text-primary",
    cancelled: "bg-red-100 text-danger",
    pending: "bg-yellow-100 text-warning",
  };

  return (
    <Main title="Jobs">
      <div className="flex gap-4">
        {(["all", "active", "completed", "cancelled"] as const).map(
          (filter) => (
            <Button
              key={filter}
              onClick={() => setJobFilter(filter)}
              className={`${jobFilter === filter ? "bg-primary text-white" : "bg-neutral-100 text-foreground hover:bg-neutral-200"}`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ),
        )}
      </div>
      <div className="space-y-4 mt-8">
        {getFilteredJobs().map((a, i) => (
          <Item key={i} className="border bg-neutral-50">
            <ItemContent>
              <ItemTitle>{a.clientName}</ItemTitle>
              <ItemDescription>{a.serviceType}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline">Mark as completed</Button>
            </ItemActions>
          </Item>
        ))}
      </div>
    </Main>
  );

  return (
    <Main title="Jobs">
      <h1 className="text-3xl font-bold text-foreground">All Jobs</h1>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {(["all", "active", "completed", "cancelled"] as const).map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setJobFilter(filter)}
              className={`px-4 py-2 rounded-pill font-medium whitespace-nowrap transition-all ${
                jobFilter === filter
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-foreground hover:bg-gray-200"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ),
        )}
      </div>

      <div className="space-y-3">
        {getFilteredJobs().map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="bg-card-bg backdrop-blur-lg rounded-card shadow-card p-6 cursor-pointer hover:shadow-card-lg transition-all block"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">
                  {job.clientName}
                </h3>
                <p className="text-text-secondary text-sm">{job.serviceType}</p>
                <p className="text-text-secondary text-sm mt-2">
                  {job.eventDate}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[job.status]}`}
                >
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Main>
  );
}
