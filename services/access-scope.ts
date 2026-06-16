import { prisma } from '@/lib/prisma';
import type { SessionUser } from '@/lib/auth';

export type AppRole = 'Standard' | 'Admin' | 'Super Admin' | string;

export function isSuperAdminRole(role: AppRole) {
  return role === 'Super Admin';
}

export function isAdminRole(role: AppRole) {
  return role === 'Admin' || role === 'Super Admin';
}

export async function resolveAccessScope(user: SessionUser) {
  if (isSuperAdminRole(user.role)) {
    return {
      role: user.role,
      isAdmin: true,
      isSuperAdmin: true,
      allowedBranches: [],
    };
  }

  const branchAccess = await prisma.userBranchAccess.findMany({
    where: {
      userId: user.id,
    },
    select: {
      branchCode: true,
    },
  });

  return {
    role: user.role,
    isAdmin: isAdminRole(user.role),
    isSuperAdmin: false,
    allowedBranches: branchAccess.map((item: { branchCode: string }) => item.branchCode),
  };
}

export function buildBranchWhereClause(scope: {
  isSuperAdmin: boolean;
  allowedBranches: string[];
}) {
  if (scope.isSuperAdmin) {
    return {};
  }

  if (!scope.allowedBranches.length) {
    return {
      branchCode: {
        in: ['__NO_ACCESS__'],
      },
    };
  }

  return {
    branchCode: {
      in: scope.allowedBranches,
    },
  };
}
