"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/use-user";
import { getPackages } from "@/lib/supabase/queries";
import type { Package } from "@/lib/types";
import { currencySymbol } from "@/lib/utils";
import { Check, CopyIcon, EyeIcon, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PackagesPage() {
  const { org } = useUser();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchPackages = () => {
    setLoading(true);
    getPackages()
      .then(setPackages)
      .finally(() => setLoading(false));
  };

  useEffect(fetchPackages, []);

  return (
    <Main
      title="Pricing packages"
      slotRight={
        <div className="space-x-2">
          <Link href="/packages/create">
            <Button>
              <Plus size={20} className="opacity-50" />
              New Package
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/book/${org?.slug || ""}`,
              );
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            <CopyIcon className="opacity-50" />
          </Button>
          <Link href={`/book/${org?.slug || ""}`}>
            <Button variant="outline">
              <EyeIcon className="opacity-50" />
            </Button>
          </Link>
        </div>
      }
    >
      {loading ? (
        <p className="text-text-secondary">Loading...</p>
      ) : packages.length === 0 ? (
        <p className="text-text-secondary">No packages yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg) => (
            <Link href={`/packages/edit/${pkg.id}`} key={pkg.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-3xl font-medium text-primary">
                    {currencySymbol(pkg.currency)}{pkg.price}
                  </p>
                  <div className="space-y-2">
                    <p>What you get:</p>
                    <ul className="space-y-2">
                      {pkg.features.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="bg-green-200 text-green-700 rounded-full p-[2px]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Main>
  );
}
