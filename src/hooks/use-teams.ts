"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface Team {
  id: string;
  name: string;
  description: string;
  members_count: number;
  color: string;
}

const initialTeams: Team[] = [
  {
    id: "1",
    name: "DevOps",
    description: "Infrastructure and deployment management.",
    members_count: 5,
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Support",
    description: "Customer issue resolution and feedback.",
    members_count: 8,
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Security",
    description: "Threat monitoring and incident response.",
    members_count: 4,
    color: "bg-red-500",
  },
];

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load teams from localStorage or use initial mock data
  useEffect(() => {
    const storedTeams = localStorage.getItem("soc-teams");
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    } else {
      setTeams(initialTeams);
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever teams change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("soc-teams", JSON.stringify(teams));
    }
  }, [teams, isLoading]);

  const addTeam = (data: Omit<Team, "id" | "members_count" | "color">) => {
    const newTeam: Team = {
      id: Math.random().toString(36).substr(2, 9),
      members_count: 0,
      color: "bg-gray-500", // Default color, could be random
      ...data,
    };
    setTeams((prev) => [...prev, newTeam]);
    toast.success("Team created successfully");
  };

  const updateTeam = (id: string, data: Partial<Team>) => {
    setTeams((prev) =>
      prev.map((team) => (team.id === id ? { ...team, ...data } : team))
    );
    toast.success("Team updated successfully");
  };

  const deleteTeam = (id: string) => {
    setTeams((prev) => prev.filter((team) => team.id !== id));
    toast.success("Team deleted successfully");
  };

  return {
    teams,
    isLoading,
    addTeam,
    updateTeam,
    deleteTeam,
  };
}
