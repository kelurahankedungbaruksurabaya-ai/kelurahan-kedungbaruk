import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const ikm = await prisma.ikmImage.findFirst({
      where: {
        bulan: currentMonth,
        is_active: true,
      },
      orderBy: {
        uploaded_at: 'desc',
      },
    });

    if (!ikm) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'Belum ada IKM untuk bulan ini',
      });
    }

    return NextResponse.json({
      success: true,
      data: ikm,
    });
  } catch (error: any) {
    console.error('Error fetching IKM:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data IKM' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image_url, bulan } = body;

    if (!image_url || !bulan) {
      return NextResponse.json(
        { success: false, message: 'Image URL dan bulan wajib diisi' },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}$/.test(bulan)) {
      return NextResponse.json(
        { success: false, message: 'Format bulan harus YYYY-MM' },
        { status: 400 }
      );
    }

    await prisma.ikmImage.updateMany({
      where: { bulan },
      data: { is_active: false },
    });

    const ikm = await prisma.ikmImage.create({
      data: {
        image_url,
        bulan,
        is_active: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'IKM berhasil diupload',
        data: ikm,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error uploading IKM:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal upload IKM' },
      { status: 500 }
    );
  }
}