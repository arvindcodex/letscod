import { NextRequest, NextResponse } from "next/server";
import { saveAdmin, findAdminByEmail } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    if (findAdminByEmail(email)) {
      return NextResponse.json(
        { success: false, message: "An admin account with this email already exists" },
        { status: 400 }
      );
    }

    const newAdmin = saveAdmin({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: role || "admin",
    });

    const token = `adm_token_${newAdmin.id}_${Date.now()}`;

    // Return without password
    const { password: _, ...safeUser } = newAdmin;

    return NextResponse.json({
      success: true,
      message: "Admin registered successfully in database",
      data: {
        user: safeUser,
        token,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to register admin" },
      { status: 500 }
    );
  }
}
