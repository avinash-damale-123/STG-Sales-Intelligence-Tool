import { prisma } from '@/lib/prisma';
import { buildBranchWhereClause } from './access-scope';

interface AccessScope {
  isSuperAdmin: boolean;
  allowedBranches: string[];
}

export async function getAlertSummary(scope: AccessScope) {
  const branchWhere = buildBranchWhereClause(scope);

  const [criticalAlerts, highAlerts, mediumAlerts, infoAlerts] = await Promise.all([
    prisma.alert.count({ where: { ...branchWhere, severity: 'Critical' } }),
    prisma.alert.count({ where: { ...branchWhere, severity: 'High' } }),
    prisma.alert.count({ where: { ...branchWhere, severity: 'Medium' } }),
    prisma.alert.count({ where: { ...branchWhere, severity: 'Info' } }),
  ]);

  return {
    criticalAlerts,
    highAlerts,
    mediumAlerts,
    infoAlerts,
  };
}
