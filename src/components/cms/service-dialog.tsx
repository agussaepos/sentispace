"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Service } from "@/hooks/use-services";

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: Service | null;
  onSave: (data: Partial<Service>) => void;
}

export function ServiceDialog({ open, onOpenChange, service, onSave }: ServiceDialogProps) {
  const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
  const [status, setStatus] = useState<"active" | "inactive">(service?.status || "active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description, status });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border-none bg-white/90 backdrop-blur-xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight text-black">
            {service ? "Edit Service" : "Create New Service"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label
              htmlFor="name"
              className="text-[13px] font-semibold tracking-tight text-gray-500 uppercase"
            >
              Service Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-xl border-transparent bg-[#F2F2F7] px-4 text-[15px] font-medium text-black transition-all placeholder:text-gray-400 focus:border-[#007AFF] focus:bg-white focus:ring-4 focus:ring-[#007AFF]/10"
              placeholder="e.g. Gateway-A"
              autoComplete="off"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="description"
              className="text-[13px] font-semibold tracking-tight text-gray-500 uppercase"
            >
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-11 rounded-xl border-transparent bg-[#F2F2F7] px-4 text-[15px] font-medium text-black transition-all placeholder:text-gray-400 focus:border-[#007AFF] focus:bg-white focus:ring-4 focus:ring-[#007AFF]/10"
              placeholder="Brief description of the service..."
              autoComplete="off"
            />
          </div>
          <div className="grid gap-3">
            <Label className="text-[13px] font-semibold tracking-tight text-gray-500 uppercase">
              Status
            </Label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStatus("active")}
                className={`h-11 flex-1 rounded-xl text-[15px] font-semibold transition-all ${
                  status === "active"
                    ? "bg-[#34C759] text-white shadow-lg shadow-green-500/20"
                    : "bg-[#F2F2F7] text-gray-500 hover:bg-gray-200"
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setStatus("inactive")}
                className={`h-11 flex-1 rounded-xl text-[15px] font-semibold transition-all ${
                  status === "inactive"
                    ? "bg-[#FF3B30] text-white shadow-lg shadow-red-500/20"
                    : "bg-[#F2F2F7] text-gray-500 hover:bg-gray-200"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
          <DialogFooter className="mt-4 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-xl text-[15px] font-medium text-gray-500 hover:bg-gray-100/80 hover:text-black"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 rounded-xl bg-[#007AFF] px-6 text-[15px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-[#007AFF]/90 hover:shadow-blue-500/30 active:scale-95"
            >
              {service ? "Save Changes" : "Create Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
