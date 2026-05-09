"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { getContract } from "@/lib/supabase/queries";
import type { Contract } from "@/lib/types";
import { Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ContractDetailPage() {
  const params = useParams<{ id: string }>();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContract(params.id).then(setContract).finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!contract) return <div className="p-6">Contract not found</div>;

  return (
    <Main
      showBackButton
      title={contract.title}
      slotRight={
        <div className="flex gap-2">
          <Button variant="outline">Download</Button>
          <Button variant="outline">
            <Share2 className="opacity-50" /> Send
          </Button>
        </div>
      }
    >
      <div className="prose prose-sm bg-white p-5 border shadow-2xs mx-auto">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{contract.content}</ReactMarkdown>
        </div>
      </div>
    </Main>
  );
}
