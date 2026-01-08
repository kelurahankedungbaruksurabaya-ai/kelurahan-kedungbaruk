import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single UMKM by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const data = await prisma.umkm.findUnique({
      where: { id },
    });

    if (!data) {
      return NextResponse.json(
        { success: false, error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

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

// UPDATE UMKM
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
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

    const result = await prisma.umkm.update({
      where: { id },
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
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating UMKM:', error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// DELETE UMKM
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.umkm.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "Data berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting UMKM:', error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}