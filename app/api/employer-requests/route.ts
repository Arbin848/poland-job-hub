import { NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { sendLiveEmail } from "@/lib/mailer";

// POST /api/employer-requests - Inbound client demand submission from homepage
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, rolesNeeded, contactInfo, country, estimatedCount } = body;

    if (!companyName || !rolesNeeded || !contactInfo) {
      return NextResponse.json({ success: false, error: "Please provide company name, required roles, and contact info." }, { status: 400 });
    }

    const orderId = uuidv4();
    const now = new Date().toISOString();

    // 1. Save directly into job_orders table
    const insert = db.prepare(`
      INSERT INTO job_orders (
        id, title, companyName, country, city, sector, positionsNeeded,
        positionsFilled, placementFee, currency, requiredLanguages,
        salaryOffered, status, createdAt
      ) VALUES (
        @id, @title, @companyName, @country, @city, @sector, @positionsNeeded,
        0, 2500, 'PLN', @requiredLanguages, 'Competitive / Per Client Rate', 'Open', @createdAt
      )
    `);

    insert.run({
      id: orderId,
      title: rolesNeeded,
      companyName,
      country: country || "Poland",
      city: "TBD / To Be Confirmed",
      sector: "Logistics & Manufacturing",
      positionsNeeded: Number(estimatedCount) || 5,
      requiredLanguages: JSON.stringify(["English"]),
      createdAt: now
    });

    // 2. Also log as Hot Inbound Employer Lead for tracking
    const leadId = uuidv4();
    db.prepare(`
      INSERT INTO employer_leads (
        id, companyName, country, city, industry, rolesNeeded, estimatedPositions,
        contactPerson, contactEmail, contactPhone, sourcePortal, scrapedDate,
        outreachStatus, notes
      ) VALUES (
        ?, ?, ?, 'Client Inquiry', 'Inbound Client', ?, ?,
        'Director / HR Contact', ?, ?, 'poljobhub.pl (Homepage Form)', ?,
        'New Lead', 'Inbound staffing quote submitted directly on website.'
      )
    `).run(
      leadId,
      companyName,
      country || "Poland",
      rolesNeeded,
      Number(estimatedCount) || 5,
      contactInfo.includes("@") ? contactInfo : "info@poljobhub.pl",
      contactInfo,
      now.split("T")[0]
    );

    // 3. Notify founder via email
    try {
      await sendLiveEmail({
        to: process.env.SMTP_USER || "info@poljobhub.pl",
        subject: `🔥 New Inbound Client Request: ${companyName}`,
        text: `New employer inquiry received on PolJobHub:\n\nCompany: ${companyName}\nRoles Needed: ${rolesNeeded}\nContact: ${contactInfo}\nPositions: ${estimatedCount || 5}\nDate: ${now}`
      });
    } catch (e) {
      console.error(e);
    }

    return NextResponse.json({ success: true, message: "Request received! Our B2B coordinator will contact you shortly." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
