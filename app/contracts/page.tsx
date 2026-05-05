"use client";

import ContractItem from "@/components/contract";
import Main from "@/components/main";
import { Input } from "@/components/ui/input";
import { mockContracts } from "@/lib/data";
import Link from "next/link";

export default function ContractsPage() {
  const statusColors: Record<Contract["status"], string> = {
    draft: "bg-gray-100 text-gray-600",
    "pending-signature": "bg-yellow-100 text-warning",
    signed: "bg-green-100 text-success",
    cancelled: "bg-red-100 text-danger",
  };

  return (
    <Main title="Contracts">
      <div className="mb-4 flex items-center gap-1 space-y-2">
        <Input
          placeholder="Search contracts..."
          className="bg-white max-w-sm border border-neutral-200"
        />
      </div>
      {/*<small className="text-neutral-500 font-medium block">
          {mockContracts.length} contract templates
        </small>*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockContracts.map((a) => (
          <Link href={`/contracts/${a.id}`}>
            <ContractItem contract={a} />
          </Link>
        ))}
      </div>
    </Main>
  );
}
