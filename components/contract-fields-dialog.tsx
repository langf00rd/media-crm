"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";
import type { Contract } from "@/lib/types";
import { useEffect, useState } from "react";

interface ContractFieldsDialogProps {
  open: boolean;
  contract: Contract | null;
  initialValues: Record<string, string>;
  depositAmount?: string;
  onSave: (values: Record<string, string>) => void;
  onCancel: () => void;
}

export function ContractFieldsDialog({
  open,
  contract,
  initialValues,
  depositAmount,
  onSave,
  onCancel,
}: ContractFieldsDialogProps) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);

  useEffect(() => {
    if (open) {
      (async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const firstName = user?.user_metadata?.first_name || "";
        const lastName = user?.user_metadata?.last_name || "";
        const fullName = [firstName, lastName].filter(Boolean).join(" ");
        setValues({
          ...initialValues,
          ...(fullName ? { full_name: fullName } : {}),
          ...(depositAmount ? { deposit_amount: depositAmount } : {}),
        });
      })();
    }
  }, [open, initialValues, depositAmount]);

  if (!contract) return null;

  const userFields = contract.fields.internal;
  if (userFields.length === 0) return null;

  const readOnlyFields = new Set(["full_name", "deposit_amount"]);

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onCancel()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Contract Fields</DialogTitle>
          <DialogDescription>
            Fill in the details for {contract.title}. These will appear in the
            contract shown to your client.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {userFields.map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>
                {field
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </Label>
              <Input
                id={field}
                value={values[field] || ""}
                onChange={(e) =>
                  setValues({ ...values, [field]: e.target.value })
                }
                placeholder={`Enter ${field.replace(/_/g, " ")}`}
                readOnly={readOnlyFields.has(field)}
                className={readOnlyFields.has(field) ? "bg-muted" : ""}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(values)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
