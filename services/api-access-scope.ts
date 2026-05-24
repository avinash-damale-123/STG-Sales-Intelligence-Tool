import { getSessionUser } from '@/lib/session';
import { resolveAccessScope } from './access-scope';

export async function getApiAccessScope() {
  const user = await getSessionUser();

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

export async function requireAdminAccess() {
  const access = await getApiAccessScope();

  if (!access.isAuthenticated || !access.user || !access.scope?.isSuperAdmin) {
    return {
      isAuthorized: false,
      access,
    };
  }

  return {
    isAuthorized: true,
    access,
  };
}

export function getTemporarySuperAdminScope() {
  return {
    isSuperAdmin: true,
    allowedBranches: [],
  };
}
