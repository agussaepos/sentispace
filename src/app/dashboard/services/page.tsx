"use client";

import { useState } from "react";
import { ServiceTable } from "@/components/cms/service-table";
import { ServiceDialog } from "@/components/cms/service-dialog";
import { useServices } from "@/hooks/use-services";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ServicesPage() {
  const { addService } = useServices();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddService = (data: any) => {
    addService(data);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6 p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black">Services</h1>
          <p className="mt-1 text-[15px] text-gray-500">Manage and monitor your system services</p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="h-11 rounded-xl bg-[#007AFF] px-6 text-[15px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-[#007AFF]/90 hover:shadow-blue-500/30 active:scale-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Services Table */}
      <ServiceTable />

      {/* Add Service Dialog */}
      <ServiceDialog open={dialogOpen} onOpenChange={setDialogOpen} onSave={handleAddService} />
    </div>
  );
}
