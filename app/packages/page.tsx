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
import { mockPackages } from "@/lib/data";
import { Check, EyeIcon, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    setDeleteId(null);
  };

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
          <Link href="/book/sarah-captures">
            <Button variant="outline">
              <EyeIcon className="opacity-50" />
              Preview
            </Button>
          </Link>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPackages.map((pkg) => (
          <Link href={`/packages/edit/${pkg.id}`} key={pkg.id}>
            <Card>
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-medium text-primary">
                  ${pkg.price}
                </p>
                <div className="space-y-2">
                  <p>What you get:</p>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((item, idx) => (
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
    </Main>
  );
}
