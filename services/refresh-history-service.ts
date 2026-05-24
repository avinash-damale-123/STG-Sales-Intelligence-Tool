import { prisma } from '@/lib/prisma';

export async function createRefreshHistory(input: {
  endpointName: string;
  refreshStatus: string;
  recordsProcessed?: number;
  errorMessage?: string;
  triggeredBy?: string;
}) {
  return prisma.refreshHistory.create({
    data: {
      endpointName: input.endpointName,
      refreshStatus: input.refreshStatus,
      recordsProcessed: input.recordsProcessed || 0,
      errorMessage: input.errorMessage,
      triggeredBy: input.triggeredBy || 'Manual',
      completedAt: new Date(),
    },
  });
}

export async function listRefreshHistory(limit = 100) {
  return prisma.refreshHistory.findMany({
    take: limit,
    orderBy: {
      startedAt: 'desc',
    },
  });
}
