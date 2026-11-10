import { NextRequest, NextResponse } from "next/server";
import { mockClients, mockLeads, mockProjects, mockAgreements } from "@/lib/mockData";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const path = slug.join("/");

  if (slug[0] === "clients") {
    return NextResponse.json({
      success: true,
      data: mockClients,
      total: mockClients.length,
      page: 1,
      pages: 1,
    });
  }

  if (slug[0] === "leads") {
    return NextResponse.json({
      success: true,
      data: mockLeads,
      total: mockLeads.length,
      page: 1,
      pages: 1,
    });
  }

  if (slug[0] === "projects") {
    return NextResponse.json({
      success: true,
      data: mockProjects,
      total: mockProjects.length,
      page: 1,
      pages: 1,
    });
  }

  if (slug[0] === "agreements") {
    return NextResponse.json({
      success: true,
      data: mockAgreements,
      total: mockAgreements.length,
      page: 1,
      pages: 1,
    });
  }

  // Try fetching remote for public content
  try {
    const url = new URL(req.url);
    const targetUrl = `https://letscod.com/api/${path}${url.search}`;
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {}

  // Safe fallback for any administrative or unknown endpoints
  return NextResponse.json({
    success: true,
    data: [],
    total: 0,
    page: 1,
    pages: 1,
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  let body = {};
  try {
    body = await req.json();
  } catch {}

  return NextResponse.json({
    success: true,
    message: `${slug.join("/")} action processed successfully`,
    data: { id: Date.now(), ...body },
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  let body = {};
  try {
    body = await req.json();
  } catch {}

  return NextResponse.json({
    success: true,
    message: `${slug.join("/")} updated successfully`,
    data: body,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  return NextResponse.json({
    success: true,
    message: `${slug.join("/")} deleted successfully`,
  });
}
