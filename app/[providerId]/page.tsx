"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { currencySymbol, downloadElementHtml } from "@/lib/utils";
import { Check, CreditCard, Download, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

function StepIndicator() {
  const { step, goToStep } = useBooking();
  const stepIndex = BOOKING_STEPS.findIndex((s) => s.step === step);
  return (
    <div className="flex items-center gap-8">
      {BOOKING_STEPS.map((s, idx) => (
        <div key={s.step} className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 text-sm ${
              idx <= stepIndex
                ? "text-primary"
                : "opacity-70 text-muted-foreground"
            }${idx < stepIndex ? " cursor-pointer" : ""}`}
            onClick={() => idx < stepIndex && goToStep(s.step)}
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
          className="cursor-pointer md:min-h-[250px] rounded-sm hover:ring-2 hover:ring-primary bg-background transition-shadow"
          onClick={() => selectPackage(pkg)}
        >
          <CardHeader>
            <CardTitle>{pkg.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 h-full">
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
            <Button className="w-full bg-primary/10 text-primary">
              <PlusIcon />
              Select
            </Button>
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

  const clientFields = contract.fields.external as (keyof typeof formData)[];
  const [termsAccepted, setTermsAccepted] = useState(false);
  const canProceed = termsAccepted;

  const renderedContent = [
    ...Object.entries(selectedPackage.contract_fields || {}),
    ...clientFields.map((f) => [f, formData[f] || ""]),
  ].reduce((acc, [key, value]) => {
    if (value) {
      return acc.replace(new RegExp(`\\{\\{${String(key)}\\}\\}`, "g"), value);
    }
    return acc;
  }, contract.content);

  return (
    <div>
      <div className="prose prose-sm p-3 md:p-5 rounded-md border bg-background h-[50vh] overflow-y-scroll mb-6 max-w-none">
        <ReactMarkdown>{renderedContent}</ReactMarkdown>
      </div>

      {clientFields.length > 0 && (
        <form className="space-y-4 mx-auto py-4 max-w-md">
          <div className="grid md:grid-cols-2 gap-5">
            {["first_name", "last_name"].map((key) => {
              const field = key as keyof typeof formData;
              if (!clientFields.includes(field)) return null;
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
          {clientFields
            .filter(
              (f) => f !== "first_name" && f !== "last_name" && f !== "date",
            )
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
          <div className="flex items-start gap-2 pt-2">
            <Checkbox
              className="top-0.5"
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            />
            <Label htmlFor="terms" className="text-sm leading-5">
              I have read and agree to the terms of this contract and accept to
              abide by them
            </Label>
          </div>
          <Button disabled={!canProceed} onClick={acceptContract}>
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
  const { selectedPackage, contract, formData, reset } = useBooking();
  const downloadRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!downloadRef.current || !contract || !selectedPackage) return;
    const user = selectedPackage.contract_fields?.full_name || "";
    const client = [formData.first_name, formData.last_name]
      .filter(Boolean)
      .join(" ");
    const title = [contract.title, user, client].filter(Boolean).join(" ");
    downloadElementHtml(downloadRef.current, title);
  };

  const renderedContent = () => {
    if (!contract || !selectedPackage) return "";
    const replacements = [
      ...Object.entries(selectedPackage.contract_fields || {}),
      ...Object.entries(formData),
    ];
    return replacements.reduce((acc, [key, value]) => {
      if (value) {
        return acc.replace(
          new RegExp(`\\{\\{${String(key)}\\}\\}`, "g"),
          value,
        );
      }
      return acc;
    }, contract.content);
  };

  if (!selectedPackage) return null;
  return (
    <div className="py-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-success" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Your booking has been confirmed successfully
        </p>
      </div>

      <Card className="text-left mb-6">
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

      {contract && (
        <div className="text-left space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Signed Contract</h2>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download size={16} />
              Download / Print
            </Button>
          </div>
          <div className="prose prose-sm p-3 md:p-5 rounded-md border bg-background max-w-none">
            <ReactMarkdown>{renderedContent()}</ReactMarkdown>
          </div>
        </div>
      )}

      <div ref={downloadRef} className="hidden">
        {contract && <ReactMarkdown>{renderedContent()}</ReactMarkdown>}
      </div>

      <div className="text-center">
        <Button className="mt-6" onClick={reset}>
          Book Another Package
        </Button>
      </div>
    </div>
  );
}

function BookingStepContent() {
  const { step } = useBooking();
  const Component = STEP_COMPONENTS[step];
  return Component ? <Component /> : null;
}

function StepTitle() {
  const { step } = useBooking();
  const title = BOOKING_STEPS.find((s) => s.step === step)?.title;
  return title ? (
    <h1 className="text-xl text-primary capitalize text-center font-medium">
      {title}
    </h1>
  ) : null;
}

function BookingInner({
  orgName,
  orgLogo,
  orgCoverPhoto,
}: {
  orgName: string;
  orgLogo: string | null;
  orgCoverPhoto: string | null;
}) {
  return (
    <div className="relative">
      {orgCoverPhoto && (
        <>
          <div
            className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
            style={{ backgroundImage: `url(${orgCoverPhoto})` }}
          />
          <div className="fixed inset-0 bg-black/30 -z-10" />
        </>
      )}
      <div
        className="relative z-10 px-5 min-h-screen flex items-center py-5 pt-16"
        style={
          !orgCoverPhoto ? { backgroundColor: "var(--background)" } : undefined
        }
      >
        <div className="max-w-[800px] mx-auto w-full space-y-2">
          <div className="w-full bg-white/90 backdrop-blur-2xl md:border rounded-sm md:shadow-2xl shadow-black/20 space-y-5 mx-auto p-5">
            <div className="flex flex-col-reverse gap-4 md:flex-row items-start md:justify-between md:items-center">
              <StepTitle />
              <div className="flex justify-center items-center gap-2">
                <p className="capitalize">{orgName}</p>
                {orgLogo && (
                  <Image
                    src={orgLogo}
                    alt={orgName}
                    className="border bg-white aspect-square rounded-sm object-cover"
                    width={40}
                    height={40}
                  />
                )}
              </div>
            </div>
            <StepIndicator />
            <BookingStepContent />
          </div>
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
  const [orgName, setOrgName] = useState("");
  const [orgLogo, setOrgLogo] = useState<string | null>(null);
  const [orgCoverPhoto, setOrgCoverPhoto] = useState<string | null>(null);
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
      setOrgName(org.name);
      setOrgLogo(org.logo);
      setOrgCoverPhoto(org.cover_photo);
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
        <BookingInner
          orgName={orgName}
          orgLogo={orgLogo}
          orgCoverPhoto={orgCoverPhoto}
        />
      )}
    </BookingProvider>
  );
}

const STEP_COMPONENTS: Record<string, () => React.ReactNode> = {
  packages: PackageSelection,
  contract: ContractView,
  payment: PaymentView,
  success: SuccessView,
};
