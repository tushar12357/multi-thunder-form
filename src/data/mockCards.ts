import type { CardInterface } from "../types";
import { Sun, Heart, Home, Gamepad, Briefcase, Paintbrush, Calendar, Shirt, Utensils, Users, Shield } from "lucide-react";

export const mockCards: CardInterface[] = [
  {
    id: 1,
    title: "Real Estate",
    route: "real-estate",
    description: "Residential Listings & Seller Leads",
    imageUrl: "#FF5722", // Primary Orange
    icon: Home, // Icon for real estate
    tags: ["Education", "Training"],
    agent_code: "34dad347-7f9d-484f-9e8b-9166bfe63531",
  },
  {
    id: 2,
    title: "E-commerce",
    route: "e-commerce",
    description: "Product Recommendations & Sales Conversion",
    imageUrl: "#FF7043", // Light Orange
    icon: Shirt, // Icon for retail/e-commerce
    tags: ["Retail", "Sales"],
    agent_code: "be4ce13a-8c13-414c-916a-32b2b57760d8",
  },
  {
    id: 3,
    title: "Mortgage",
    route: "mortgage",
    description: "Mortgage Lenders & Loan Officers",
    imageUrl: "#FF3D00", // Deep Orange
    icon: Briefcase, // Icon for finance
    tags: ["Mortgage", "Property"],
    agent_code: "7ed2f64a-608d-4f82-831f-91bd24575955",
  },
  {
    id: 4,
    title: "Health & Wellness",
    route: "health",
    description: "Complete hospitality management solutions",
    imageUrl: "#FF8A65", // Soft Orange
    icon: Heart, // Icon for health
    tags: ["Health", "Wellness"],
    agent_code: "fa1fd90b-1570-4f3e-b12e-a354d7d8f119",
  },
  {
    id: 5,
    title: "Solar",
    route: "solar",
    description: "Product Recommendations & Sales Conversion",
    imageUrl: "#FF7043", // Light Orange
    icon: Sun, // Icon for solar
    tags: ["Solar", "Energy"],
    agent_code: "128e39e9-2fae-45c7-9ad4-41e92100836a",
  },
  {
    id: 6,
    title: "Insurance",
    route: "insurance",
    description: "Insurance Policies & Coverage Plans",
    imageUrl: "#FF8A65", // Soft Orange
    icon: Shield, // Icon for insurance
    tags: ["Insurance", "Protection"],
    agent_code: "4044f047-6e53-4806-a2e8-9e20664401e1",
  },
];