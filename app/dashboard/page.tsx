"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockContracts, mockJobs, mockProvider } from "@/lib/data";
import { CopyIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [, setCopied] = useState(false);
  const activeJobs = mockJobs.filter(
    (j) => j.status === "in-progress" || j.status === "pending",
  );
  const completedJobs = mockJobs.filter((j) => j.status === "completed");
  const pendingPayments = mockJobs.filter(
    (j) => !j.balancePaid && j.status !== "cancelled",
  );
  const pendingContracts = mockContracts.filter(
    (c) => c.status === "pending-signature",
  );

  const bookingUrl = `${process.env.NEXT_PUBLIC_APP_URL || "app.com"}/book/${mockProvider.id}`;

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          label="Active Jobs"
          value={activeJobs.length}
          color="primary"
          href="/activity"
        />
        <StatCard
          label="Pending Payments"
          value={pendingPayments.length}
          color="warning"
          href="/activity"
        />
        <StatCard
          label="Completed"
          value={completedJobs.length}
          color="success"
          href="/activity?filter=completed"
        />
        <StatCard
          label="Pending Contracts"
          value={pendingContracts.length}
          color="warning"
          href="/contracts"
        />
      </div>
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
