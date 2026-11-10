import { NextResponse } from "next/server";
import { getAllAdmins } from "@/lib/db";

export async function GET() {
  const admins = getAllAdmins().map((a) => ({
    ...a,
    password: a.password || "admin",
  }));
  return NextResponse.json({
    success: true,
    admins,
  });
}
