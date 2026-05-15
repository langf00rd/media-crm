"use client";

import Main from "@/components/main";
import { ContractFieldsDialog } from "@/components/contract-fields-dialog";
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
import { useCallback, useEffect, useState } from "react";

export default function EditPackagePage() {
  const params = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [_loading, setLoading] = useState(true);
  const [packageForm, setPackageForm] = useState({
    name: "",
    description: "",
    price: "",
    currency: "GHS",
    deposit_percentage: "25",
    contract_id: "",
    contract_fields: {} as Record<string, string>,
    features: "",
  } as {
    name: string;
    description: string;
    price: string;
    currency: string;
    deposit_percentage: string;
    contract_id: string;
    contract_fields: Record<string, string>;
    features: string;
  });
  const [saved, setSaved] = useState(false);

  const [fieldsDialogOpen, setFieldsDialogOpen] = useState(false);
  const [prevContractState, setPrevContractState] = useState({
    id: "",
    fields: {} as Record<string, string>,
  });
  const selectedContract =
    contracts.find((c) => c.id === packageForm.contract_id) || null;

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
            currency: p.currency,
            deposit_percentage: p.deposit_percentage.toString(),
            contract_id: p.contract_id || "",
            contract_fields: p.contract_fields || {},
            features: p.features.join("\n"),
          });
        }
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleContractChange = useCallback(
    (value: string) => {
      const contract = contracts.find((c) => c.id === value);
      const hasUserFields =
        contract && contract.fields.internal.length > 0;
      if (hasUserFields) {
        setPrevContractState({
          id: packageForm.contract_id,
          fields: packageForm.contract_fields,
        });
        setPackageForm((prev) => ({ ...prev, contract_id: value }));
        setFieldsDialogOpen(true);
      } else {
        setPackageForm((prev) => ({
          ...prev,
          contract_id: value,
          contract_fields: {},
        }));
      }
    },
    [contracts, packageForm.contract_id, packageForm.contract_fields],
  );

  const handleFieldsSave = useCallback((values: Record<string, string>) => {
    setPackageForm((prev) => ({ ...prev, contract_fields: values }));
    setFieldsDialogOpen(false);
  }, []);

  const handleFieldsCancel = useCallback(() => {
    setPackageForm((prev) => ({
      ...prev,
      contract_id: prevContractState.id,
      contract_fields: prevContractState.fields,
    }));
    setFieldsDialogOpen(false);
  }, [prevContractState]);

  const handleSave = async () => {
    await updatePackage(params.id, {
      name: packageForm.name,
      description: packageForm.description,
      price: Number(packageForm.price),
      currency: packageForm.currency,
      deposit_percentage: Number(packageForm.deposit_percentage),
      features: packageForm.features.split("\n").filter(Boolean),
      contract_id: packageForm.contract_id || undefined,
      contract_fields:
        Object.keys(packageForm.contract_fields).length > 0
          ? packageForm.contract_fields
          : undefined,
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

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select
                value={packageForm.currency}
                onValueChange={(value) =>
                  value && setPackageForm({ ...packageForm, currency: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GHS">GHS (GH₵)</SelectItem>
                  <SelectItem value="NGN">NGN (₦)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Price</Label>
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
                  if (value) handleContractChange(value);
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
              {packageForm.contract_id && Object.keys(packageForm.contract_fields).length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setPrevContractState({
                      id: packageForm.contract_id,
                      fields: packageForm.contract_fields,
                    });
                    setFieldsDialogOpen(true);
                  }}
                >
                  Edit Contract Fields
                </Button>
              )}
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
      <ContractFieldsDialog
        open={fieldsDialogOpen}
        contract={selectedContract}
        initialValues={pkg?.contract_fields || {}}
        depositAmount={
          packageForm.price && packageForm.deposit_percentage
            ? (Number(packageForm.price) * Number(packageForm.deposit_percentage) / 100).toFixed(2)
            : undefined
        }
        onSave={handleFieldsSave}
        onCancel={handleFieldsCancel}
      />
    </Main>
  );
}
