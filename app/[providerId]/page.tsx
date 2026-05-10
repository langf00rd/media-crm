"use client";

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
import { Spinner } from "@/components/ui/spinner";
import { BookingProvider, useBooking } from "@/contexts/booking-context";
import { BOOKING_STEPS } from "@/lib/content";
import {
  getContracts,
  getOrganizationBySlug,
  getPackagesByOrg,
} from "@/lib/supabase/queries";
import type { Contract, Package } from "@/lib/types";
import { currencySymbol } from "@/lib/utils";
import { Check, CreditCard } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function StepIndicator() {
  const { step } = useBooking();
  const stepIndex = BOOKING_STEPS.findIndex((s) => s.step === step);
  return (
    <div className="flex justify-center gap-8">
      {BOOKING_STEPS.map((s, idx) => (
        <div key={s.step} className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 text-sm ${
              idx <= stepIndex
                ? "text-primary"
                : "opacity-70 text-muted-foreground"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                idx < stepIndex
                  ? "bg-primary text-primary-foreground"
                  : idx === stepIndex
                    ? "border border-primary text-primary"
                    : "border border-muted-foreground/30 text-muted-foreground"
              }`}
            >
              {idx < stepIndex ? <Check size={16} /> : idx + 1}
            </div>
            <span>{s.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PackageSelection() {
  const { packages, selectPackage } = useBooking();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {packages.map((pkg) => (
        <Card
          key={pkg.id}
          className="cursor-pointer min-h-[340px] rounded-[10px] hover:ring-2 hover:ring-primary bg-background transition-shadow"
          onClick={() => selectPackage(pkg)}
        >
          <CardHeader>
            <CardTitle>{pkg.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 border h-full">
            <p className="text-3xl font-bold text-primary">
              {currencySymbol(pkg.currency)}
              {pkg.price}
            </p>
            <p className="text-foreground">{pkg.description}</p>
            <ul className="space-y-1">
              {pkg.features.map((item, idx) => (
                <li
                  key={idx}
                  className="text-sm text-muted-foreground flex items-center gap-2"
                >
                  <Check size={16} className="text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Select Package</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function ContractView() {
  const {
    selectedPackage,
    contract,
    formData,
    updateFormData,
    acceptContract,
  } = useBooking();

  if (!selectedPackage || !contract) return null;

  const fields = Object.keys(contract.fields) as (keyof typeof formData)[];
  const allFilled = fields.every((f) => formData[f]?.trim());

  const renderedContent = fields.reduce((acc, key) => {
    const value = formData[key];
    if (value) {
      return acc.replace(new RegExp(`\\{\\{${String(key)}\\}\\}`, "g"), value);
    }
    return acc;
  }, contract.content);

  return (
    <div>
      <div className="prose prose-sm p-3 md:p-5 rounded-2xl border bg-background h-[50vh] overflow-y-scroll mb-6 max-w-none">
        <ReactMarkdown>{renderedContent}</ReactMarkdown>
      </div>

      {fields.length > 0 && (
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-5">
            {["first_name", "last_name"].map((key) => {
              const field = key as keyof typeof formData;
              if (!fields.includes(field)) return null;
              return (
                <div key={key} className="space-y-2 w-full">
                  <Label htmlFor={key}>
                    {key
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Label>
                  <Input
                    id={key}
                    value={formData[field] || ""}
                    onChange={(e) =>
                      updateFormData({ [field]: e.target.value } as Partial<
                        typeof formData
                      >)
                    }
                    className="bg-white"
                    placeholder={`Enter your ${key.replace(/_/g, " ")}`}
                  />
                </div>
              );
            })}
          </div>
          {fields
            .filter((f) => f !== "first_name" && f !== "last_name")
            .map((field) => (
              <div key={String(field)} className="space-y-2">
                <Label htmlFor={String(field)}>
                  {String(field)
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Label>
                <Input
                  id={String(field)}
                  value={formData[field] || ""}
                  onChange={(e) =>
                    updateFormData({
                      [field]: e.target.value,
                    } as Partial<typeof formData>)
                  }
                  className="bg-white"
                  placeholder={`Enter your ${String(field).replace(/_/g, " ")}`}
                />
              </div>
            ))}
          <Button disabled={!allFilled} onClick={acceptContract}>
            Accept & Continue
          </Button>
        </form>
      )}
    </div>
  );
}

function PaymentView() {
  const { selectedPackage, deposit, balance, processPayment } = useBooking();
  if (!selectedPackage) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedPackage.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span>Package price</span>
          <span className="font-medium">
            {currencySymbol(selectedPackage.currency)}
            {selectedPackage.price}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Deposit ({selectedPackage.deposit_percentage}%)</span>
          <span>
            {currencySymbol(selectedPackage.currency)}
            {deposit}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Balance due later</span>
          <span>
            {currencySymbol(selectedPackage.currency)}
            {balance}
          </span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>
            {currencySymbol(selectedPackage.currency)}
            {selectedPackage.price}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={processPayment}>
          <CreditCard size={16} /> Pay{" "}
          {currencySymbol(selectedPackage.currency)}
          {deposit} Deposit
        </Button>
        <Button variant="outline" onClick={processPayment}>
          Pay {currencySymbol(selectedPackage.currency)}
          {selectedPackage.price} in Full
        </Button>
      </CardFooter>
    </Card>
  );
}

function SuccessView() {
  const { selectedPackage, formData, reset } = useBooking();
  if (!selectedPackage) return null;
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
        <Check size={32} className="text-success" />
      </div>
      <h1 className="text-2xl font-semibold mb-2">Booking Confirmed!</h1>
      <p className="text-muted-foreground mb-8">
        Your booking has been confirmed successfully
      </p>

      <Card className="text-left">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Package</span>
            <span className="font-medium">{selectedPackage.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Client</span>
            <span className="font-medium">{`${formData.first_name || ""} ${formData.last_name || ""}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount paid</span>
            <span className="font-medium">
              {currencySymbol(selectedPackage.currency)}
              {selectedPackage.price}
            </span>
          </div>
        </CardContent>
      </Card>

      <Button className="mt-6" onClick={reset}>
        Book Another Package
      </Button>
    </div>
  );
}

const STEP_COMPONENTS: Record<string, () => React.ReactNode> = {
  packages: PackageSelection,
  contract: ContractView,
  payment: PaymentView,
  success: SuccessView,
};

function BookingStepContent() {
  const { step } = useBooking();
  const Component = STEP_COMPONENTS[step];
  return Component ? <Component /> : null;
}

function StepTitle() {
  const { step } = useBooking();
  const title = BOOKING_STEPS.find((s) => s.step === step)?.title;
  return title ? (
    <h1 className="text-xl text-center font-medium">{title}</h1>
  ) : null;
}

function BookingInner() {
  return (
    <div className="w-screen min-h-screen bg-white md:bg-background flex items-center p-5">
      <div className="w-full space-y-4">
        <StepTitle />
        <StepIndicator />
        <div className="max-w-[800px] bg-white md:border rounded-4xl md:shadow-2xl shadow-neutral-200 space-y-5 mx-auto p-5">
          <BookingStepContent />
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  const params = useParams<{ providerId: string }>();
  const [packages, setPackages] = useState<Package[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [orgId, setOrgId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const org = await getOrganizationBySlug(params.providerId);
      if (!org) {
        setError("Organization not found");
        setLoading(false);
        return;
      }
      setOrgId(org.id);
      const [pkgs, ctracts] = await Promise.all([
        getPackagesByOrg(org.id),
        getContracts(),
      ]);
      setPackages(pkgs);
      setContracts(ctracts);
      setLoading(false);
    })();
  }, [params.providerId]);

  if (error) return <div className="p-6">{error}</div>;

  return (
    <BookingProvider
      packages={packages}
      contracts={contracts}
      organizationId={orgId}
    >
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <BookingInner />
      )}
    </BookingProvider>
  );
}
