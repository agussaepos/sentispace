"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Data for SOC Incidents by Severity
const severityData = [
  { name: "Critical", value: 3, color: "#EF4444" }, // Red-500
  { name: "High", value: 12, color: "#F97316" }, // Orange-500
  { name: "Medium", value: 24, color: "#EAB308" }, // Yellow-500
  { name: "Low", value: 45, color: "#3B82F6" }, // Blue-500
];

export function SeverityChart() {
  return (
    <Card className="rounded-xl border-none bg-white p-2 shadow-none">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-bold text-gray-900">Incidents by Severity</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="relative h-[240px] w-full min-w-0 md:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "#111827", fontWeight: "bold" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                TOTAL
              </span>
              <span className="text-4xl font-extrabold text-[#111827]">84</span>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-x-2 gap-y-6 md:w-1/2">
            {severityData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#111827]">{item.value}</span>
                <span className="text-xs font-medium text-gray-400">{item.name}</span>
                <div
                  className="mt-1 h-1 w-6 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
