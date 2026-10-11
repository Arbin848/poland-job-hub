import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Poland Job Hub | European Recruitment & Relocation Platform",
  description: "Connecting verified international talent with top European employers in Poland, Germany, and the EU.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
