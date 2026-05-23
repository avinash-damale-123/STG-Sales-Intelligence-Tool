const CRM_API_BASE_URL = process.env.CRM_API_BASE_URL || '';
const CRM_API_KEY = process.env.CRM_API_KEY || '';

interface PaginationParams {
  from?: number;
  to?: number;
}

export async function crmPost(
  endpoint: string,
  params?: PaginationParams
) {
  const formData = new FormData();

  if (params?.from) {
    formData.append('from', String(params.from));
  }

  if (params?.to) {
    formData.append('to', String(params.to));
  }

  const response = await fetch(`${CRM_API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'x-api-key': CRM_API_KEY,
    },
    body: formData,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`CRM API request failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchBranches() {
  return crmPost('/branch_list_BI');
}

export async function fetchAccounts(from = 1, to = 100) {
  return crmPost('/account_view', {
    from,
    to,
  });
}

export async function fetchMeetings(from = 1, to = 100) {
  return crmPost('/meeting_visit_BI', {
    from,
    to,
  });
}
