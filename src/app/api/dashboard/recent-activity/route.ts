import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: 1,
        title: "New Sub-Admin Registered",
        description: "Admin account activated with full privileges",
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        title: "NVMe Server Provisioned",
        description: "Enterprise tier 4 cloud instance active",
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
  });
}
