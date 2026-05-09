"use client";

import { BOOKING_STEPS } from "@/lib/content";
import { mockContracts, mockPackages } from "@/lib/data";
import type { Contract, Package } from "@/lib/types";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type BookingStep = (typeof BOOKING_STEPS)[number]["step"];

export interface FormData {
  full_name: string;
  signature: string;
}

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

export function BookingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<BookingStep>("packages");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    signature: "",
  });

  const packages = mockPackages;
  const deposit = selectedPackage
    ? Math.round(selectedPackage.price * selectedPackage.depositPercentage) /
      100
    : 0;
  const balance = selectedPackage ? selectedPackage.price - deposit : 0;

  const selectPackage = useCallback((pkg: Package) => {
    setSelectedPackage(pkg);
    const id = pkg.contractId || "service_agreement";
    const found = mockContracts.find((c) => c.id === id) || null;
    setContract(found);
    setFormData({ full_name: "", signature: "" });
    setStep("contract");
  }, []);

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const acceptContract = useCallback(() => {
    setStep("payment");
  }, []);

  const processPayment = useCallback(() => {
    setStep("success");
  }, []);

  const goBack = useCallback(() => {
    switch (step) {
      case "contract":
        setSelectedPackage(null);
        setContract(null);
        setStep("packages");
        break;
      case "payment":
        setStep("contract");
        break;
      case "success":
        setSelectedPackage(null);
        setContract(null);
        setFormData({ full_name: "", signature: "" });
        setStep("packages");
        break;
    }
  }, [step]);

  const reset = useCallback(() => {
    setSelectedPackage(null);
    setContract(null);
    setFormData({ full_name: "", signature: "" });
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
