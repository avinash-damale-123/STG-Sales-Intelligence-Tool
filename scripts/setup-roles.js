const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { roleName: 'Standard', isSuperAdmin: false },
    { roleName: 'Admin', isSuperAdmin: false },
    { roleName: 'Super Admin', isSuperAdmin: true },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { roleName: role.roleName },
      update: { isSuperAdmin: role.isSuperAdmin },
      create: role,
    });
    console.log(`Role confirmed: ${role.roleName}`);
  }
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
