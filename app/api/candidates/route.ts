import { NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/candidates - List all candidates with their documents
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const location = searchParams.get("location") || "";
    const skill = searchParams.get("skill") || "";

    let sql = "SELECT * FROM candidates WHERE 1=1";
    const params: any[] = [];

    if (query) {
      sql += " AND (fullName LIKE ? OR referenceCode LIKE ? OR primarySkill LIKE ?)";
      params.push(`%${query}%`, `%${query}%`, `%${query}%`);
    }
    if (location && location !== "All") {
      sql += " AND currentLocation = ?";
      params.push(location);
    }
    if (skill && skill !== "All") {
      sql += " AND primarySkill LIKE ?";
      params.push(`%${skill}%`);
    }

    sql += " ORDER BY createdAt DESC";
    const candidates = db.prepare(sql).all(...params) as any[];

    // Fetch documents for each candidate
    const getDocs = db.prepare("SELECT * FROM documents WHERE candidateId = ? ORDER BY uploadedAt DESC");

    const result = candidates.map(c => {
      let langs = [];
      try {
        langs = typeof c.languages === "string" ? JSON.parse(c.languages) : (c.languages || []);
      } catch {
        langs = c.languages ? [c.languages] : [];
      }
      return {
        ...c,
        languages: langs,
        documents: getDocs.all(c.id)
      };
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/candidates - Create new candidate record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = uuidv4();
    const referenceCode = "PJH-" + Math.floor(1000 + Math.random() * 9000);
    const now = new Date().toISOString();

    const insert = db.prepare(`
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

    insert.run({
      id,
      referenceCode,
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      nationality: body.nationality || "Nepali",
      currentLocation: body.currentLocation || "Poland",
      languages: JSON.stringify(body.languages || ["English"]),
      primarySkill: body.primarySkill || "General Worker",
      experienceYears: Number(body.experienceYears) || 0,
      education: body.education || "Secondary Education",
      legalStatus: body.legalStatus || "Needs Work Permit",
      legalStatusExpiry: body.legalStatusExpiry || null,
      pipelineStage: body.pipelineStage || "New Lead",
      assignedEmployer: body.assignedEmployer || null,
      assignedCountry: body.assignedCountry || "Poland",
      notes: body.notes || "",
      createdAt: now,
      updatedAt: now
    });

    // If legal assistance was requested, automatically log to law firm referral table
    if (body.needsLegalAssistance) {
      const refId = uuidv4();
      const insertRef = db.prepare(`
        INSERT INTO law_firm_referrals (id, candidateId, candidateName, candidatePhone, issueType, status, referralDate, commissionPLN, isPaid, notes)
        VALUES (@id, @candidateId, @candidateName, @candidatePhone, @issueType, @status, @referralDate, @commissionPLN, @isPaid, @notes)
      `);
      insertRef.run({
        id: refId,
        candidateId: id,
        candidateName: body.fullName,
        candidatePhone: body.phone,
        issueType: body.legalServiceType || "Karta Pobytu / TRC",
        status: "New Intake - Routed to Law Firm",
        referralDate: now.split("T")[0],
        commissionPLN: 500,
        isPaid: 0,
        notes: "Automated routing from PolJobHub intake portal."
      });
    }

    const created = db.prepare("SELECT * FROM candidates WHERE id = ?").get(id) as any;
    created.languages = JSON.parse(created.languages);
    created.documents = [];

    return NextResponse.json({ success: true, data: created });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH /api/candidates - Update candidate stage or details
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, pipelineStage, notes, assignedEmployer, assignedCountry, legalStatusExpiry } = body;

    const now = new Date().toISOString();
    const update = db.prepare(`
      UPDATE candidates
      SET pipelineStage = COALESCE(@pipelineStage, pipelineStage),
          notes = COALESCE(@notes, notes),
          assignedEmployer = COALESCE(@assignedEmployer, assignedEmployer),
          assignedCountry = COALESCE(@assignedCountry, assignedCountry),
          legalStatusExpiry = COALESCE(@legalStatusExpiry, legalStatusExpiry),
          updatedAt = @updatedAt
      WHERE id = @id
    `);

    update.run({
      id,
      pipelineStage: pipelineStage || null,
      notes: notes || null,
      assignedEmployer: assignedEmployer || null,
      assignedCountry: assignedCountry || null,
      legalStatusExpiry: legalStatusExpiry || null,
      updatedAt: now
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
