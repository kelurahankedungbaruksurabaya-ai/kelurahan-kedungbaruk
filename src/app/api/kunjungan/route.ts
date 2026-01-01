import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateNIK, validatePhone } from '@/lib/utils';
import { KEPERLUAN_OPTIONS } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const keperluan = searchParams.get('keperluan');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    const where: any = {};

    if (keperluan && keperluan !== 'all') {
      where.keperluan = keperluan;
    }

    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) {
        where.created_at.gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.created_at.lte = end;
      }
    }

    if (search) {
      where.OR = [
        { nama: { contains: search, mode: 'insensitive' } },
        { nik: { contains: search, mode: 'insensitive' } },
        { no_hp: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.kunjungan.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      prisma.kunjungan.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching kunjungan:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nik, nama, alamat, rt, rw, no_hp, keperluan } = body;

    if (!nik || !nama || !alamat || !rt || !rw || !no_hp || !keperluan) {
      return NextResponse.json(
        { success: false, message: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    if (!validateNIK(nik)) {
      return NextResponse.json(
        { success: false, message: 'NIK harus 16 digit angka' },
        { status: 400 }
      );
    }

    if (!validatePhone(no_hp)) {
      return NextResponse.json(
        { success: false, message: 'Format nomor HP tidak valid' },
        { status: 400 }
      );
    }

    if (!KEPERLUAN_OPTIONS.includes(keperluan)) {
      return NextResponse.json(
        { success: false, message: 'Keperluan tidak valid' },
        { status: 400 }
      );
    }

    const kunjungan = await prisma.kunjungan.create({
      data: {
        nik,
        nama,
        alamat,
        rt,
        rw,
        no_hp,
        keperluan,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data kunjungan berhasil disimpan',
        data: kunjungan,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating kunjungan:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menyimpan data' },
      { status: 500 }
    );
  }
}