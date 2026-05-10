"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContracts, getRequests } from "@/lib/supabase/queries";
import { CopyIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [, setCopied] = useState(false);
  const [active, setActive] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [contractCount, setContractCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getRequests(), getContracts()]).then(([requests, contracts]) => {
      setActive(requests.filter((r) => r.status === "in-progress" || r.status === "pending").length);
      setPending(requests.filter((r) => !r.terms_accepted && r.status !== "cancelled").length);
      setCompleted(requests.filter((r) => r.status === "completed").length);
      setContractCount(contracts.length);
    }).finally(() => setLoading(false));
  }, []);

  const bookingUrl = `${process.env.NEXT_PUBLIC_APP_URL || "app.com"}/sarah-captures`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(bookingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Main
      title="Dashboard"
      slotRight={
        <Button onClick={handleCopyLink}>
          <CopyIcon /> Copy link
        </Button>
      }
    >
      {loading ? (
        <p className="text-text-secondary">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard label="Active Requests" value={active} color="primary" href="/activity" />
          <StatCard label="Pending Acceptance" value={pending} color="warning" href="/activity" />
          <StatCard label="Completed" value={completed} color="success" href="/activity?filter=completed" />
          <StatCard label="Contract Templates" value={contractCount} color="warning" href="/contracts" />
        </div>
      )}
    </Main>
  );
}

function StatCard(props: {
  label: string;
  value: number;
  color: "primary" | "warning" | "success";
  href: string;
}) {
  return (
    <Link href={props.href}>
      <Card>
        <CardHeader>
          <CardTitle>{props.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-medium font-mono">{props.value}</h1>
        </CardContent>
      </Card>
    </Link>
  );
}
