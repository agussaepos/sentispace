"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Data for SOC Incidents by Category/Type
const categoryData = [
  { name: "Malware", count: 45, percentage: 65, color: "#EF4444" },
  { name: "Phishing", count: 28, percentage: 40, color: "#F97316" },
  { name: "DDoS", count: 12, percentage: 15, color: "#EAB308" },
  { name: "Intrusion", count: 8, percentage: 10, color: "#3B82F6" },
];

export function CategoryChart() {
  return (
    <Card className="rounded-xl border-none bg-white p-2 shadow-none">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-bold text-gray-900">Top Incident Categories</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {categoryData.map((data, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Label */}
              <div className="w-24 flex-shrink-0 text-sm font-medium text-gray-700">
                {data.name}
              </div>

              {/* Bar */}
              <div className="flex h-2.5 flex-1 items-center overflow-hidden rounded-full bg-gray-100">
                <div
                  style={{ width: `${data.percentage}%`, backgroundColor: data.color }}
                  className="h-full rounded-full transition-all duration-500"
                />
              </div>

              {/* Value */}
              <span className="w-8 text-right text-sm font-bold text-gray-900">{data.count}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          Most incidents this week are related to <strong>Malware</strong> attempts.
        </div>
      </CardContent>
    </Card>
  );
}
