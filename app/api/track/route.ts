import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET /api/track?code=PJH-1042
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code")?.trim().toUpperCase();

    if (!code) {
      return NextResponse.json({ success: false, error: "Please enter a reference code." }, { status: 400 });
    }

    const candidate = db.prepare("SELECT * FROM candidates WHERE referenceCode = ?").get(code) as any;

    if (!candidate) {
      return NextResponse.json({ 
        success: false, 
        error: `No record found for code "${code}". Please verify your reference code or submit a new application.` 
      }, { status: 404 });
    }

    // Determine status badge color
    let badgeType = "info";
    if (candidate.pipelineStage === "Deployed / Working" || candidate.pipelineStage === "Completed") {
      badgeType = "success";
    } else if (candidate.pipelineStage === "Law Firm Review" || candidate.pipelineStage === "Work Permit Pending") {
      badgeType = "warning";
    }

    return NextResponse.json({
      success: true,
      data: {
        code: candidate.referenceCode,
        fullName: candidate.fullName,
        pipelineStage: candidate.pipelineStage,
        assignedCountry: candidate.assignedCountry || "Poland",
        assignedEmployer: candidate.assignedEmployer || "Awaiting employer allocation",
        legalStatus: candidate.legalStatus,
        updatedAt: candidate.updatedAt ? new Date(candidate.updatedAt).toLocaleDateString() : "Recent",
        badgeType
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
