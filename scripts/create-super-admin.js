const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const userId = process.env.INITIAL_ADMIN_USER_ID;
  const email = process.env.INITIAL_ADMIN_EMAIL;
  const password = process.env.INITIAL_ADMIN_PASSWORD;
  const firstName = process.env.INITIAL_ADMIN_FIRST_NAME || 'Super';
  const lastName = process.env.INITIAL_ADMIN_LAST_NAME || 'Admin';

  if (!userId || !email || !password) {
    throw new Error(
      'Missing INITIAL_ADMIN_USER_ID, INITIAL_ADMIN_EMAIL, or INITIAL_ADMIN_PASSWORD environment variable.'
    );
  }

  if (password.length < 12) {
    throw new Error('INITIAL_ADMIN_PASSWORD must be at least 12 characters long.');
  }

  const role = await prisma.role.upsert({
    where: { roleName: 'Super Admin' },
    update: { isSuperAdmin: true },
    create: {
      roleName: 'Super Admin',
      isSuperAdmin: true,
    },
  });

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ userId }, { email }],
    },
  });

  if (existingUser) {
    console.log('Super Admin user already exists. No password was changed.');
    console.log(`User ID: ${existingUser.userId}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      userId,
      email,
      firstName,
      lastName,
      department: 'Administration',
      status: 'Active',
      passwordHash,
      roleId: role.id,
    },
  });

  console.log('Super Admin user created successfully.');
  console.log(`User ID: ${user.userId}`);
  console.log(`Email: ${user.email}`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
