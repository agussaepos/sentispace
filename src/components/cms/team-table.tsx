"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Team } from "@/hooks/use-teams";
import { Pencil, Trash2, Users } from "lucide-react";

interface TeamTableProps {
  teams: Team[];
  onEdit: (team: Team) => void;
  onDelete: (id: string) => void;
}

export function TeamTable({ teams, onEdit, onDelete }: TeamTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border-none bg-white shadow-none">
      <Table>
        <TableHeader className="bg-[#F2F2F7]">
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            <TableHead className="w-[50px] py-4 pl-6"></TableHead>
            <TableHead className="py-4 text-[13px] font-semibold tracking-tight text-gray-500 uppercase">
              Team Information
            </TableHead>
            <TableHead className="w-[120px] py-4 pr-6 text-right text-[13px] font-semibold tracking-tight text-gray-500 uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center text-gray-500">
                No teams found. Create one to get started.
              </TableCell>
            </TableRow>
          ) : (
            teams.map((team) => (
              <TableRow
                key={team.id}
                className="border-b border-gray-100/50 transition-colors hover:bg-gray-50/50"
              >
                <TableCell className="py-4 pl-6">
                  <div
                    className={`h-10 w-10 rounded-xl ${team.color} flex items-center justify-center shadow-sm`}
                  >
                    <span className="text-sm font-bold text-white">
                      {team.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-semibold text-black">{team.name}</span>
                    <span className="text-sm text-gray-500">{team.description}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 pr-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(team)}
                      className="h-8 w-8 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(team.id)}
                      className="h-8 w-8 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
