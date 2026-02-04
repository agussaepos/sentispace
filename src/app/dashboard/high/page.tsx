"use client";

import { IncidentsTable } from "@/components/dashboard/incidents-table";

export default function HighPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-severity-high text-3xl font-bold tracking-tight">
          High Severity Incidents
        </h1>
        <p className="text-muted-foreground">Urgent issues requiring attention within 1 hour.</p>
      </div>
      <IncidentsTable severity="high" />
    </div>
  );
}
