"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { mockContracts } from "@/lib/data";
import { Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ContractDetailPage() {
  const params = useParams<{ id: string }>();
  const contract = mockContracts.find((c) => c.id === params.id);
  const [downloaded, setDownloaded] = useState(false);
  const [sent, setSent] = useState(false);

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
      <div className="prose prose-sm bg-white p-5 rounded-2xl border shadow-2xs max-w-[600px] mx-auto">
        <ReactMarkdown>{contract?.content}</ReactMarkdown>
      </div>
    </Main>
  );
}
