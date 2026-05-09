"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mockContracts, mockPackages } from "@/lib/data";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function EditPackagePage() {
  const params = useParams<{ id: string }>();
  const pkg = mockPackages.find((p) => p.id === params.id);
  const [packageForm, setPackageForm] = useState({
    name: pkg?.name || "",
    description: pkg?.description || "",
    price: pkg?.price?.toString() || "",
    depositPercentage: pkg?.depositPercentage?.toString() || "25",
    contractId: pkg?.contractId || "",
    inclusions: pkg?.inclusions.join("\n") || "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!pkg) {
    return (
      <div className="p-6 space-y-6">
        <p className="text-text-secondary">Package not found</p>
        <Link href="/packages">
          <Button variant="link">
            <ArrowLeft size={20} /> Back to Packages
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Main
      showBackButton
      slotRight={
        <Button onClick={handleSave}>
          {saved ? <Check size={16} /> : null}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Edit package</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <fieldset>
              <Label>Package Name</Label>
              <Input
                type="text"
                value={packageForm.name}
                onChange={(e) =>
                  setPackageForm({ ...packageForm, name: e.target.value })
                }
              />
            </fieldset>

            <fieldset>
              <Label>Description</Label>
              <Textarea
                value={packageForm.description}
                onChange={(e) =>
                  setPackageForm({
                    ...packageForm,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </fieldset>

            <div className="grid grid-cols-2 gap-4">
              <fieldset>
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  value={packageForm.price}
                  onChange={(e) =>
                    setPackageForm({ ...packageForm, price: e.target.value })
                  }
                />
              </fieldset>

              <fieldset>
                <Label>Deposit Percentage (%)</Label>
                <Input
                  type="number"
                  value={packageForm.depositPercentage}
                  onChange={(e) =>
                    setPackageForm({
                      ...packageForm,
                      depositPercentage: e.target.value,
                    })
                  }
                />
              </fieldset>
            </div>

            <fieldset>
              <Label>Linked Contract</Label>
              <Select
                value={packageForm.contractId}
                onValueChange={(value) => {
                  if (value)
                    setPackageForm({ ...packageForm, contractId: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a contract" />
                </SelectTrigger>
                <SelectContent>
                  {mockContracts.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </fieldset>

            <fieldset>
              <Label>Inclusions (one per line)</Label>
              <Textarea
                value={packageForm.inclusions}
                onChange={(e) =>
                  setPackageForm({ ...packageForm, inclusions: e.target.value })
                }
                rows={4}
              />
            </fieldset>
          </form>
        </CardContent>
      </Card>
    </Main>
  );
}
