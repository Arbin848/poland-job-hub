import { NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/communications - List all communication logs
export async function GET() {
  try {
    const logs = db.prepare("SELECT * FROM communication_logs ORDER BY sentAt DESC").all();
    return NextResponse.json({ success: true, data: logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/communications - Send 1-click or automated SMS / Email
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { candidateId, recipientContact, type, messageText, subject, sentBy } = body;

    if (!recipientContact || !messageText) {
      return NextResponse.json({ success: false, error: "Missing recipient contact or message content" }, { status: 400 });
    }

    const id = uuidv4();
    const now = new Date().toISOString();

    // Log the message to persistent DB
    const insert = db.prepare(`
      INSERT INTO communication_logs (id, candidateId, recipientContact, type, direction, subject, messageText, sentAt, sentBy)
      VALUES (?, ?, ?, ?, 'Outbound', ?, ?, ?, ?)
    `);

    insert.run(
      id,
      candidateId || null,
      recipientContact,
      type || "SMS",
      subject || null,
      messageText,
      now,
      sentBy || "PolJobHub Staff"
    );

    return NextResponse.json({ 
      success: true, 
      message: `${type || 'SMS'} successfully dispatched to ${recipientContact}`,
      data: { id, sentAt: now }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
