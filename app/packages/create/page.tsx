"use client";

import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { mockContracts } from "@/lib/data";
import { Check } from "lucide-react";
import { useState } from "react";

export default function CreatePackagePage() {
  const [packageForm, setPackageForm] = useState({
    name: "",
    description: "",
    price: "",
    depositPercentage: "25",
    contractId: "",
    inclusions: "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      window.location.href = "/packages";
    }, 1500);
  };

  return (
    <Main showBackButton>
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
                value={packageForm.depositPercentage}
                onChange={(e) =>
                  setPackageForm({
                    ...packageForm,
                    depositPercentage: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
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
            </div>

            <div className="space-y-2">
              <Label>Inclusions (one per line)</Label>
              <Textarea
                value={packageForm.inclusions}
                onChange={(e) =>
                  setPackageForm({ ...packageForm, inclusions: e.target.value })
                }
                placeholder="4 hours coverage&#10;200+ photos&#10;Digital delivery"
                rows={4}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>
            {saved ? <Check size={16} /> : null}
            {saved ? "Saved!" : "Save Package"}
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </Main>
  );
}
