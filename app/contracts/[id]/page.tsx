"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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
    getContract(params.id)
      .then(setContract)
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <Main
      showBackButton
      title={contract?.title}
      slotRight={
        <div className="flex gap-2">
          <Button variant="outline">Download</Button>
          <Button variant="outline">
            <Share2 className="opacity-50" /> Send
          </Button>
        </div>
      }
    >
      {loading ? (
        <div className="py-32 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="prose prose-sm bg-white p-5 border shadow-2xs mx-auto">
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{contract?.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </Main>
  );
}
