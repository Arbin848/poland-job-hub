import { Candidate, JobOrder, LawFirmReferral, CommunicationLog } from "@/types";

export const initialCandidates: Candidate[] = [
  {
    id: "cand-1",
    referenceCode: "PJH-1042",
    fullName: "Bikash Shrestha",
    phone: "+48 572 819 231",
    email: "bikash.shrestha@example.com",
    nationality: "Nepali",
    currentLocation: "Poland",
    languages: ["English", "Nepali", "Hindi"],
    primarySkill: "Warehouse & Forklift Operator (UDT)",
    yearsOfExperience: 4,
    education: "Secondary / Vocational Diploma",
    legalStatus: "Karta Pobytu",
    legalStatusExpiry: "2027-04-15",
    pipelineStage: "Matched to Employer",
    assignedEmployer: "Poznań Auto Logistics Sp. z o.o.",
    assignedCountry: "Poland",
    notes: "Has certified Polish UDT license for forklift. Fluent in English and Nepali.",
    documents: [
      { id: "doc-1", title: "Passport Scan", type: "Passport", uploadedAt: "2026-09-10" },
      { id: "doc-2", title: "Karta Pobytu Card (Front & Back)", type: "Karta Pobytu", uploadedAt: "2026-09-10", expiryDate: "2027-04-15" },
      { id: "doc-3", title: "UDT Forklift Certificate", type: "Work Certificate", uploadedAt: "2026-09-12" }
    ],
    createdAt: "2026-09-10T10:00:00Z",
    updatedAt: "2026-10-08T14:30:00Z"
  },
  {
    id: "cand-2",
    referenceCode: "PJH-1043",
    fullName: "Gurpreet Singh",
    phone: "+48 732 192 841",
    email: "gurpreet.singh@example.com",
    nationality: "Indian",
    currentLocation: "Poland",
    languages: ["English", "Hindi", "Punjabi"],
    primarySkill: "MIG / MAG Welder (135/136)",
    yearsOfExperience: 6,
    education: "Technical ITI Welding Certification",
    legalStatus: "Awaiting TRC Decision",
    legalStatusExpiry: "2026-11-20",
    pipelineStage: "Law Firm Review",
    assignedCountry: "Germany",
    notes: "Looking to switch from current employer in Wrocław. Law firm partner handling Annex 1.",
    documents: [
      { id: "doc-4", title: "International Passport", type: "Passport", uploadedAt: "2026-09-15" },
      { id: "doc-5", title: "TÜV Rheinland Welder Certificate", type: "Work Certificate", uploadedAt: "2026-09-15" }
    ],
    createdAt: "2026-09-15T09:30:00Z",
    updatedAt: "2026-10-09T11:15:00Z"
  },
  {
    id: "cand-3",
    referenceCode: "PJH-1044",
    fullName: "Sunil Thapa",
    phone: "+977 984 1234567",
    email: "sunil.thapa@example.com",
    nationality: "Nepali",
    currentLocation: "Abroad",
    languages: ["English", "Nepali", "Hindi"],
    primarySkill: "CNC Machine Operator & Metal Worker",
    yearsOfExperience: 5,
    education: "Diploma in Mechanical Engineering",
    legalStatus: "Needs Work Permit",
    pipelineStage: "Work Permit Pending",
    assignedEmployer: "Silesia Tech Components (Katowice)",
    assignedCountry: "Poland",
    notes: "Employer submitted Type A Work Permit (Zezwolenie) in Katowice Voivodeship.",
    documents: [
      { id: "doc-6", title: "Passport Valid until 2031", type: "Passport", uploadedAt: "2026-09-20" },
      { id: "doc-7", title: "Police Clearance Certificate", type: "Police Clearance", uploadedAt: "2026-09-22" }
    ],
    createdAt: "2026-09-20T12:00:00Z",
    updatedAt: "2026-10-05T16:00:00Z"
  },
  {
    id: "cand-4",
    referenceCode: "PJH-1045",
    fullName: "Amit Kumar Sharma",
    phone: "+48 512 345 678",
    email: "amit.sharma@example.com",
    nationality: "Indian",
    currentLocation: "Poland",
    languages: ["English", "Hindi"],
    primarySkill: "General Production & Packaging",
    yearsOfExperience: 2,
    education: "Bachelor of Arts",
    legalStatus: "Student Status",
    legalStatusExpiry: "2027-09-30",
    pipelineStage: "Deployed / Working",
    assignedEmployer: "FreshPack Logistics Poznań",
    assignedCountry: "Poland",
    notes: "Full-time student in Poznań University. Zero work permit needed under Polish law (0 ZUS tax under 26).",
    documents: [
      { id: "doc-8", title: "Student ID Card & Certificate", type: "Work Certificate", uploadedAt: "2026-10-01" },
      { id: "doc-9", title: "Passport & Student Visa", type: "Passport", uploadedAt: "2026-10-01" }
    ],
    createdAt: "2026-10-01T08:00:00Z",
    updatedAt: "2026-10-10T09:00:00Z"
  }
];

