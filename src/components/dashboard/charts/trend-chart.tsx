"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trendData = [
  { day: "Mon", incidents: 12 },
  { day: "Tue", incidents: 19 },
  { day: "Wed", incidents: 15 },
  { day: "Thu", incidents: 22 },
  { day: "Fri", incidents: 30 },
  { day: "Sat", incidents: 10 },
  { day: "Sun", incidents: 8 },
];

export function TrendChart() {
  return (
    <Card className="rounded-xl border-none bg-white p-2 shadow-none">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-bold text-gray-900">Weekly Incident Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ color: "#111827", fontWeight: "bold" }}
            />
            <Area
              type="monotone"
              dataKey="incidents"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorIncidents)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
