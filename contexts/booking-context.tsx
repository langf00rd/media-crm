"use client";

import { BOOKING_STEPS } from "@/lib/content";
import { createRequest } from "@/lib/supabase/queries";
import type { Contract, Package } from "@/lib/types";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type BookingStep = (typeof BOOKING_STEPS)[number]["step"];

export type FormData = Record<string, string>;

interface BookingState {
  step: BookingStep;
  selectedPackage: Package | null;
  contract: Contract | null;
  formData: FormData;
}

export interface BookingContextValue extends BookingState {
  selectPackage: (pkg: Package) => void;
  updateFormData: (data: Partial<FormData>) => void;
  acceptContract: () => void;
  processPayment: () => void;
  goBack: () => void;
  reset: () => void;
  packages: Package[];
  deposit: number;
  balance: number;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({
  children,
  packages,
  contracts,
  organizationId,
}: {
  children: ReactNode;
  packages: Package[];
  contracts: Contract[];
  organizationId: string;
}) {
  const [step, setStep] = useState<BookingStep>("packages");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [formData, setFormData] = useState<FormData>({});

  const deposit = selectedPackage
    ? Math.round(selectedPackage.price * selectedPackage.deposit_percentage) /
      100
    : 0;
  const balance = selectedPackage ? selectedPackage.price - deposit : 0;

  const selectPackage = useCallback(
    (pkg: Package) => {
      setSelectedPackage(pkg);
      const id = pkg.contract_id || "";
      const found = contracts.find((c) => c.id === id) || null;
      setContract(found);
      if (found) {
        const initial: FormData = {};
        Object.keys(found.fields).forEach((key) => {
          initial[key] = "";
        });
        setFormData(initial);
      } else {
        setFormData({});
      }
      setStep("contract");
    },
    [contracts],
  );

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData((prev) => {
      const next: FormData = { ...prev };
      for (const key in data) {
        const val = data[key];
        if (val !== undefined) next[key] = val;
      }
      return next;
    });
  }, []);

  const acceptContract = useCallback(async () => {
    if (!selectedPackage) return;

    await createRequest({
      first_name: formData.first_name || "",
      last_name: formData.last_name || "",
      package_id: selectedPackage.id,
      organization_id: organizationId,
      terms_accepted: true,
    });

    setStep("payment");
  }, [selectedPackage, formData, organizationId]);

  const processPayment = useCallback(() => {
    setStep("success");
  }, []);

  const goBack = useCallback(() => {
    switch (step) {
      case "contract":
        setSelectedPackage(null);
        setContract(null);
        setFormData({});
        setStep("packages");
        break;
      case "payment":
        setStep("contract");
        break;
      case "success":
        setSelectedPackage(null);
        setContract(null);
        setFormData({});
        setStep("packages");
        break;
    }
  }, [step]);

  const reset = useCallback(() => {
    setSelectedPackage(null);
    setContract(null);
    setFormData({});
    setStep("packages");
  }, []);

  return (
    <BookingContext.Provider
      value={{
        step,
        selectedPackage,
        contract,
        formData,
        packages,
        deposit,
        balance,
        selectPackage,
        updateFormData,
        acceptContract,
        processPayment,
        goBack,
        reset,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
