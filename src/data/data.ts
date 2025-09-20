import { Star, Sun, Heart, Home } from "lucide-react";
import { CardInterface } from "../types";
import { AgentDetails } from "./types";

export const mockCards: CardInterface[] = [
  {
    id: 1,
    title: "Real Estate",
    description: "AI assistant for real estate lead capture and engagement.",
    agent_code: "RE_AGENT",
    icon: Star,
    imageUrl: "#FF6B35",
    route: "real-estate",
  },
  {
    id: 2,
    title: "Solar",
    description: "AI assistant for solar business lead capture.",
    agent_code: "SOLAR_AGENT",
    icon: Sun,
    imageUrl: "#34D399",
    route: "solar",
  },
  {
    id: 3,
    title: "Health & Wellness",
    description: "AI assistant for healthcare patient engagement.",
    agent_code: "HEALTH_AGENT",
    icon: Heart,
    imageUrl: "#3B82F6",
    route: "health-wellness",
  },
  {
    id: 4,
    title: "Mortgage",
    description: "AI assistant for mortgage lead capture.",
    agent_code: "MORTGAGE_AGENT",
    icon: Home,
    imageUrl: "#8B5CF6",
    route: "mortgage",
  },
];

export const agentDetails: Record<string, AgentDetails> = {
  "Real Estate": {
    fullDescription:
      "Ravan.ai's Real Estate AI Voice Assistant transforms lead capture and client engagement with 24/7 availability, automated callbacks, and seamless CRM integration, driving 3× more qualified appointments and up to 41% faster deal cycles.",
    problems: [
      "Over 50% of leads come after hours, but <10% get timely follow-up, causing revenue loss.",
      "Manual follow-ups take hours, while contacting leads within 5 minutes boosts conversion ~21x.",
      "Agents waste ~18 hours/week on unqualified leads and repetitive screening.",
      "Manual data entry and scheduling lead to errors and delays.",
      "Growing web traffic overwhelms teams, limiting scalability.",
      "Delayed responses frustrate prospects, reducing trust and conversions.",
    ],
    solutions: [
      "24/7 AI Voice Assistant for instant lead capture and engagement.",
      "Automated AI callbacks scheduled at the lead's preferred time.",
      "Seamless scheduling and CRM integration to eliminate manual errors.",
      "Scales effortlessly to handle all visitors and leads simultaneously.",
      "Human-like interactions for enhanced customer experience and trust.",
      "3× more qualified appointments and up to 41% faster deal cycles.",
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 1 second",
      appointments: "3× more",
    },
  },
  Solar: {
    fullDescription:
      "Ravan.ai's Solar AI Voice Assistant revolutionizes lead capture and client engagement for solar businesses with 24/7 availability, instant callbacks, and seamless CRM integration, driving 3× more qualified bookings and 41% faster sales cycles.",
    problems: [
      "Over 60% of solar inquiries come after business hours, but fewer than 12% receive timely responses, leading to lost deals and wasted ad spend.",
      "Solar customers compare quotes and move on if not contacted within minutes, with delays of even an hour reducing conversion chances by 80%.",
      "Solar reps waste ~20 hours/week on repetitive lead filtering and unqualified calls.",
      "Manual data entry and follow-up management result in errors and delays.",
      "Peak campaign success overwhelms sales teams, limiting bandwidth.",
    ],
    solutions: [
      "24/7 AI Voice Assistant instantly engages prospects, answers pricing and panel questions, qualifies leads, and captures contact info.",
      "AI-powered callbacks within minutes of form fills or missed calls to secure consultations before competitors respond.",
      "Real-time appointment booking with auto-sync to CRM or Google Calendar, eliminating manual updates.",
      "Handles high volumes of simultaneous inquiries, from 10 to 1,000 visitors, without additional headcount.",
      "Human-like conversations build trust, simulating real consultations for faster conversions.",
      "3× more qualified bookings and 41% faster sales cycles for solar businesses.",
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 1 second",
      appointments: "3× more",
    },
  },
  "Health & Wellness": {
    fullDescription:
      "Ravan.ai's Healthcare AI Voice Assistant transforms patient engagement and appointment management with 24/7 availability, instant callbacks, and seamless calendar integration, driving 2.5× more booked appointments and 40% fewer no-shows.",
    problems: [
      "Over 55% of appointment requests and health inquiries come after clinic hours, but less than 15% receive timely replies, leading to patient drop-offs and poor care experiences.",
      "Patients expect quick responses for health concerns, and delays in callbacks or bookings push them to competitors or urgent care alternatives.",
      "Front desk staff are overloaded with calls, walk-ins, and data entry, causing missed opportunities and unhappy patients.",
      "Manual appointment scheduling leads to errors, such as incorrect bookings or double entries, wasting time.",
      "Slow follow-up on diagnostics or consult requests risks poor health outcomes.",
    ],
    solutions: [
      "24/7 AI Health Assistant engages patients, answers FAQs (symptoms, availability, insurance, timings), captures data, and qualifies them for appointments, even after hours.",
      "Handles inbound calls and instantly engages high-priority leads to secure appointments before patients choose another provider.",
      "Real-time auto-scheduling with calendar sync reduces no-shows, overlaps, and manual input errors.",
      "Scales to manage multiple patient conversations simultaneously, handling high demand without additional staff.",
      "Human-like, empathetic voice responses build trust, providing a personal care experience.",
      "2.5× increase in booked appointments and 40% reduction in no-shows for clinics.",
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 1 second",
      appointments: "2.5× more",
      noShowReduction: "40%",
    },
  },
  Mortgage: {
    fullDescription:
      "Ravan.ai's Mortgage AI Voice Assistant revolutionizes lead capture and borrower engagement with 24/7 availability, instant qualification, and seamless CRM integration, driving up to 3× more pre-qualified leads and 38% faster loan closures.",
    problems: [
      "Over 65% of mortgage inquiries occur after business hours, but fewer than 13% receive follow-up within the critical first hour, leading to lost borrowers and reduced marketing ROI.",
      "Mortgage shoppers compare rates quickly, and delays of 10–15 minutes can result in them committing to competitors.",
      "Loan officers spend 15–20 hours/week on repetitive pre-qualification calls.",
      "Slow turnaround on pre-approvals causes delays and borrower drop-offs.",
    ],
    solutions: [
      "24/7 AI Mortgage Assistant answers questions on rates, eligibility, documents, and loan types, while instantly capturing and qualifying borrower leads.",
      "Initiates calls to leads, collecting pre-approval details like income, credit score range, and loan type, ensuring no lead is missed.",
      "Seamless scheduling of loan consultations with auto-sync to calendars and mortgage CRMs, minimizing manual effort.",
      "Scales to handle thousands of simultaneous conversations during campaigns or seasonal spikes, without additional staff.",
      "Human-like, conversational guidance builds trust, simulating a mortgage expert and transferring live calls to agents when needed.",
      "Up to 3× more pre-qualified leads and 38% faster loan closures for lenders.",
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 1 second",
      preQualifiedLeads: "3× more",
      closureTimeReduction: "38%",
    },
  },
};