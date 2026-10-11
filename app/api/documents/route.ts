import { NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const candidateId = formData.get("candidateId") as string;
    const title = formData.get("title") as string;
    const docType = formData.get("docType") as string;
    const expiryDate = formData.get("expiryDate") as string;
    const file = formData.get("file") as File;

    if (!candidateId || !file) {
      return NextResponse.json({ success: false, error: "Missing candidateId or file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.name);
    const uniqueFilename = `${Date.now()}-${uuidv4().substring(0, 8)}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFilename);
    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/${uniqueFilename}`;
    const id = uuidv4();
    const now = new Date().toISOString().split("T")[0];

    const insert = db.prepare(`
      INSERT INTO documents (id, candidateId, title, docType, fileName, fileUrl, fileSize, uploadedAt, expiryDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id,
      candidateId,
      title || file.name,
      docType || "Certificate",
      file.name,
      fileUrl,
      buffer.length,
      now,
      expiryDate || null
    );

    const newDoc = db.prepare("SELECT * FROM documents WHERE id = ?").get(id);

    return NextResponse.json({ success: true, data: newDoc });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
