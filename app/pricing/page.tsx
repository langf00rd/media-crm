"use client";

import Main from "@/components/main";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { mockPackages } from "@/lib/data";
import { Check, Copy, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleted, setDeleted] = useState(false);

  const handleCopyLink = async (pkgId: string) => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL || "app.com"}/book/${pkgId}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(pkgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = () => {
    setDeleted(true);
    setDeleteId(null);
    setTimeout(() => setDeleted(false), 2000);
  };

  return (
    <Main title="Pricing">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Pricing Packages</h1>
        <Link href="/pricing/create">
          <Button>
            <Plus size={20} />
            New Package
          </Button>
        </Link>
      </div>

      {deleted && (
        <div className="bg-green-50 border border-green-200 rounded-card p-4 text-success font-medium flex items-center gap-2">
          <Check size={18} />
          Package deleted successfully
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-card-bg backdrop-blur-lg rounded-card shadow-card p-6 space-y-4"
          >
            <div>
              <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
              <p className="text-text-secondary text-sm">{pkg.serviceType}</p>
            </div>
            <div>
              <p className="text-text-secondary text-sm">Starting at</p>
              <p className="text-3xl font-bold text-primary">${pkg.price}</p>
            </div>
            <p className="text-foreground">{pkg.description}</p>
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Includes:
              </p>
              <ul className="space-y-1">
                {pkg.inclusions.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-text-secondary flex items-center gap-2"
                  >
                    <Check size={16} className="text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-input p-3 flex items-center gap-2">
              <code className="flex-1 text-primary font-mono text-xs break-all">
                {`${process.env.NEXT_PUBLIC_APP_URL || "app.com"}/book/${pkg.id}`}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopyLink(pkg.id)}
              >
                {copiedId === pkg.id ? (
                  <Check size={16} className="text-success" />
                ) : (
                  <Copy size={16} />
                )}
              </Button>
            </div>

            <div className="flex gap-2 pt-2">
              <Link href={`/pricing/edit/${pkg.id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button variant="destructive" onClick={() => setDeleteId(pkg.id)}>
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Package</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this package? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Main>
  );
}
