import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const kategori = searchParams.get('kategori');

    // Build query filter
    const where: any = {};

    if (search) {
      where.OR = [
        { nama_produk: { contains: search, mode: 'insensitive' } },
        { jenis_usaha: { contains: search, mode: 'insensitive' } },
        { nama_pemilik: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (kategori) {
      where.kategori = kategori;
    }

    // Fetch data
    const data = await prisma.umkm.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching UMKM:', error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      nama_produk,
      jenis_usaha,
      nama_pemilik,
      kategori,
      harga_min,
      harga_max,
      no_wa,
      deskripsi,
      alamat,
      foto_url,
    } = body;

    // Validasi field wajib
    if (!nama_produk || !jenis_usaha || !nama_pemilik || !kategori) {
      return NextResponse.json(
        { success: false, error: "Field wajib harus diisi" },
        { status: 400 }
      );
    }

    // Create data
    const result = await prisma.umkm.create({
      data: {
        nama_produk,
        jenis_usaha,
        nama_pemilik,
        kategori,
        harga_min: harga_min ? parseInt(harga_min) : null,
        harga_max: harga_max ? parseInt(harga_max) : null,
        no_wa: no_wa || null,
        deskripsi: deskripsi || null,
        alamat: alamat || null,
        foto_url: foto_url || null,
      },
    });

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating UMKM:', error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}