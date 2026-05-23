import { prisma } from '@/lib/prisma';
import { buildBranchWhereClause } from './access-scope';

export async function getErvSummary(scope: {
  isSuperAdmin: boolean;
  allowedBranches: string[];
}) {
  const whereClause = {
    accountType: 'ERV',
    ...buildBranchWhereClause(scope),
  };

  const [
    totalAccounts,
    activeAccounts,
    lostAccounts,
    highPriorityAccounts,
  ] = await Promise.all([
    prisma.account.count({ where: whereClause }),
    prisma.account.count({
      where: {
        ...whereClause,
        status: 'Active',
      },
    }),
    prisma.account.count({
      where: {
        ...whereClause,
        status: 'Lost',
      },
    }),
    prisma.account.count({
      where: {
        ...whereClause,
        priorityLevel: 'High',
      },
    }),
  ]);

  return {
    totalAccounts,
    activeAccounts,
    lostAccounts,
    highPriorityAccounts,
  };
}
