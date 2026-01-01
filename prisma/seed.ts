import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  const hashedPassword = await bcrypt.hash('kelurahan2024', 10);
  
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      full_name: 'Administrator Kelurahan',
    },
  });

  console.log('✅ Admin created:', admin.username);

  const settings = [
    { key: 'link_kng', value: 'https://example.com/kng' },
    { key: 'link_sswalfa', value: 'https://example.com/sswalfa' },
  ];

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
    console.log(`✅ Setting created: ${setting.key}`);
  }

  console.log('🎉 Seeding completed!');
  console.log('\n📝 Login credentials:');
  console.log('Username: admin');
  console.log('Password: kelurahan2024');
  console.log('\n⚠️  IMPORTANT: Ganti password setelah login pertama!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });