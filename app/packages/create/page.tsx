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
import { createPackage, getContracts } from "@/lib/supabase/queries";
import type { Contract } from "@/lib/types";
import { Check } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function CreatePackagePage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
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
    getContracts().then(setContracts);
  }, []);

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
    await createPackage({
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
                placeholder="8 hours coverage&#10;500+ photos&#10;Digital album"
                rows={4}
              />
            </div>
          </form>
        </CardContent>
      </Card>
      <ContractFieldsDialog
        open={fieldsDialogOpen}
        contract={selectedContract}
        initialValues={{}}
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
