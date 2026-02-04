"use client";

import { IncidentsTable } from "@/components/dashboard/incidents-table";

export default function MediumPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-severity-medium text-3xl font-bold tracking-tight">
          Medium Severity Incidents
        </h1>
        <p className="text-muted-foreground">
          Issues affecting non-critical systems. Investigate within 4 hours.
        </p>
      </div>
      <IncidentsTable severity="medium" />
    </div>
  );
}
