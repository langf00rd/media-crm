"use client";

import ContractItem from "@/components/contract";
import Main from "@/components/main";
import { Input } from "@/components/ui/input";
import { mockContracts } from "@/lib/data";
import Link from "next/link";

export default function ContractsPage() {
  return (
    <Main title="Legal contracts">
      <div className="mb-4 flex items-center gap-1 space-y-2">
        <Input
          placeholder="Search contracts..."
          className="bg-white max-w-sm border border-neutral-200"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockContracts.map((a) => (
          <Link key={a.id} href={`/contracts/${a.id}`}>
            <ContractItem contract={a} />
          </Link>
        ))}
      </div>
    </Main>
  );
}
