import { LucideIcon } from "lucide-react";

export interface CardInterface {
  id: number;
  title: string;
  description: string;
  agent_code: string;
  icon: LucideIcon;
  imageUrl: string;
  route: string;
}

export interface AgentDetails {
  fullDescription: string;
  problems: string[];
  solutions: string[];
  stats: {
    satisfaction: string;
    responseTime: string;
    [key: string]: string;
  };
}