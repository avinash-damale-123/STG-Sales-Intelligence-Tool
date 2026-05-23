import { prisma } from '@/lib/prisma';

export async function createAuditLog(input: {
  userId: string;
  actionType: string;
  actionDescription?: string;
  ipAddress?: string;
}) {
  return prisma.auditLog.create({
    data: {
      userId: input.userId,
      actionType: input.actionType,
      actionDescription: input.actionDescription,
      ipAddress: input.ipAddress,
    },
  });
}

export async function listAuditLogs(limit = 100) {
  return prisma.auditLog.findMany({
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          userId: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
}
