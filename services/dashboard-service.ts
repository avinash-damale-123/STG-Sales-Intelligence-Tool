import { getErvSummary } from './erv-service';
import { getNcaSummary } from './nca-service';
import { getMeetingSummary } from './meeting-service';

interface AccessScope {
  isSuperAdmin: boolean;
  allowedBranches: string[];
}

export async function getDashboardSummary(scope: AccessScope) {
  const [erv, nca, meetings] = await Promise.all([
    getErvSummary(scope),
    getNcaSummary(scope),
    getMeetingSummary(scope),
  ]);

  return {
    ervPortfolio: erv.totalAccounts,
    ncaPipeline: nca.totalPipeline,
    meetings: meetings.totalMeetings,
    highPriority: erv.highPriorityAccounts + nca.hotLeads,
    detail: {
      erv,
      nca,
      meetings,
    },
  };
}
