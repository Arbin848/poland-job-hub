import { NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// Schema initialization for team discussions & candidate case notes
db.exec(`
  CREATE TABLE IF NOT EXISTS team_case_discussions (
    id TEXT PRIMARY KEY,
    candidateId TEXT,
    orderId TEXT,
    targetCountry TEXT NOT NULL, -- 'Poland', 'Germany', 'Czechia', 'Romania', 'Netherlands', 'Other EU'
    authorName TEXT NOT NULL,
    authorRole TEXT NOT NULL, -- 'Founder Admin', 'Recruiter', 'Legal Partner Desk'
    topic TEXT NOT NULL,
    commentText TEXT NOT NULL,
    priority TEXT NOT NULL, -- 'Normal', 'High', 'Urgent'
    createdAt TEXT NOT NULL,
    FOREIGN KEY(candidateId) REFERENCES candidates(id) ON DELETE CASCADE
  );
`);

// Seed initial internal team discussions if empty
const count = db.prepare("SELECT COUNT(*) as count FROM team_case_discussions").get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO team_case_discussions (id, candidateId, orderId, targetCountry, authorName, authorRole, topic, commentText, priority, createdAt)
    VALUES (@id, @candidateId, @orderId, @targetCountry, @authorName, @authorRole, @topic, @commentText, @priority, @createdAt)
  `);

  insert.run({
    id: "disc-1",
    candidateId: "cand-1",
    orderId: "order-1",
    targetCountry: "Poland",
    authorName: "Arbin (Founder)",
    authorRole: "Founder Admin",
    topic: "Bikash S. - Poznań Auto Logistics Placement",
    commentText: "Candidate has valid UDT forklift certificate and current Karta Pobytu. Employer approved start date for Monday. Ensure accommodation key handover is confirmed with site manager.",
    priority: "Normal",
    createdAt: new Date().toISOString()
  });

  insert.run({
    id: "disc-2",
    candidateId: "cand-2",
    orderId: "order-2",
    targetCountry: "Germany",
    authorName: "Arbin (Founder)",
    authorRole: "Founder Admin",
    topic: "Cross-Border Transfer to Germany (Bavaria)",
    commentText: "German agency partner Bavaria IndustriePersonal is ready to accept Gurpreet for MIG/MAG welding. Checking with partner law firm regarding Vander Elst visa timing vs. direct German work permission.",
    priority: "High",
    createdAt: new Date().toISOString()
  });

  insert.run({
    id: "disc-3",
    candidateId: null,
    orderId: null,
    targetCountry: "Czechia",
    authorName: "Arbin (Founder)",
    authorRole: "Founder Admin",
    topic: "Expansion into Czech Republic (Prague / Brno Logistics)",
    commentText: "Reached out to 2 partner agencies in Czechia looking for 20+ packaging workers. Czech Employee Card processing is faster in Podkarpackie. Will prepare 10 candidate profiles.",
    priority: "High",
    createdAt: new Date().toISOString()
  });
}

// GET /api/team-discussions
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country") || "All";

    let sql = "SELECT * FROM team_case_discussions WHERE 1=1";
    const params: any[] = [];

    if (country !== "All") {
      sql += " AND targetCountry = ?";
      params.push(country);
    }

    sql += " ORDER BY createdAt DESC";
    const rows = db.prepare(sql).all(...params);

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/team-discussions
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { candidateId, orderId, targetCountry, authorName, topic, commentText, priority } = body;

    if (!commentText || !topic) {
      return NextResponse.json({ success: false, error: "Missing topic or comment text" }, { status: 400 });
    }

    const id = uuidv4();
    const now = new Date().toISOString();

    const insert = db.prepare(`
      INSERT INTO team_case_discussions (id, candidateId, orderId, targetCountry, authorName, authorRole, topic, commentText, priority, createdAt)
      VALUES (?, ?, ?, ?, ?, 'Team Member', ?, ?, ?, ?)
    `);

    insert.run(
      id,
      candidateId || null,
      orderId || null,
      targetCountry || "Poland",
      authorName || "Arbin",
      topic,
      commentText,
      priority || "Normal",
      now
    );

    const created = db.prepare("SELECT * FROM team_case_discussions WHERE id = ?").get(id);
    return NextResponse.json({ success: true, data: created });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
