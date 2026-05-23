import { prisma } from '@/lib/prisma';
import { buildBranchWhereClause } from './access-scope';

export async function getMeetingSummary(scope: {
  isSuperAdmin: boolean;
  allowedBranches: string[];
}) {
  const whereClause = {
    ...buildBranchWhereClause(scope),
  };

  const [
    totalMeetings,
    heldMeetings,
    marketingMeetings,
    financeMeetings,
  ] = await Promise.all([
    prisma.meeting.count({ where: whereClause }),
    prisma.meeting.count({
      where: {
        ...whereClause,
        meetingStatus: 'Held',
      },
    }),
    prisma.meeting.count({
      where: {
        ...whereClause,
        meetingType: 'Marketing',
      },
    }),
    prisma.meeting.count({
      where: {
        ...whereClause,
        meetingType: 'Finance',
      },
    }),
  ]);

  return {
    totalMeetings,
    heldMeetings,
    marketingMeetings,
    financeMeetings,
  };
}
