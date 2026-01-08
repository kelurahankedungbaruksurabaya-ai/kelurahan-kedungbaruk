import { NextRequest, NextResponse } from "next/server";

// API ini ga kepake lagi karena upload langsung dari frontend ke Cloudinary
// Tapi tetep dibuat biar ga error 404

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: "Use client-side upload to Cloudinary" },
    { status: 400 }
  );
}