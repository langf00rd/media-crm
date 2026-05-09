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
import { getRequests } from "@/lib/supabase/queries";
import type { Request } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function RequestsContent() {
  const searchParams = useSearchParams();
  const initialFilter =
    (searchParams.get("filter") as
      | "all"
      | "active"
      | "completed"
      | "cancelled") || "all";
  const [requestFilter, setRequestFilter] = useState(initialFilter);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchParams.get("filter")) {
      setRequestFilter(
        searchParams.get("filter") as
          | "all"
          | "active"
          | "completed"
          | "cancelled",
      );
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    getRequests(requestFilter).then(setRequests).finally(() => setLoading(false));
  }, [requestFilter]);

  return (
    <Main title="All activities">
      <div className="flex gap-2">
        {(["all", "active", "completed", "cancelled"] as const).map(
          (filter) => (
            <Button
              key={filter}
              onClick={() => setRequestFilter(filter)}
              className={`border ${requestFilter === filter ? "bg-primary text-white" : "bg-white border-neutral-200/80 text-foreground"}`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ),
        )}
      </div>
      <div className="space-y-4 mt-8">
        {loading ? (
          <p className="text-text-secondary">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-text-secondary">No requests found.</p>
        ) : (
          requests.map((r) => (
            <Item key={r.id} className="shadow-xs bg-white">
              <ItemContent>
                <ItemTitle>{`${r.first_name} ${r.last_name}`}</ItemTitle>
                <ItemDescription>{r.status}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline">Mark as completed</Button>
              </ItemActions>
            </Item>
          ))
        )}
      </div>
    </Main>
  );
}

export default function RequestsPage() {
  return (
    <Suspense>
      <RequestsContent />
    </Suspense>
  );
}
