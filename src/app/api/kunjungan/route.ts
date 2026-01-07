import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateNIK, validatePhone } from "@/lib/utils";
import { KEPERLUAN_OPTIONS } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      nik,
      nama,
      alamat,
      rt,
      rw,
      no_hp,
      keperluan,
      petugas,
    } = data;

    if (!nik || !nama || !alamat || !rt || !rw || !no_hp || !keperluan) {
      return NextResponse.json(
        { error: "Field wajib harus diisi (kecuali petugas)" },
        { status: 400 }
      );
    }

    if (!validateNIK(nik)) {
      return NextResponse.json(
        { error: "NIK harus 16 digit angka" },
        { status: 400 }
      );
    }

    if (!validatePhone(no_hp)) {
      return NextResponse.json(
        { error: "Format No. HP tidak valid" },
        { status: 400 }
      );
    }

    if (!KEPERLUAN_OPTIONS.includes(keperluan)) {
      return NextResponse.json(
        { error: "Keperluan tidak valid" },
        { status: 400 }
      );
    }

    const result = await prisma.kunjungan.create({
      data: {
        nik,
        nama,
        alamat,
        rt,
        rw,
        no_hp,
        keperluan,
        petugas: petugas ?? null,
      },
    });

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
