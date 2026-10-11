import { NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { sendLiveEmail } from "@/lib/mailer";

// Schema initialization for employer leads
db.exec(`
  CREATE TABLE IF NOT EXISTS employer_leads (
    id TEXT PRIMARY KEY,
    companyName TEXT NOT NULL,
    country TEXT NOT NULL, -- 'Poland' or 'Germany'
    city TEXT NOT NULL,
    industry TEXT NOT NULL,
    rolesNeeded TEXT NOT NULL,
    estimatedPositions INTEGER NOT NULL,
    contactPerson TEXT,
    contactEmail TEXT,
    contactPhone TEXT,
    sourcePortal TEXT NOT NULL, -- 'Pracuj.pl', 'OLX Praca', 'LinkedIn', 'StepStone.de'
    scrapedDate TEXT NOT NULL,
    outreachStatus TEXT NOT NULL, -- 'New Lead', 'Pitch Sent', 'Negotiating', 'Converted to Client', 'Not Interested'
    lastContactedAt TEXT,
    notes TEXT
  );
`);

// Seed initial active high-intent employer leads in Poland & Germany if empty
const leadCount = db.prepare("SELECT COUNT(*) as count FROM employer_leads").get() as { count: number };
if (leadCount.count === 0) {
  const insertLead = db.prepare(`
    INSERT INTO employer_leads (
      id, companyName, country, city, industry, rolesNeeded, estimatedPositions,
      contactPerson, contactEmail, contactPhone, sourcePortal, scrapedDate,
      outreachStatus, notes
    ) VALUES (
      @id, @companyName, @country, @city, @industry, @rolesNeeded, @estimatedPositions,
      @contactPerson, @contactEmail, @contactPhone, @sourcePortal, @scrapedDate,
      @outreachStatus, @notes
    )
  `);

  insertLead.run({
    id: "lead-1",
    companyName: "Wielkopolska Logistyka Sp. z o.o.",
    country: "Poland",
    city: "Poznań / Komorniki",
    industry: "Logistics & E-Commerce",
    rolesNeeded: "Magazynier / Komisjoner (Warehouse Pickers)",
    estimatedPositions: 12,
    contactPerson: "Tomasz Nowak (Dyrektor Operacyjny)",
    contactEmail: "rekrutacja@wielkopolskalogistyka.pl",
    contactPhone: "+48 61 800 1234",
    sourcePortal: "Pracuj.pl",
    scrapedDate: "2026-10-10",
    outreachStatus: "New Lead",
    notes: "Active hiring for 2-shift operations. Accommodation support needed for non-local staff."
  });

  insertLead.run({
    id: "lead-2",
    companyName: "Silesia Auto Precision Sp. z o.o.",
    country: "Poland",
    city: "Gliwice / Katowice",
    industry: "Automotive Production",
    rolesNeeded: "Pracownik Produkcji / Montaż (Assembly Staff)",
    estimatedPositions: 20,
    contactPerson: "Katarzyna Wiśniewska (HR Manager)",
    contactEmail: "kadry@silesia-autoprecision.pl",
    contactPhone: "+48 32 700 5678",
    sourcePortal: "OLX Praca",
    scrapedDate: "2026-10-09",
    outreachStatus: "New Lead",
    notes: "High turnover with current agency. Looking for motivated long-term candidates with English/Hindi coordination."
  });

  insertLead.run({
    id: "lead-3",
    companyName: "Dolnośląskie Konstrukcje Stalowe",
    country: "Poland",
    city: "Wrocław / Bielany",
    industry: "Metal & Fabrication",
    rolesNeeded: "Spawacz MIG/MAG 135 & Monter",
    estimatedPositions: 6,
    contactPerson: "Marek Kowalczyk (Kierownik Warsztatu)",
    contactEmail: "biuro@dolnoslaskie-stal.pl",
    contactPhone: "+48 71 390 4455",
    sourcePortal: "Pracuj.pl",
    scrapedDate: "2026-10-11",
    outreachStatus: "New Lead",
    notes: "Requires weld test on-site. Willing to pay 2,800 PLN placement fee per verified welder."
  });

  insertLead.run({
    id: "lead-4",
    companyName: "Nordrhein Personal & Logistik GmbH",
    country: "Germany",
    city: "Dortmund / Duisburg",
    industry: "Logistics Staffing Agency",
    rolesNeeded: "Gabelstaplerfahrer / Warehouse Assistants",
    estimatedPositions: 15,
    contactPerson: "Hans Weber (Partner Manager)",
    contactEmail: "h.weber@nordrhein-personal.de",
    contactPhone: "+49 231 5500 890",
    sourcePortal: "StepStone.de",
    scrapedDate: "2026-10-08",
    outreachStatus: "New Lead",
    notes: "German Zeitarbeit looking for cross-border recruiting partner in Poland for English-speaking workers. High placement margin (€1,500/worker)."
  });
}

// GET /api/employer-leads - List leads with filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country") || "All";
    const status = searchParams.get("status") || "All";

    let sql = "SELECT * FROM employer_leads WHERE 1=1";
    const params: any[] = [];

    if (country !== "All") {
      sql += " AND country = ?";
      params.push(country);
    }
    if (status !== "All") {
      sql += " AND outreachStatus = ?";
      params.push(status);
    }

    sql += " ORDER BY scrapedDate DESC";
    const leads = db.prepare(sql).all(...params);

    return NextResponse.json({ success: true, data: leads });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/employer-leads/outreach - Send 1-click B2B pitch to employer
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadId, language, templateType, customNotes } = body;

    const lead = db.prepare("SELECT * FROM employer_leads WHERE id = ?").get(leadId) as any;
    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    const now = new Date().toISOString();

    // Generate B2B Pitch in Polish or German
    let pitchSubject = "";
    let pitchBody = "";

    if (language === "PL") {
      pitchSubject = `Oferta bezpośredniego wsparcia rekrutacyjnego dla ${lead.companyName} [PolJobHub]`;
      pitchBody = `Szanowny Panie / Szanowna Pani,

Zauważyliśmy Państwa bieżącą rekrutację na stanowisko: ${lead.rolesNeeded} w ${lead.city}.

Agencja PolJobHub (Warszawa) specjalizuje się w dostarczaniu zweryfikowanych pracowników produkcyjnych, magazynowych oraz technicznych. Dysponujemy zespołem kandydatów ze znajomością języka angielskiego, gotowych do podjęcia pracy w ciągu 7-14 dni.

Dlaczego warto współpracować z PolJobHub?
1. Pełna weryfikacja kompetencji i legalności pobytu.
2. Koordynacja dwujęzyczna (angielski, hindi, nepalski) – eliminacja barier komunikacyjnych na hali.
3. 30-dniowa bezpłatna gwarancja wymiany pracownika.
4. Przejrzyste warunki bezpośredniego placementu (brak ukrytych kosztów pośredników).

Chętnie prześlemy 3-5 anonimowych profili kandydatów do wstępnego wglądu. Czy możemy umówić krótką 5-minutową rozmowę telefoniczną w tym tygodniu?

Z poważaniem,
Arbin (Dział Współpracy B2B)
PolJobHub Sp. z o.o. | Warszawa
Tel: +48 729 350 449 | info@poljobhub.pl`;
    } else {
      pitchSubject = `Kooperationsanfrage: Vorqualifizierte Fachkräfte für ${lead.companyName} [PolJobHub]`;
      pitchBody = `Sehr geehrte Damen und Herren,

wir haben Ihren aktuellen Personalbedarf im Bereich ${lead.rolesNeeded} in ${lead.city} aufmerksam verfolgt.

Als spezialisierte Personalagentur mit Sitz in Polen unterstützen wir deutsche Unternehmen und Personaldienstleister bei der schnellen Bereitstellung von motivierten, englischsprachigen Mitarbeitern für Logistik, Produktion und Handwerk.

Ihre Vorteile mit PolJobHub:
• Vorab geprüfte Profile mit lückenloser Dokumentation.
• Sofort einsatzbereite Fach- und Hilfskräfte mit europäischer Arbeitsberechtigung.
• 30-Tage-Ersatzgarantie ohne Risiko für Ihren Betrieb.
• Zuverlässige und unkomplizierte Vermittlungspartnerschaft.

Gerne stellen wir Ihnen unverbindlich passende Kandidatendossiers zur Verfügung. Wann würde Ihnen ein kurzes Telefonat zur Abstimmung am besten passen?

Mit freundlichen Grüßen,
Arbin (B2B Partner Desk)
PolJobHub | Warschau
Tel: +48 729 350 449 | info@poljobhub.pl`;
    }

    // Dispatch live email via Hostinger SMTP
    if (lead.contactEmail) {
      try {
        await sendLiveEmail({
          to: lead.contactEmail,
          subject: pitchSubject,
          text: pitchBody
        });
      } catch (err: any) {
        console.error("Live B2B pitch email delivery error:", err);
      }
    }

    // Update lead status in DB
    db.prepare(`
      UPDATE employer_leads 
      SET outreachStatus = 'Pitch Sent', lastContactedAt = ? 
      WHERE id = ?
    `).run(now, leadId);

    // Log to communication history
    const logId = uuidv4();
    db.prepare(`
      INSERT INTO communication_logs (id, candidateId, recipientContact, type, direction, subject, messageText, sentAt, sentBy)
      VALUES (?, NULL, ?, 'Email', 'Outbound', ?, ?, ?, 'Arbin (B2B Hunter Engine)')
    `).run(logId, lead.contactEmail, pitchSubject, pitchBody, now);

    return NextResponse.json({ 
      success: true, 
      data: {
        recipient: lead.contactEmail,
        subject: pitchSubject,
        body: pitchBody,
        sentAt: now
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
