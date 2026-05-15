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

export function downloadElementHtml(el: HTMLElement, title: string): void {
  const content = el.innerHTML;
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { padding: 2rem; font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: auto; }
    h1, h2, h3 { margin-top: 1.5em; }
    ul { padding-left: 1.5em; }
    hr { margin: 2em 0; border: none; border-top: 1px solid #ccc; }
  </style>
</head>
<body>${content}</body>
</html>`);
  win.document.close();
  win.print();
}
