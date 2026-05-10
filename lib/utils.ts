import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  GHS: "GH₵",
  NGN: "₦",
};

export function currencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] || currency;
}
