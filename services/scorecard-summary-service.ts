import { prisma } from '@/lib/prisma';
import { buildBranchWhereClause } from './access-scope';

interface AccessScope {
  isSuperAdmin: boolean;
  allowedBranches: string[];
}

export async function getScorecardSummary(scope: AccessScope) {
  const branchWhere = buildBranchWhereClause(scope);

  const [totalUsers, totalScorecards, topPerformers] = await Promise.all([
    prisma.user.count({
      where: {
        status: 'Active',
      },
    }),
    prisma.scorecard.count({
      where: branchWhere,
    }),
    prisma.scorecard.count({
      where: {
        ...branchWhere,
        totalScore: {
          gte: 80,
        },
      },
    }),
  ]);

  const scoreAggregate = await prisma.scorecard.aggregate({
    where: branchWhere,
    _avg: {
      totalScore: true,
    },
  });

  return {
    totalUsers,
    totalScorecards,
    topPerformers,
    averageScore: scoreAggregate._avg.totalScore || 0,
    pendingReviews: 0,
  };
}
