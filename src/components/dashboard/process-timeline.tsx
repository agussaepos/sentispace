"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProcessTimeline() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-medium">Process Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pt-6 pb-2">
          {/* Month Labels */}
          <div className="text-muted-foreground mb-4 flex justify-between px-4 text-xs">
            <span className="w-1/4 text-center">July</span>
            <span className="w-1/4 text-center">August</span>
            <span className="w-1/4 text-center">September</span>
            <span className="w-1/4 text-center">October</span>
          </div>

          {/* Timeline Grid */}
          <div className="relative h-40 border-t border-dashed border-gray-200">
            {/* Vertical Grid Lines */}
            <div className="absolute top-0 bottom-0 left-1/4 border-l border-dashed border-gray-200"></div>
            <div className="absolute top-0 bottom-0 left-2/4 border-l border-dashed border-gray-200"></div>
            <div className="absolute top-0 bottom-0 left-3/4 border-l border-dashed border-gray-200"></div>

            {/* Current Time Indicator */}
            <div className="absolute -top-1.5 left-[55%] z-10 h-full border-l-2 border-dashed border-indigo-900">
              <div className="absolute -top-1 -left-[5px] h-3 w-3 rounded-full border-2 border-indigo-900 bg-white"></div>
            </div>

            {/* Tasks */}
            <div className="absolute top-4 left-0 flex w-full flex-col gap-6 px-4">
              {/* Task 1 */}
              <div className="flex items-center">
                <span className="w-32 text-xs font-medium text-gray-500">Audit Meeting</span>
                <div className="ml-4 h-2 w-24 rounded-full bg-gray-300"></div>
              </div>
              {/* Task 2 */}
              <div className="flex items-center">
                <span className="w-32 text-xs font-medium text-gray-500">Evidence Collection</span>
                <div className="ml-4 ml-[10%] h-2 w-48 rounded-full bg-gray-300"></div>
              </div>
              {/* Task 3 */}
              <div className="flex items-center">
                <span className="w-32 text-xs font-medium text-gray-500">System Description</span>
                <div className="ml-4 ml-[25%] h-2 w-64 rounded-full bg-indigo-300 opacity-70"></div>
              </div>
              {/* Task 4 */}
              <div className="flex items-center">
                <span className="w-32 text-xs font-medium text-gray-500">Final Report</span>
                <div className="ml-4 ml-[60%] h-2 w-16 rounded-full bg-slate-400"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
