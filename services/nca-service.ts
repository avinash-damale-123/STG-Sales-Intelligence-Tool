import { prisma } from '@/lib/prisma';
import { buildBranchWhereClause } from './access-scope';

export async function getNcaSummary(scope: {
  isSuperAdmin: boolean;
  allowedBranches: string[];
}) {
  const whereClause = {
    accountType: 'NCA',
    ...buildBranchWhereClause(scope),
  };

  const [
    totalPipeline,
    hotLeads,
    convertedAccounts,
    proposalStageAccounts,
  ] = await Promise.all([
    prisma.account.count({ where: whereClause }),
    prisma.account.count({
      where: {
        ...whereClause,
        priorityLevel: 'High',
      },
    }),
    prisma.account.count({
      where: {
        ...whereClause,
        stageName: 'Converted',
      },
    }),
    prisma.account.count({
      where: {
        ...whereClause,
        stageName: 'Proposal',
      },
    }),
  ]);

  return {
    totalPipeline,
    hotLeads,
    convertedAccounts,
    proposalStageAccounts,
  };
}
