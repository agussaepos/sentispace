"use client";

import { IncidentsTable } from "@/components/dashboard/incidents-table";

export default function LowPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-severity-low text-3xl font-bold tracking-tight">
          Low Severity Incidents
        </h1>
        <p className="text-muted-foreground">Minor issues or anomalies. Monitor for trends.</p>
      </div>
      <IncidentsTable severity="low" />
    </div>
  );
}
