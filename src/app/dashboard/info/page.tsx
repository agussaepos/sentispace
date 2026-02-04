"use client";

import { IncidentsTable } from "@/components/dashboard/incidents-table";

export default function InfoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-severity-info text-3xl font-bold tracking-tight">
          Informational Events
        </h1>
        <p className="text-muted-foreground">System logs, audits, and routine operations.</p>
      </div>
      <IncidentsTable severity="info" />
    </div>
  );
}
