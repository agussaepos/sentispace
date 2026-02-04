"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import { Sidebar, navItems } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isDashboard) {
    return (
      <div className="bg-background text-foreground flex h-screen w-full overflow-hidden">
        {/* Desktop Sidebar - Hidden on mobile, Flex on md+ */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Layout Container */}
        <div className="flex flex-1 flex-col overflow-hidden md:ml-72">
          {/* Mobile Header */}
          <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden">
            <Image
              src="/logo.png"
              alt="Sentispace Logo"
              width={120}
              height={32}
              className="h-6 w-auto object-contain"
              priority
            />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </header>

          <main className="relative flex-1 overflow-y-auto scroll-smooth p-4 md:p-8">
            {children}
          </main>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />

            {/* Drawer */}
            <div className="animate-in slide-in-from-left relative flex h-full w-64 flex-col bg-white shadow-xl duration-200">
              <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
                <Image
                  src="/logo.png"
                  alt="Sentispace Logo"
                  width={120}
                  height={32}
                  className="h-6 w-auto object-contain"
                  priority
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full p-1 hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid gap-1 px-2">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                          isActive
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "mr-3 h-5 w-5",
                            isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-500"
                          )}
                        />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default layout for Login or other non-dashboard pages
  return <>{children}</>;
}
