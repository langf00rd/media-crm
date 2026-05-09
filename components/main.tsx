"use client";

import {
  ArrowLeft,
  CalendarIcon,
  FileIcon,
  Package,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function Main(props: {
  children: React.ReactNode;
  title?: string;
  slotRight?: React.ReactNode;
  showBackButton?: boolean;
}) {
  const pathname = usePathname();
  return (
    <div>
      <div className="border-b sticky top-0 z-10 bg-white">
        <div className="max-w-[840px] mx-auto px-5 md:px-8 pt-4 space-y-4">
          {props.title && (
            <h1 className="text-2xl font-medium">{props.title}</h1>
          )}
          <div className="flex items-center justify-between">
            {props.showBackButton && (
              <div className="h-[52px] flex items-center">
                <Button variant="ghost" onClick={() => window.history.back()}>
                  <ArrowLeft />
                  Back
                </Button>
              </div>
            )}
            {!props.showBackButton && (
              <div className="flex gap-10 overflow-x-auto scrollbar-hide md:overflow-x-visible">
                {navItems.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className={`flex h-[52px] items-center gap-1 border-b-2 ${pathname === a.href ? "border-b-primary text-primary" : "text-neutral-500 border-b-transparent"}`}
                  >
                    {/*<a.icon size={16} className="opacity-30" />*/}
                    <span className="text-sm font-medium">{a.label}</span>
                  </Link>
                ))}
              </div>
            )}
            <div className="h-[52px] md:flex items-center hidden">
              {props.slotRight}
            </div>
            <div className="fixed bottom-0 right-0 p-5 pb-3 md:hidden">
              {props.slotRight}
            </div>
          </div>
        </div>
      </div>
      <main className="p-5 max-w-[840px] mx-auto">{props.children}</main>
    </div>
  );
}

const navItems = [
  { href: "/activity", label: "Activity", icon: CalendarIcon },
  { href: "/packages", label: "Packages", icon: Package },
  { href: "/contracts", label: "Contracts", icon: FileIcon },
  { href: "/settings", label: "Settings", icon: Settings2 },
  // { href: "/dashboard", label: "Dashboard", icon: Heart },
];
