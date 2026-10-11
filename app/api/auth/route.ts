import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Default master credentials for PolJobHub (configurable via env)
    const validUsername = process.env.ADMIN_USERNAME || "arbin";
    const validPassword = process.env.ADMIN_PASSWORD || "poljobhub2026";

    if (username.trim().toLowerCase() === validUsername.toLowerCase() && password === validPassword) {
      const response = NextResponse.json({ success: true, message: "Authentication successful" });
      
      // Set secure HTTP-only session cookie valid for 7 days
      response.cookies.set("pjh_admin_auth", "authenticated_session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/"
      });

      return response;
    }

    return NextResponse.json({ success: false, error: "Invalid username or password" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete("pjh_admin_auth");
  return response;
}
