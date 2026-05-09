"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { mockContracts } from "@/lib/data";
import { Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function ContractDetailPage() {
  const params = useParams<{ id: string }>();
  const contract = mockContracts.find((c) => c.id === params.id);

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
      <div className="prose prose-sm bg-white p-5 border shadow-2xs mx-auto">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{contract?.content}</ReactMarkdown>
        </div>
      </div>
    </Main>
  );
}
