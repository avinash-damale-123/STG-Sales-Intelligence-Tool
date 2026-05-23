import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function findUserForLogin(identifier: string) {
  return prisma.user.findFirst({
    where: {
      OR: [
        { userId: identifier },
        { email: identifier },
      ],
      status: 'Active',
    },
    include: {
      role: true,
      branchAccess: true,
    },
  });
}

export async function validateUserPassword(
  password: string,
  passwordHash: string
) {
  return bcrypt.compare(password, passwordHash);
}

export async function listUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      userId: true,
      email: true,
      firstName: true,
      lastName: true,
      department: true,
      status: true,
      primaryBranchCode: true,
      role: {
        select: {
          roleName: true,
          isSuperAdmin: true,
        },
      },
      branchAccess: {
        select: {
          branchCode: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
