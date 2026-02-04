"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  AlertOctagon,
  AlertTriangle,
  AlertCircle,
  Info,
  ShieldAlert,
  Users,
  Server,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserProfile, useLogout } from "@/hooks/use-auth";

export const navItems = [
  { href: "/dashboard/home", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/dashboard/critical",
    label: "Critical",
    icon: AlertOctagon,
    color: "text-severity-critical",
  },
  { href: "/dashboard/high", label: "High", icon: AlertTriangle, color: "text-severity-high" },
  { href: "/dashboard/medium", label: "Medium", icon: AlertCircle, color: "text-severity-medium" },
  { href: "/dashboard/low", label: "Low", icon: ShieldAlert, color: "text-severity-low" },
  { href: "/dashboard/info", label: "Info", icon: Info, color: "text-severity-info" },
];

export const managementItems = [
  { href: "/dashboard/teams", label: "Teams", icon: Users },
  { href: "/dashboard/services", label: "Services", icon: Server },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user, isLoading } = useUserProfile();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Hide sidebar on login page
  if (pathname === "/login") return null;

  return (
    <aside className="bg-sidebar/80 text-sidebar-foreground fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r border-white/20 shadow-xl shadow-black/5 backdrop-blur-xl transition-all duration-300">
      {/* Sidebar Header */}
      <div className="flex h-24 items-center px-6">
        <span className="text-xl font-bold tracking-tight text-[#000000]">Sentispace</span>
      </div>
      {/* Navigation */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <nav className="grid items-start gap-1 text-[13px] font-medium tracking-tight">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-xl px-4 py-2.5 transition-all duration-200 ease-in-out",
                  isActive
                    ? "bg-blue-500/10 text-blue-600 shadow-sm"
                    : "text-gray-500 hover:bg-gray-100/50 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3.5 h-[1.2rem] w-[1.2rem] transition-colors",
                    isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                <span className="font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Management Section */}
        <div className="mt-6 mb-2 px-4">
          <h3 className="mb-2 px-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Management
          </h3>
        </div>
        <nav className="grid items-start gap-1 text-[13px] font-medium tracking-tight">
          {managementItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-xl px-4 py-2.5 transition-all duration-200 ease-in-out",
                  isActive
                    ? "bg-blue-500/10 text-blue-600 shadow-sm"
                    : "text-gray-500 hover:bg-gray-100/50 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3.5 h-[1.2rem] w-[1.2rem] transition-colors",
                    isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                <span className="font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer (iPadOS popover style area) */}
      <div className="p-4">
        <div className="rounded-2xl border border-white/20 bg-white/50 p-4 shadow-sm backdrop-blur-md">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}
