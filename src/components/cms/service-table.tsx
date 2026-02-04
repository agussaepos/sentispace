"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Server } from "lucide-react";
import { useServices, Service } from "@/hooks/use-services";
import { ServiceDialog } from "./service-dialog";

export function ServiceTable() {
  const { services, updateService, deleteService } = useServices();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteService(id);
    }
  };

  const handleSave = (data: Partial<Service>) => {
    if (selectedService) {
      updateService(selectedService.id, data);
    }
    setDialogOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border-none bg-white shadow-none">
        <Table>
          <TableHeader className="bg-[#F2F2F7]">
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="h-11 text-[13px] font-semibold text-gray-500 uppercase">
                Service
              </TableHead>
              <TableHead className="h-11 text-[13px] font-semibold text-gray-500 uppercase">
                Status
              </TableHead>
              <TableHead className="h-11 text-right text-[13px] font-semibold text-gray-500 uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-gray-500">
                  No services found.
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow
                  key={service.id}
                  className="border-b border-gray-50 transition-colors hover:bg-gray-50/50"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${service.color}`}
                      >
                        <Server className="h-4.5 w-4.5 text-white" />
                      </div>
                      <div>
                        <div className="text-[15px] font-semibold text-black">{service.name}</div>
                        <div className="text-[13px] text-gray-500">{service.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[13px] font-semibold ${
                        service.status === "active"
                          ? "bg-[#34C759]/10 text-[#34C759]"
                          : "bg-[#FF3B30]/10 text-[#FF3B30]"
                      }`}
                    >
                      {service.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(service)}
                        className="h-9 w-9 rounded-lg p-0 text-[#007AFF] hover:bg-[#007AFF]/10 hover:text-[#007AFF]"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(service.id)}
                        className="h-9 w-9 rounded-lg p-0 text-[#FF3B30] hover:bg-[#FF3B30]/10 hover:text-[#FF3B30]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ServiceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        service={selectedService}
        onSave={handleSave}
      />
    </>
  );
}
