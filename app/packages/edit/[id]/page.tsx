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
import {
  getContracts,
  getPackage,
  updatePackage,
} from "@/lib/supabase/queries";
import type { Contract, Package } from "@/lib/types";
import { Check } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPackagePage() {
  const params = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [_loading, setLoading] = useState(true);
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
    Promise.all([getPackage(params.id), getContracts()])
      .then(([p, c]) => {
        setPkg(p);
        setContracts(c);
        if (p) {
          setPackageForm({
            name: p.name,
            description: p.description,
            price: p.price.toString(),
            deposit_percentage: p.deposit_percentage.toString(),
            contract_id: p.contract_id || "",
            features: p.features.join("\n"),
          });
        }
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleSave = async () => {
    await updatePackage(params.id, {
      name: packageForm.name,
      description: packageForm.description,
      price: Number(packageForm.price),
      deposit_percentage: Number(packageForm.deposit_percentage),
      features: packageForm.features.split("\n").filter(Boolean),
      contract_id: packageForm.contract_id || undefined,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Main
      showBackButton
      slotRight={
        <div className="flex gap-2">
          <Button onClick={handleSave}>
            {saved ? <Check size={16} /> : null}
            {saved ? "Saved!" : "Save Changes"}
          </Button>
          <Button variant="destructive">Delete</Button>
        </div>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Edit {pkg?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <Label>Package Name</Label>
            <Input
              type="text"
              value={packageForm.name}
              onChange={(e) =>
                setPackageForm({ ...packageForm, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={packageForm.description}
              onChange={(e) =>
                setPackageForm({ ...packageForm, description: e.target.value })
              }
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
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </Main>
  );
}
