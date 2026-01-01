import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const settings = await prisma.settings.findMany();

    const settingsObj: Record<string, string> = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });

    return NextResponse.json({
      success: true,
      data: settingsObj,
    });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || !value) {
      return NextResponse.json(
        { success: false, message: 'Key dan value wajib diisi' },
        { status: 400 }
      );
    }

    const allowedKeys = ['link_kng', 'link_sswalfa'];
    if (!allowedKeys.includes(key)) {
      return NextResponse.json(
        { success: false, message: 'Key tidak valid' },
        { status: 400 }
      );
    }

    const setting = await prisma.settings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return NextResponse.json({
      success: true,
      message: 'Settings berhasil diupdate',
      data: setting,
    });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal update settings' },
      { status: 500 }
    );
  }
}