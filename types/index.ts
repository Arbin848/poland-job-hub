export interface Candidate {
  id: string;
  referenceCode: string; // e.g. "PJH-1042"
  fullName: string;
  phone: string;
  email: string;
  nationality: string;
  currentLocation: "Poland" | "Abroad" | "Other EU";
  languages: string[]; // ["English", "Hindi", "Nepali"]
  primarySkill: string; // "Warehouse / Forklift", "Welder", "Production Worker", etc.
  yearsOfExperience: number;
  education: string;
  legalStatus: "Valid Visa" | "Karta Pobytu" | "Needs Work Permit" | "Student Status" | "Awaiting TRC Decision";
  legalStatusExpiry?: string;
  pipelineStage: "New Lead" | "Screened" | "Law Firm Review" | "Work Permit Pending" | "Matched to Employer" | "Deployed / Working" | "Completed";
  assignedEmployer?: string;
  assignedCountry: "Poland" | "Germany" | "Czechia" | "Other";
  notes?: string;
  documents: CandidateDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface CandidateDocument {
  id: string;
  title: string;
  type: "Passport" | "Visa" | "Karta Pobytu" | "CV" | "Police Clearance" | "Work Certificate" | "Photo";
  fileUrl?: string;
  uploadedAt: string;
  expiryDate?: string;
}

export interface JobOrder {
  id: string;
  title: string;
  companyName: string;
  country: "Poland" | "Germany" | "Czechia" | "Netherlands";
  city: string;
  sector: "Logistics & Warehousing" | "Manufacturing & Production" | "Construction & Trades" | "Hospitality" | "Technical / Skilled";
  positionsNeeded: number;
  positionsFilled: number;
  placementFeePerWorker: number; // e.g. 2500 PLN or 1500 EUR
  currency: "PLN" | "EUR";
  requiredLanguages: string[];
  salaryOffered: string; // e.g. "25 PLN/h net + Free Accommodation" or "€14.50/h gross"
  status: "Open" | "Interviewing" | "Filled" | "Closed";
  createdAt: string;
}

export interface CommunicationLog {
  id: string;
  candidateId: string;
  candidateName: string;
  type: "SMS" | "Email" | "WhatsApp";
  direction: "Outbound" | "Inbound";
  templateUsed?: string;
  messageText: string;
  sentAt: string;
  sentBy: string; // staff name
}

export interface LawFirmReferral {
  id: string;
  candidateId: string;
  candidateName: string;
  candidatePhone: string;
  issueType: "TRC / Karta Pobytu" | "Change of Employer (Annex 1)" | "Visa Extension" | "Appeal (Odwołanie)" | "Work Permit Issue";
  referralDate: string;
  status: "Referred" | "Consultation Completed" | "Law Firm Retained" | "Application Submitted" | "Approved" | "Commission Paid";
  expectedCommissionPLN: number;
  isPaid: boolean;
}
