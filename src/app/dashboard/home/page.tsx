"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bell,
  HelpCircle,
  AlertOctagon,
  AlertTriangle,
  AlertCircle,
  Activity,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useUserProfile, useLogout } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { IncidentsTable } from "@/components/dashboard/incidents-table";
import dynamic from "next/dynamic";
import { LogOut } from "lucide-react";

// Dynamic import for charts to prevent hydration errors
const DashboardCharts = dynamic(
  () => import("@/components/dashboard/dashboard-charts").then((mod) => mod.DashboardCharts),
  { ssr: false }
);

export default function DashboardPage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { data: user, isLoading } = useUserProfile();
  const { mutate: logout } = useLogout();

  const username = user?.data?.preferred_username || "User";
  const email = user?.data?.email || "user@example.com";
  const initials = username.substring(0, 2).toUpperCase();

  return (
    <div className="space-y-6">
      {/* Top Header Area */}
      <div className="flex flex-col gap-4 px-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#000000]">
            Security Overview
          </h1>
          <p className="mt-1 text-[15px] font-medium text-gray-500">
            Real-time monitoring and incident response.
          </p>
        </div>
        <div className="flex items-center gap-6 text-gray-400">
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative flex cursor-pointer items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 focus:outline-none"
            >
              <Bell className="h-6 w-6 text-gray-500 transition-colors hover:text-black" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-[#FF3B30] ring-2 ring-[#F2F2F7]" />
            </button>

            {isNotificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-[90]"
                  onClick={() => setIsNotificationsOpen(false)}
                />
                <div className="animate-in fade-in zoom-in-95 absolute top-12 left-0 z-[100] w-96 origin-top-left rounded-2xl border-none bg-white/80 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl duration-200 focus:outline-none md:right-0 md:left-auto md:origin-top-right">
                  <div className="flex items-center justify-between border-b border-gray-200/50 p-4">
                    <h3 className="text-lg font-bold text-black">Notifications</h3>
                    <button className="text-sm font-medium text-[#007AFF] hover:opacity-80">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-[320px] overflow-y-auto">
                    {/* Sample Notification 1 */}
                    <div className="flex cursor-pointer gap-4 border-b border-gray-100/50 p-4 transition-colors hover:bg-black/5">
                      <div className="mt-1 flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#FF3B30]" />
                      <div className="space-y-1">
                        <p className="text-[15px] font-semibold text-black">
                          Critical Alert: Malware Detected
                        </p>
                        <p className="text-[13px] leading-snug text-gray-500">
                          Multiple login attempts from unknown IP address detected on Server-01.
                        </p>
                        <span className="text-[11px] font-medium text-gray-400">2 mins ago</span>
                      </div>
                    </div>
                    {/* Sample Notification 2 */}
                    <div className="flex cursor-pointer gap-4 border-b border-gray-100/50 p-4 transition-colors hover:bg-black/5">
                      <div className="mt-1 flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#FF9500]" />
                      <div className="space-y-1">
                        <p className="text-[15px] font-semibold text-black">High CPU Usage</p>
                        <p className="text-[13px] leading-snug text-gray-500">
                          Database server CPU load exceeded 90% for over 5 minutes.
                        </p>
                        <span className="text-[11px] font-medium text-gray-400">1 hour ago</span>
                      </div>
                    </div>
                    {/* Sample Notification 3 */}
                    <div className="flex cursor-pointer gap-4 p-4 transition-colors hover:bg-black/5">
                      <div className="mt-1 flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#007AFF]" />
                      <div className="space-y-1">
                        <p className="text-[15px] font-semibold text-black">System Update</p>
                        <p className="text-[13px] leading-snug text-gray-500">
                          Scheduled maintenance completed successfully.
                        </p>
                        <span className="text-[11px] font-medium text-gray-400">3 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative flex items-center gap-3 border-l border-gray-300 pl-6">
            {/* Visible Profile Info */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-700">
              {isLoading ? <Skeleton className="h-full w-full rounded-full" /> : initials}
            </div>
            <div className="flex flex-col">
              {isLoading ? (
                <div className="space-y-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-2 w-12" />
                </div>
              ) : (
                <>
                  <span className="text-[15px] leading-none font-semibold text-black">
                    {username === email ? email.split("@")[0] : username}
                  </span>
                  <span
                    className="max-w-[120px] truncate text-[11px] font-medium text-gray-500"
                    title={email}
                  >
                    {email}
                  </span>
                </>
              )}
            </div>

            {/* Settings Dropdown Trigger */}
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="ml-2 flex cursor-pointer items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 focus:outline-none"
            >
              <Settings className="h-5 w-5 text-gray-500 hover:text-black" />
            </button>

            {isSettingsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsSettingsOpen(false)} />
                <div className="animate-in fade-in zoom-in-95 absolute top-14 right-0 z-50 w-56 origin-top-right rounded-xl bg-white/80 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-xl duration-200 focus:outline-none">
                  <button
                    onClick={() => logout()}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#FF3B30] transition-colors hover:bg-[#FF3B30]/10"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats Cards - Inset Grouped Style */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-none bg-white shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[15px] font-semibold text-gray-500">
              Critical Incidents
            </CardTitle>
            <AlertOctagon className="h-5 w-5 text-[#FF3B30]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-black">3</div>
            <p className="mt-1 text-[13px] font-medium text-gray-500">
              <span className="font-bold text-[#FF3B30]">+1</span> since last hour
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none bg-white shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[15px] font-semibold text-gray-500">High Severity</CardTitle>
            <AlertTriangle className="h-5 w-5 text-[#FF9500]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-black">12</div>
            <p className="mt-1 text-[13px] font-medium text-gray-500">
              <span className="font-bold text-[#FF9500]">+3</span> new alerts
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none bg-white shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[15px] font-semibold text-gray-500">
              Medium Severity
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-[#FFCC00]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-black">24</div>
            <p className="mt-1 text-[13px] font-medium text-gray-500">
              <span className="font-bold text-[#34C759]">-2</span> resolved
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none bg-white shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[15px] font-semibold text-gray-500">System Status</CardTitle>
            <Activity className="h-5 w-5 text-[#8E8E93]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-black">98.9%</div>
            <p className="mt-1 text-[13px] font-medium text-gray-500">Uptime (Last 24h)</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <DashboardCharts />

      {/* Recent Incidents Section - Inset Grouped List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#007AFF]" />
            <h2 className="text-[17px] font-bold text-black">Recent Incidents</h2>
          </div>
        </div>

        {/* Reusing the Table Component - Will need to ensure it matches the style */}
        <IncidentsTable />
      </div>
    </div>
  );
}
