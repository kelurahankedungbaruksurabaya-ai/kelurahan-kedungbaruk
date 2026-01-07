// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // ambil dari ENV
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !JWT_SECRET) {
      return NextResponse.json(
        { success: false, message: "Konfigurasi server belum lengkap" },
        { status: 500 }
      );
    }

    // validasi login
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Username atau password salah" },
        { status: 401 }
      );
    }

    // buat token
    const token = jwt.sign(
      { username: ADMIN_USERNAME, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          username: ADMIN_USERNAME,
          role: "admin",
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
