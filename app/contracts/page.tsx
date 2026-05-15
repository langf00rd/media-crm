"use client";

import ContractItem from "@/components/contract";
import Main from "@/components/main";
import { getContracts } from "@/lib/supabase/queries";
import type { Contract } from "@/lib/types";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContracts()
      .then(setContracts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Main title="Legal contracts">
      <div className="flex flex-start gap-2 p-2 px-3 bg-primary/10 text-primary text-sm w-fit border border-primary/20 rounded-sm mb-5">
        <InfoIcon size={18} />
        Contracts generated on this platform are written specifically for
        service providers and reviewed for professional use
      </div>
      {/*<div className="mb-4 flex items-center gap-1 space-y-2">
        <Input
          placeholder="Search contracts..."
          className="bg-white max-w-sm border border-neutral-200"
        />
      </div>*/}
      {loading ? (
        <p className="text-text-secondary">Loading...</p>
      ) : contracts.length === 0 ? (
        <p className="text-text-secondary">No contracts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contracts.map((a) => (
            <Link key={a.id} href={`/contracts/${a.id}`} className="h-full">
              <ContractItem contract={a} />
            </Link>
          ))}
        </div>
      )}
    </Main>
  );
}
