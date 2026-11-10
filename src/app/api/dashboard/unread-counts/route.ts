import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      queries: 2,
      tickets: 1,
      work_requests: 3,
      applications: 5,
      hosting_orders: 1,
      leads: 4,
      agreements: 2,
      total: 18,
    },
  });
}
