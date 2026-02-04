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
import { Team } from "@/hooks/use-teams";

interface TeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team?: Team | null; // If present, we are editing
  onSave: (data: Partial<Team>) => void;
}

export function TeamDialog({ open, onOpenChange, team, onSave }: TeamDialogProps) {
  const [name, setName] = useState(team?.name || "");
  const [description, setDescription] = useState(team?.description || "");
  const [color, setColor] = useState(team?.color || "bg-indigo-500");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description, color });
    onOpenChange(false);
  };

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-teal-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-gray-500",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border-none bg-white/90 backdrop-blur-xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight text-black">
            {team ? "Edit Team" : "Create New Team"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="m-2 grid gap-5 py-4">
          <div className="grid gap-2">
            <Label
              htmlFor="name"
              className="text-[13px] font-semibold tracking-tight text-gray-500 uppercase"
            >
              Team Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-xl border-transparent bg-[#F2F2F7] px-4 text-[15px] font-medium text-black transition-all placeholder:text-gray-400 focus:border-[#007AFF] focus:bg-white focus:ring-4 focus:ring-[#007AFF]/10"
              placeholder="e.g. SOC Alpha"
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
              placeholder="Brief description of responsibilities..."
              autoComplete="off"
            />
          </div>
          <div className="grid gap-3">
            <Label className="text-[13px] font-semibold tracking-tight text-gray-500 uppercase">
              Team Color
            </Label>
            <div className="flex flex-wrap gap-3 p-1">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`relative h-9 w-9 rounded-full ${c} flex items-center justify-center transition-all hover:scale-110 active:scale-95`}
                >
                  {color === c && (
                    <div className="h-9 w-9 rounded-full ring-[3px] ring-[#007AFF] ring-offset-2 ring-offset-white" />
                  )}
                </button>
              ))}
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
              {team ? "Save Changes" : "Create Team"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
