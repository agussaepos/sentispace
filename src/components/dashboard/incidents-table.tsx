"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useTeams } from "@/hooks/use-teams";
import { useServices } from "@/hooks/use-services";

interface Incident {
  id: string;
  team: string;
  issue: string;
  service: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  timestamp: string;
}

// Mock Data - Replace with API later
const mockIncidents: Incident[] = [
  {
    id: "INC-001",
    team: "Network Ops",
    issue: "High Latency",
    service: "Gateway-A",
    description: "Detected unusual latency spikes > 500ms on main gateway.",
    severity: "critical",
    timestamp: "2 mins ago",
  },
  {
    id: "INC-002",
    team: "Security",
    issue: "Failed Logins",
    service: "Auth-Service",
    description: "Multiple failed login attempts from IP 192.168.1.50",
    severity: "high",
    timestamp: "15 mins ago",
  },
  {
    id: "INC-003",
    team: "DevOps",
    issue: "CPU Usage",
    service: "Container-DB",
    description: "Database container consuming 85% CPU.",
    severity: "medium",
    timestamp: "1 hour ago",
  },
  {
    id: "INC-004",
    team: "Support",
    issue: "User Report",
    service: "Frontend",
    description: "User reported slow loading on dashboard.",
    severity: "low",
    timestamp: "3 hours ago",
  },
  {
    id: "INC-005",
    team: "Compliance",
    issue: "Audit Log",
    service: "Logging",
    description: "Routine audit log rotation completed.",
    severity: "info",
    timestamp: "5 hours ago",
  },
];

export function IncidentsTable({ severity }: { severity?: string }) {
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>("all");
  const { teams } = useTeams();
  const { services } = useServices();

  const filteredData = mockIncidents.filter((inc) => {
    const matchesSeverity = severity ? inc.severity === severity : true;
    const matchesTeam = selectedTeam === "all" || inc.team === selectedTeam;
    const matchesService = selectedService === "all" || inc.service === selectedService;
    return matchesSeverity && matchesTeam && matchesService;
  });

  // Helper to get soft badge styles manually
  const getBadgeStyle = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-50 text-red-700 hover:bg-red-100 border-red-200";
      case "high":
        return "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200";
      case "low":
        return "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200";
      case "info":
        return "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-2">
      {/* Team & Service Filters */}
      <div className="flex items-center justify-end gap-3 rounded-t-2xl bg-[#F2F2F7] px-4 py-2.5">
        {/* Team Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="team-filter" className="text-[13px] font-medium text-gray-500">
            Filter:
          </label>
          <select
            id="team-filter"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="h-8 rounded-lg border-none bg-white px-3 py-1 text-[13px] font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Teams</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Service Filter */}
        <div className="flex items-center gap-2">
          <select
            id="service-filter"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="h-8 rounded-lg border-none bg-white px-3 py-1 text-[13px] font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Services</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-b-2xl border-none bg-white shadow-none">
        <Table>
          <TableHeader className="bg-[#F2F2F7]">
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="w-[180px] py-4 pl-6 text-[13px] font-semibold tracking-tight text-gray-500">
                Team
              </TableHead>
              <TableHead className="w-[200px] py-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Issue
              </TableHead>
              <TableHead className="w-[180px] py-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Service
              </TableHead>
              <TableHead className="py-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Description
              </TableHead>
              <TableHead className="w-[120px] py-4 pr-6 text-right text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Severity
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                  No incidents found for this selection.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((incident) => (
                <TableRow
                  key={incident.id}
                  className="border-b border-gray-50 transition-colors hover:bg-gray-50/50"
                >
                  <TableCell className="py-4 pl-6 font-semibold text-gray-900">
                    {incident.team}
                  </TableCell>
                  <TableCell className="py-4 text-gray-700">{incident.issue}</TableCell>
                  <TableCell className="py-4 font-mono text-xs text-gray-500">
                    {incident.service}
                  </TableCell>
                  <TableCell
                    className="max-w-md truncate py-4 text-gray-500"
                    title={incident.description}
                  >
                    {incident.description}
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-right">
                    <Badge
                      className={`rounded-full border px-2.5 py-0.5 font-medium shadow-none ${getBadgeStyle(incident.severity)}`}
                    >
                      {incident.severity}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
