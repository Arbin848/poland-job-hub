import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbPath = path.join(dataDir, "poljobhub.db");
const db = new Database(dbPath, { timeout: 10000 });

// Initialize Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS candidates (
    id TEXT PRIMARY KEY,
    referenceCode TEXT UNIQUE,
    fullName TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    nationality TEXT NOT NULL,
    currentLocation TEXT NOT NULL,
    languages TEXT NOT NULL, -- JSON array of strings
    primarySkill TEXT NOT NULL,
    experienceYears INTEGER NOT NULL,
    education TEXT,
    legalStatus TEXT NOT NULL,
    legalStatusExpiry TEXT,
    pipelineStage TEXT NOT NULL,
    assignedEmployer TEXT,
    assignedCountry TEXT,
    notes TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    candidateId TEXT NOT NULL,
    title TEXT NOT NULL,
    docType TEXT NOT NULL, -- 'Passport', 'Visa', 'Karta Pobytu', 'Certificate', 'CV'
    fileName TEXT NOT NULL,
    fileUrl TEXT NOT NULL,
    fileSize INTEGER,
    uploadedAt TEXT NOT NULL,
    expiryDate TEXT,
    FOREIGN KEY(candidateId) REFERENCES candidates(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS job_orders (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    companyName TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    sector TEXT NOT NULL,
    positionsNeeded INTEGER NOT NULL,
    positionsFilled INTEGER NOT NULL,
    placementFee REAL NOT NULL,
    currency TEXT NOT NULL,
    requiredLanguages TEXT NOT NULL, -- JSON array
    salaryOffered TEXT NOT NULL,
    status TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS law_firm_referrals (
    id TEXT PRIMARY KEY,
    candidateId TEXT NOT NULL,
    candidateName TEXT NOT NULL,
    candidatePhone TEXT NOT NULL,
    issueType TEXT NOT NULL,
    status TEXT NOT NULL,
    referralDate TEXT NOT NULL,
    commissionPLN REAL NOT NULL,
    isPaid INTEGER DEFAULT 0,
    notes TEXT,
    FOREIGN KEY(candidateId) REFERENCES candidates(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS communication_logs (
    id TEXT PRIMARY KEY,
    candidateId TEXT,
    recipientContact TEXT NOT NULL,
    type TEXT NOT NULL, -- 'SMS', 'Email', 'WhatsApp'
    direction TEXT NOT NULL, -- 'Outbound', 'Inbound'
    subject TEXT,
    messageText TEXT NOT NULL,
    sentAt TEXT NOT NULL,
    sentBy TEXT NOT NULL
  );
`);

// Seed default data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM candidates").get() as { count: number };
if (count.count === 0) {
  const insertCandidate = db.prepare(`
    INSERT INTO candidates (
      id, referenceCode, fullName, phone, email, nationality, currentLocation,
      languages, primarySkill, experienceYears, education, legalStatus,
      legalStatusExpiry, pipelineStage, assignedEmployer, assignedCountry,
      notes, createdAt, updatedAt
    ) VALUES (
      @id, @referenceCode, @fullName, @phone, @email, @nationality, @currentLocation,
      @languages, @primarySkill, @experienceYears, @education, @legalStatus,
      @legalStatusExpiry, @pipelineStage, @assignedEmployer, @assignedCountry,
      @notes, @createdAt, @updatedAt
    )
  `);

  insertCandidate.run({
    id: "cand-1",
    referenceCode: "PJH-1042",
    fullName: "Bikash Shrestha",
    phone: "+48 572 819 231",
    email: "bikash.shrestha@example.com",
    nationality: "Nepali",
    currentLocation: "Poland",
    languages: JSON.stringify(["English", "Nepali", "Hindi"]),
    primarySkill: "Warehouse & Forklift Operator (UDT)",
    experienceYears: 4,
    education: "Vocational Logistics Certificate",
    legalStatus: "Karta Pobytu",
    legalStatusExpiry: "2027-04-15",
    pipelineStage: "Matched to Employer",
    assignedEmployer: "Poznań Auto Logistics Sp. z o.o.",
    assignedCountry: "Poland",
    notes: "Has certified Polish UDT license for forklift. Fluent in English and Nepali.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  insertCandidate.run({
    id: "cand-2",
    referenceCode: "PJH-1043",
    fullName: "Gurpreet Singh",
    phone: "+48 732 192 841",
    email: "gurpreet.singh@example.com",
    nationality: "Indian",
    currentLocation: "Poland",
    languages: JSON.stringify(["English", "Hindi", "Punjabi"]),
    primarySkill: "MIG / MAG Welder (135/136)",
    experienceYears: 6,
    education: "ITI Technical Certification",
    legalStatus: "Awaiting TRC Decision",
    legalStatusExpiry: "2026-11-20",
    pipelineStage: "Law Firm Review",
    assignedEmployer: null,
    assignedCountry: "Germany",
    notes: "Switching employers in Wrocław. Law firm partner handling Annex 1 filing.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  // Seed sample docs
  const insertDoc = db.prepare(`
    INSERT INTO documents (id, candidateId, title, docType, fileName, fileUrl, fileSize, uploadedAt, expiryDate)
    VALUES (@id, @candidateId, @title, @docType, @fileName, @fileUrl, @fileSize, @uploadedAt, @expiryDate)
  `);

  insertDoc.run({
    id: "doc-1",
    candidateId: "cand-1",
    title: "Passport Scan (Bikash S.)",
    docType: "Passport",
    fileName: "passport_bikash.pdf",
    fileUrl: "/uploads/sample_passport.pdf",
    fileSize: 1024500,
    uploadedAt: "2026-09-10",
    expiryDate: "2031-08-14"
  });

  insertDoc.run({
    id: "doc-2",
    candidateId: "cand-1",
    title: "Polish UDT Forklift Certificate",
    docType: "Certificate",
    fileName: "udt_license.pdf",
    fileUrl: "/uploads/sample_udt.pdf",
    fileSize: 524000,
    uploadedAt: "2026-09-12",
    expiryDate: "2029-09-12"
  });

  // Seed job orders
  const insertOrder = db.prepare(`
    INSERT INTO job_orders (
      id, title, companyName, country, city, sector, positionsNeeded,
      positionsFilled, placementFee, currency, requiredLanguages,
      salaryOffered, status, createdAt
    ) VALUES (
      @id, @title, @companyName, @country, @city, @sector, @positionsNeeded,
      @positionsFilled, @placementFee, @currency, @requiredLanguages,
      @salaryOffered, @status, @createdAt
    )
  `);

  insertOrder.run({
    id: "order-1",
    title: "15x Warehouse Order Pickers & Logistics Staff",
    companyName: "Panattoni Central Logistics Sp. z o.o.",
    country: "Poland",
    city: "Poznań / Gądki",
    sector: "Logistics & Warehousing",
    positionsNeeded: 15,
    positionsFilled: 9,
    placementFee: 2500,
    currency: "PLN",
    requiredLanguages: JSON.stringify(["English"]),
    salaryOffered: "26.50 PLN/h net + Free Company Housing",
    status: "Open",
    createdAt: new Date().toISOString()
  });

  insertOrder.run({
    id: "order-2",
    title: "6x Certified MIG/MAG Welders (135)",
    companyName: "Bavaria IndustriePersonal GmbH",
    country: "Germany",
    city: "Nuremberg / Regensburg",
    sector: "Construction & Trades",
    positionsNeeded: 6,
    positionsFilled: 2,
    placementFee: 1800,
    currency: "EUR",
    requiredLanguages: JSON.stringify(["English"]),
    salaryOffered: "€16.80/h gross + Subsidized Room",
    status: "Open",
    createdAt: new Date().toISOString()
  });

  // Seed Law firm referrals
  const insertReferral = db.prepare(`
    INSERT INTO law_firm_referrals (id, candidateId, candidateName, candidatePhone, issueType, status, referralDate, commissionPLN, isPaid, notes)
    VALUES (@id, @candidateId, @candidateName, @candidatePhone, @issueType, @status, @referralDate, @commissionPLN, @isPaid, @notes)
  `);

  insertReferral.run({
    id: "ref-1",
    candidateId: "cand-2",
    candidateName: "Gurpreet Singh",
    candidatePhone: "+48 732 192 841",
    issueType: "Change of Employer (Annex 1)",
    status: "Application Submitted to Urząd",
    referralDate: "2026-09-16",
    commissionPLN: 500,
    isPaid: 0,
    notes: "Filing confirmation received from Dolnośląski Urząd Wojewódzki."
  });
}

export default db;
