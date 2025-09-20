import { Star, Sun, Heart, Home } from "lucide-react";
import { CardInterface } from "../types";
import { AgentDetails } from "./types";

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
      "Ravan.ai's Solar AI Voice Assistant transforms lead generation and customer engagement for solar companies with 24/7 availability, instant energy assessments, and seamless CRM integration, driving 4× more qualified site visits and 52% faster installation conversions.",
    problems: [
      "Over 70% of solar inquiries occur after business hours, but fewer than 10% receive same-day responses, causing homeowners to choose faster competitors.",
      "Solar prospects research multiple companies and expect immediate responses - delays beyond 15 minutes reduce conversion probability by 85%.",
      "Solar consultants waste ~22 hours/week on unqualified leads and repetitive energy bill discussions.",
      "Manual lead tracking and site assessment scheduling creates gaps and missed appointments.",
      "Successful solar campaigns generate lead surges that overwhelm sales teams, limiting growth potential.",
    ],
    solutions: [
      "24/7 AI Voice Assistant instantly engages homeowners, calculates potential savings, explains solar benefits, qualifies properties, and captures energy usage data.",
      "AI-powered immediate callbacks after form submissions or missed calls to secure site assessments before competitors make contact.",
      "Real-time site visit scheduling with solar specialists, auto-syncing to CRM or Google Calendar, preventing scheduling conflicts.",
      "Handles unlimited concurrent conversations, from 10 to 10,000 homeowners, without increasing overhead costs.",
      "Authentic conversations build homeowner trust, delivering personalized energy consultations that accelerate decision-making.",
      "4× more qualified site visits and 52% faster installation conversions for solar businesses.",
    ],
    stats: {
      satisfaction: "97%",
      responseTime: "< 1 second",
      appointments: "4× more",
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
  Insurance: {
    fullDescription:
      "Ravan.ai's Insurance AI Voice Assistant revolutionizes lead capture and client engagement for insurance agencies with 24/7 availability, instant needs assessments, and seamless CRM integration, driving 3× more qualified consultations and 40% faster policy conversions.",
    problems: [
      "Over 65% of insurance inquiries occur after business hours, but fewer than 10% receive timely responses, leading to lost clients and reduced marketing ROI.",
      "Customers compare insurance quotes quickly, and delays of 10–15 minutes can result in them choosing competitors.",
      "Agents spend ~20 hours/week on repetitive inquiries about coverage options and policy details.",
      "Manual scheduling and follow-up processes lead to errors and missed opportunities.",
      "High inquiry volumes during campaigns overwhelm agents, limiting scalability.",
    ],
    solutions: [
      "24/7 AI Voice Assistant instantly engages clients, assesses insurance needs (auto, home, life, business), and captures key details like current policies and life changes.",
      "AI-powered callbacks within minutes of inquiries to secure consultations before competitors respond.",
      "Real-time scheduling of consultations with licensed agents, auto-syncing to CRM or calendars, eliminating manual errors.",
      "Scales to handle unlimited simultaneous conversations, from 10 to 10,000 inquiries, without additional staff.",
      "Human-like, conversational interactions build trust, simulating a consultation with a licensed agent.",
      "3× more qualified consultations and 40% faster policy conversions for insurance agencies.",
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 1 second",
      consultations: "3× more",
      conversionTimeReduction: "40%",
    },
  },
  Ecommerce: {
    fullDescription:
      "Ravan.ai's Ecommerce AI Voice Assistant revolutionizes online shopping experiences with 24/7 customer support, instant product recommendations, and seamless cart recovery, driving 5× more conversions and 38% higher average order values.",
    problems: [
      "Over 75% of online shoppers abandon carts without purchasing, with 68% citing inability to get immediate product questions answered.",
      "Customers expect instant responses during shopping - delays of even 2 minutes increase cart abandonment by 67%.",
      "Customer service teams spend ~25 hours/week answering repetitive product specification and shipping questions.",
      "Manual order tracking and customer follow-up leads to missed upselling opportunities and poor retention.",
      "High-traffic periods and flash sales overwhelm support teams, creating frustrated customers and lost revenue.",
    ],
    solutions: [
      "24/7 AI Voice Assistant instantly helps customers find products, compares features, answers sizing questions, and guides purchase decisions.",
      "AI-powered real-time cart recovery with personalized offers and instant customer support to complete abandoned purchases.",
      "Live product recommendations and upselling during shopping sessions, automatically updating customer profiles and purchase history.",
      "Manages unlimited simultaneous shopping conversations, from 100 to 100,000 customers, without additional support staff.",
      "Natural shopping conversations replicate in-store personal assistance, building customer confidence and purchase intent.",
      "5× more conversions and 38% higher average order values for ecommerce businesses.",
    ],
    stats: {
      satisfaction: "96%",
      responseTime: "< 1 second",
      conversions: "5× more",
      averageOrderValueIncrease: "38%",
    },
  },
};