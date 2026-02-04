"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface Service {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  color: string;
}

const initialServices: Service[] = [
  {
    id: "1",
    name: "Gateway-A",
    description: "Main API gateway and load balancer.",
    status: "active",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Auth-Service",
    description: "User authentication and authorization service.",
    status: "active",
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Container-DB",
    description: "Primary database container and storage.",
    status: "active",
    color: "bg-purple-500",
  },
  {
    id: "4",
    name: "Frontend",
    description: "Web application frontend and UI services.",
    status: "active",
    color: "bg-orange-500",
  },
  {
    id: "5",
    name: "Logging",
    description: "Centralized logging and monitoring service.",
    status: "active",
    color: "bg-gray-500",
  },
];

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load services from localStorage or use initial mock data
  useEffect(() => {
    const storedServices = localStorage.getItem("soc-services");
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    } else {
      setServices(initialServices);
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever services change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("soc-services", JSON.stringify(services));
    }
  }, [services, isLoading]);

  const addService = (data: Omit<Service, "id" | "color">) => {
    const newService: Service = {
      id: Math.random().toString(36).substr(2, 9),
      color: "bg-gray-500", // Default color
      ...data,
    };
    setServices((prev) => [...prev, newService]);
    toast.success("Service created successfully");
  };

  const updateService = (id: string, data: Partial<Service>) => {
    setServices((prev) =>
      prev.map((service) => (service.id === id ? { ...service, ...data } : service))
    );
    toast.success("Service updated successfully");
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
    toast.success("Service deleted successfully");
  };

  return {
    services,
    isLoading,
    addService,
    updateService,
    deleteService,
  };
}
