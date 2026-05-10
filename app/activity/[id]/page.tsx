"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPackage, getRequest, updateRequestStatus } from "@/lib/supabase/queries";
import type { Package, Request } from "@/lib/types";
import { currencySymbol } from "@/lib/utils";

export default function RequestDetailPage() {
  const params = useParams<{ id: string }>();
  const [request, setRequest] = useState<Request | null>(null);
  const [pkg, setPkg] = useState<Package | null>(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequest(params.id).then((r) => {
      setRequest(r);
      if (r) {
        getPackage(r.package_id).then(setPkg);
      }
    }).finally(() => setLoading(false));
  }, [params.id]);

  const handleMarkComplete = async () => {
    await updateRequestStatus(params.id, "completed");
    setCompleted(true);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!request) return <div className="p-6">Request not found</div>;

  return (
    <div className="p-6 space-y-6">
      <Button variant="link" onClick={() => window.history.back()} className="mb-4">
        <ArrowLeft size={20} />
        Back to Activity
      </Button>

      <div className="bg-card-bg backdrop-blur-lg rounded-card shadow-card p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{`${request.first_name} ${request.last_name}`}</h1>
          <p className="text-text-secondary mt-2">Status: {request.status}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="First Name" value={request.first_name} />
          <InfoItem label="Last Name" value={request.last_name} />
          <InfoItem label="Terms Accepted" value={request.terms_accepted ? "Yes" : "No"} />
          <InfoItem label="Signature" value={request.signature || "Pending"} />
        </div>

        {pkg && (
          <>
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Package Details</h2>
              <div className="space-y-3">
                <InfoItem label="Package" value={pkg.name} />
                <InfoItem label="Package Price" value={`${currencySymbol(pkg.currency)}${pkg.price}`} />
                <InfoItem label={`Deposit (${pkg.deposit_percentage}%)`} value={`${currencySymbol(pkg.currency)}${Math.round((pkg.price * pkg.deposit_percentage) / 100)}`} />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Balance</h2>
              <div className="space-y-3">
                <InfoItem label="Balance Due" value={`${currencySymbol(pkg.currency)}${pkg.price - Math.round((pkg.price * pkg.deposit_percentage) / 100)}`} />
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-input">
                  <span className="text-foreground font-medium">Terms Accepted</span>
                  <span className={request.terms_accepted ? "text-success" : "text-warning"}>
                    {request.terms_accepted ? "✓ Yes" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Contract</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-input">
            <span className="text-foreground font-medium">Contract Signed</span>
            <span className={request.terms_accepted ? "text-success" : "text-warning"}>
              {request.terms_accepted ? "✓ Signed" : "Pending"}
            </span>
          </div>
        </div>

        {request.status !== "completed" && !completed && (
          <Button className="w-full bg-success text-white hover:bg-green-600" onClick={handleMarkComplete}>
            Mark as Complete
          </Button>
        )}

        {completed && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-input text-success font-medium flex items-center gap-2">
            <Check size={18} />
            Request marked as complete
          </div>
        )}

        {request.status === "completed" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-input text-success font-medium flex items-center gap-2">
            <CheckCircle2 size={20} />
            Completed on {request.completed_dt ? new Date(request.completed_dt).toLocaleDateString() : "N/A"}
          </div>
        )}
      </div>
    </div>
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
