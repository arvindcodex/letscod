import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      revenue: [12000, 18000, 24000, 31000, 42000, 58000, 75000],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      leads: [15, 22, 30, 28, 45, 60, 78],
      projects: { completed: 34, in_progress: 12, pending: 5 },
    },
  });
}
