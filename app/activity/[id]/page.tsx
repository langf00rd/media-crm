"use client";

import Main from "@/components/main";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContract, getPackage, getRequest, updateRequestStatus } from "@/lib/supabase/queries";
import type { Contract, Package, Request } from "@/lib/types";
import { currencySymbol, downloadElementHtml } from "@/lib/utils";
import { Check, CheckCircle2, Download } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function RequestDetailPage() {
  const params = useParams<{ id: string }>();
  const [request, setRequest] = useState<Request | null>(null);
  const [pkg, setPkg] = useState<Package | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const downloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getRequest(params.id).then(async (r) => {
      setRequest(r);
      if (r) {
        const p = await getPackage(r.package_id);
        setPkg(p);
        if (p?.contract_id) {
          const c = await getContract(p.contract_id);
          setContract(c);
        }
      }
    }).finally(() => setLoading(false));
  }, [params.id]);

  const handleMarkComplete = async () => {
    await updateRequestStatus(params.id, "completed");
    setCompleted(true);
  };

  const handleDownload = () => {
    if (!downloadRef.current || !contract || !pkg || !request) return;
    const user = pkg.contract_fields?.full_name || "";
    const client = [request.first_name, request.last_name].filter(Boolean).join(" ");
    const title = [contract.title, user, client].filter(Boolean).join(" ");
    downloadElementHtml(downloadRef.current, title);
  };

  const renderedContent = () => {
    if (!contract || !pkg || !request) return "";
    const contractData = request.contract_data || {};
    const replacements = [
      ...Object.entries(pkg.contract_fields || {}),
      ["first_name", request.first_name],
      ["last_name", request.last_name],
      ...Object.entries(contractData).filter(([k]) => k !== "first_name" && k !== "last_name"),
    ];
    return replacements.reduce((acc, [key, value]) => {
      if (value) {
        return acc.replace(new RegExp(`\\{\\{${String(key)}\\}\\}`, "g"), value);
      }
      return acc;
    }, contract.content);
  };

  if (loading) return <Main><div className="p-6">Loading...</div></Main>;
  if (!request) return <Main><div className="p-6">Request not found</div></Main>;

  return (
    <Main
      showBackButton
      title={`${request.first_name} ${request.last_name}`}
      slotRight={
        <div className="flex gap-2">
          {request.status !== "completed" && !completed && (
            <Button onClick={handleMarkComplete}>Mark as Complete</Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant={request.status === "completed" ? "default" : "secondary"}>
            {request.status.toUpperCase()}
          </Badge>
          {request.terms_accepted && <Badge>Accepted terms</Badge>}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <InfoItem label="First Name" value={request.first_name} />
            <InfoItem label="Last Name" value={request.last_name} />
            <InfoItem label="Date Signed" value={new Date(request.created_dt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} />
            <InfoItem label="Terms Accepted" value={request.terms_accepted ? "Yes" : "No"} />
          </CardContent>
        </Card>

        {pkg && (
          <Card>
            <CardHeader>
              <CardTitle>Package Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoItem label="Package" value={pkg.name} />
              <InfoItem label="Package Price" value={`${currencySymbol(pkg.currency)}${pkg.price}`} />
              <InfoItem label={`Deposit (${pkg.deposit_percentage}%)`} value={`${currencySymbol(pkg.currency)}${Math.round((pkg.price * pkg.deposit_percentage) / 100)}`} />
              <InfoItem label="Balance Due" value={`${currencySymbol(pkg.currency)}${pkg.price - Math.round((pkg.price * pkg.deposit_percentage) / 100)}`} />
            </CardContent>
          </Card>
        )}

        {contract && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Contract</CardTitle>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download size={16} />
                  Download / Print
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm p-3 md:p-5 rounded-md border bg-background max-w-none">
                <ReactMarkdown>{renderedContent()}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        )}

        <div ref={downloadRef} className="hidden">
          {contract && <ReactMarkdown>{renderedContent()}</ReactMarkdown>}
        </div>

        {completed && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-input text-success font-medium flex items-center gap-2">
            <Check size={18} />
            Request marked as complete
          </div>
        )}

        {request.status === "completed" && !completed && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-input text-success font-medium flex items-center gap-2">
            <CheckCircle2 size={20} />
            Completed on {request.completed_dt ? new Date(request.completed_dt).toLocaleDateString() : "N/A"}
          </div>
        )}
      </div>
    </Main>
  );
}

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-input">
      <span className="text-text-secondary font-medium">{label}</span>
      <span className="text-foreground font-semibold">{value}</span>
    </div>
  );
}
