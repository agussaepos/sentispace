"use client";

import { TrendChart } from "@/components/dashboard/charts/trend-chart";
import { SeverityChart } from "@/components/dashboard/charts/severity-chart";
import { CategoryChart } from "@/components/dashboard/charts/category-chart";

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
      <TrendChart />

      <SeverityChart />

      <CategoryChart />
    </div>
  );
}