export const initialJobOrders: JobOrder[] = [
  {
    id: "order-1",
    title: "15x Warehouse Order Pickers & Logistics Staff",
    companyName: "Panattoni Central Logistics Sp. z o.o.",
    country: "Poland",
    city: "Poznań / Gądki",
    sector: "Logistics & Warehousing",
    positionsNeeded: 15,
    positionsFilled: 9,
    placementFeePerWorker: 2500,
    currency: "PLN",
    requiredLanguages: ["English"],
    salaryOffered: "26.50 PLN/h net + Free Company Housing",
    status: "Open",
    createdAt: "2026-09-25T10:00:00Z"
  },
  {
    id: "order-2",
    title: "6x Certified MIG/MAG Welders (135)",
    companyName: "Bavaria IndustriePersonal GmbH",
    country: "Germany",
    city: "Nuremberg / Regensburg",
    sector: "Construction & Trades",
    positionsNeeded: 6,
    positionsFilled: 2,
    placementFeePerWorker: 1800,
    currency: "EUR",
    requiredLanguages: ["English"],
    salaryOffered: "€16.80/h gross + Subsidized Room",
    status: "Open",
    createdAt: "2026-10-01T14:00:00Z"
  },
  {
    id: "order-3",
    title: "20x Automotive Assembly Line Operators",
    companyName: "Silesia Auto Parts",
    country: "Poland",
    city: "Gliwice / Katowice",
    sector: "Manufacturing & Production",
    positionsNeeded: 20,
    positionsFilled: 14,
    placementFeePerWorker: 2200,
    currency: "PLN",
    requiredLanguages: ["English", "Hindi"],
    salaryOffered: "25.00 PLN/h net + Attendance Bonus",
    status: "Interviewing",
    createdAt: "2026-09-18T11:00:00Z"
  }
];

export const initialLawFirmReferrals: LawFirmReferral[] = [
  {
    id: "ref-1",
    candidateId: "cand-2",
    candidateName: "Gurpreet Singh",
    candidatePhone: "+48 732 192 841",
    issueType: "Change of Employer (Annex 1)",
    referralDate: "2026-09-16",
    status: "Application Submitted",
    expectedCommissionPLN: 500,
    isPaid: false
  },
  {
    id: "ref-2",
    candidateId: "cand-5",
    candidateName: "Ramesh Adhikari",
    candidatePhone: "+48 691 002 918",
    issueType: "TRC / Karta Pobytu",
    referralDate: "2026-09-02",
    status: "Approved",
    expectedCommissionPLN: 600,
    isPaid: true
  }
];

export const initialCommunicationLogs: CommunicationLog[] = [
  {
    id: "comm-1",
    candidateId: "cand-1",
    candidateName: "Bikash Shrestha",
    type: "SMS",
    direction: "Outbound",
    templateUsed: "Match Confirmation",
    messageText: "Hello Bikash, congratulations! You have been matched with Poznań Auto Logistics. Check your email for details.",
    sentAt: "2026-10-08T14:35:00Z",
    sentBy: "Arbin (Admin)"
  },
  {
    id: "comm-2",
    candidateId: "cand-2",
    candidateName: "Gurpreet Singh",
    type: "Email",
    direction: "Outbound",
    templateUsed: "Law Firm Update",
    messageText: "Dear Gurpreet, our partner legal team has successfully filed your Annex 1 in Urząd Wojewódzki. Your case code is PJH-1043.",
    sentAt: "2026-10-09T11:20:00Z",
    sentBy: "Arbin (Admin)"
  }
];
