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
    <Main title="All jobs">
      <div className="flex gap-2">
        {(["all", "active", "completed", "cancelled"] as const).map(
          (filter) => (
            <Button
              key={filter}
              onClick={() => setJobFilter(filter)}
              className={`border ${jobFilter === filter ? "bg-primary text-white" : "bg-white border-neutral-200/80 text-foreground"}`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ),
        )}
      </div>
      <div className="space-y-4 mt-8">
        {getFilteredJobs().map((a, i) => (
          <Item key={i} className="shadow-xs bg-white">
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
}
