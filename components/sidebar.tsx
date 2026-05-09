"use client";

import { Button } from "@/components/ui/button";
import { getCurrentOrganization } from "@/lib/supabase/queries";
import type { Organization } from "@/lib/types";
import { Calendar, File, Home, LogOut, Package, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/activity", label: "Activity", icon: Calendar },
  { href: "/packages", label: "Packages", icon: Package },
  { href: "/contracts", label: "Contracts", icon: File },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [org, setOrg] = useState<Organization | null>(null);

  useEffect(() => {
    getCurrentOrganization().then(setOrg);
  }, []);

  return (
    <>
      <div className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-60 bg-card-bg backdrop-blur-lg border-r border-gray-200 pt-8 px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            {org?.name || "Media CRM"}
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            {org?.category || ""}
          </p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start px-4 py-3 ${isActive ? "" : "text-foreground"}`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-3 text-foreground hover:bg-gray-100"
        >
          <LogOut size={20} />
          <span className="font-medium">Log Out</span>
        </Button>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card-bg backdrop-blur-lg border-t border-gray-200 px-4 py-3 flex justify-around safe-area-inset-bottom">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 py-2 px-3 h-auto ${
                  isActive ? "text-primary" : "text-text-secondary"
                }`}
              >
                <Icon size={24} />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </>
  );
}
