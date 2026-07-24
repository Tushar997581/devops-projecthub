import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findUnique({ where: { email: 'admin@projecthub.com' } });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    await prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@projecthub.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
