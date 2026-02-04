"use client";

import { IncidentsTable } from "@/components/dashboard/incidents-table";

export default function CriticalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-severity-critical text-3xl font-bold tracking-tight">
          Critical Incidents
        </h1>
        <p className="text-muted-foreground">
          Immediate action required. System stability at risk.
        </p>
      </div>
      <IncidentsTable severity="critical" />
    </div>
  );
}
