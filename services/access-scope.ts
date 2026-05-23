import { prisma } from '@/lib/prisma';
import type { SessionUser } from '@/lib/auth';

export async function resolveAccessScope(user: SessionUser) {
  if (user.role === 'Super Admin') {
    return {
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
    isSuperAdmin: false,
    allowedBranches: branchAccess.map((item) => item.branchCode),
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
