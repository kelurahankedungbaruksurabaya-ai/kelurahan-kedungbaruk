export const dynamic = 'force-dynamic';

// sisanya tetap sama...
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';
import { formatDateForFilename, formatDateIndonesia } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keperluan = searchParams.get('keperluan');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

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

    const data = await prisma.kunjungan.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });

    if (data.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Tidak ada data untuk diexport' },
        { status: 404 }
      );
    }

    const excelData = data.map((item, index) => ({
      No: index + 1,
      NIK: item.nik,
      Nama: item.nama,
      Alamat: item.alamat,
      RT: item.rt,
      RW: item.rw,
      'No. HP': item.no_hp,
      Keperluan: item.keperluan,
      'Tanggal Kunjungan': formatDateIndonesia(item.created_at),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const columnWidths = [
      { wch: 5 },
      { wch: 20 },
      { wch: 25 },
      { wch: 35 },
      { wch: 5 },
      { wch: 5 },
      { wch: 15 },
      { wch: 50 },
      { wch: 25 },
    ];
    worksheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Kunjungan');

    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const filename = `Laporan_Kunjungan_${formatDateForFilename(new Date())}.xlsx`;

    return new NextResponse(excelBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error('Error exporting data:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal export data' },
      { status: 500 }
    );
  }
}