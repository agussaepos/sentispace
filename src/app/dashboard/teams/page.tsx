"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTeams, Team } from "@/hooks/use-teams";
import { TeamTable } from "@/components/cms/team-table";
import { TeamDialog } from "@/components/cms/team-dialog";
import { Button } from "@/components/ui/button";

export default function TeamsPage() {
  const { teams, isLoading, addTeam, updateTeam, deleteTeam } = useTeams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const handleCreate = () => {
    setEditingTeam(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setIsDialogOpen(true);
  };

  const handleSave = (data: Partial<Team>) => {
    if (editingTeam) {
      updateTeam(editingTeam.id, data);
    } else {
      addTeam(data as any);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black">Teams</h1>
          <p className="mt-0.5 text-[13px] font-medium text-gray-500">
            Manage your SOC response teams and shifts.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="h-8 rounded-full bg-[#007AFF] px-4 text-xs font-semibold text-white shadow-none hover:bg-[#007AFF]/90"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add Team
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500 shadow-none">
          Loading teams...
        </div>
      ) : (
        <TeamTable teams={teams} onEdit={handleEdit} onDelete={deleteTeam} />
      )}

      <TeamDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        team={editingTeam}
        onSave={handleSave}
      />
    </div>
  );
}
