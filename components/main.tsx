"use client";

import { Calendar, FileIcon, Heart, Package, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Main(props: {
  children: React.ReactNode;
  title?: string;
  slotRight?: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div>
      <div className="border-b sticky top-0 z-10 bg-white">
        <div className="max-w-[1300px] h-[60px] flex items-center justify-between mx-auto px-5 md:px-8">
          <div className="flex gap-10">
            {navItems.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className={`flex h-[60px] items-center gap-1 border-b-2 ${pathname === a.href ? "border-b-primary text-primary" : "text-neutral-400 border-b-transparent"}`}
              >
                {/*<a.icon size={18} className="opacity-30" />*/}
                <span className="font-medium">{a.label}</span>
              </Link>
            ))}
          </div>
          <div>{props.slotRight}</div>
        </div>
      </div>
      <main className="p-5 md:p-8 max-w-[1300px] mx-auto">
        {props.children}
      </main>
    </div>
  );
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Heart },
  { href: "/jobs", label: "Jobs", icon: Calendar },
  { href: "/pricing", label: "Pricing", icon: Package },
  { href: "/contracts", label: "Contracts", icon: FileIcon },
  { href: "/settings", label: "Settings", icon: Settings },
];
