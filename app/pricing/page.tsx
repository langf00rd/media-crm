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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockPackages } from "@/lib/data";
import { Check, EyeIcon, Plus, Trash2 } from "lucide-react";
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
          <Link href="/pricing/create">
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
          <Card key={pkg.id}>
            <CardHeader>
              <CardTitle>{pkg.name}</CardTitle>
              <p className="text-text-secondary text-sm">{pkg.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-3xl font-bold text-primary">${pkg.price}</p>
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
            </CardContent>

            <CardFooter className="flex gap-2">
              <Link href={`/pricing/edit/${pkg.id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button variant="destructive" onClick={() => setDeleteId(pkg.id)}>
                <Trash2 size={16} />
                Delete
              </Button>
            </CardFooter>
          </Card>
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
