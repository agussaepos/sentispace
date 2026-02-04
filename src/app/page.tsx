"use client";

import { useLogin } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const loginMutation = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Validation Error", {
        description: "Please enter both username and password",
      });
      return;
    }

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          toast.success("Welcome back", {
            description: "Accessing secure workspace...",
          });
          router.push("/dashboard/home");
        },
        onError: (error: any) => {
          toast.error("Authentication Failed", {
            description: error?.response?.data?.error_message || "Invalid credentials",
          });
        },
      }
    );
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#F2F2F7]">
      {/* Main Content */}
      <div className="z-10 w-full px-4">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8">
          {/* Brand Logo */}
          <div className="animate-in fade-in zoom-in-95 flex flex-col items-center gap-2 duration-500">
            <span className="text-4xl font-bold tracking-tight text-[#000000]">Sentispace</span>
            <p className="text-[15px] text-gray-500">Security Operations Center</p>
          </div>

          {/* Card */}
          <div className="group animate-in slide-in-from-bottom-4 w-full rounded-3xl bg-white p-8 shadow-sm duration-700">
            <div className="mb-6 flex flex-col text-center">
              <h1 className="text-2xl font-bold tracking-tight text-black">Sign In</h1>
              <p className="mt-2 text-[15px] text-gray-500">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-[13px] font-semibold tracking-tight text-gray-500 uppercase"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="name@company.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loginMutation.isPending}
                  className="h-12 rounded-xl border-transparent bg-[#F2F2F7] px-4 text-[15px] font-medium text-black transition-all placeholder:text-gray-400 focus:border-[#007AFF] focus:bg-white focus:ring-4 focus:ring-[#007AFF]/10"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-[13px] font-semibold tracking-tight text-gray-500 uppercase"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-[13px] font-medium text-[#007AFF] transition-colors hover:text-[#007AFF]/80"
                  >
                    Forgot?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loginMutation.isPending}
                  className="h-12 rounded-xl border-transparent bg-[#F2F2F7] px-4 text-[15px] font-medium text-black transition-all placeholder:text-gray-400 focus:border-[#007AFF] focus:bg-white focus:ring-4 focus:ring-[#007AFF]/10"
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                className="mt-6 h-12 w-full rounded-xl bg-[#007AFF] text-[17px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-[#007AFF]/90 hover:shadow-blue-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>

          <div className="animate-in fade-in mt-2 text-center delay-300 duration-1000">
            <p className="text-[13px] text-gray-400">
              Authorized personnel only · All activities are monitored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
