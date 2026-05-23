import { getSessionUser } from '@/lib/session';
import { resolveAccessScope } from './access-scope';

export async function getApiAccessScope() {
  const user = getSessionUser();

  if (!user) {
    return {
      isAuthenticated: false,
      scope: null,
    };
  }

  const scope = await resolveAccessScope(user);

  return {
    isAuthenticated: true,
    user,
    scope,
  };
}

export function getTemporarySuperAdminScope() {
  return {
    isSuperAdmin: true,
    allowedBranches: [],
  };
}
