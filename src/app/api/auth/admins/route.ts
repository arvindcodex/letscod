import { NextResponse } from "next/server";
import { getAllAdmins } from "@/lib/db";

export async function GET() {
  const admins = getAllAdmins().map((a) => ({
    ...a,
    password: a.password || "admin",
    status: "active",
  }));
  return NextResponse.json({
    success: true,
    data: admins,
  });
}
