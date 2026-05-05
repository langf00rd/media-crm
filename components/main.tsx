"use client";

import {
  ArrowLeft,
  Calendar,
  FileIcon,
  Heart,
  Package,
  Settings,
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
        <div className="max-w-[1000px] mx-auto px-5 md:px-8">
          {props.title && (
            <h1 className="text-2xl pt-10 mb-4 font-medium">{props.title}</h1>
          )}
          <div className="flex items-center justify-between">
            {props.showBackButton && (
              <div className="h-[60px] flex items-center">
                <Button variant="ghost" onClick={() => window.history.back()}>
                  <ArrowLeft />
                  Back
                </Button>
              </div>
            )}
            {!props.showBackButton && (
              <div className="flex gap-10">
                {navItems.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className={`flex h-[60px] items-center gap-2 border-b-2 ${pathname === a.href ? "border-b-primary text-primary" : "text-neutral-500 border-b-transparent"}`}
                  >
                    <a.icon size={16} className="opacity-30" />
                    <span className="text-sm font-medium">{a.label}</span>
                  </Link>
                ))}
              </div>
            )}
            <div className="h-[60px] flex items-center">{props.slotRight}</div>
          </div>
        </div>
      </div>
      <main className="p-5 md:p-8 max-w-[1000px] mx-auto">
        {props.children}
      </main>
    </div>
  );
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Heart },
  { href: "/jobs", label: "Jobs", icon: Calendar },
  { href: "/pricing", label: "Packages", icon: Package },
  { href: "/contracts", label: "Contracts", icon: FileIcon },
  { href: "/settings", label: "Settings", icon: Settings },
];
