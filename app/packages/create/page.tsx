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
import { createPackage, getContracts } from "@/lib/supabase/queries";
import type { Contract } from "@/lib/types";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function CreatePackagePage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [packageForm, setPackageForm] = useState({
    name: "",
    description: "",
    price: "",
    deposit_percentage: "25",
    contract_id: "",
    features: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getContracts().then(setContracts);
  }, []);

  const handleSave = async () => {
    await createPackage({
      name: packageForm.name,
      description: packageForm.description,
      price: Number(packageForm.price),
      deposit_percentage: Number(packageForm.deposit_percentage),
      features: packageForm.features.split("\n").filter(Boolean),
      contract_id: packageForm.contract_id || undefined,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      window.location.href = "/packages";
    }, 1500);
  };

  return (
    <Main
      showBackButton
      slotRight={
        <div className="space-x-2">
          <Button onClick={handleSave}>
            {saved ? <Check size={16} /> : null}
            {saved ? "Saved!" : "Save Package"}
          </Button>
        </div>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Create New Package</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-8">
            <div className="space-y-2">
              <Label>Package Name</Label>
              <Input
                type="text"
                value={packageForm.name}
                onChange={(e) =>
                  setPackageForm({ ...packageForm, name: e.target.value })
                }
                placeholder="e.g., Premium Wedding Package"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={packageForm.description}
                onChange={(e) =>
                  setPackageForm({
                    ...packageForm,
                    description: e.target.value,
                  })
                }
                placeholder="Describe what this package includes"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  value={packageForm.price}
                  onChange={(e) =>
                    setPackageForm({ ...packageForm, price: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label>Deposit Percentage (%)</Label>
                <Input
                  type="number"
                  value={packageForm.deposit_percentage}
                  onChange={(e) =>
                    setPackageForm({
                      ...packageForm,
                      deposit_percentage: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Linked Contract</Label>
              <Select
                value={packageForm.contract_id}
                onValueChange={(value) => {
                  if (value)
                    setPackageForm({ ...packageForm, contract_id: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a contract" />
                </SelectTrigger>
                <SelectContent>
                  {contracts.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Features (one per line)</Label>
              <Textarea
                value={packageForm.features}
                onChange={(e) =>
                  setPackageForm({ ...packageForm, features: e.target.value })
                }
                placeholder="8 hours coverage&#10;500+ photos&#10;Digital album"
                rows={4}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </Main>
  );
}
